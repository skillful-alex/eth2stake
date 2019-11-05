import React from 'react';
import { connect } from 'react-redux';
import {TextField, Grid, InputAdornment} from '@material-ui/core'
import {InputLabel, Input} from '@material-ui/core'
import DollarFormat from './DollarFormat';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

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
            <div style={{ padding: 20 }}>
            <Grid container spacing={2}>
                <Grid container item direction="column" xs={4}>
                    <InputLabel htmlFor="standard-adornment-amount">How much are you willing to invest</InputLabel>
                    <TextField
                        name="$Invest"
                        value={this.props.$Invest }
                        onChange={this.onChange}
                        InputProps={{ inputComponent: DollarFormat }}
                    />
                </Grid>
                <Grid container item direction="column" xs={4}>
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
                <Grid container item direction="column" xs={4} alignItems="flex-end" justify="center">
                    <Card>
                        <CardActionArea onClick={() => { window.trackOutboundLink('https://t.me/eth2stake'); }}>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    Are you planning the staking?
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    Participate in <a href="https://t.me/eth2stake">@eth2stake</a>.
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
            </Grid>
            </div>
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
