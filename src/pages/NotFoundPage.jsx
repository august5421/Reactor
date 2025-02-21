import React from 'react';
import { Box, Typography } from '@mui/material';
import errImage from '../assets/404.png';
import { useDispatch, useSelector } from 'react-redux';

function NotFoundPage() {
  const dispatch = useDispatch();
  const isMobile = useSelector((state) => state.isMobile);
  const siteConfigurations = useSelector((state) => state.siteConfigurations);
  const siteColors = useSelector((state) => state.siteColors);
  const onDashboard = useSelector((state) => state.onDashboard);
  
  return (
    <Box sx={{minHeight: isMobile ? 'calc(100vh - 56px - 4rem)' : 'calc(100vh - 64px - 4rem)', width: onDashboard ? "calc(100% - 4rem)" : "calc(100vw - 4rem)", padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: siteColors.pages_notFoundPage}}>
      <Typography variant="h1" color={siteColors.notFoundPage_headingColor}>
        {siteConfigurations.notFoundPage_heading}
      </Typography>
      <img src={errImage} width="300px" />
      <Typography variant="body1" style={{ marginTop: 16 }} color={siteColors.notFoundPage_bodyColor}>
        {siteConfigurations.notFoundPage_body}
      </Typography>
    </Box>
  );
}

export default NotFoundPage;
