import { Grid, Typography } from '@material-ui/core';
import * as React from 'react';
import { WithI18n, withI18n } from 'react-i18next';

const logoIcp = require('./images/logo-icp.jpg');
const logoFsm = require('./images/logo-fsm.jpg');
const logoLp = require('./images/logo-lp.png');
const logoBlog = require('./images/logo-blog-celluloid.jpg');

export default withI18n()(({ t }: WithI18n) => (
  <div
    style={{
      padding: 48,
      maxWidth: 1024,
      margin: '0 auto'
    }}
  >
    <Typography variant="h2" gutterBottom={true}>
      {t('about.title')}
    </Typography>
    <Typography variant="subtitle1" gutterBottom={true}>
      {t('about.intro.prefix')}<b>Celluloid</b>{t('about.intro.suffix')}
    </Typography>
    <Typography variant="subtitle1" gutterBottom={true}>
      {t('about.support')}
    </Typography>
    <Typography variant="subtitle1" gutterBottom={true}>
      {t('about.opensource.prefix')}<a href="https://github.com/celluloid-camp/">{t('about.opensource.github')}</a>
    </Typography>
    <div
      style={{
        padding: 48,
        textAlign: 'center'
      }}
    >
      <Grid container={true} spacing={40} direction="row" justify="center">
        <Grid item={true}>
          <a href="https://www.icp.fr/" target="_blank">
            <img src={logoIcp} height="100px" alt="Institut Catholique de Paris" />
          </a>
        </Grid>
        <Grid item={true}>
          <a href="https://fondation-st-matthieu.org/" target="_blank">
            <img src={logoFsm} height="100px" alt="Fondation Saint-Matthieu" />
          </a>
        </Grid>
        <Grid item={true}>
          <a href="https://www.lapaillasse.org/" target="_blank">
            <img src={logoLp} height="100px" alt="La Paillasse" />
          </a>
        </Grid>
        <Grid item={true}>
          <a href="https://celluloid.hypotheses.org" target="_blank">
            <img src={logoBlog} height="100px" alt="Le blog Celluloid" />
          </a>
        </Grid>
      </Grid>
    </div>
  </div>
));
