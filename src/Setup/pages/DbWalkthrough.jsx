import { Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import walkthrough from '../../assets/firebaseWalkthrough.mp4'; 

function DbWalkthrough({ selectedDb }) {
  const isMobile = useSelector((state) => state.isMobile);
  const isLarge = useSelector((state) => state.isLarge);

  return (
    <Box
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: isLarge && 'center',
        alignItems: 'center',
        backgroundColor: '#e8f8ff',
        height: isMobile ? 'calc(100vh - 138px)' : 'calc(100vh - 152px)',
        overflow: 'scroll',
        padding: '20px',
      }}
    >
      <Typography variant="h4" gutterBottom>
        Walkthrough of Firebase setup
      </Typography>
      
        <Box 
            component="video" 
            src={walkthrough} 
            controls 
            style={{ 
            width: isMobile ? '100%' : '80%', 
            maxWidth: '800px', 
            borderRadius: '10px' 
            }} 
        />
      
    </Box>
  );
}

export default DbWalkthrough;
