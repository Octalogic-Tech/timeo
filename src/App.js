import React, { useEffect } from 'react';

// Redux
import { useSelector, useDispatch } from 'react-redux'
import { getBaseTimezone, getTrackedTimezones } from './redux/selectors/dataSelectors'
import { fetchTimezones } from './redux/actions/dataActions'

import './App.css';

import themeConfig from './utils/theme'

// MUI
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
// import Typography from '@material-ui/core/Typography';

// For Date Picker
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

import Navbar from './components/Navbar'
import TimeCard from './components/TimeCard'
import AddTimezone from './components/AddTimezone'

const theme = createMuiTheme(themeConfig);

function App() {
  const base = useSelector(getBaseTimezone);
  const tracked = useSelector(getTrackedTimezones);
  const dispatch = useDispatch();

  // Fetch array of timezones
  useEffect(function fetchAllTimezones() {
    dispatch(fetchTimezones());
  }, [dispatch]);

  let trackedTimezones = tracked.map((item, index) => (
    <Grid item xs={12} md={6} key={index}>
      <TimeCard
        timezone={item.timezone}
        TCId={item.id}
      />
    </Grid>
  ));

  return (
    <ThemeProvider theme={theme}>
      <Box pt={10} className="container">
        <Navbar />

        <MuiPickersUtilsProvider utils={MomentUtils}>
          <Container>

            <TimeCard
              base={true}
              timezone={base}
            />

            <Box mt={4}>
              <Grid container spacing={6}>
                {trackedTimezones}
              </Grid>
            </Box>

            <AddTimezone />

          </Container>
        </MuiPickersUtilsProvider>
      </Box>

    </ThemeProvider>
  );
}

export default App;
