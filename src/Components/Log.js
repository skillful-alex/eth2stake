import React from 'react';
import { connect } from 'react-redux';
import {TextField, Grid} from '@material-ui/core'
import {Typography} from '@material-ui/core'

class Log extends React.Component {
  render() {
    return (
      <Grid container direction="column">
        <Typography variant="h6">Calculation log:</Typography>
        <TextField fullWidth multiline value={this.props.log} />
      </Grid>
    );
  }
}

function mapStateToProps(state) {
  return {
    log: state.calc.log,
  };
}

export default connect(mapStateToProps)(Log);
