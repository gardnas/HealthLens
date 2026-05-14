import React, { useState, useCallback, useEffect, useRef } from 'react';
import Navbar from './Navbar';
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import geoData from "./Data/geoData.json";

// In dev, use relative URL so Vite proxy forwards to the backend (avoids CORS).
// In production, use the full backend URL set by window.API_BASE_URL.
const API_BASE = import.meta.env.DEV ? '' : (window.API_BASE_URL || 'https://health4all-backend-13a9.onrender.com');
const KC_AVG = 145.2;

function getBinColor(rate) {
  if (rate === null || rate === undefined) return '#D1D5DB';
  if (rate < 120) return '#C5DAEA';
  if (rate < 135) return '#90BEDD';
  if (rate < 155) return '#5A95C8';
  if (rate < 175) return '#3C6D96';
  return '#2D4A6B';
}

const LEGEND_BINS = [
  { label: '< 120', color: '#C5DAEA' },
  { label: '120–134', color: '#90BEDD' },
  { label: '135–154', color: '#5A95C8' },
  { label: '155–174', color: '#3C6D96' },
  { label: '175+', color: '#2D4A6B' },
];

function getLargestRace(raceData) {
  const races = [
    { name: 'White', pct: raceData.white_pop_pct },
    { name: 'Hispanic or Latino', pct: raceData.hispanic_latino_pop_pct },
    { name: 'Asian', pct: raceData.asian_pop_pct },
    { name: 'Black or African American', pct: raceData.black_african_american_pop_pct },
    { name: 'Two or more races', pct: raceData.two_or_more_races_pop_pct },
  ];
  const largest = races.reduce((a, b) => (a.pct > b.pct ? a : b));
  return `${largest.name} (${largest.pct.toFixed(0)}%)`;
}

