# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Project Setup

    1. Set up vite
    2. get api key
    3. run npm install @vis.gl/react-google-maps
    4. Add this code to top of App.jsx: import { APIProvider, Map } from "@vis.gl/react-google-maps";
    5. In function App in the return section, add this code: <APIProvider apiKey={'Your API key here'} onLoad={() => console.log('Maps API has loaded.')}>
    6. Put <Map> Component inside the <APIProvider /> component. Add a style={{ width: "100%", height: "400px" }}
          defaultZoom={16}
          defaultCenter={{ lat: -33.83541999632124, lng: 148.68039995561773 }}
