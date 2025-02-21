import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Typography, Card, CardContent, Divider } from '@mui/material';
import fbLogo from '../../assets/Firebase.svg';
import sbLogo from '../../assets/supabase.png';
import mdbLogo from '../../assets/mongo.png';

function DbSelection({selectedDb, setSelectedDb, handleNext}) {
  const dispatch = useDispatch();
  const isMobile = useSelector((state) => state.isMobile);
  const isTablet = useSelector((state) => state.isTablet);
  const isLarge = useSelector((state) => state.isLarge);

  const features = [
    {
      name: 'Supabase',
      logo: sbLogo,
      databaseType: 'SQL (PostgreSQL)',
      authentication: 'Email/password, OAuth, Social logins',
      storage: '1GB for files, 500MB DB storage',
      functions: '500MB compute per month',
      realTime: 'Yes',
      hosting: 'No',
      analytics: 'No',
      pricing: '2GB bandwidth, 1,000,000 rows free',
    },
    {
      name: 'Firebase',
      logo: fbLogo,
      databaseType: 'NoSQL (Firestore/Realtime DB)',
      authentication: 'Email/password, OAuth, Social logins',
      storage: '1GB Firestore, 1GB Realtime DB, 5GB storage',
      functions: '2 million invocations per month',
      realTime: 'Yes',
      hosting: '1GB storage, 10GB download bandwidth',
      analytics: 'Unlimited Firebase Analytics',
      pricing: 'Free with limited read/write operations',
    },
    {
      name: 'MongoDB Atlas',
      logo: mdbLogo,
      databaseType: 'NoSQL (MongoDB)',
      authentication: 'Email/password, OAuth, Social logins',
      storage: '512MB database storage',
      functions: '2 million invocations per month',
      realTime: 'Yes',
      hosting: 'No',
      analytics: 'No',
      pricing: '512MB storage with limited backup and search',
    }
  ];

  const handleClick = (dbName) => {
    setSelectedDb(dbName);
    handleNext();
  };

  return (
    <Box
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: isLarge && 'center',
        alignItems: 'center',
        backgroundColor: '#e8f8ff',
        height: isMobile ? 'calc(100vh - 138px)' : 'calc(100vh - 152px)',
        overflow: 'scroll'
      }}
    >
      <Typography variant="h4" gutterBottom>
        Select a DB option
      </Typography>

      <Box
        style={{
          display: 'flex',
          flexDirection: !isLarge ? 'column' : 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '16px',
        }}
      >
        {features.map((feature, index) => (
          <Card
            key={index}
            sx={{
              boxShadow: 3,
              transition: 'transform 0.2s, background-color 0.2s',
              cursor: 'pointer',
              '&:hover': {
                transform: 'scale(1.02)',
                backgroundColor: '#f0f0f0',
              },
            }}
            onClick={() => handleClick(feature.name)}
          >
            <CardContent>
              <Box
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '75px',
                }}
              >
                <img
                  alt={feature.name}
                  src={feature.logo}
                  style={{
                    maxHeight: '75%',
                    objectFit: 'contain',
                  }}
                />
              </Box>

              <Divider sx={{ margin: '24px 0px' }} />
              <Typography variant="body2" paragraph>
                <strong>Database Type:</strong> {feature.databaseType}
              </Typography>
              <Typography variant="body2" paragraph>
                <strong>Authentication:</strong> {feature.authentication}
              </Typography>
              <Typography variant="body2" paragraph>
                <strong>Storage:</strong> {feature.storage}
              </Typography>
              <Typography variant="body2" paragraph>
                <strong>Functions:</strong> {feature.functions}
              </Typography>
              <Typography variant="body2" paragraph>
                <strong>Real-Time Database:</strong> {feature.realTime}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}

export default DbSelection;
