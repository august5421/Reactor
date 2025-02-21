import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box } from '@mui/system';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import ProfilePage from './pages/ProfilePage';
import Footer from './components/Footer';
import { CircularProgress, Collapse, Fade, Snackbar, Alert } from '@mui/material';
import 'animate.css';
import { setIsLoad, setAlert, setActiveUser } from './actions/actions';
import Cookies from 'js-cookie';
import { getDocumentById } from './services/FirestoreService';
import BlogPage from './pages/BlogPage';
import ContactPage from './pages/ContactPage';
import TermsOfServicePage from './pages/TermsOfServicePage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import FAQPage from './pages/FAQPage';
import SingleBlogPostPage from './pages/SingleBlogPostPage';
import AlertComponent from './components/AlertComponent';
import NotFoundPage from './pages/NotFoundPage';

function App({ routeTo }) {
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
    Home: HomePage,
    Auth: AuthPage,
    Profile: ProfilePage,
    Blog: BlogPage,
    SingleBlogPage: SingleBlogPostPage,
    Contact: ContactPage,
    TermsOfService: TermsOfServicePage,
    PrivacyPolicy: PrivacyPolicyPage,
    FAQ: FAQPage,
    NotFoundPage: NotFoundPage
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
      <TransitionComponent {...transitionProps}>
        <Box>
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
            bottom: isTablet ? 'auto' : '-120px',
            left: 0,
            right: 0,
            backgroundColor: siteColors.site_background,
          }}
        >
          <Navbar fireRoute={siteConfigurations.site_useRoutes ? routeTo : '/'} />
          <Box>{renderPage()}</Box>
          <Footer />
        </Box>
      )}
      <AlertComponent />
    </>
  );
}

export default App;
