import React from 'react';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import {SnackbarProvider} from 'notistack';
import {BrowserRouter as Router} from 'react-router-dom';
import {ThemeProvider} from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';

import './config/ReactotronCofing';

import Routes from './routes';
import {store, persistor} from './store';
import {defaultMuiTheme} from './theme';

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ThemeProvider theme={defaultMuiTheme}>
          <CssBaseline />
          <SnackbarProvider
            maxSnack={3}
            autoHideDuration={5000}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            preventDuplicate>
            <Router>
              <Routes />
            </Router>
          </SnackbarProvider>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
