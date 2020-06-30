import React, { useState, useEffect } from 'react';
import './App.css';

import Navbar from './components/Navbar'
import TimeCard from './components/TimeCard'

// MUI
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import MomentUtils from '@date-io/moment';
import {
  DateTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

// To share array of timezones to the modal
export const TimezonesContext = React.createContext();
// To toggle the time format
export const TimeFormatContext = React.createContext();

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#34CCB2',
      contrastText: '#fff'
    },
    secondary: {
      main: '#F961A7',
    },
  },
});

function App() {
  // No functionality yet
  const [twentyFoHourFormat, setTwentyFoHourFormat] = useState(false);

  // Can only update base for now 
  const [base, setBase] = useState('Asia/Kolkata');

  // Cannot update properly yet
  const [tracked, setTracked] = useState(['America/Los_Angeles', 'Europe/Amsterdam', 'Asia/Hong_Kong']);

  const [timezones, setTimezones] = useState([]);
  // console.log("Time zones", timezones);

  useEffect(function fetchTimezones() {
    fetch("http://worldtimeapi.org/api/timezone")
      .then(res => res.json())
      .then(data => {
        setTimezones(data);
      })
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Navbar
          twentyFoHourFormat={twentyFoHourFormat}
          setTwentyFoHourFormat={setTwentyFoHourFormat}
        />
        <Box pt={10} style={{ backgroundColor: '#eee', height: '100vh' }}>
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
                      {tracked.map((item, index) => (
                        <Grid item xs={12} md={6} key={index}>
                          <TimeCard
                            timezone={item}
                          // Need to implement
                          // updateTimezone={setTracked}
                          />
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                  <Fab
                    style={{
                      margin: 0,
                      top: 'auto',
                      right: 30,
                      bottom: 40,
                      left: 'auto',
                      position: 'fixed',
                    }}
                    color="secondary"
                    aria-label="Add Timezone">
                    <AddIcon />
                  </Fab>
                </Container>
              </MuiPickersUtilsProvider>
            </TimeFormatContext.Provider>
          </TimezonesContext.Provider>
        </Box>
      </ThemeProvider>
    </div>
  );
}

export default App;
