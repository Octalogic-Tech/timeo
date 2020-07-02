import React, { useState, useEffect } from 'react';

// Redux
import { Provider } from 'react-redux';
import store from './redux/store';

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
  // Check if base timezone exists in local storage or use default
  const [base, setBase] = useState(
    JSON.parse(localStorage.getItem('baseTimezone')) || 'Asia/Kolkata'
  );

  // Check if tracked timezones exists in local storage or use default
  // Structure - [{id: 1, timezone: 'Asia/Kolkata'}]
  const [tracked, setTracked] = useState(
    JSON.parse(localStorage.getItem('trackedTimezones')) || []
  );

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
        updateTimezone={setTracked}
      />
    </Grid>
  ));

  return (
    <Provider store={store}>
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
                    updateTimezone={setBase}
                  />

                  <Box mt={4}>
                    <Grid container spacing={6}>
                      {trackedTimezones}
                    </Grid>
                  </Box>

                  <AddTimezone
                    setTracked={setTracked}
                  />

                </Container>
              </MuiPickersUtilsProvider>
            </timeOffsetContext.Provider>
          </TimezonesContext.Provider>
        </Box>

      </ThemeProvider>
    </Provider>
  );
}

export default App;
