import React from 'react';
import { connect } from 'react-redux';
import {ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { LazyLog } from 'react-lazylog';

class Log extends React.Component {
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
          <LazyLog text={this.props.log} height={200} selectableLines={true} url="about:blank"/>
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
