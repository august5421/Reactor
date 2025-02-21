import { useState } from 'react';
import { Box, Button } from '@mui/material';

function Setup({stage, setStage}) {

  const handleNext = () => {
    if (stage < 3) setStage(stage + 1);
  };

  const handlePrevious = () => {
    if (stage > 1) setStage(stage - 1);
  };

  return (
    <Box
    style={{
        height: '60px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 16px',
        boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.1)',
        position: 'relative',
    }}
    >
    {stage > 1 && (
        <Button
        variant="outlined"
        onClick={handlePrevious}
        color="primary"
        sx={{
            borderColor: '#004268',
            color: '#004268',
          }}
        >
        Previous
        </Button>
    )}
    {stage === 2 && (
        <Button
        variant="contained"
        onClick={handleNext}
        color="primary"
        sx={{
            backgroundColor: '#004268',
            color: '#e8f8ff',
            '&:hover': {
              backgroundColor: '#1b4b66',
            },
          }}
        >
        Next
        </Button>
    )}
    </Box>
  );
}

export default Setup;
