import { useSelector, useDispatch } from 'react-redux';
import { Box, TextField, Typography, MenuItem, Select, FormControl, InputLabel, IconButton, Button } from '@mui/material';
import { updateSiteConfigurationField, updateSiteColorField } from '../../actions/actions';
import ColorPickerInput from '../components/ColorPickerInput';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

function FAQSettingsForm() {
  const dispatch = useDispatch();
  const siteConfigurations = useSelector((state) => state.siteConfigurations);
  const siteColors = useSelector((state) => state.siteColors);

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

  const handleAddSection = () => {
    const newSection = { heading: { key: 'heading', value: '' }, body: { key: 'body', value: '' } };
    const updatedArray = [...siteConfigurations.faq_pageBody, newSection.heading, newSection.body];
    dispatch(updateSiteConfigurationField('faq_pageBody', updatedArray));
  };

  const handleDeleteSection = (index) => {
    const updatedArray = [...siteConfigurations.faq_pageBody];
    updatedArray.splice(index * 2, 2);
    dispatch(updateSiteConfigurationField('faq_pageBody', updatedArray));
  };

  const sections = [];
  for (let i = 0; i < siteConfigurations.faq_pageBody.length; i += 2) {
    const heading = siteConfigurations.faq_pageBody[i];
    const body = siteConfigurations.faq_pageBody[i + 1];
    
    sections.push({
      heading,
      body,
    });
  }

  return (
    <Box style={{ display: 'flex', flexDirection: 'column' }}>
      <Typography variant="body1" style={{ marginBottom: '16px' }}>
        Heading
      </Typography>
      <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
        <Box style={{ display: 'flex', flexDirection: 'column'}}>
          <TextField
            label="Terms Of Service Page Heading"
            variant="outlined"
            sx={{minWidth: "253px"}}
            size="small"
            value={siteConfigurations?.faq_termsOfServiceTitle || ''}
            onChange={(event) =>
              handleFieldChange('faq_termsOfServiceTitle', event.target.value)
            }
          />
        </Box>
        <Box style={{ display: 'flex', flexDirection: 'column' }}>
          <ColorPickerInput
            color={siteColors?.faq_title || ''}
            label="FAQ Page Heading Color"
            onColorChange={(color) => handleColorChange(color, 'faq_title')}
          />
        </Box>
      </Box>
      <Typography variant="body1" style={{ marginTop: '16px', marginBottom: '16px' }}>
        Page Sections
      </Typography>
      <Box sx={{marginTop: '16px'}}>
      
      <ColorPickerInput
        color={siteColors?.faq_questionHeading || ''}
        label="Section Title Color"
        onColorChange={(color) => handleColorChange(color, 'faq_questionHeading')}
      />
      </Box>
      <Box sx={{marginTop: '16px'}}>
        <ColorPickerInput
          color={siteColors?.faq_questionBackround || ''}
          label="Section Title Color"
          onColorChange={(color) => handleColorChange(color, 'faq_questionBackround')}
        />
      </Box>
      {sections.map((section, index) => (
        <Box style={{ display: 'flex', flexDirection: 'column' }} key={index}>
          <Box style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px'}}>
            <Typography variant='body1'>Section {index + 1}</Typography>
            <IconButton onClick={() => handleDeleteSection(index)} color="error">
              <DeleteIcon /> 
            </IconButton>
          </Box>
          
          <TextField
            label={`Section ${index + 1} Heading`}
            variant="outlined"
            sx={{ minWidth: "253px", marginTop: '16px' }}
            size="small"
            value={section.heading.value || ''}
            onChange={(event) =>
              handleArrayChange('faq_pageBody', index * 2, "value", event.target.value)
            }
          />

          <ReactQuill
            value={section.body.value || ''}
            onChange={(value) =>
              handleArrayChange('faq_pageBody', index * 2 + 1, "value", value) 
            }
            modules={{
              toolbar: [
                [{ 'header': '1'}, { 'header': '2'}, { 'font': [] }],
                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                ['bold', 'italic', 'underline'],
                ['link'],
                [{ 'align': [] }],
                ['image'],
                ['blockquote', 'code-block']
              ]
            }}
            formats={[
              'header', 'font', 'list', 'bold', 'italic', 'underline', 'link', 'align', 'image', 'blockquote', 'code-block'
            ]}
          />
        </Box>
      ))}
      <Button
        sx={{
          color: siteColors.auth_submitButtonText,
          backgroundColor: siteColors.auth_submitButtonBackground,
          marginBottom: 2,
          '&:hover': {
            backgroundColor: siteColors.auth_submitButtonHover,
          },
        }}
        startIcon={<AddIcon />}
        onClick={handleAddSection} 
      >
        Add Section
      </Button>
    </Box>
  );
}

export default FAQSettingsForm;