function Accordion({ title, children }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderTop: '1px solid var(--rule)' }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between',
          background: 'none', border: 'none', cursor: 'pointer', padding: '14px 0', textAlign: 'left',
        }}
      >
        <span style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', fontWeight: 500, color: 'var(--ink)' }}>
          {title}
        </span>
        <svg
          width="16" height="16" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth={2}
          style={{
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 200ms',
            color: 'var(--ink-muted)',
            flexShrink: 0,
            marginLeft: '12px',
          }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div style={{
        display: 'grid',
        gridTemplateRows: open ? '1fr' : '0fr',
        transition: 'grid-template-rows 200ms ease',
        overflow: 'hidden',
      }}>
        <div style={{ overflow: 'hidden' }}>
          <div style={{ paddingBottom: '16px', fontFamily: 'var(--font-sans)', fontSize: '13px', lineHeight: 1.65, color: 'var(--ink-soft)' }}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

function RangeBar({ rate }) {
  const min = 80;
  const max = 220;
  const pct = Math.max(0, Math.min(100, ((rate - min) / (max - min)) * 100));
  const avgPct = ((KC_AVG - min) / (max - min)) * 100;

  return (
    <div style={{ marginBottom: '20px' }}>
      <div style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', color: 'var(--ink-muted)', marginBottom: '10px', textAlign: 'left' }}>
        Rate vs. King County average (145.2)
      </div>
      <div style={{ position: 'relative', height: '6px', backgroundColor: 'var(--rule)', borderRadius: '3px' }}>
        <div style={{
          position: 'absolute', left: `${avgPct}%`, top: '-7px',
          width: '2px', height: '20px', backgroundColor: 'var(--ink-muted)', borderRadius: '1px',
        }} />
        <div style={{
          position: 'absolute', left: `${pct}%`, top: '-5px',
          width: '16px', height: '16px', backgroundColor: 'var(--brand)', borderRadius: '50%',
          transform: 'translateX(-50%)', boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
        }} />
      </div>
      <div style={{
        display: 'flex', justifyContent: 'space-between',
        fontFamily: 'var(--font-sans)', fontSize: '11px', color: 'var(--ink-muted)', marginTop: '8px',
      }}>
        <span>80</span>
        <span>KC avg</span>
        <span>220+</span>
      </div>
    </div>
  );
}

function SidePanel({ selected, allData }) {
  if (!selected) {
    return (
      <div style={{
        height: '100%', display: 'flex', flexDirection: 'column',
        justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '32px 24px',
      }}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}
          style={{ color: 'var(--rule)', marginBottom: '16px' }}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
        </svg>
        <p style={{ fontFamily: 'var(--font-serif)', fontSize: '17px', color: 'var(--ink-soft)', lineHeight: 1.5, maxWidth: '24ch' }}>
          Click any neighborhood on the map to see its statistics.
        </p>
      </div>
    );
  }

  const { name, rate, comparison, cases } = selected;
  const raceData = allData.race.find(d => d.hra_name === name);
  const insuranceData = allData.insurance.find(d => d.hra_name === name);
  const incomeData = allData.income.find(d => d.hra_name === name);
  const povertyData = allData.poverty.find(d => d.hra_name === name);

  const comparisonConfig = {
    higher: { label: 'Above KC average', color: '#B8593A', bg: '#B8593A18', border: '#B8593A40' },
    lower: { label: 'Below KC average', color: '#2D7A4F', bg: '#2D7A4F18', border: '#2D7A4F40' },
    'not different': { label: 'Similar to KC average', color: '#5A6070', bg: '#5A607018', border: '#5A607040' },
  };
  const cmp = comparisonConfig[comparison] || comparisonConfig['not different'];

  return (
    <div style={{ height: '100%', overflowY: 'auto', padding: '24px', textAlign: 'left' }}>
      <p style={{
        fontFamily: 'var(--font-sans)', fontSize: '11px', fontWeight: 600,
        letterSpacing: '0.07em', textTransform: 'uppercase', color: 'var(--ink-muted)', marginBottom: '6px',
      }}>
        Health Reporting Area
      </p>
      <h3 style={{
        fontFamily: 'var(--font-serif)', fontSize: '19px', fontWeight: 600,
        color: 'var(--ink)', lineHeight: 1.3, marginBottom: '20px',
      }}>
        {name}
      </h3>

      <div style={{ marginBottom: '4px' }}>
        <span style={{ fontFamily: 'var(--font-serif)', fontSize: '52px', fontWeight: 600, color: 'var(--brand)', lineHeight: 1 }}>
          {rate}
        </span>
      </div>
      <p style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', color: 'var(--ink-muted)', marginBottom: '10px' }}>
        per 100,000 females · 2018–2022 · {cases} cases
      </p>
      <div style={{
        display: 'inline-block', backgroundColor: cmp.bg, color: cmp.color,
        fontFamily: 'var(--font-sans)', fontSize: '11px', fontWeight: 600,
        padding: '3px 10px', borderRadius: '2px', marginBottom: '20px',
        border: `1px solid ${cmp.border}`,
      }}>
        {cmp.label}
      </div>

      <RangeBar rate={rate} />

      <div style={{ borderTop: '1px solid var(--rule)', paddingTop: '16px', marginBottom: '4px' }}>
        <p style={{
          fontFamily: 'var(--font-sans)', fontSize: '11px', fontWeight: 600,
          letterSpacing: '0.07em', textTransform: 'uppercase', color: 'var(--ink-muted)', marginBottom: '12px',
        }}>
          Social Determinants of Health
        </p>

        {incomeData && (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', paddingBottom: '10px', borderBottom: '1px solid var(--rule)', marginBottom: '10px' }}>
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', color: 'var(--ink-soft)' }}>Median household income</span>
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', fontWeight: 500, color: 'var(--ink)', marginLeft: '8px', flexShrink: 0 }}>
              ${Math.round(incomeData.median_income).toLocaleString()}
            </span>
          </div>
        )}

        {insuranceData && (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', paddingBottom: '10px', borderBottom: '1px solid var(--rule)', marginBottom: '10px' }}>
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', color: 'var(--ink-soft)' }}>Uninsured adults</span>
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', fontWeight: 500, color: 'var(--ink)', marginLeft: '8px', flexShrink: 0 }}>
              {insuranceData.percent_uninsured.toFixed(1)}%
            </span>
          </div>
        )}

        {povertyData && (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', paddingBottom: '10px', borderBottom: '1px solid var(--rule)', marginBottom: '10px' }}>
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', color: 'var(--ink-soft)' }}>Below poverty line</span>
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', fontWeight: 500, color: 'var(--ink)', marginLeft: '8px', flexShrink: 0 }}>
              {povertyData.percent_below_poverty.toFixed(1)}%
            </span>
          </div>
        )}

        {raceData && (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', paddingBottom: '10px' }}>
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', color: 'var(--ink-soft)' }}>Largest group</span>
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', fontWeight: 500, color: 'var(--ink)', marginLeft: '8px', textAlign: 'right', maxWidth: '55%' }}>
              {getLargestRace(raceData)}
            </span>
          </div>
        )}
      </div>

      <div style={{ marginTop: '8px' }}>
        <Accordion title="What these numbers suggest">
          <p>Higher detection rates often reflect better screening access not greater personal cancer risk. Areas with lower rates may have underdiagnosis due to limited healthcare access, language barriers, or lower screening uptake.</p>
          {comparison === 'higher' && (
            <p style={{ marginTop: '8px' }}>This area's rate is statistically above the county average, likely reflecting stronger preventive care infrastructure and higher screening participation.</p>
          )}
          {comparison === 'lower' && (
            <p style={{ marginTop: '8px' }}>This area's rate is statistically below the county average. This may reflect lower screening rates, not lower disease risk — early detection is equally important here.</p>
          )}
        </Accordion>
        <Accordion title="What you can do">
          <p>Mammography screening (recommended annually for women 40+) is the most effective early detection tool. Your neighborhood's rate does not determine your personal risk.</p>
          <p style={{ marginTop: '8px' }}>
            Visit <a href="/#/resources" style={{ color: 'var(--brand)', textDecoration: 'underline' }}>Find Screening</a> to locate nearby clinics and low-cost options.
          </p>
        </Accordion>
        <Accordion title="How this was measured">
          <p>Rates are age-adjusted to the 2000 U.S. standard population, per 100,000 females, covering 2018–2022 diagnoses from the Washington State Cancer Registry via King County Community Health Indicators. Boundaries use Health Reporting Areas (HRAs).</p>
        </Accordion>
      </div>
    </div>
  );
}

