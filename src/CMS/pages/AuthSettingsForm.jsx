import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, TextField, Typography, MenuItem, Select, FormControl, InputLabel, Grid, FormControlLabel, Checkbox } from '@mui/material';
import { updateSiteConfigurationField } from '../../actions/actions';
import ColorPickerInput from '../components/ColorPickerInput';

function AuthSettingsForm() {
  const dispatch = useDispatch();
  const siteConfigurations = useSelector(state => state.siteConfigurations);
  const siteColors = useSelector(state => state.siteColors);

  const handleArrayChange = (arrayName, index, field, value) => {
    const updatedArray = [...siteConfigurations[arrayName]];
    updatedArray[index][field] = value;
    dispatch(updateSiteConfigurationField(arrayName, updatedArray));
  };

  const camelCaseToTitle = (str) => {
    return str
      .replace(/([A-Z])/g, ' $1') 
      .replace(/^./, (match) => match.toUpperCase()); 
  };

  return (
    <Box style={{ display: 'flex', flexDirection: 'column' }}>
      {siteConfigurations.auth_signUpFields.map((item, index) => (
        <Box key={index} style={{ marginBottom: '16px' }}>
          <Typography variant="body1">{camelCaseToTitle(item.value || item.key)}:</Typography>
          <Box style={{ display: 'flex', flexDirection: 'row', gap: '16px', alignItems: 'center' }}>
            <Box>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={item.active}
                    onChange={(e) => handleArrayChange('auth_signUpFields', index, 'active', e.target.checked)}
                  />
                }
                label="Active"
              />
            </Box>

            <Box>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={item.required}
                    onChange={(e) => handleArrayChange('auth_signUpFields', index, 'required', e.target.checked)}
                  />
                }
                label="Required"
              />
            </Box>

            <Box>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={item.onLogin}
                    onChange={(e) => handleArrayChange('auth_signUpFields', index, 'onLogin', e.target.checked)}
                  />
                }
                label="On Login"
              />
            </Box>
          </Box>
        </Box>
      ))}

      <Box style={{ marginTop: '16px' }}>
        <ColorPickerInput
          color={siteColors?.auth_submitButtonBackground || ''}
          label="Auth Submit Button Background Color"
          onColorChange={(color) => handleColorChange(color, 'auth_submitButtonBackground')}
        />
      </Box>
      <Box style={{ marginTop: '16px' }}>
        <ColorPickerInput
          color={siteColors?.auth_submitButtonHover || ''}
          label="Auth Submit Button Hover Background Color"
          onColorChange={(color) => handleColorChange(color, 'auth_submitButtonHover')}
        />
      </Box>
      <Box style={{ marginTop: '16px' }}>
        <ColorPickerInput
          color={siteColors?.auth_submitButtonText || ''}
          label="Auth Submit Button Color"
          onColorChange={(color) => handleColorChange(color, 'auth_submitButtonText')}
        />
      </Box>
      <Box style={{ marginTop: '16px' }}>
        <ColorPickerInput
          color={siteColors?.auth_toggleSwitch || ''}
          label="Auth Toggle Switch Color"
          onColorChange={(color) => handleColorChange(color, 'auth_toggleSwitch')}
        />
      </Box>
    </Box>
  );
}

export default AuthSettingsForm;
