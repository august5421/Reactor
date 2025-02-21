import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Box } from '@mui/system';

function HomePage() {
  const dispatch = useDispatch();
  const isMobile = useSelector((state) => state.isMobile);
  const siteColors = useSelector(state => state.siteColors);
  const siteConfigurations = useSelector(state => state.siteConfigurations);
  const onDashboard = useSelector((state) => state.onDashboard);
  

  return (
    <Box sx={{minHeight: isMobile ? 'calc(100vh - 56px - 4rem)' : 'calc(100vh - 64px - 4rem)', width: onDashboard ? "calc(100% - 4rem)" : "calc(100vw - 4rem)", padding: '2rem', backgroundColor: siteColors.pages_home}}>
      HomePage
    </Box>
  )
}

export default HomePage
