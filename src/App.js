import React, { useEffect } from "react";

// Redux
import { useSelector, useDispatch } from "react-redux";

// Redux Selectors
import {
  getBaseTimezone,
  getTrackedTimezones,
} from "./redux/selectors/dataSelectors";

// Redux Actions
import {
  fetchTimezones,
  setBaseTimezone,
  setTrackedTimezones,
  setOffset,
  setShareOffset,
} from "./redux/actions/dataActions";

import "./App.css";

import themeConfig from "./utils/theme";

import { useLocation } from "react-router-dom";

// MUI
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
// import Typography from '@material-ui/core/Typography';

// For Date Picker
import MomentUtils from "@date-io/moment";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";

import Navbar from "./components/Navbar";
import TimeCard from "./components/TimeCard";
import AddTimezone from "./components/AddTimezone";

import { useState } from "react";
import SearchTimezone from "./components/SearchTimezone";

const theme = createMuiTheme(themeConfig);

// A custom hook that builds on useLocation to parse
// the query string for you.
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function App(props) {
  const [resetTimezone, setTimezone] = useState(false);
  const base = useSelector(getBaseTimezone);
  const tracked = useSelector(getTrackedTimezones);
  const dispatch = useDispatch();

  const baseParams = useQuery().get("base");
  const trackedParams = useQuery().get("tracked");
  const offsetParams = useQuery().get("offset");

  useEffect(
    function updateBaseViaParam() {
      if (baseParams) {
        console.log("BASE PARAM DETECTED: ", baseParams);
        dispatch(setBaseTimezone(baseParams));
      }
    },
    [baseParams, dispatch]
  );

  useEffect(
    function updateTrackedViaParams() {
      if (trackedParams) {
        console.log("TRACKED PARAM DETECTED: ", trackedParams);
        const trackedParamsAray = trackedParams.split(",");
        const trackedParamsToBeRendered = trackedParamsAray.map(
          (timezone, index) => ({ timezone, id: index + 1 })
        );
        dispatch(setTrackedTimezones(trackedParamsToBeRendered));
      }
    },
    [trackedParams, dispatch]
  );

  useEffect(
    function updateOffsetViaParam() {
      if (offsetParams) {
        console.log("OFFSET PARAM DETECTED: ", offsetParams);
        // Check if it's a number
        if (!isNaN(offsetParams)) {
          dispatch(setOffset(offsetParams));
          dispatch(setShareOffset(Number(offsetParams)));
        }
      }
    },
    [offsetParams, dispatch]
  );

  // Fetch array of timezones
  useEffect(
    function fetchAllTimezones() {
      dispatch(fetchTimezones());
    },
    [dispatch]
  );

  let trackedTimezones = tracked.map((item, index) => (
    <Grid item xs={12} md={6} key={index}>
      <TimeCard
        timezone={item.timezone}
        TCId={item.id}
        reset={resetTimezone}
        setReset={setTimezone}
        country={item.timezone.split("/")}
      />
    </Grid>
  ));

  return (
    <ThemeProvider theme={theme}>
      <Box pt={10} className="container">
        <Navbar reset={resetTimezone} setReset={setTimezone} timezone={base} />
        <SearchTimezone />
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <Container>
            <TimeCard
              base={true}
              timezone={base}
              reset={resetTimezone}
              setReset={setTimezone}
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
