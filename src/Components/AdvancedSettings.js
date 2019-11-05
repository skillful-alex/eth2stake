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
        <ExpansionPanel onChange={
          (event, expanded) => {
            window.gtag('event', 'expansion', {
              'event_category': 'calc',
              'event_label': 'AdvancedSettings',
            });} 
          }>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1c-content"
              id="panel1c-header"
            >
                Advanced settings
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
            <Grid container spacing={2}>
              <Grid container item direction="column" xs={4}>
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
              <Grid container item direction="column" xs={4}>
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
              <TextField 
                  label="Total Uptime"
                  name="totalUptime"
                  value={this.props.totalUptime }
                  onChange={this.onChange} />
              <TextField 
                  label="Total ETH Staked"
                  name="ΞTotalETHStaked"
                  value={this.props.ΞTotalETHStaked }
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
    totalUptime: state.calc.totalUptime,
    ΞTotalETHStaked: state.calc.ΞTotalETHStaked,
  };
}

export default connect(mapStateToProps)(AdvancedSettings);