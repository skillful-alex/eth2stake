import React from 'react';
import { connect } from 'react-redux';
import {TextField, Grid} from '@material-ui/core'
import {ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import * as calcInputActions from '../store/calcInputActions';
import DollarFormat from './DollarFormat';

class AdvancedSettings extends React.Component {
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
        <ExpansionPanel>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1c-content"
              id="panel1c-header"
            >
                Advanced settings
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
            <Grid container direction="column" spacing={2}>
              <Grid item xs={6}>
                <TextField 
                  label="Hardware Cost" 
                  name="$HardwareCost" 
                  value={this.props.$HardwareCost }                
                  onChange={this.onChange} InputProps={{ inputComponent: DollarFormat }} />
                <TextField 
                  label="Hardware Full Depreciation (years)"
                  name="yearHardwareFullDepreciation" 
                  value={this.props.yearHardwareFullDepreciation }
                  onChange={this.onChange} />
                <TextField 
                  label="ISP Cost (per month)"
                  name="$ISPCostPerMonth"
                  value={this.props.$ISPCostPerMonth }
                  onChange={this.onChange} InputProps={{ inputComponent: DollarFormat }} />
                <TextField 
                  label="Electricity Cost (per month per validator)"
                  name="$ElectricityCostPerMonthPerValidator"
                  value={this.props.$ElectricityCostPerMonthPerValidator }
                  onChange={this.onChange} InputProps={{ inputComponent: DollarFormat }} />
              </Grid>
              <Grid item xs={6}>
              <TextField 
                  label="ETH Price"
                  name="$ETHPrice"
                  value={this.props.$ETHPrice }
                  onChange={this.onChange} InputProps={{ inputComponent: DollarFormat }} />
              <TextField 
                  label="Validator Uptime"
                  name="validatorUptime"
                  value={this.props.validatorUptime }
                  onChange={this.onChange} />
              </Grid>
            </Grid>
            </ExpansionPanelDetails>
        </ExpansionPanel>
        );
    }
  }

function mapStateToProps(state) {
  return {
    $HardwareCost: state.calc.$HardwareCost,
    yearHardwareFullDepreciation: state.calc.yearHardwareFullDepreciation,
    $ISPCostPerMonth: state.calc.$ISPCostPerMonth,
    $ElectricityCostPerMonthPerValidator: state.calc.$ElectricityCostPerMonthPerValidator,
    $ETHPrice: state.calc.$ETHPrice,
    validatorUptime: state.calc.validatorUptime,
  };
}

export default connect(mapStateToProps)(AdvancedSettings);