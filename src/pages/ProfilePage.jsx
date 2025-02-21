import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Box } from '@mui/system';
import { useNavigate } from 'react-router';
import { setActivePage } from '../actions/actions';

function ProfilePage() {
  const dispatch = useDispatch();
  const isMobile = useSelector((state) => state.isMobile);
  const siteColors = useSelector(state => state.siteColors);
  const activeUser = useSelector(state => state.activeUser);
  const onDashboard = useSelector((state) => state.onDashboard);
  const navigate = useNavigate();

  useEffect(()=>{
    if (!activeUser.email) {
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
  }, [])

  return (
    <Box sx={{minHeight: isMobile ? 'calc(100vh - 56px - 4rem)' : 'calc(100vh - 64px - 4rem)', width: onDashboard ? "calc(100% - 4rem)" : "calc(100vw - 4rem)", padding: '2rem', backgroundColor: siteColors.pages_profile}}>
      ProfilePage
    </Box>
  )
}

export default ProfilePage
