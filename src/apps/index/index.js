import React from 'react';
import ReactDom from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ModuleVersionTableList from './components/ModuleVersionTableList';
import ModuleVersionHeader from './components/ModuleVersionHeader';

import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

const App = () => (
    <div>
        <MuiThemeProvider>
            <ModuleVersionHeader/>
        </MuiThemeProvider>
        <MuiThemeProvider>
            <ModuleVersionTableList/>
        </MuiThemeProvider>
    </div>
)

ReactDom.render(
    <App/>,
    document.getElementById('root')
)
