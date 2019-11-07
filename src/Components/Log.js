import React from 'react';
import { connect } from 'react-redux';
import {ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

class Log extends React.Component {
  logLine(item, index) {
    return <li key={index+item}>{item}</li>
  }
  render() {
    return (
      <ExpansionPanel onChange={
        (event, expanded) => {
          window.gtag('event', 'expansion', {
            'event_category': 'calc',
            'event_label': 'Log',
          });} 
        }>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1c-content"
          id="panel1c-header"
        >
          Calculation log
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <ol style={{ listStyleType: "decimal-leading-zero" }}>{this.props.log.split('\n').map(this.logLine)}</ol>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
}

function mapStateToProps(state) {
  return {
    log: state.calc.log,
  };
}

export default connect(mapStateToProps)(Log);
