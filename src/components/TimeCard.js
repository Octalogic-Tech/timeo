import React, { useState, useContext, useEffect } from 'react'

import { DateTimePicker } from '@material-ui/pickers';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

// For Modal
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

import { TimezonesContext } from '../App'

const convertTime = tz => {
  let time = new Date().toLocaleString("en-US", { timeZone: tz });
  // let localTime = (new Date(time)).toLocaleString();
  return time;
}

const TimeCard = ({ timezone, updateTimezone, base }) => {
  const [open, setOpen] = useState(false);

  const [abbreviation, setAbbreviation] = useState('');
  const [utcOffset, setUtcOffset] = useState('');
  const [textfieldValue, setTextfieldValue] = useState('');
  let night = false;
  // console.log("teectxt ", textfieldValue)

  const cardStyles = {};

  let time = convertTime(timezone);
  let timeString = new Date(time).toLocaleTimeString();

  // Check if night time
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

  const onTimezoneChange = (event, values) => {
    setTextfieldValue(values);
  }

  const allTimezones = useContext(TimezonesContext);

  const body = (
    <Card style={{
      backgroundColor: '#fff',
      maxWidth: '400px',
      padding: '1rem',
      position: 'absolute',
      top: `50%`,
      left: `50%`,
      transform: `translate(-50%, -50%)`,
      border: '2px solid #fff',
      outline: 'none'
    }}>
      <CardContent>
        <Typography variant="h6">
          Add a location
        </Typography>
        <br />
        <Typography variant="body1">
          Start typing the name of the city whose
          timezone you would like to add
        </Typography>
        <Autocomplete
          id="combo-box-demo"
          options={allTimezones}
          getOptionLabel={(option) => option}
          style={{ width: 300 }}
          onChange={onTimezoneChange}
          renderInput={(params) => <TextField {...params} label="City Name" />}
        />
        <Box display="flex" justifyContent="space-between">
          <Button color="secondary" disabled={base}>
            DELETE
          </Button>
          <div>
            <Button
              style={{ color: 'grey' }}
              onClick={handleClose}
            >
              CANCEL
            </Button>
            <Button
              color="primary"
              onClick={() => { updateTimezone(textfieldValue); handleClose(); }}
            >
              UPDATE
            </Button>
          </div>
        </Box>
      </CardContent>
    </Card>
  );


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
              variant="h4"
            >
              {timezone}
            </Typography>
            <Typography
              variant="body1"
              component="p"
            >
              {abbreviation}
            </Typography>
            <Typography
              color={night ? "" : "textSecondary"}
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
              // onChange={onChange}
              />
            </Box>
          </Grid>
        </Grid>
      </CardContent>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="Update Timezone"
        aria-describedby="Modal to update the selected timezone card"
      >
        {body}
      </Modal>
    </Card>
  )
}

export default TimeCard
