import React from 'react';
import {Grid} from '@material-ui/core'

import Head from './Components/Head';
import SimpleCalc from './Components/SimpleCalc';
import AdvancedSettings from './Components/AdvancedSettings';
import Log from './Components/Log';

class App extends React.Component {
  constructor(){  
      super();  
  }  
    
  render() {
    return (
    <div className="App">
      <Head />

      <Grid container justify="center">
        <SimpleCalc />
        <AdvancedSettings />
        <Log />
      </Grid>
    </div>
    );
  }
}

export default App;
