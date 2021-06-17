import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useSelector } from "react-redux";
import {
  getTimezones,
  getTrackedTimezones,
} from "../redux/selectors/dataSelectors";
import { makeStyles } from "@material-ui/core";
// Redux lib
import { useDispatch } from "react-redux";
import { addTrackedTimezone } from "../redux/actions/dataActions";

function SearchTimezone() {
  // Style Hook
  const useStyles = makeStyles((theme) => ({
    searchContainer: {
      margin: "30px auto",
    },
    searchBar: {
      marginBottom: "30px",
      outline: "none",
      background: "#ffffff",
    },
  }));
  const classes = useStyles();

  // Redux selectors
  const timezone = useSelector(getTimezones);
  const regionNameArr = timezone.map((e) => e.name);

  const trackedTimezones = useSelector(getTrackedTimezones);
  const dispatch = useDispatch();
  //   HANDLERS
  const handleTimezoneChange = (event, value) => {
    dispatch(addTrackedTimezone(trackedTimezones.length + 1, value));
  };
  return (
    <Autocomplete
      options={regionNameArr}
      className={classes.searchContainer}
      style={{ width: 800 }}
      onChange={handleTimezoneChange}
      getOptionLabel={(option) => option}
      renderInput={(timezone) => (
        <TextField
          {...timezone}
          label="Search Timezone"
          variant="outlined"
          className={classes.searchBar}
        />
      )}
    />
  );
}

export default SearchTimezone;
