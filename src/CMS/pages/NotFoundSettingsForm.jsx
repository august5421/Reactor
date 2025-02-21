import { useSelector, useDispatch } from 'react-redux';
import { Box, TextField, Typography } from '@mui/material';
import { updateSiteColorField, updateSiteConfigurationField } from '../../actions/actions';
import ColorPickerInput from '../components/ColorPickerInput';

function NotFoundSettingsForm() {
  const dispatch = useDispatch();
  const siteConfigurations = useSelector((state) => state.siteConfigurations);
  const siteColors = useSelector((state) => state.siteColors);

  const handleFieldChange = (fieldName, value) => {
    dispatch(updateSiteConfigurationField(fieldName, value));
  };

  const handleColorChange = (color, fieldName) => {
    dispatch(updateSiteColorField(fieldName, color));
  };

  return (
    <Box style={{ display: 'flex', flexDirection: 'column' }}>
      <Typography variant="body1" style={{ marginTop: '16px', marginBottom: '8px' }}>
        Heading
      </Typography>
      <Box style={{ display: 'flex', flexDirection: 'row' }}>
        <Box style={{ display: 'flex', flexDirection: 'column', marginRight: '5px' }}>
          <TextField
            label="404 Heading"
            variant="outlined"
            fullWidth
            size="small"
            value={siteConfigurations?.notFoundPage_heading || ''}
            onChange={(event) => handleFieldChange('notFoundPage_heading', event.target.value)}
          />
        </Box>
        <ColorPickerInput
          label="Hex Color"
          color={siteColors?.notFoundPage_headingColor || ''}
          onColorChange={(color) => handleColorChange(color, 'notFoundPage_headingColor')}
        />
      </Box>

      <Typography variant="body1" style={{ marginTop: '16px', marginBottom: '8px' }}>
        Body
      </Typography>
      <Box style={{ display: 'flex', flexDirection: 'row' }}>
        <Box style={{ display: 'flex', flexDirection: 'column', marginRight: '5px' }}>
          <TextField
            label="404 Body"
            variant="outlined"
            fullWidth
            size="small"
            value={siteConfigurations?.notFoundPage_body || ''}
            onChange={(event) => handleFieldChange('notFoundPage_body', event.target.value)}
          />
        </Box>
        <ColorPickerInput
          label="Hex Color"
          color={siteColors?.notFoundPage_bodyColor || ''}
          onColorChange={(color) => handleColorChange(color, 'notFoundPage_bodyColor')}
        />
      </Box>
    </Box>
  );
}

export default NotFoundSettingsForm;