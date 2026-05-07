const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'data');

// KC average breast cancer rate and 95% CI from DemographicsSheet-pct_data.csv
const KC_RATE = 145.2;
const KC_CI_LOWER = 142.7;
const KC_CI_UPPER = 147.8;

function parseUTF16TSV(filename) {
    const filepath = path.join(DATA_DIR, filename);
    const buf = fs.readFileSync(filepath);
    // Strip UTF-16 LE BOM (FF FE) if present
    const start = (buf[0] === 0xFF && buf[1] === 0xFE) ? 2 : 0;
    const content = buf.slice(start).toString('utf16le');
    const lines = content.split(/\r?\n/).filter(l => l.trim());
    const headers = lines[0].split('\t').map(h => h.trim());
    const rows = [];
    for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split('\t').map(v => v.trim());
        const row = {};
        headers.forEach((h, idx) => {
            row[h] = values[idx] !== undefined ? values[idx] : '';
        });
        rows.push(row);
    }
    return rows;
}

function getComparison(lowerBound, upperBound) {
    if (upperBound < KC_CI_LOWER) return 'lower';
    if (lowerBound > KC_CI_UPPER) return 'higher';
    return 'not different';
}

// Transform HRA-map-pct_data.csv → breastCancerRateData.json and cancer_data.json
function transformCancerData() {
    const rows = parseUTF16TSV('HRA-map-pct_data.csv');

    const heatmap = rows
        .map(row => {
            const rate = parseFloat(row['Max. result']);
            const lower = parseFloat(row['Max. Lower Bound']);
            const upper = parseFloat(row['Max. Upper Bound']);
            const cases = parseInt(row['Max. numerator'], 10);
            const lat = parseFloat(row['Latitude (generated)']);
            const lng = parseFloat(row['Longitude (generated)']);
            const name = row['Cat1 Group'];
            if (!name || isNaN(rate)) return null;
            return {
                lat,
                lng,
                value: rate,
                rate,
                name,
                comparison: getComparison(lower, upper),
                cases,
                lower_bound: lower,
                upper_bound: upper
            };
        })
        .filter(Boolean);

    fs.writeFileSync(
        path.join(DATA_DIR, 'breastCancerRateData.json'),
        JSON.stringify({ heatmap }, null, 2)
    );
    console.log(`breastCancerRateData.json — ${heatmap.length} HRAs`);

    // cancer_data.json uses a raw array format expected by citiesController and cityDetailsController
    const cancerRaw = heatmap.map(r => ({
        'cat1_group': r.name,
        'latitude_(generated)': r.lat,
        'longitude_(generated)': r.lng,
        'max._result': r.rate,
        'max._lower_bound': r.lower_bound,
        'max._upper_bound': r.upper_bound,
        'numerator': r.cases,
        'comparison_with_kc': r.comparison
    }));

    fs.writeFileSync(
        path.join(DATA_DIR, 'cancer_data.json'),
        JSON.stringify(cancerRaw, null, 2)
    );
    console.log(`cancer_data.json — ${cancerRaw.length} HRAs`);
}

// Transform HRA-ranking_data.csv → poverty_population.json
function transformPovertyData() {
    const rows = parseUTF16TSV('HRA-ranking_data.csv');

    // Each HRA appears in multiple rows (main result + CI bound rows).
    // Max. Result is only populated on the main result row, so filter for those.
    const seen = new Map();
    for (const row of rows) {
        const name = row['Cat1 Group'];
        const result = row['Max. Result'];
        if (name && result && !seen.has(name)) {
            seen.set(name, parseFloat(result));
        }
    }

    const poverty = Array.from(seen.entries())
        .map(([hra_name, rate]) => ({
            hra_name,
            percent_below_poverty: parseFloat((rate * 100).toFixed(2))
        }))
        .sort((a, b) => a.hra_name.localeCompare(b.hra_name));

    fs.writeFileSync(
        path.join(DATA_DIR, 'poverty_population.json'),
        JSON.stringify(poverty, null, 2)
    );
    console.log(`poverty_population.json — ${poverty.length} HRAs`);
}

transformCancerData();
transformPovertyData();
console.log('Done.');
