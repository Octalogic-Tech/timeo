import React, { useState, useEffect } from 'react';

// Redux
import { useSelector } from 'react-redux'
import { getBaseTimezone, getTrackedTimezones } from './redux/selectors/dataSelectors'

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

// To share array of timezones to the modal
export const TimezonesContext = React.createContext();

export const timeOffsetContext = React.createContext();

const theme = createMuiTheme(themeConfig);

function App() {
  const base = useSelector(getBaseTimezone);
  const tracked = useSelector(getTrackedTimezones);

  // Array of all timezones supported by the API
  const [timezones, setTimezones] = useState([]);

  // For change in time/date tracking
  const [offset, setOffset] = useState(0);

  // Fetch array of timezones
  useEffect(function fetchTimezones() {
    fetch("https://worldtimeapi.org/api/timezone")
      .then(res => res.json())
      .then(data => {
        setTimezones(data);
      })
      .catch(error => console.error(error));
  }, []);

  // Whenever base timezone change, save to local storage
  useEffect(function saveBaseTimezone() {
    localStorage.setItem('baseTimezone', JSON.stringify(base));
  }, [base]);

  // Whenever tracked timezones change, save to local storage
  useEffect(function saveTrackedTimezones() {
    localStorage.setItem('trackedTimezones', JSON.stringify(tracked));
  }, [tracked]);

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

        <TimezonesContext.Provider value={timezones}>
          <timeOffsetContext.Provider value={[offset, setOffset]}>
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
          </timeOffsetContext.Provider>
        </TimezonesContext.Provider>
      </Box>

    </ThemeProvider>
  );
}

export default App;
