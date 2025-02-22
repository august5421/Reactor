import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box } from '@mui/system';
import { CircularProgress, Collapse, Fade, Snackbar, Alert } from '@mui/material';
import 'animate.css';
import { setIsLoad, setAlert, setActiveUser } from '../../actions/actions';
import Cookies from 'js-cookie';
import { getDocumentById } from '../../services/DbManipulationService';

function PageSwitch({ routeTo }) {
  const dispatch = useDispatch();
  const isMobile = useSelector((state) => state.isMobile);
  const isTablet = useSelector((state) => state.isTablet);
  const isLarge = useSelector((state) => state.isLarge);
  const isLoad = useSelector((state) => state.isLoad);
  const activePage = useSelector((state) => state.activePage);
  const activeUser = useSelector((state) => state.activeUser);
  const siteConfigurations = useSelector((state) => state.siteConfigurations);
  const siteColors = useSelector((state) => state.siteColors);
  const alert = useSelector((state) => state.alert);

  const pageComponents = {
    Home: () => (<Box sx={{minHeight: 'calc(100vh - 248px - 4rem)', width: "calc(100vw - 4rem)", padding: '2rem', backgroundColor: siteColors.pages_home}}>Home Page</Box>),
    Auth: () => (<Box sx={{minHeight: 'calc(100vh - 248px - 4rem)', width: "calc(100vw - 4rem)", padding: '2rem', backgroundColor: siteColors.pages_auth}}>Auth Page</Box>),
    Profile: () => (<Box sx={{minHeight: 'calc(100vh - 248px - 4rem)', width: "calc(100vw - 4rem)", padding: '2rem', backgroundColor: siteColors.pages_profile}}>Profile Page</Box>),
    Blog: () => (<Box sx={{minHeight: 'calc(100vh - 248px - 4rem)', width: "calc(100vw - 4rem)", padding: '2rem', backgroundColor: siteColors.pages_blog}}>Blog Page</Box>),
    SingleBlogPage: () => (<Box sx={{minHeight: 'calc(100vh - 248px - 4rem)', width: "calc(100vw - 4rem)", padding: '2rem', backgroundColor: siteColors.pages_blog}}>SingleBlogPage Page</Box>),
    Contact: () => (<Box sx={{minHeight: 'calc(100vh - 248px - 4rem)', width: "calc(100vw - 4rem)", padding: '2rem', backgroundColor: siteColors.pages_contact}}>Contact Page</Box>),
    TermsOfService: () => (<Box sx={{minHeight: 'calc(100vh - 248px - 4rem)', width: "calc(100vw - 4rem)", padding: '2rem', backgroundColor: siteColors.pages_termsOfService}}>Terms Of Service Page</Box>),
    PrivacyPolicy: () => (<Box sx={{minHeight: 'calc(100vh - 248px - 4rem)', width: "calc(100vw - 4rem)", padding: '2rem', backgroundColor: siteColors.pages_privacyPolicy}}>Privacy Policy Page</Box>),
    FAQ: () => (<Box sx={{minHeight: 'calc(100vh - 248px - 4rem)', width: "calc(100vw - 4rem)", padding: '2rem', backgroundColor: siteColors.pages_faq}}>FAQ Page</Box>),
    NotFoundPage: () => (<Box sx={{minHeight: 'calc(100vh - 248px - 4rem)', width: "calc(100vw - 4rem)", padding: '2rem', backgroundColor: siteColors.pages_notFoundPage}}>404 Page</Box>),
  };

  useEffect(() => {
    const fetchData = async () => {
      if (siteConfigurations && siteColors) {
        dispatch(setIsLoad(false));
      }
      const authToken = Cookies.get('authToken');
      if (authToken) {
        try {
          const user = await getDocumentById('Users', authToken);
          dispatch(setActiveUser(user));
        } catch (error) {
          console.error('Error fetching user document:', error);
        }
      }
    };
    fetchData();
  }, [siteConfigurations, siteColors, dispatch]);

  const renderPageWithTransition = (TransitionComponent, transitionProps = {}) => {
    const ActiveComponent = pageComponents[activePage.Name];
    return ActiveComponent ? (
      <TransitionComponent {...transitionProps} sx={{ width: '100%' }} className="overrideMUICollapseWidth">
        <Box sx={{ width: '100%' }}>
          <ActiveComponent />
        </Box>
      </TransitionComponent>
    ) : null;
  };

  const renderPage = () => {
    switch (siteConfigurations.pages_transition) {
      case 'fade':
        return renderPageWithTransition(Fade, { in: activePage.In });
      case 'collapse':
        return renderPageWithTransition(Collapse, {
            in: activePage.In,
            orientation: siteConfigurations.pages_orientation,
            sx: { width: '100%' },  
        });
      case 'jawa':
        const animationClass = `animate__animated ${
          activePage.In ? siteConfigurations.pages_animationIn : siteConfigurations.pages_animationOut
        }`;
        return (
          <Box className={animationClass}>
            {renderPageWithTransition(Box)}
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Box sx={{height: 'calc(100vh - 248px - 4rem)', overflow: 'scroll'}}>
        <Box>{renderPage()}</Box>
    </Box>
  );
}

export default PageSwitch;
