import React, { useState, Fragment } from "react";

// Redux
import { useSelector } from "react-redux";

// Selectors
import { getLastTrackedId } from "../redux/selectors/dataSelectors";

// MUI
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

import UpdateModal from "./UpdateModal";

const AddTimezone = () => {
  // For modal toggle
  const [open, setOpen] = useState(false);

  const latestId = useSelector(getLastTrackedId);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const styles = {
    margin: 0,
    top: "auto",
    right: 30,
    bottom: 40,
    left: "auto",
    position: "fixed",
  };

  return (
    <Fragment>
      <Fab
        onClick={handleOpen}
        style={styles}
        color="secondary"
        aria-label="Add Timezone"
      >
        <AddIcon />
      </Fab>
      <UpdateModal
        open={open}
        handleOpen={handleOpen}
        handleClose={handleClose}
        TCId={latestId + 1}
        add={true}
      />
    </Fragment>
  );
};

export default AddTimezone;
