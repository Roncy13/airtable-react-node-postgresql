import React from 'react';

import { Provider } from 'react-redux';
import Head from 'next/head';
import App from 'next/app';
import Box from '@material-ui/core/Box';

import withReduxStore from 'utils/with-redux-store';
import { appWithTranslation } from 'utils/with-i18next';
import { PersistGate } from 'redux-persist/integration/react';
import { useRouter } from 'next/router';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';

import './styles.css';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
import 'fontsource-metropolis';
import '@typefaces-pack/typeface-inter';
import { blue } from '@material-ui/core/colors';
import ReduxToastr from 'react-redux-toastr';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: blue[500],
    },
    secondary: {
      main: green[500],
      contrastText: '#fff',
    },
  },
});

class Srr extends App {
  componentWillUnmount() {
    this.router = useRouter();
  }

  render() {
    const { Component, pageProps, reduxStore, router } = this.props;
    return (
      <React.StrictMode>
        <Head>
          <title>CSV TEST EXAM</title>
        </Head>

        <Provider store={reduxStore}>
          <PersistGate persistor={reduxStore.__PERSISTOR} loading={null}>
            <ReduxToastr
              timeOut={4000}
              newestOnTop={false}
              preventDuplicates
              position="top-right"
              getState={state => state.toastr} // This is the default
              transitionIn="fadeIn"
              transitionOut="fadeOut"
              progressBar
              closeOnToastrClick
            />
            <Box height="100%">
              <ThemeProvider theme={theme}>
                <Component {...pageProps} router={router} />
              </ThemeProvider>
            </Box>
          </PersistGate>
        </Provider>
      </React.StrictMode>
    );
  }
}

export default appWithTranslation(withReduxStore(Srr));
