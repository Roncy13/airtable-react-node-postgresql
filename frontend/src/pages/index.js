import React from 'react';
import PropTypes from 'prop-types';

import Home from 'containers/Home';
import { withTranslation } from 'utils/with-i18next';
import { AuthPage } from 'utils/auth-page';

export class IndexPage extends AuthPage {
  render() {
    const { GetPage, props } = this;
    const Page = <GetPage {...props} Component={Home} />;

    return Page;
  }
}

IndexPage.propTypes = {
  t: PropTypes.func,
};

IndexPage.getInitialProps = async () => ({
  namespacesRequired: ['common', 'banner', 'features'],
});

export default withTranslation('common')(IndexPage);
