import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box } from '@mui/system';
import HomePage from '../pages/HomePage';
import AuthPage from '../pages/AuthPage';
import ProfilePage from '../pages/ProfilePage';
import Footer from '../components/Footer';
import { CircularProgress, Collapse, Typography, Snackbar, Alert, AppBar, Toolbar, Fade, Slide, Zoom, Modal } from '@mui/material';
import 'animate.css';
import { setIsLoad, setAlert, setActiveUser, setAdminUser, setOnDashboard } from '../actions/actions';
import Cookies from 'js-cookie';
import { getDocumentById } from '../services/DbManipulationService';
import AlertComponent from '../components/AlertComponent';
import Navbar from './components/Navbar';
import TwoPanePage from './pages/TwoPanePage';
import ModalComponent from '../components/ModalComponent';

function Dash({ routeTo }) {
  const dispatch = useDispatch();
  const isMobile = useSelector((state) => state.isMobile);
  const isTablet = useSelector((state) => state.isTablet);
  const isLarge = useSelector((state) => state.isLarge);
  const isLoad = useSelector((state) => state.isLoad);
  const activePage = useSelector((state) => state.activePage);
  const adminUser = useSelector((state) => state.adminUser);
  const siteConfigurations = useSelector((state) => state.siteConfigurations);
  const siteColors = useSelector((state) => state.siteColors);
  const alert = useSelector((state) => state.alert);
  const containerRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      if (siteConfigurations && siteColors) {
        dispatch(setIsLoad(false));
      }
      const adminToken = Cookies.get('adminToken');
      if (adminToken) {
        try {
          const user = await getDocumentById('Users', adminToken);
          dispatch(setAdminUser(user));
        } catch (error) {
          console.error('Error fetching user document:', error);
        }
      }
    };
    fetchData();
    dispatch(setOnDashboard(true))
  }, [siteConfigurations, siteColors, dispatch]);

  return (
    <>
      {isLoad ? (
        <Box
          style={{
            display: 'flex',
            flexDirection: 'column',
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: '#fff',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Box
          style={{
            display: 'flex',
            flexDirection: 'column',
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: siteColors.site_background,
          }}
        >
          <Navbar />
          {Cookies.get('adminToken') ? (
            <TwoPanePage />
          ) : (
            <AuthPage admin={true} />
          )}
        </Box>
      )}
      <AlertComponent />
      <ModalComponent />
    </>
  );
}

export default Dash;
