import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link } from 'react-router';

import { App } from './App';
import { Splash } from './Splash';
import { FacilityList } from './FacilityList';

// render(<App />, document.getElementById('root'));

render((
    <Router>
        <Route path="/" component={Splash} />
        <Route path="facility" component={App}>
            <Route path=":id" component={App} />
        </Route>
        <Route path="list" component={FacilityList} />
    </Router>
), document.getElementById('root'));