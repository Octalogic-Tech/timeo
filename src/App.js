import React, { useState, useEffect } from 'react';
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
// To toggle the time format
export const TimeFormatContext = React.createContext();

const theme = createMuiTheme(themeConfig);

function App() {
  // No functionality yet
  const [twentyFoHourFormat, setTwentyFoHourFormat] = useState(false);

  // Can only update base for now 
  const [base, setBase] = useState('Asia/Kolkata');

  // Cannot update properly yet
  const [tracked, setTracked] = useState([
    'America/Los_Angeles',
    'Europe/Amsterdam',
    'Asia/Hong_Kong'
  ]);

  const [timezones, setTimezones] = useState([]);

  useEffect(function fetchTimezones() {
    fetch("https://worldtimeapi.org/api/timezone")
      .then(res => res.json())
      .then(data => {
        setTimezones(data);
      })
      .catch(error => console.error(error));
  }, []);

  let trackedTimezones = tracked.map((item, index) => (
    <Grid item xs={12} md={6} key={index}>
      <TimeCard
        timezone={item}
        // Need to implement
        updateTimezone={setBase}
      />
    </Grid>
  ));

  return (
    <ThemeProvider theme={theme}>
      <Box pt={10} className="container">
        <Navbar
          twentyFoHourFormat={twentyFoHourFormat}
          setTwentyFoHourFormat={setTwentyFoHourFormat}
        />

        <TimezonesContext.Provider value={timezones}>
          <TimeFormatContext.Provider value={twentyFoHourFormat}>
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
          </TimeFormatContext.Provider>
        </TimezonesContext.Provider>
      </Box>

    </ThemeProvider>
  );
}

export default App;
