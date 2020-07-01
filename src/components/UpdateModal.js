import React, { useState, useContext } from 'react'

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
// import Grid from '@material-ui/core/Grid';

// For Modal
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

import { TimezonesContext } from '../App'

const UpdateModal = ({ open, handleOpen, handleClose,
  updateTimezone, base, deleteTimezone }) => {

  const [textfieldValue, setTextfieldValue] = useState('');
  const allTimezones = useContext(TimezonesContext);

  const onTimezoneChange = (event, values) => {
    // console.log("values", values);
    setTextfieldValue(values);
  }

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
          <Button color="secondary"
            disabled={base}
            onClick={() => {
              deleteTimezone();
              handleClose();
            }}
          >
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
              onClick={() => {
                updateTimezone(textfieldValue);
                handleClose();
              }}
            >
              UPDATE
            </Button>
          </div>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="Update Timezone"
      aria-describedby="Modal to update the selected timezone card"
    >
      {body}
    </Modal>
  )
}

export default UpdateModal
