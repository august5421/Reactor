import { Box, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

function DbWalkthrough({selectedDb, setSelectedDb}) {
  const isMobile = useSelector((state) => state.isMobile);
  const isLarge = useSelector((state) => state.isLarge);
  
  return (
    <Box
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: isLarge &&  'center',
        alignItems: 'center',
        backgroundColor: '#e8f8ff',
        height: isMobile ? 'calc(100vh - 138px)' : 'calc(100vh - 152px)',
        overflow: 'scroll'
      }}
    >
      <Typography variant="h4" gutterBottom>
        Walkthrough of {selectedDb} setup
      </Typography>
    </Box>
  );
}

export default DbWalkthrough;
