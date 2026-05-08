# HealthLens Project Continuation
**INFO Winter 2026 / Spring 2026 Capstone Project:**
*Team Chansey*

## Project Description
**HealthLens** is a website that provides geographic breast cancer data and social determinants of health (SDOH) statistics in an accessible and understandable way for general audiences seeking to explore their correlation in order to be more informed about screening and other preventative interventions.

## Current Features
In its current state, the website has four pages:
* **Home Page:** Introduces the the project.
* **Map Page:** Hosts the interactive GIS tool that visualizes breast cancer incidence across King County.
    * *Includes:* Interactive map with color-coded regions, tooltips, and detailed statistics by area.
* **Resource Page:** Connects users with real-world support services across multiple categories.
* **About Page:** Provides transparency regarding the original data sources and mission.

## Planned Features
Currently, we are working on the following list of features: 

* New starting page / landing page with context for users unfamiliar in this domain to get started and be able to understand the website and its information. This would include a reminder that breast cancer rates does not equal the risk for transparency and safety of our users.
* Users can hover over health jargon for its definition to help break down health related knowledge barriers.
* Loading screen for data visualizations.
* Adding search functionality for specific zip codes and neighborhoods.
* Summary of how a regions rates / stats relate to SDOH stats.
* Sources page to be more transparent about where the data is coming from as well as limitations.
* Additional visualizations to showcase key points and takeaways in more digestible ways.
* Including baseline stats such as averages or comparisons to other places for a better gauge on a statistic.
* Providing a FAQ on how to use the website, who it's for, what steps to take, and the "why" behind the project.
* Mobile optimization to ensure mobile users can access and navigate the website.



## Local Setup & Installation

To run the project locally:

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/gardnas/Health4All.git](https://github.com/gardnas/Health4All.git)
    ```

2.  **Navigate to the frontend directory**
    ```bash
    cd Health4All/frontend
    ```

3.  **Install Dependencies**
    ```bash
    npm install
    ```

4.  **Run the Development Server**
    ```bash
    npm run dev
    ```

## Technologies Used
* **Frontend:** React, JavaScript, Vite
* **Visualization:** Data visualization libraries (undecided yet)
* **Deployment:** Render

## How to Contribute
We welcome contributions! If you are interested in helping develop the Phase II features:

1.  **Fork** the repository if needed.
2.  **Create a New Branch** (`git checkout -b feature/NameOfBranchOrFeature`).
3.  **Commit your changes** (`git commit -m 'Added NameOfBranchOrFeature'`).
4.  **Push to the branch** (`git push origin feature/NameOfBranchOrFeature`).
5.  **Open a Pull Request**.

## Data Sources

All datasets used in this project cover King County, Washington and are organized by Health Reporting Area (HRA) — geographic subdivisions defined by Public Health — Seattle & King County for sub-county health reporting.

| Dataset | Source | Notes |
|---|---|---|
| **Breast Cancer Incidence** | [Washington State Cancer Registry via King County Community Health Indicators (CHI)](https://kingcounty.gov/en/dept/dph/about-king-county/about-public-health/data-reports/population-health-data/community-health-indicators/washington-state-cancer-registry) | Age-adjusted incidence rate per 100,000 females, 2018–2022. Includes comparison to King County average (145.2 per 100k). |
| **Poverty Rate** | [King County Community Health Indicators — Economic Hardship](https://kingcounty.gov/en/dept/dph/about-king-county/about-public-health/data-reports/population-health-data/community-health-indicators) | Percent of adults below the federal poverty level by HRA. |
| **Health Insurance Coverage** | [King County Community Health Indicators — Access to Care](https://kingcounty.gov/en/dept/dph/about-king-county/about-public-health/data-reports/population-health-data/community-health-indicators) | Percent of adults uninsured by HRA. |
| **Median Household Income** | [King County Community Health Indicators — Economic Hardship](https://kingcounty.gov/en/dept/dph/about-king-county/about-public-health/data-reports/population-health-data/community-health-indicators) | Median household income by HRA, sourced from the American Community Survey (ACS). |
| **Race & Ethnicity** | [King County Community Health Indicators — Demographics](https://kingcounty.gov/en/dept/dph/about-king-county/about-public-health/data-reports/population-health-data/community-health-indicators) | Population counts and percentages by race/ethnicity group per HRA, sourced from the ACS. |

Raw data was downloaded from the CHI Tableau dashboards and transformed into JSON using `backend/scripts/transformData.js`. The CHI portal provides instructions for downloading underlying data [here](https://cdn.kingcounty.gov/-/media/king-county/depts/dph/documents/about-public-health/data-reports/download-chi-data.pdf).

> **Note:** Breast cancer incidence rates reflect diagnosis counts, not individual risk. Rates are age-adjusted and should not be interpreted as the likelihood of any individual developing cancer.

## License
Distributed under the **MIT License**. See `LICENSE` file for more information.

## Original Project Acknowledgements:
This project is a continuation of the work done by the original HealthLens capstone team in Winter 2025. We acknowledge their foundational work in establishing the initial map, starting website, and dataset integration. See the original repository for more information.
* Original Repository: [poben2002/Health4All](https://github.com/poben2002/Health4All)
* Current deployement: https://health4all-frontend.onrender.com/#/
* Winter 2025 Group Presentation: 

