import { useState } from 'react';
import { Box, Button } from '@mui/material';
import Navbar from './components/Navbar';
import DbSelection from './pages/DbSelection';
import DbWalkthrough from './pages/DbWalkthrough';  
import FirestoreDbConfiguration from './pages/FirestoreDbConfiguration';  
import Footer from './components/Footer';
import AlertComponent from '../components/AlertComponent';

function Setup() {
  const [stage, setStage] = useState(1);  
  const [selectedDb, setSelectedDb] = useState(null);  

  const handleNext = () => {
    if (stage < 3) setStage(stage + 1);
  };

  const handlePrevious = () => {
    if (stage > 1) setStage(stage - 1);
  };

  return (
    <Box
      style={{
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#e8f8ff',
      }}
    >
      <Navbar />
      <Box style={{ padding: '16px', overflow: 'scroll', flexGrow: 1 }}>
        {stage === 1 && <DbSelection selectedDb={selectedDb} setSelectedDb={setSelectedDb} handleNext={handleNext} />}
        {stage === 2 && <DbWalkthrough selectedDb={selectedDb} setSelectedDb={setSelectedDb} />}
        {stage === 3 && selectedDb === 'Firebase' && <FirestoreDbConfiguration selectedDb={selectedDb} setSelectedDb={setSelectedDb} />}
      </Box>
      
      <Footer stage={stage} setStage={setStage} />
      <AlertComponent />
    </Box>
  );
}

export default Setup;
