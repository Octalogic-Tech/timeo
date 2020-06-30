import React, { useState, useEffect, useContext } from 'react'

import { DateTimePicker } from '@material-ui/pickers';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import UpdateModal from './UpdateModal';
import { TimeFormatContext } from '../App'

const convertTime = tz => {
  let time = new Date().toLocaleString("en-US", { timeZone: tz });
  // let localTime = (new Date(time)).toLocaleString();
  return time;
}

const TimeCard = ({ timezone, updateTimezone, base }) => {
  // For modal toggle
  const [open, setOpen] = useState(false);

  const [abbreviation, setAbbreviation] = useState('');
  const [utcOffset, setUtcOffset] = useState('');
  const [time, setTime] = useState(convertTime(timezone));

  const AM_PM = useContext(TimeFormatContext);

  // The name of the place
  let title = timezone.split('/');
  title = title[title.length - 1];
  title = title.split('_').join(' ');

  let night = false;
  const cardStyles = {};

  // Check if night time
  let timeString = new Date(time).toLocaleTimeString();
  console.log("time: ", timeString);
  if (timeString >= "18:00:00" || timeString < "06:00:00") {
    night = true;
    cardStyles.backgroundColor = "#343434";
    cardStyles.color = "#fff";
  }

  useEffect(function getTimezoneDetails() {
    fetch(`http://worldtimeapi.org/api/timezone/${timezone}`)
      .then(res => res.json())
      .then(data => {
        // console.log("Fetched data", data);
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
              {title}
            </Typography>
            <Typography
              variant="body1"
              component="p"
            >
              {abbreviation}
            </Typography>
            <Typography
              color={night ? "inherit" : "textSecondary"}
              variant="body2"
              component="p"
            >
              UTC {utcOffset}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box display="flex" height={1} justifyContent="center" alignItems="center">
              <DateTimePicker
                style={{ color: '#fff' }}
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
