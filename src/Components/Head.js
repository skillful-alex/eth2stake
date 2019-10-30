import React from 'react';
import {AppBar, Toolbar, Typography} from '@material-ui/core'
import GitHubForkRibbon from 'react-github-fork-ribbon';

class Head extends React.Component {
    render() {
        return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6">
                        Calculation of the Potential Profitability of Ethereum 2.0 Staking
                    </Typography>
                </Toolbar>
            </AppBar>
            <GitHubForkRibbon position="right" 
                color="green"
                href="//github.com/skillful-alex/eth2stake"
                target="_blank" > 
                    Fork me on GitHub 
            </GitHubForkRibbon> 
        </div>
      );
    }
  }

export default Head;
