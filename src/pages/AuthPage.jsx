import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, TextField, Button, Typography, IconButton, InputAdornment, Fade, CircularProgress } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { setActivePage, setIsButtonLoad, setAlert, setActiveUser, setAdminUser } from '../actions/actions';
import AuthenticationService from '../services/AuthenticationService';
import { useNavigate } from 'react-router';
import Cookies from 'js-cookie';
import { getDocumentById } from '../services/FirestoreService';

function AuthPage({ admin }) {
  const dispatch = useDispatch();
  const isMobile = useSelector((state) => state.isMobile);
  const siteColors = useSelector((state) => state.siteColors);
  const siteConfigurations = useSelector((state) => state.siteConfigurations);
  const isButtonLoad = useSelector((state) => state.isButtonLoad);
  const onDashboard = useSelector((state) => state.onDashboard);
  const navigate = useNavigate();

  const [isSignup, setIsSignup] = useState(false);
  const [isPasswordReset, setIsPasswordReset] = useState(false); 
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (isPasswordReset) {
      if (!formData.email) {
        newErrors.email = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Invalid email address';
      }
    } else {
      siteConfigurations.auth_signUpFields.forEach((field) => {
        if (field.active && field.required && (isSignup || field.onLogin)) {
          if (!formData[field.value]) {
            newErrors[field.value] = `${field.value.charAt(0).toUpperCase() + field.value.slice(1).replace(/([A-Z])/g, ' $1')} is required`;
          }

          if (field.value === 'confirmPassword' && formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
          }
        }
      });
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePasswordReset = async () => {
    if (!validateForm()) {
      dispatch(setAlert('open', true));
      dispatch(setAlert('severity', 'error'));
      dispatch(setAlert('message', 'Please enter a valid email address.'));
      return;
    }

    dispatch(setIsButtonLoad(true));
    try {
      await AuthenticationService.resetPassword(formData.email);
      dispatch(setAlert('open', true));
      dispatch(setAlert('severity', 'success'));
      dispatch(setAlert('message', 'Password reset email sent. Please check your inbox.'));
      setIsPasswordReset(false); 
    } catch (error) {
      console.error('Password reset failed:', error.message);
      dispatch(setAlert('open', true));
      dispatch(setAlert('severity', 'error'));
      dispatch(setAlert('message', 'Failed to send password reset email.'));
    } finally {
      dispatch(setIsButtonLoad(false));
    }
  };

  const handleLogin = async (formData) => {
    dispatch(setIsButtonLoad(true));
    try {
      const user = await AuthenticationService.login(formData);
      console.log('Logged in successfully:', user);
      if (admin) {
        if (user.role !== 'user') {
          Cookies.set('adminToken', user.id, { expires: 7, secure: true, sameSite: 'Strict' });
          dispatch(setAdminUser(user)) 
        } else {
          dispatch(setAlert('open', true));
          dispatch(setAlert('severity', 'error'));
          dispatch(setAlert('message', "We couldn't find an admin account with those credentials."));
        }
      } else {
        Cookies.set('authToken', user.id, { expires: 7, secure: true, sameSite: 'Strict' });
        dispatch(setActiveUser(user)) 
      }
    } catch (error) {
      console.error('Login failed:', error.message);
      
      dispatch(setAlert('open', true));
      dispatch(setAlert('severity', 'error'));
      dispatch(setAlert('message', 'Login failed. Please check your credentials.'));
    } finally {
      dispatch(setIsButtonLoad(false));
      if (siteConfigurations.site_useRoutes) {
        navigate('/')  
      } else {
          dispatch(setActivePage('In', false));
          setTimeout(() => {
            dispatch(setActivePage('Name', "Home"));
            dispatch(setActivePage('In', true));
          }, 350);
      }
    }
  };

  const handleSignup = async (formData) => {
    dispatch(setIsButtonLoad(true));
    try {
      const user = await AuthenticationService.signup(formData);
      console.log('Signed up successfully:', user);
      Cookies.set('authToken', user.id, { expires: 7, secure: true, sameSite: 'Strict' });  
      dispatch(setActiveUser(user))
    } catch (error) {
      console.error('Signup failed:', error.message);
      dispatch(setAlert('open', true));
      dispatch(setAlert('severity', 'error'));
      dispatch(setAlert('message', 'Signup failed. Please try again.'));
    } finally {
      dispatch(setIsButtonLoad(false));
      const authToken = Cookies.get('authToken');
      if (authToken) {
        try {
          const user = await getDocumentById('Users', authToken);
          dispatch(setActiveUser(user));
        } catch (error) {
          console.error('Error fetching user document:', error);
        }
      }
      if (siteConfigurations.site_useRoutes) {
        navigate('/')  
      } else {
          dispatch(setActivePage('In', false));
          setTimeout(() => {
            dispatch(setActivePage('Name', "Home"));
            dispatch(setActivePage('In', true));
          }, 350);
      }
    }
  };
  
  const handleSubmit = () => {
    if (isPasswordReset) {
      handlePasswordReset();
    } else if (validateForm()) {
      if (isSignup) {
        handleSignup(formData);
      } else {
        handleLogin(formData);
      }
    } else {
      dispatch(setAlert('open', true));
      dispatch(setAlert('severity', 'error'));
      dispatch(setAlert('message', 'Please fill out all required fields.'));
    }
  };

  return (
    <Box sx={{ minHeight: isMobile ? 'calc(100vh - 56px - 4rem)' : 'calc(100vh - 64px - 4rem)', width: onDashboard ? "calc(100% - 4rem)" : "calc(100vw - 4rem)", padding: '2rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Fade in={true} timeout={500}>
        <Box sx={{ maxWidth: '650px', padding: '2rem', backgroundColor: siteColors.pages_auth }}>
          <Typography variant="h4" gutterBottom>
            {isPasswordReset ? 'Reset Password' : isSignup ? 'Sign Up' : 'Login'}
          </Typography>
          {isPasswordReset ? (
            <TextField
              label="Email"
              size="small"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              required
              sx={{ marginBottom: 2 }}
              error={!!errors.email}
              helperText={errors.email || ''}
            />
          ) : (
            siteConfigurations.auth_signUpFields?.map((field, index) => {
              if ((isSignup && field.active) || (!isSignup && field.active && field.onLogin)) {
                const isPasswordField = field.value === 'password' || field.value === 'confirmPassword';
                const isShowPasswordField = showPassword && isPasswordField;
                return (
                  <TextField
                    key={index}
                    label={field?.value ? field.value.charAt(0).toUpperCase() + field.value.slice(1).replace(/([A-Z])/g, ' $1') : ''}
                    size="small"
                    name={field.value}
                    type={isShowPasswordField ? 'text' : (field.value === 'password' || field.value === 'confirmPassword') ? 'password' : 'text'}
                    value={formData[field.value]}
                    onChange={handleChange}
                    fullWidth
                    required={field.required}
                    sx={{ marginBottom: 2 }}
                    InputProps={isPasswordField ? {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      )
                    } : undefined}
                    error={!!errors[field.value]}
                    helperText={errors[field.value] || ''}
                  />
                );
              }
              return null;
            })
          )}
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSubmit}
            sx={{
              color: siteColors.auth_submitButtonText,
              backgroundColor: siteColors.auth_submitButtonBackground,
              marginBottom: 2,
              '&:hover': {
                backgroundColor: siteColors.auth_submitButtonHover,
              },
            }}
          >
            {isButtonLoad ? <CircularProgress size="22.5px" sx={{ color: '#fff' }} /> : isPasswordReset ? 'Send Reset Email' : isSignup ? 'Sign Up' : 'Login'}
          </Button>
          {!admin && (
            <>
              {!isPasswordReset && !isSignup && (
                <Button
                  sx={{ color: siteColors.auth_toggleSwitch }}
                  onClick={() => setIsPasswordReset(true)}
                >
                  Forgot Password?
                </Button>
              )}
              {isPasswordReset && (
                <Button
                  sx={{ color: siteColors.auth_toggleSwitch }}
                  onClick={() => setIsPasswordReset(false)}
                >
                  Back to Login
                </Button>
              )}
              {!isPasswordReset && (
                <Typography variant="body2" sx={{marginLeft: '8px'}}>
                  {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
                  <Button
                    sx={{ color: siteColors.auth_toggleSwitch }}
                    onClick={() => {
                      dispatch(setActivePage('In', false));
                      setTimeout(() => {
                        dispatch(setActivePage('Name', 'Auth'));
                        dispatch(setActivePage('In', true));
                        setIsSignup(!isSignup);
                      }, 350);
                    }}
                  >
                    {isSignup ? 'Login' : 'Sign Up'}
                  </Button>
                </Typography>
              )}
            </>
          )}
        </Box>
      </Fade>
    </Box>
  );
}

export default AuthPage;
