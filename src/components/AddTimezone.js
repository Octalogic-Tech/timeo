import React, { useState, Fragment } from 'react'

// MUI
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import UpdateModal from './UpdateModal';

const AddTimezone = ({ setTracked }) => {
    // For modal toggle
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAddTimezone = value => {
        setTracked(prevState => ([...prevState, value]));
    }

    const styles = {
        margin: 0,
        top: 'auto',
        right: 30,
        bottom: 40,
        left: 'auto',
        position: 'fixed',
    }

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
                updateTimezone={handleAddTimezone}
            />
        </Fragment>
    )
}

export default AddTimezone
