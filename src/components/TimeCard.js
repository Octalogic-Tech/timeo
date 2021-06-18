import React, { useState, useEffect } from "react";
import { getAllInfoByISO } from "iso-country-currency";
// Redux
import { useSelector, useDispatch } from "react-redux";

// Redux Actions
import {
  removeTrackedTimezone,
  setOffset,
  setShareOffset,
} from "../redux/actions/dataActions";

// Redux Selectors
import { getTimeFormat } from "../redux/selectors/uiSelectors";
import {
  getOffset,
  getShareOffset,
  getTimezones,
} from "../redux/selectors/dataSelectors";

// MUI
import { DateTimePicker } from "@material-ui/pickers";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import ClearIcon from "@material-ui/icons/Clear";
import moment from "moment";
import momentTZ from "moment-timezone";
import accurateInterval from "accurate-interval";
import { makeStyles } from "@material-ui/core";

// Components
import UpdateModal from "./UpdateModal";

// Packages

const formatTitle = (tz) => {
  if (tz) {
    // Splits timezone string
    let title = tz.split("/");
    // Get last word - the location
    title = title[title.length - 1];
    // If location is more than 1 word, format
    title = title.split("_").join(" ");
    return title;
  }

  return "";
};

const TimeCard = ({ timezone, base, TCId, reset, setReset }) => {
  // Style Hook
  const useStyles = makeStyles((theme) => ({
    cardStyle: {
      boxShadow: "3px 3px 35px rgba(0, 0, 0, 0.5)",
      borderRadius: "20px",
    },
    removeCard: {
      cursor: "pointer",
      "&:hover": {
        color: "red",
      },
    },
  }));

  // console.log(countryToISO("america"));

  const classes = useStyles();
  // States
  const [open, setOpen] = useState(false);
  const [country, setCountry] = useState([]);

  const [abbreviation, setAbbreviation] = useState(
    momentTZ.tz(timezone).zoneAbbr()
  ); //For UI
  const [utcOffset, setUtcOffset] = useState(momentTZ.tz(timezone).format("Z")); //For UI
  const [time, setTime] = useState(momentTZ.tz(timezone)); //For Time calculation

  const offset = useSelector(getOffset);
  const AM_PM = useSelector(getTimeFormat);
  const shareOffset = useSelector(getShareOffset);
  const allTimezones = useSelector(getTimezones);
  const dispatch = useDispatch();

  // The name of the place
  let title = formatTitle(timezone);
  let night = false;
  let cardStyles = {};
  let borderStyle = { borderRight: "1px solid #000" };

  // Check if night time
  if (time.get("hour") >= 18 || time.get("hour") <= 5) {
    night = true;
    cardStyles.backgroundColor = "#343434";
    cardStyles.color = "#fff";
    borderStyle.borderRight = "1px solid #fff";
  }

  const matches = useMediaQuery("(max-width:600px)");
  if (matches) {
    borderStyle = {};
  }

  const updateTime = (value) => {
    let diff = value.diff(time);
    dispatch(setOffset(diff));
    dispatch(setShareOffset(shareOffset + diff));
    setReset(true);
    // Didnt update value here as it would
    // effectively update time twice
  };

  // Country code
  useEffect(() => {
    const getCountries = allTimezones.filter((obj) => obj.name === timezone);
    const countryData = getCountries.map((item) => {
      const countryInfo = getAllInfoByISO(item.data.country);
      return countryInfo;
    });
    setCountry(countryData);
  }, [allTimezones, timezone, country.length]);

  // Exchange Rate
  // let accessKey = process.env.REACT_APP_CURRENCY_AP_API_KEY;
  // useEffect(() => {
  //   const baseCountry = allTimezones.filter((obj) => obj.name === baseTime);
  //   const baseCountryCode = baseCountry[0].data.country;
  //   const fetchCurrency = async () => {
  //     country.map((item)=>{
  //     const data = await axios.get(
  //       `https://www.alphavantage.co/query?function=FX_WEEKLY&from_symbol=${baseCountryCode}&to_symbol=${country}&apikey=${accessKey}`
  //     );
  //     console.log(data);
  //   };
  //   fetchCurrency();
  // }, [accessKey, allTimezones, baseTime, country]);

  // Updated Time
  useEffect(
    function updateTimeWithOffset() {
      let newTime = time.add(offset, "ms");
      setTime(newTime);
      // Incase of re-renders
      dispatch(setOffset(0));
    },
    [offset, time, dispatch]
  );

  // Auto update time
  useEffect(
    function updateTimeEveryMinute() {
      if (!reset) {
        const interval = accurateInterval(() => {
          let updatedTime = moment(time.add(1, "m"));
          setTime(updatedTime);
        }, 60000);
        return () => interval.clear();
      }
    },
    [reset, time]
  );

  // Update time card once timezone changes
  useEffect(
    function updateTimeCard() {
      setTime(momentTZ.tz(timezone));
      setAbbreviation(momentTZ.tz(timezone).zoneAbbr());
      setUtcOffset(momentTZ.tz(timezone).format("Z"));
    },
    [timezone]
  );

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Remove Card
  const removeCardHandler = (id) => {
    dispatch(removeTrackedTimezone(id));
  };

  return (
    <Card style={cardStyles} className={classes.cardStyle}>
      <CardContent>
        <Grid container align="center">
          <Grid item xs={12} sm={6} onClick={handleOpen} style={borderStyle}>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              height={1}
            >
              <Typography variant={base ? "h4" : "h5"}>
                {title || "UTC"}
              </Typography>

              <Typography variant="body1" component="p">
                {abbreviation || "UTC"}
              </Typography>

              <Typography
                color={night ? "inherit" : "textSecondary"}
                variant="body2"
                component="p"
              >
                UTC {utcOffset || "Loading"}
              </Typography>
              {country.map((item, index) => (
                <Typography variant="body1" component="p" key={index}>
                  {item.currency || "N/A"}
                </Typography>
              ))}
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            container
            direction="row"
            alignItems="center"
            justify="space-around"
          >
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              flexGrow={1}
              height={1}
              p={3}
            >
              <DateTimePicker
                value={time}
                onChange={updateTime}
                ampm={!AM_PM}
                format={!AM_PM ? "hh:mm A" : "HH:mm"}
                TextFieldComponent={TimeTextField}
              />

              <br />
              <DateTimePicker
                value={time}
                onChange={updateTime}
                ampm={!AM_PM}
                format="Do MMMM YYYY"
                TextFieldComponent={DateTextField}
              />
            </Box>
            <ClearIcon
              className={classes.removeCard}
              onClick={() => removeCardHandler(TCId)}
            />
          </Grid>
        </Grid>
      </CardContent>

      <UpdateModal
        open={open}
        handleOpen={handleOpen}
        handleClose={handleClose}
        TCId={TCId}
        base={base}
      />
    </Card>
  );
};

const TimeTextField = function (props) {
  return (
    <Typography
      onClick={props.onClick} // do not override
      id={props.id} // do not override
      disabled={props.disabled} // do not override
      {...props.inputProps} // do not override
      variant="h4"
    >
      {props.value}
    </Typography>
  );
};

const DateTextField = function (props) {
  return (
    <Typography
      onClick={props.onClick} // do not override
      id={props.id} // do not override
      disabled={props.disabled} // do not override
      {...props.inputProps} // do not override
      variant="body1"
    >
      {props.value}
    </Typography>
  );
};

export default TimeCard;
