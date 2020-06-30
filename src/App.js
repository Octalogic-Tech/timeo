import React, { useState } from 'react';
import './App.css';

import Navbar from './components/Navbar'

// MUI
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#ffffff'
    },
    secondary: {
      main: '#F961A7',
    },
  },
});
function App() {
  const [twentyFoHourFormat, setTwentyFoHourFormat] = useState(false);
  // const [baseTimezone, setBaseTimeZone] = useState();
  // const [trackedTimezones, setTrackedTimeZones] = useState([]);

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Navbar
          twentyFoHourFormat={twentyFoHourFormat}
          setTwentyFoHourFormat={setTwentyFoHourFormat}
        />
        <Box pt={9}>
          <Container >
            <Typography variant="h2">
              Timeo
        </Typography>
          </Container>
        </Box>
      </ThemeProvider>
    </div>
  );
}

export default App;
