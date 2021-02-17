import React from 'react';
import NavbarHeader from 'components/NavbarHeader';
import Box from '@material-ui/core/Box';
import AppContainer from 'components/AppContainer';

export class AuthPage extends React.PureComponent {
  GetPage(props) {
    const { t, router, Component } = props;

    return (
      <Box display="flex" flexDirection="column" height="100%">
        <NavbarHeader router={router} />
        <AppContainer router={router} fullWidth={router.route === '/'}>
          <Component t={t} router={router} />
        </AppContainer>
      </Box>
    );
  }
}
