import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, TextField, Typography, MenuItem, Select, FormControl, InputLabel, Grid, Checkbox, FormControlLabel } from '@mui/material';
import { updateSiteColorField, updateSiteConfigurationField } from '../../actions/actions';
import ColorPickerInput from '../components/ColorPickerInput';

function ContactSettingsForm() {
  const dispatch = useDispatch();
  const siteConfigurations = useSelector(state => state.siteConfigurations);
  const siteColors = useSelector(state => state.siteColors);

  const handleFieldChange = (fieldName, value) => {
    dispatch(updateSiteConfigurationField(fieldName, value));
  };

  const handleColorChange = (color, fieldName) => {
    dispatch(updateSiteColorField(fieldName, color));
  };

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
      

      <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
        <Box style={{ display: 'flex', flexDirection: 'column'}}>
          <TextField
            label="Contact Page Title"
            variant="outlined"
            fullWidth
            size="small"
            value={siteConfigurations?.contact_contactFormTitle || ''}
            onChange={(event) => handleFieldChange('contact_contactFormTitle', event.target.value)}
          />
        </Box>
        <Box style={{ display: 'flex', flexDirection: 'column' }}>
          <ColorPickerInput
            color={siteColors?.contact_title || ''}
            label="Contact Form Title Color"
            onColorChange={(color) => handleColorChange(color, 'contact_title')}
          />
        </Box>
      </Box>

      <Typography sx={{marginTop: '16px'}} variant="body1">Form Fields</Typography>
        {siteConfigurations.contact_contactFormFields.map((item, index) => (
          <Box key={index} style={{ display: 'flex', flexDirection: 'row', marginBottom: '16px', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box>
              <Typography variant="body1">{camelCaseToTitle(item.value || item.key)}</Typography>
            </Box>
            <Box>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={item.active}
                    onChange={(e) => handleArrayChange('contact_contactFormFields', index, 'active', e.target.checked)}
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
                    onChange={(e) => handleArrayChange('contact_contactFormFields', index, 'required', e.target.checked)}
                  />
                }
                label="Required"
              />
            </Box>
          </Box>
        ))}
        <Box style={{ marginTop: '16px' }}>
          <ColorPickerInput
            color={siteColors?.contact_submitButtonBackground || ''}
            label="Contact Form Submit Button Hover Background Color"
            onColorChange={(color) => handleColorChange(color, 'contact_submitButtonBackground')}
          />
        </Box>
        <Box style={{ marginTop: '16px' }}>
          <ColorPickerInput
            color={siteColors?.contact_submitButtonText || ''}
            label="Contact Form Submit Button Text Color"
            onColorChange={(color) => handleColorChange(color, 'contact_submitButtonText')}
          />
        </Box>
        <Box style={{ marginTop: '16px' }}>
          <ColorPickerInput
            color={siteColors?.contact_submitButtonHover || ''}
            label="Contact Form Submit Button Hover Color"
            onColorChange={(color) => handleColorChange(color, 'contact_submitButtonHover')}
          />
        </Box>
    </Box>
  );
}

export default ContactSettingsForm;
