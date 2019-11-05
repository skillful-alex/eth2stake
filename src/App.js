import React from 'react';
import {Grid} from '@material-ui/core'

import Head from './Components/Head';
import SimpleCalc from './Components/SimpleCalc';
import AdvancedSettings from './Components/AdvancedSettings';
import Log from './Components/Log';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';

class App extends React.Component {
  render() {
    return (
    <div className="App" text-align="center">
      <CssBaseline />
      <Head />
      <Container>
        <Grid container justify="center" direction="column" spacing={2}>
          <Grid item>    <SimpleCalc />          </Grid>
          <Grid item>    <AdvancedSettings />    </Grid>
          <Grid item>    <Log />                 </Grid>
        </Grid>
      </Container>
    </div>
    );
  }
}

export default App;
