# EPA Digital Services RFI - ERG airMonitr

## Prototype
The publicly accessible prototype is hosted at https://epa-ds-rfi.herokuapp.com/

## Project Brief
The purpose of the application is to help industry participants in EPA’s Clean Air Markets programs, environmental researchers, and air quality advocacy groups see at-a-glance relationships between facility emissions of common air pollutants and ambient air quality. ERG’s resulting “airMonitr” prototype application is a mashup of EPA’s Air Markets Program data and EPA Air Trends data.

## Installation

```bash
git clone https://github.com/Eastern-Research-Group/epa-digital-services-rfi-js.git
cd epa-digital-services-rfi-js
npm install
npm start
open http://localhost:3000
```

Transforms are enabled for files inside `src` (except `index.js`).

## Technology Stack and DevOps
ERG team is well-versed in a broad, modern web framework and stack, agile development process, full stack deployment with Heroku Platform. For this quick turn-around RFI with MVP target, we have utilized the following technical stack, DevOps/PaaS and information architecture.

|Category	|Technology Stack|
|---------|-----------------|
|Frontend |	[U.S. GSA Web Design Standards (GSA/18F)](https://playbook.cio.gov/designstandards/),  [SuperAgent.js](https://github.com/visionmedia/superagent), [ReactJS](http://facebook.github.io/react/), Flux, [Babel](https://babeljs.io/), ECMAScript 6 (ES 6), [Webpack Module Bundler](http://webpack.github.io/)|
|Backend	| [Node.js](https://nodejs.org/en/), [Express](http://expressjs.com/)
|Data Set and API |	[EPA Enforcement Compliance History Online (ECHO) Air Facility System (AFS)](http://echo.epa.gov/resources/echo-data/about-the-data#sources) and [EPA Air Trends data API](http://aqsdr1.epa.gov/aqsweb/aqstmp/airdata/download_files.html)|
|Data Visualization |	[D3.js (Charts)](http://d3js.org/), [Leaflet.js (Map)](http://leafletjs.com/)|
|Full Stack PaaS	| [Heroku PaaS platform for deployment](https://www.heroku.com/), GitHub (Repository), [CircleCI (continuous rapid build, integration and deployment)](https://circleci.com/)|
|Prototype airMonitr | https://epa-ds-rfi.herokuapp.com/|

## ERG Agile Approach


Description

## License
