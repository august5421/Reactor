import { useState } from 'react';
import { Box, Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import GeneralSettingsForm from './GeneralSettingsForm';
import AlertComponent from '../../components/AlertComponent';
import FAQPage from '../../pages/FAQPage';
import AuthPage from '../../pages/AuthPage';
import BlogPage from '../../pages/BlogPage';
import ContactPage from '../../pages/ContactPage';
import HomePage from '../../pages/HomePage';
import NotFoundPage from '../../pages/NotFoundPage';
import PrivacyPolicyPage from '../../pages/PrivacyPolicyPage';
import TermsOfServicePage from '../../pages/TermsOfServicePage';
import AuthSettingsForm from './AuthSettingsForm';
import BlogSettingsForm from './BlogSettingsForm';
import ContactSettingsForm from './ContactSettingsForm';
import FAQSettingsForm from './FAQSettingsForm';
import HomeSettingsForm from './HomeSettingsForm';
import NotFoundSettingsForm from './NotFoundSettingsForm';
import PrivacyPolicyForm from './PrivacyPolicyForm';
import TermsOfServiceForm from './TermsOfServiceForm';
import PageSwitch from '../components/PageSwitch';
import SaveChangesButton from '../../components/SaveChangesButton';

function TwoPanePage() {
  const dispatch = useDispatch();
  const isMobile = useSelector((state) => state.isMobile);
  const siteColors = useSelector(state => state.siteColors);
  const siteConfigurations = useSelector(state => state.siteConfigurations); 
  const editorScreenSize = useSelector(state => state.editorScreenSize); 
  const [activeElement, setActiveElement] = useState('General Settings');
  const [activeAlert, setActiveAlert] = useState(false);
  const sections = [
    'General Settings', 'Auth Page',
    'Blog Page', 'Contact Page', 'FAQ Page', 'Home Page', '404 Page',
    'Privacy Policy', 'Terms of Service Page'
  ];

  const handleAccordionChange = (section) => {
    if (activeElement !== section) {
      setActiveElement(section);
    }
  };

  return (
    <Box sx={{minHeight: isMobile ? 'calc(100vh - 56px)' : 'calc(100vh - 64px)', width: '100vw', backgroundColor: siteColors.pages_home}}>
      <Box style={{display: 'flex', flexDirection: 'row', height: '100%'}}>
        <Box style={{ display: 'flex', flexDirection: 'column', flex: 4, height: '100%', overflow: 'scroll', position: 'relative' }}>
          {sections.map((section) => (
            <Accordion sx={{ backgroundColor: '#dbdbdb' }} key={section} expanded={activeElement === section} onChange={() => handleAccordionChange(section)}>
              <AccordionSummary>
                <Typography variant='h6'>{section}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {activeElement === 'General Settings' && (<GeneralSettingsForm activeAlert={activeAlert} setActiveAlert={setActiveAlert} />)}
                {activeElement === 'Auth Page' && (<AuthSettingsForm />)}
                {activeElement === 'Blog Page' && (<BlogSettingsForm />)}
                {activeElement === 'Contact Page' && (<ContactSettingsForm />)}
                {activeElement === 'FAQ Page' && (<FAQSettingsForm />)}
                {activeElement === 'Home Page' && (<HomeSettingsForm />)}
                {activeElement === '404 Page' && (<NotFoundSettingsForm />)}
                {activeElement === 'Privacy Policy' && (<PrivacyPolicyForm />)}
                {activeElement === 'Terms of Service Page' && (<TermsOfServiceForm />)}
              </AccordionDetails>
            </Accordion>
          ))}
          <Box sx={{
            position: 'sticky',  
            bottom: 0,           
            left: 10,            
            right: 10,
            zIndex: 1,           
            backgroundColor: '#dbdbdb',
            display: 'flex',
            justifyContent: 'center',
            boxShadow: '0px -4px 8px rgba(0, 0, 0, 0.1)',  
          }}>
            <SaveChangesButton />
          </Box>
        </Box>


        <Box style={{display: 'flex', flexDirection: 'column', flex: 8, alignItems: 'center', height: 'calc(100% - 4rem)', padding: '2rem', overflow: 'scroll'}}>
          {activeElement === 'General Settings' && (
            <Box sx={{display: 'flex', flexDirection: 'column', position: 'relative', backgroundColor: siteColors.site_background, width: editorScreenSize, boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1), 0 -2px 4px rgba(0, 0, 0, 0.1), 2px 0 4px rgba(0, 0, 0, 0.1), -2px 0 4px rgba(0, 0, 0, 0.1)'}}>
              <Navbar />
              <PageSwitch />
              <Footer />
              <AlertComponent activeAlert={activeAlert} />
            </Box>
          )}
          {activeElement === 'Auth Page'&& (<Box sx={{display: 'flex', position: 'relative', flexDirection: 'column', backgroundColor: siteColors.site_background, width: editorScreenSize, boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1), 0 -2px 4px rgba(0, 0, 0, 0.1), 2px 0 4px rgba(0, 0, 0, 0.1), -2px 0 4px rgba(0, 0, 0, 0.1)'}}><AuthPage /></Box>)}
          {activeElement === 'Blog Page'&& (<Box sx={{display: 'flex', position: 'relative', flexDirection: 'column', width: editorScreenSize, boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1), 0 -2px 4px rgba(0, 0, 0, 0.1), 2px 0 4px rgba(0, 0, 0, 0.1), -2px 0 4px rgba(0, 0, 0, 0.1)'}}><BlogPage /></Box>)}
          {activeElement === 'Contact Page'&& (<Box sx={{display: 'flex', position: 'relative', flexDirection: 'column', width: editorScreenSize, boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1), 0 -2px 4px rgba(0, 0, 0, 0.1), 2px 0 4px rgba(0, 0, 0, 0.1), -2px 0 4px rgba(0, 0, 0, 0.1)'}}><ContactPage /></Box>)}
          {activeElement === 'FAQ Page'&& (<Box sx={{display: 'flex', position: 'relative', flexDirection: 'column', width: editorScreenSize, boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1), 0 -2px 4px rgba(0, 0, 0, 0.1), 2px 0 4px rgba(0, 0, 0, 0.1), -2px 0 4px rgba(0, 0, 0, 0.1)'}}><FAQPage /></Box>)}
          {activeElement === 'Home Page'&& (<Box sx={{display: 'flex', position: 'relative', flexDirection: 'column', width: editorScreenSize, boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1), 0 -2px 4px rgba(0, 0, 0, 0.1), 2px 0 4px rgba(0, 0, 0, 0.1), -2px 0 4px rgba(0, 0, 0, 0.1)'}}><HomePage /></Box>)}
          {activeElement === '404 Page'&& (<Box sx={{display: 'flex', position: 'relative', flexDirection: 'column', width: editorScreenSize, boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1), 0 -2px 4px rgba(0, 0, 0, 0.1), 2px 0 4px rgba(0, 0, 0, 0.1), -2px 0 4px rgba(0, 0, 0, 0.1)'}}><NotFoundPage /></Box>)}
          {activeElement === 'Privacy Policy'&& (<Box sx={{display: 'flex', position: 'relative', flexDirection: 'column', width: editorScreenSize, boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1), 0 -2px 4px rgba(0, 0, 0, 0.1), 2px 0 4px rgba(0, 0, 0, 0.1), -2px 0 4px rgba(0, 0, 0, 0.1)'}}><PrivacyPolicyPage /></Box>)}
          {activeElement === 'Terms of Service Page'&& (<Box sx={{display: 'flex', position: 'relative', flexDirection: 'column', width: editorScreenSize, boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1), 0 -2px 4px rgba(0, 0, 0, 0.1), 2px 0 4px rgba(0, 0, 0, 0.1), -2px 0 4px rgba(0, 0, 0, 0.1)'}}><TermsOfServicePage /></Box>)}
        </Box>
      </Box>
    </Box>
  );
}

export default TwoPanePage;
