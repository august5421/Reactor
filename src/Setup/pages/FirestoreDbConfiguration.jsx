import { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Paper,
  Input,
  List,
  ListItem,
  Collapse,
  CircularProgress,
} from '@mui/material';
import { Add, Delete, UploadFile } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { setAlert, setIsButtonLoad } from '../../actions/actions';

function FirestoreDbConfiguration({ selectedDb }) {
  const dispatch = useDispatch();
  const isMobile = useSelector((state) => state.isMobile);
  const isLarge = useSelector((state) => state.isLarge);
  const isButtonLoad = useSelector((state) => state.isButtonLoad);
  const [admins, setAdmins] = useState([{ email: '', password: '', firstName: '', lastName: '' }]);
  const [serviceAccount, setServiceAccount] = useState(null);
  const [firebaseConfig, setFirebaseConfig] = useState('');
  const [parsedConfig, setParsedConfig] = useState(null);
  const [isCollapseOpen, setIsCollapseOpen] = useState(false); 

  const handleAddAdmin = () => {
    setAdmins([...admins, { email: '', password: '', firstName: '', lastName: '' }]);
  };

  const handleRemoveAdmin = (index) => {
    setAdmins(admins.filter((_, i) => i !== index));
  };

  const handleFileChange = (event) => {
    setServiceAccount(event.target.files[0]);
  };

  const handleSubmit = async () => {
    dispatch(setIsButtonLoad(true))
    if (!serviceAccount) {
      dispatch(setAlert('open', true));
      dispatch(setAlert('severity', 'error'));
      dispatch(setAlert('message', 'Please upload a service account JSON file.'));
      return;
    }

    const formData = new FormData();
    formData.append("serviceAccount", serviceAccount);
    formData.append("admins", JSON.stringify(admins));

    try {
      const response = await fetch("http://localhost:5000/api/create-users", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        dispatch(setAlert('open', true));
        dispatch(setAlert('severity', 'success'));
        dispatch(setAlert('message', 'Users created successfully'));

        await createColorsAndConfigurations();
      } else {
        dispatch(setAlert('open', true));
        dispatch(setAlert('severity', 'error'));
        dispatch(setAlert('message', `Error: ${data.message}`));
      }
    } catch (error) {
      dispatch(setAlert('open', true));
      dispatch(setAlert('severity', 'error'));
      dispatch(setAlert('message', `Request failed: ${error.message}`));
    } finally {
      dispatch(setIsButtonLoad(false))
    }
  };

  const createColorsAndConfigurations = async () => {
    try {
      const blogResponse = await fetch("http://localhost:5000/api/create-blog-posts", {
        method: "POST",
      });
      
      const blogData = await blogResponse.json();
      if (blogResponse.ok) {
        dispatch(setAlert('open', true));
        dispatch(setAlert('severity', 'success'));
        dispatch(setAlert('message', blogData.message));
      } else {
        dispatch(setAlert('open', true));
        dispatch(setAlert('severity', 'error'));
        dispatch(setAlert('message', `Error creating Blog Posts table: ${blogData.message}`));
      }
      
      const colorsResponse = await fetch("http://localhost:5000/api/create-colors", {
        method: "POST",
      });

      const colorsData = await colorsResponse.json();
      if (colorsResponse.ok) {
        dispatch(setAlert('open', true));
        dispatch(setAlert('severity', 'success'));
        dispatch(setAlert('message', colorsData.message));
      } else {
        dispatch(setAlert('open', true));
        dispatch(setAlert('severity', 'error'));
        dispatch(setAlert('message', `Error creating Colors table: ${colorsData.message}`));
      }

      const configResponse = await fetch("http://localhost:5000/api/create-configurations", {
        method: "POST",
      });

      const configData = await configResponse.json();
      if (configResponse.ok) {
        dispatch(setAlert('open', true));
        dispatch(setAlert('severity', 'success'));
        dispatch(setAlert('message', configData.message));
      } else {
        dispatch(setAlert('open', true));
        dispatch(setAlert('severity', 'error'));
        dispatch(setAlert('message', `Error creating Configurations table: ${configData.message}`));
      }

      setIsCollapseOpen(true);

    } catch (error) {
      dispatch(setAlert('open', true));
      dispatch(setAlert('severity', 'error'));
      dispatch(setAlert('message', `Error during table creation: ${error.message}`));
    }
  };

  const handleFirebaseConfigSubmit = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/update-env", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(parsedConfig),
      });

      const data = await response.json();
      if (response.ok) {
        dispatch(setAlert('open', true));
        dispatch(setAlert('severity', 'success'));
        dispatch(setAlert('message', "Firebase configuration updated successfully!"));
      } else {
        dispatch(setAlert('open', true));
        dispatch(setAlert('severity', 'error'));
        dispatch(setAlert('message', `Error: ${data.message}`));
      }
    } catch (error) {
      dispatch(setAlert('open', true));
      dispatch(setAlert('severity', 'error'));
      dispatch(setAlert('message', `Error parsing Firebase config: ${error.message}`));
    }
  };

  const handleConfigChange = (event) => {
    setFirebaseConfig(event.target.value);
    try {
      const parsed = parseFirebaseConfig(event.target.value);
      setParsedConfig(parsed);
    } catch (error) {
      setParsedConfig(null); 
    }
  };

  const parseFirebaseConfig = (configStr) => {
    try {
      const regex = /const\s+firebaseConfig\s+=\s+\{(.+?)\};/s;
      const match = configStr.match(regex);
      if (match) {
        const configObjStr = `{${match[1]}}`;
        return eval(`(${configObjStr})`); 
      }
      return null;
    } catch (error) {
      return null; 
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#e8f8ff',
        height: isMobile ? 'calc(100vh - 138px)' : 'calc(100vh - 152px)',
        overflow: 'auto',
        padding: 3,
      }}
    >
      <Typography variant="h4" gutterBottom>
        Configure Firebase Database
      </Typography>

      {selectedDb === 'Firebase' && (
        <Box>
          <Typography variant="h6" gutterBottom>
            Admin Accounts
          </Typography>
          <List>
            {admins.map((admin, index) => (
              <ListItem key={index} sx={{ gap: 1 }}>
                <TextField
                  label="First Name"
                  fullWidth
                  size="small"
                  value={admin.firstName}
                  onChange={(e) => {
                    const newAdmins = [...admins];
                    newAdmins[index].firstName = e.target.value;
                    setAdmins(newAdmins);
                  }}
                />
                <TextField
                  label="Last Name (Optional)"
                  fullWidth
                  size="small"
                  value={admin.lastName}
                  onChange={(e) => {
                    const newAdmins = [...admins];
                    newAdmins[index].lastName = e.target.value;
                    setAdmins(newAdmins);
                  }}
                />
                <TextField
                  label="Admin Email"
                  type="email"
                  fullWidth
                  size="small"
                  value={admin.email}
                  onChange={(e) => {
                    const newAdmins = [...admins];
                    newAdmins[index].email = e.target.value;
                    setAdmins(newAdmins);
                  }}
                />
                <TextField
                  label="Password"
                  type="password"
                  fullWidth
                  size="small"
                  value={admin.password}
                  onChange={(e) => {
                    const newAdmins = [...admins];
                    newAdmins[index].password = e.target.value;
                    setAdmins(newAdmins);
                  }}
                />
                <IconButton onClick={() => handleRemoveAdmin(index)}>
                  <Delete color="error" />
                </IconButton>
              </ListItem>
            ))}
          </List>
          <Button startIcon={<Add />} onClick={handleAddAdmin} sx={{ mt: 2 }}>
            Add Admin
          </Button>

          <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
            Upload Service Account JSON
          </Typography>
          <Box style={{display: 'flex', flexDirection: 'column'}}>

            <Box style={{display: 'flex', flexDirection: 'row'}}>
              <Button
                component="label"
                variant="contained"
                startIcon={<UploadFile />}
                sx={{
                  backgroundColor: '#004268',
                  maxWidth: '250px',
                  color: '#e8f8ff',
                  marginRight: 2,
                  '&:hover': {
                    backgroundColor: '#1b4b66',
                  },
                }}
              >
                Upload File
                <Input type="file" accept=".json" onChange={handleFileChange} sx={{ display: 'none' }} />
              </Button>
              {serviceAccount && (
                <Typography variant="body2" sx={{ mt: 1 }}>
                  {serviceAccount.name}
                </Typography>
              )}
            </Box>
            

            <Button variant="contained" onClick={handleSubmit} sx={{
                backgroundColor: '#004268',
                color: '#e8f8ff',
                maxWidth: '250px',
                marginTop: 2,
                '&:hover': {
                  backgroundColor: '#1b4b66',
                },
              }}>
              {isButtonLoad ? <CircularProgress size="22.5px" sx={{ color: '#fff' }} /> : 'Create DB'}
            </Button>
          </Box>
          

          <Collapse in={isCollapseOpen} timeout="auto" unmountOnExit>
            <Box sx={{ mt: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                Firebase Configuration
              </Typography>
              <TextField
                label="Paste Firebase JS config"
                multiline
                rows={6}
                fullWidth
                variant="outlined"
                value={firebaseConfig}
                onChange={handleConfigChange}
              />

              {parsedConfig && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body1">
                    Parsed Firebase Configuration:
                  </Typography>
                  <pre>{JSON.stringify(parsedConfig, null, 2)}</pre>
                </Box>
              )}

              <Button
                variant="contained"
                onClick={handleFirebaseConfigSubmit}
                disabled={isButtonLoad}
                sx={{
                  mt: 2,
                  backgroundColor: '#004268',
                  color: '#e8f8ff',
                  '&:hover': {
                    backgroundColor: '#1b4b66',
                  },
                }}
              >
                Save Firebase Config
              </Button>
            </Box>
          </Collapse>

        </Box>
      )}
    </Box>
  );
}

export default FirestoreDbConfiguration;