// Imperative Leaflet layer — matches the pattern used in the original Map.jsx
function MapLayers({ breastCancerData, onSelect, selectedName }) {
  const map = useMap();
  const layerRef = useRef(null);
  const selectedNameRef = useRef(selectedName);

  useEffect(() => {
    selectedNameRef.current = selectedName;
  }, [selectedName]);

  // Build/rebuild the GeoJSON layer whenever cancer data loads
  useEffect(() => {
    if (!map || !breastCancerData.length) return;

    if (layerRef.current) {
      map.removeLayer(layerRef.current);
      layerRef.current = null;
    }

    layerRef.current = L.geoJSON(geoData, {
      style: (feature) => {
        const cancer = breastCancerData.find(d => d.name === feature.properties.name);
        const isSelected = feature.properties.name === selectedNameRef.current;
        return {
          fillColor: cancer ? getBinColor(cancer.rate) : '#D1D5DB',
          fillOpacity: isSelected ? 1 : 0.8,
          color: isSelected ? '#2D4A6B' : '#555',
          weight: isSelected ? 2.5 : 0.8,
        };
      },
      onEachFeature: (feature, layer) => {
        layer.on({
          click: () => {
            const cancer = breastCancerData.find(d => d.name === feature.properties.name);
            if (cancer) onSelect({ name: feature.properties.name, ...cancer });
          },
          mouseover: (e) => {
            e.target.setStyle({ fillOpacity: 1, weight: 1.5 });
            e.target.bindTooltip(feature.properties.name, { sticky: true, direction: 'top' }).openTooltip();
          },
          mouseout: (e) => {
            const isSel = feature.properties.name === selectedNameRef.current;
            e.target.setStyle({
              fillOpacity: isSel ? 1 : 0.8,
              weight: isSel ? 2.5 : 0.8,
              color: isSel ? '#2D4A6B' : '#555',
            });
            e.target.closeTooltip();
          },
        });
      },
    }).addTo(map);

    return () => {
      if (layerRef.current) {
        map.removeLayer(layerRef.current);
        layerRef.current = null;
      }
    };
  }, [map, breastCancerData, onSelect]);

  // Update styles on selection change without recreating the layer
  useEffect(() => {
    if (!layerRef.current || !breastCancerData.length) return;
    layerRef.current.eachLayer((layer) => {
      const name = layer.feature?.properties?.name;
      const cancer = breastCancerData.find(d => d.name === name);
      const isSelected = name === selectedName;
      layer.setStyle({
        fillColor: cancer ? getBinColor(cancer.rate) : '#D1D5DB',
        fillOpacity: isSelected ? 1 : 0.8,
        color: isSelected ? '#2D4A6B' : '#555',
        weight: isSelected ? 2.5 : 0.8,
      });
    });
  }, [selectedName, breastCancerData]);

  return null;
}

