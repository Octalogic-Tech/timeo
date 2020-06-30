import React, { useState, useContext } from 'react'

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

const TimeCard = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
          renderInput={(params) => <TextField {...params} label="City Name" />}
        />
        <Box display="flex" justifyContent="space-between">
          <Button color="secondary">DELETE</Button>
          <div>
            <Button style={{ color: 'grey' }}>CANCEL</Button>
            <Button color="primary">UPDATE</Button>
          </div>
        </Box>
      </CardContent>
    </Card>
  );


  return (
    <Card >
      <CardContent>
        <Grid container align="center">
          <Grid item xs={12} sm={6}
            onClick={handleOpen}
            style={{ borderRight: '1px solid black' }}>
            <Typography
              variant="h4"
            >
              Mumbai
            </Typography>
            <Typography
              variant="body1"
              component="p"
            >
              Indian Standard Time (IST)
            </Typography>
            <Typography
              color="textSecondary"
              variant="body2"
              component="p"
            >
              UTC +5:30
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <DateTimePicker
              value={value}
              onChange={onChange}
            />
          </Grid>
        </Grid>
      </CardContent>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </Card>
  )
}

export default TimeCard
