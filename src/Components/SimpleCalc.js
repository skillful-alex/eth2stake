import React from 'react';
import { connect } from 'react-redux';
import {TextField, Grid, InputAdornment} from '@material-ui/core'
import {InputLabel, Input} from '@material-ui/core'
import DollarFormat from './DollarFormat';

import * as calcInputActions from '../store/calcInputActions';

class SimpleCalc extends React.Component {
    constructor(){  
        super();
        this.onChange = this.onChange.bind(this);
    }

    onChange(event) {
        this.props.dispatch(
            calcInputActions.onChangedByUser(event.target.name, event.target.value)
        );
    }
  
    render() {
        return (
            <Grid container justify="space-evenly" alignItems="center">
                <Grid item>
                    <InputLabel htmlFor="standard-adornment-amount">How much are you willing to invest</InputLabel>
                    <TextField
                        name="$Invest"
                        value={this.props.$Invest }
                        onChange={this.onChange}
                        InputProps={{ inputComponent: DollarFormat }}
                    />
                </Grid>
                <Grid item>
                    <Grid container direction="column">
                        <InputLabel>Investment interest</InputLabel>
                        <TextField 
                            readOnly={true}
                            value={ this.props.$AnnualIncome }
                            InputProps={{ inputComponent: DollarFormat }}
                            />
                        <Input 
                            readOnly={true}
                            value={ Math.round(10000*this.props.$AnnualIncome / this.props.$Invest)/100 }
                            startAdornment={<InputAdornment position="start">%</InputAdornment>}
                        />
                    </Grid>
                </Grid>
            </Grid>
      );
    }
  }

function mapStateToProps(state) {
    return {
        $Invest: state.calc.$Invest,
        $AnnualIncome: state.calc.$AnnualIncome,
    };
}

export default connect(mapStateToProps)(SimpleCalc);