function MapPage() {
  const [breastCancerData, setBreastCancerData] = useState([]);
  const [allData, setAllData] = useState({ race: [], insurance: [], income: [], poverty: [] });
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch(`${API_BASE}/api/heatmap`).then(r => r.json()).then(d => d.heatmap || []),
      fetch(`${API_BASE}/api/demographics/population-race`).then(r => r.json()).catch(() => []),
      fetch(`${API_BASE}/api/demographics/health-insurance`).then(r => r.json()).catch(() => []),
      fetch(`${API_BASE}/api/demographics/median-income`).then(r => r.json()).catch(() => []),
    ]).then(([heatmap, race, insurance, income]) => {
      setBreastCancerData(heatmap);
      setAllData(prev => ({ ...prev, race, insurance, income }));
      setLoading(false);
    }).catch(() => setLoading(false));

    fetch(`${API_BASE}/api/demographics/poverty`)
      .then(r => r.json())
      .then(d => setAllData(prev => ({ ...prev, poverty: Array.isArray(d) ? d : [] })))
      .catch(() => {});
  }, []);

  const handleSelect = useCallback((feature) => setSelected(feature), []);

  return (
    <div style={{ width: '100%', backgroundColor: 'var(--surface)', minHeight: '100vh' }}>
      <Navbar />

      {/* Page header */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '48px 40px 24px', textAlign: 'left' }}>

        {/* Framing banner */}
        <div style={{
          borderLeft: '3px solid var(--accent)',
          backgroundColor: 'var(--surface-band)',
          padding: '12px 16px',
          marginBottom: '28px',
          borderRadius: '0 2px 2px 0',
        }}>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '161px', color: 'var(--ink-soft)', lineHeight: 1.6, textAlign: 'left', margin: 0 }}>
            <strong style={{ color: 'var(--ink)' }}>Rates ≠ Risk.</strong>{' '}
            A higher detection rate often means better access to screening, not more danger. These numbers show where cancers are being found, <strong style={{color: 'var(--ink'}}>not who is most at risk.</strong>
          </p>
        </div>

        {/* Heading */}
        <div style={{ width: '48px', height: '3px', backgroundColor: 'var(--brand)', marginBottom: '20px' }} />
        <h1 style={{
          fontFamily: 'var(--font-serif)', fontSize: '38px', fontWeight: 600,
          lineHeight: 1.2, letterSpacing: '-0.01em', color: 'var(--ink)', marginBottom: '12px', textAlign: 'left',
        }}>
          Breast Cancer Rates Across King County
        </h1>
        <p style={{
          fontFamily: 'var(--font-serif)', fontSize: '18px', lineHeight: 1.6,
          color: 'var(--ink-soft)', maxWidth: '70ch', textAlign: 'left', marginBottom: '0',
        }}>
          Age-adjusted diagnosis rates by Health Reporting Area, 2018–2022. Click any neighborhood to see its rate alongside income, insurance, and demographic context.
        </p>
      </div>

      {/* Legend + map section — same container width as header */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px 48px' }}>

        {/* Legend */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px', flexWrap: 'wrap' }}>
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', color: 'var(--ink-muted)', marginRight: '2px' }}>
            Rate per 100,000:
          </span>
          {LEGEND_BINS.map(bin => (
            <div key={bin.label} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '14px', height: '14px', backgroundColor: bin.color, borderRadius: '2px', border: '1px solid rgba(0,0,0,0.12)', flexShrink: 0 }} />
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', color: 'var(--ink-muted)' }}>{bin.label}</span>
            </div>
          ))}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginLeft: '4px' }}>
            <div style={{ width: '14px', height: '14px', backgroundColor: '#D1D5DB', borderRadius: '2px', border: '1px solid rgba(0,0,0,0.12)', flexShrink: 0 }} />
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', color: 'var(--ink-muted)' }}>No data</span>
          </div>
        </div>

        {/* Map + Side panel grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 380px',
          gap: '16px',
          height: '680px',
        }}>
          {/* Map */}
          <div style={{ position: 'relative', borderRadius: '4px', overflow: 'hidden', border: '1px solid var(--rule)' }}>
            {loading && (
              <div style={{
                position: 'absolute', inset: 0, zIndex: 1000,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: 'rgba(250,247,242,0.8)',
              }}>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: 'var(--ink-muted)' }}>Loading map data…</p>
              </div>
            )}
            <MapContainer
              center={[47.45, -121.95]}
              zoom={10}
              minZoom={9}
              maxBounds={[[46.7, -123.5], [48.3, -120.5]]}
              maxBoundsViscosity={0.9}
              style={{ height: '100%', width: '100%' }}
              scrollWheelZoom={true}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              />
              <MapLayers
                breastCancerData={breastCancerData}
                onSelect={handleSelect}
                selectedName={selected?.name}
              />
            </MapContainer>
          </div>

          {/* Side panel */}
          <div style={{
            backgroundColor: 'var(--surface-raise)',
            border: '1px solid var(--rule)',
            borderRadius: '4px',
            overflow: 'hidden',
          }}>
            <SidePanel selected={selected} allData={allData} />
          </div>
        </div>

        {/* Source note */}
        <p style={{
          fontFamily: 'var(--font-sans)', fontSize: '12px', color: 'var(--ink-muted)',
          marginTop: '14px', lineHeight: 1.6, textAlign: 'left',
        }}>
          Source: Washington State Cancer Registry via King County Community Health Indicators, 2018–2022. Rates are age-adjusted per 100,000 females. "Similar / Above / Below" reflects comparison of 95% confidence intervals against the KC county average (145.2).
        </p>
      </div>
    </div>
  );
}

export default MapPage;
