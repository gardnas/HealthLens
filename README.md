# HealthLens

A public health data tool that visualizes breast cancer diagnosis rates and social determinants of health across King County, Washington — built for general audiences without a public-health background.

## Live Site

[https://gardnas.github.io/HealthLens/](https://gardnas.github.io/HealthLens/)

## Presentation Deck

[Winter 2025 Pitch Deck](https://docs.google.com/presentation/d/1IpSC_yfNqd2SFTEwFrqqM8aE3jyhqkJamRUlgMDMhjo/edit?slide=id.g2f86aa6ff5f_0_14#slide=id.g2f86aa6ff5f_0_14) — note: this is the original pitch deck from the previous quarter's team, not the current version of the project.
[Spring 2026 Final Presentation](linktbd) — note: this is currently in progress

## Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/gardnas/HealthLens.git
   ```

2. **Install dependencies**
   ```bash
   cd HealthLens/frontend
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173`.

4. **Deploy to GitHub Pages**
   ```bash
   npm run deploy
   ```

## Tech Stack

- React + Vite
- Tailwind CSS
- React Leaflet (map)
- Framer Motion (animations)
- All data is bundled as static JSON — no backend required

## Contributing

1. Create a new branch: `git checkout -b feature/your-feature-name`
2. Make your changes and commit: `git commit -m "description of change"`
3. Push and open a pull request: `git push origin feature/your-feature-name`

## Contact

Chris Moy — [cjmoy2004@gmail.com](mailto:cjmoy2004@gmail.com)



## Original Project Acknowledgements:
This project is a continuation of the work done by the original HealthLens capstone team in Winter 2025. We acknowledge their foundational work in establishing the initial map, starting website, and dataset integration. See the original repository for more information.
* Original Repository: [poben2002/Health4All](https://github.com/poben2002/Health4All)
* Current deployement: https://health4all-frontend.onrender.com/#/

## License
Distributed under the **MIT License**. See `LICENSE` file for more information.