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
|Frontend |	[U.S. GSA Web Design Standards (GSA/18F)](https://playbook.cio.gov/designstandards/),  [SuperAgent.js](https://github.com/visionmedia/superagent), [ReactJS](http://facebook.github.io/react/), [Flux](https://facebook.github.io/flux/), [Babel](https://babeljs.io/), [ECMAScript 6](http://www.ecma-international.org/ecma-262/6.0/index.html), [Webpack Module Bundler](http://webpack.github.io/)|
|Backend	| [Node.js](https://nodejs.org/en/), [Express](http://expressjs.com/)
|Data Set and API |	[EPA Enforcement Compliance History Online (ECHO) Air Facility System (AFS)](http://echo.epa.gov/resources/echo-data/about-the-data#sources), [EPA Air Trends data API](http://aqsdr1.epa.gov/aqsweb/aqstmp/airdata/download_files.html)|
|Data Visualization |	[D3.js (Charts)](http://d3js.org/), [Leaflet.js (Map)](http://leafletjs.com/)|
|Full Stack PaaS	| [Heroku PaaS platform for deployment](https://www.heroku.com/), [GitHub](https://github.com/Eastern-Research-Group/epa-digital-services-rfi-js), [CircleCI (continuous rapid build, integration and deployment)](https://circleci.com/)|
|Tools | [Trello board](https://trello.com/), [InVision cloud](http://www.invisionapp.com/),  Skype for Business, Office 365 cloud, Photoshop, Illustrator, Git, Vagrant, Sublime Text, Vim, LiveReload, Atom|
|DevOps |[Trello board for managing agile process](https://trello.com/b/qOqfT4hH/epa-digital-services-rfi), [InVision cloud for collaboration design](https://invis.io/YK5CFVC5D), Git for version control, GitHub for repository hosting, CircleCI and Asset Pipeline integrated with Github.com for continuous rapid build and integration, [Heroku auto-deployment with integration of Github.com for the final production deployment](https://epa-ds-rfi.herokuapp.com/). Also: [User personas](https://trello.com/c/0VgCKmiy), [Initial design wireframes](https://trello.com/c/vRYly6qV)|

## ERG Agile Approach

*	Conducted an initial brainstorming meeting for sketching out the product vision, identifying user needs, identifying data sources, and establishing team roles, responsibilities, and schedule.
*	Utilized Trello as a virtual Scrum board (e.g., backlogs, sprints, icebox, in progress, and completed tasks) to focus daily standups and track the overall project. Smaller breakout meetings covered more detailed topics.
*	Maintained project code and related assets in GitHub repository for version control, transparency of builds, issue tracking.
*	Utilized user-centered design keyed to iterative development of user personas (i.e., user stories/use cases) based on the refined product vision and informed by interviews with subject-matter experts. Used InVision cloud  for interactive design collaboration.
*	Iterated initial interface mockup to simplify design and increase flexibility as user stories grew more focused during interviews and testing. Adhered to U.S. Web Design Standards.  
*	Developed product using sprint-based iterations of prototype, each ‘released’ for usability testing against user stories/use cases and then refined in later sprints.

![alt text](https://github.com/Eastern-Research-Group/epa-digital-services-rfi-js/blob/master/progression.png "ERG Agile Process and Methodology")
