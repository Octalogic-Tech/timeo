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

// For Date Picker
import MomentUtils from "@date-io/moment";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";

import Navbar from "./components/Navbar";
import TimeCard from "./components/TimeCard";
import AddTimezone from "./components/AddTimezone";

import { useState } from "react";
import SearchTimezone from "./components/SearchTimezone";
import axios from "axios";
import { getCountry } from "countries-and-timezones";

const theme = createMuiTheme(themeConfig);

// A custom hook that builds on useLocation to parse
// the query string for you.
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function App(props) {
  // States
  const [resetTimezone, setTimezone] = useState(false);
  const [lat, setLat] = useState();
  const [lng, setLng] = useState();
  const [baseLoc, setBaseLoc] = useState("");

  const base = useSelector(getBaseTimezone);
  const tracked = useSelector(getTrackedTimezones);
  const dispatch = useDispatch();

  const baseParams = useQuery().get("base");
  const trackedParams = useQuery().get("tracked");
  const offsetParams = useQuery().get("offset");
  // Geolocation
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition((position) => {
        setLat(position.coords.latitude);
        setLng(position.coords.longitude);
        console.log(position.coords.latitude);
      });
    } else {
      console.log("Not Available");
    }
    const latlng = lat + "," + lng;
    if (lat !== undefined && lng !== undefined) {
      const reverseGeo = async () => {
        const location = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json`,
          {
            params: {
              latlng: latlng,
              key: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
            },
          }
        );

        if (location) {
          const components = location.data.results[0].address_components;
          const filterData = components.filter((e) => e.types[0] === "country");
          const countryCode = filterData[0].short_name;
          const countryTimezone = getCountry(countryCode);
          setBaseLoc(countryTimezone.timezones[0]);
        }
      };
      reverseGeo();
    }
    //Reverse geocoding
  }, [lat, lng]);

  useEffect(
    function updateBaseViaParam() {
      if (baseParams) {
        console.log("BASE PARAM DETECTED: ", baseParams);
        dispatch(setBaseTimezone(baseLoc));
      }
    },
    [baseLoc, dispatch, baseParams]
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
              TCId={0}
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
