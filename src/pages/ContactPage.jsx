import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, TextField, Button, Typography } from '@mui/material';
import { setAlert } from '../actions/actions';

function ContactPage() {
  const dispatch = useDispatch()
  const isMobile = useSelector((state) => state.isMobile);
  const siteColors = useSelector(state => state.siteColors);
  const siteConfigurations = useSelector(state => state.siteConfigurations);
  const onDashboard = useSelector((state) => state.onDashboard);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateForm = () => {
    const newErrors = {};
  
    siteConfigurations.contact_contactFormFields.forEach((field) => {
      if (field.active && field.required) {
        const fieldName = field.value.toLowerCase();
        if (!formData[fieldName]?.trim()) {
          newErrors[fieldName] = `${field.value} is required`;
        } else if (
          fieldName === 'email' &&
          !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData[fieldName])
        ) {
          newErrors[fieldName] = 'Invalid email address';
        }
      }
    });
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  

  const handleSubmit = () => {
    if (validateForm()) {
      console.log('Form submitted successfully:', formData);
      setFormData({ firstName: '', lastName: '', email: '', message: '' });
      setErrors({});
    } else {
        dispatch(setAlert('open', true));
        dispatch(setAlert('severity', 'error'));
        dispatch(setAlert('message', 'Please enter a value for all required fields.'));
        return;
    }
  };
  

  return (
    <Box 
      sx={{
        minHeight: isMobile ? 'calc(100vh - 56px - 4rem)' : 'calc(100vh - 64px - 4rem)',
        width: onDashboard ? "calc(100% - 4rem)" : "calc(100vw - 4rem)",
        padding: '2rem',
        backgroundColor: siteColors.pages_contact,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography variant="h4" sx={{ marginBottom: '1rem', color: siteColors.contact_title}}>
        {siteConfigurations.contact_contactFormTitle}
      </Typography>

      <Box sx={{ width: '100%', maxWidth: '500px' }}>
        {siteConfigurations.contact_contactFormFields.map((field, index) => {
          if (field.active) {
            const isRequired = field.required;
            const fieldName = field.value.toLowerCase();

            return (
              <TextField
                key={index}
                label={field.value}
                name={fieldName}
                value={formData[fieldName] || ''}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                required={isRequired} 
                multiline={field.value === 'message'} 
                rows={field.value === 'message' ? 4 : 1} 
                size={field.value !== 'message' && 'small'} 
                error={!!errors[fieldName]}
                helperText={errors[fieldName] || ''}
              />
            );
          }
          return null; 
        })}

        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{
            color: siteColors.contact_submitButtonText,
            backgroundColor: siteColors.contact_submitButtonBackground,
            marginBottom: 2,
            width: '100%',
            marginTop: '1rem',
            '&:hover': {
              backgroundColor: siteColors.contact_submitButtonHover,
            },
          }}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
}

export default ContactPage;
