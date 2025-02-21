import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, TextField, Typography, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { updateSiteConfigurationField } from '../../actions/actions';

function HomeSettingsForm() {
  const dispatch = useDispatch();
  const siteConfigurations = useSelector(state => state.siteConfigurations);

  return (
    <Box style={{ display: 'flex', flexDirection: 'column' }}>
      Use this section to include CMS actions for the home page if needed
    </Box>
  );
}

export default HomeSettingsForm;
