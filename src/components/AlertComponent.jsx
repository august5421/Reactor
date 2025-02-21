import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Snackbar, Alert } from '@mui/material';
import 'animate.css';
import { setAlert } from '../actions/actions';

function AlertComponent({ activeAlert }) {
  const dispatch = useDispatch();
  const isMobile = useSelector((state) => state.isMobile);
  const isLarge = useSelector((state) => state.isLarge);
  const siteConfigurations = useSelector((state) => state.siteConfigurations);
  const siteColors = useSelector((state) => state.siteColors);
  const alert = useSelector((state) => state.alert);

  const vertical = siteConfigurations?.alert_verticalArrange || 'bottom';
  const horizontal = siteConfigurations?.alert_horizontalArrange || 'right';

  return (
    <Snackbar
      open={!activeAlert ? alert.open : true}
      anchorOrigin={{ vertical, horizontal }}
      autoHideDuration={!activeAlert ? 2000 : null}
      sx={{position: activeAlert && 'absolute'}}
      onClose={() => {
        dispatch(setAlert('open', false));
        dispatch(setAlert('message', ''));
      }}
    >
      <Alert
        onClose={() => {
          dispatch(setAlert('open', false));
          dispatch(setAlert('message', ''));
        }}
        severity={!activeAlert ? alert.severity : 'error'}
        sx={{ width: '100%' }}
      >
        {!activeAlert ? alert.message : 'This is example of the alert component'}
      </Alert>
    </Snackbar>
  );
}

export default AlertComponent;
