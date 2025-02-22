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

function SupabaseDbConfiguration({ selectedDb }) {
  const dispatch = useDispatch();
  const isMobile = useSelector((state) => state.isMobile);
  const isLarge = useSelector((state) => state.isLarge);
  const isButtonLoad = useSelector((state) => state.isButtonLoad);
  const [admins, setAdmins] = useState([{ email: '', password: '', firstName: '', lastName: '' }]);

  const handleAddAdmin = () => {
    setAdmins([...admins, { email: '', password: '', firstName: '', lastName: '' }]);
  };

  const handleRemoveAdmin = (index) => {
    setAdmins(admins.filter((_, i) => i !== index));
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
        Configure Supabase Database
      </Typography>

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

        </Box>
    </Box>
  );
}

export default SupabaseDbConfiguration;
