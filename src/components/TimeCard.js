import React, { useState, useEffect, useContext } from 'react'

// MUI
import { DateTimePicker } from '@material-ui/pickers';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import UpdateModal from './UpdateModal';

// Context for AM/PM toggle
import { TimeFormatContext } from '../App'

const convertTime = tz => {
  let time = new Date().toLocaleString("en-US", { timeZone: tz });
  // let localTime = (new Date(time)).toLocaleString();
  return time;
}

const formatTitle = tz => {
  // Splits timezone string
  let title = tz.split('/');
  // Get last word - the location
  title = title[title.length - 1];
  // If location is more than 1 word, format
  title = title.split('_').join(' ');
  return title;
}

const TimeCard = ({ timezone, updateTimezone, base }) => {
  // For modal toggle
  const [open, setOpen] = useState(false);

  const [abbreviation, setAbbreviation] = useState('');
  const [utcOffset, setUtcOffset] = useState('');
  const [time, setTime] = useState(convertTime(timezone));

  const AM_PM = useContext(TimeFormatContext);

  // The name of the place
  let title = formatTitle(timezone);

  let night = false;
  const cardStyles = {};

  // Check if night time
  let timeString = new Date(time).toLocaleTimeString();
  // console.log("time: ", timeString);
  if (timeString >= "18:00:00" || timeString < "06:00:00") {
    night = true;
    cardStyles.backgroundColor = "#343434";
    cardStyles.color = "#fff";
  }

  useEffect(function getTimezoneDetails() {
    fetch(`https://worldtimeapi.org/api/timezone/${timezone}`)
      .then(res => res.json())
      .then(data => {
        setAbbreviation(data.abbreviation)
        setUtcOffset(data.utc_offset);
      })
      .catch(err => console.error(err));
  }, [timezone])

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Card style={cardStyles}>
      <CardContent>
        <Grid container align="center">
          <Grid item xs={12} sm={6}
            onClick={handleOpen}
            style={{
              borderRight: '1px solid black',
              ':hover': {
                cursor: 'pointer'
              }
            }}>
            <Typography
              variant={base ? "h5" : "h6"}
            >
              {title || "Loading"}
            </Typography>
            <Typography
              variant="body1"
              component="p"
            >
              {abbreviation || "Loading"}
            </Typography>
            <Typography
              color={night ? "inherit" : "textSecondary"}
              variant="body2"
              component="p"
            >
              UTC {utcOffset || "Loading"}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height={1}
              p={3}
            >
              <DateTimePicker
                value={new Date(time)}
                onChange={setTime}
                ampm={!AM_PM}
              />
            </Box>
          </Grid>
        </Grid>
      </CardContent>

      <UpdateModal
        open={open}
        handleOpen={handleOpen}
        handleClose={handleClose}
        updateTimezone={updateTimezone}
        base={base}
      />
    </Card>
  )
}

export default TimeCard
