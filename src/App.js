import React, { Component } from 'react';
import { LineGraph } from './assets/scripts/components/graph/LineGraph';
import './assets/styles/base.scss';
import { SAMPLE_DATA } from './assets/data/SAMPLE_DATA';
import { FacilityContainer } from './assets/scripts/components/Facilities/FacilityContainer';
import { FooSection } from './assets/scripts/components/Examples/FooSection';
import EchoWebAPIUtils from './assets/scripts/utils/EchoWebAPIUtils';

EchoWebAPIUtils.newFoo('Foo');
EchoWebAPIUtils.saveFoo('FooBar');
// EchoWebAPIUtils.removeFoo();

export class App extends Component {
  render() {
    return (
        <div>
            <FooSection />            
            <FacilityContainer /><br />
            <div id="line-graph-container"><LineGraph data={ SAMPLE_DATA } /></div>
        </div>
        
    );
  }
}