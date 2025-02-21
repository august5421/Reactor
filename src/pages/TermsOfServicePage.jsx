import { useSelector } from 'react-redux';
import { Box, Button, Divider, Typography, Drawer, SpeedDial, SpeedDialIcon, SpeedDialAction } from '@mui/material';
import DOMPurify from 'dompurify';
import { useState, useRef, useEffect } from 'react';

function TermsOfServicePage() {
  const isMobile = useSelector((state) => state.isMobile);
  const isLarge = useSelector((state) => state.isLarge);
  const siteColors = useSelector((state) => state.siteColors);
  const siteConfigurations = useSelector((state) => state.siteConfigurations);
  const onDashboard = useSelector((state) => state.onDashboard);

  const [drawerOpen, setDrawerOpen] = useState(false);

  const headingRefs = useRef([]);

  useEffect(() => {
    headingRefs.current = headingRefs.current.slice(0, siteConfigurations.termsOfService_pageBody.length);
  }, [siteConfigurations.termsOfService_pageBody]);

  const sanitizeHtml = (x) => DOMPurify.sanitize(x);

  const scrollToHeading = (index) => {
    if (headingRefs.current[index]) {
      headingRefs.current[index].scrollIntoView({ behavior: 'smooth', block: 'start' });
      setDrawerOpen(false); 
    }
  };

  const actions = siteConfigurations.termsOfService_pageBody
    .map((pagePart, index) => {
      if (pagePart.key === 'heading') {
        return { title: pagePart.value, index };
      }
      return null;
    })
    .filter(Boolean);

  return (
    <Box
      sx={{
        minHeight: isMobile ? 'calc(100vh - 56px - 4rem)' : 'calc(100vh - 64px - 4rem)',
        width: onDashboard ? "calc(100% - 4rem)" : "calc(100vw - 4rem)",
        padding: '2rem',
        backgroundColor: siteColors.pages_termsOfService,
      }}
    >
      <Box style={{ display: 'flex', flexDirection: 'row' }}>
        <Box style={{ display: 'flex', flexDirection: 'column', flex: 8, paddingRight: siteConfigurations.termsOfService_tableOfContentsAlignment === 'left' ? null : '2rem', order: siteConfigurations.termsOfService_tableOfContentsAlignment === 'left' ? 2 : 1 }}>
          <Typography variant="h5" sx={{ marginBottom: '1rem', color: siteColors.termsOfService_title }}>
            {siteConfigurations.termsOfService_termsOfServiceTitle}
          </Typography>
          <Typography variant="caption" sx={{ marginBottom: '1rem', color: siteColors.site_darkFont }}>
            Last Updates: {siteConfigurations.termsOfService_lastUpdated}
          </Typography>
          <Divider sx={{ margin: '1rem 0px' }} />
          {siteConfigurations.termsOfService_pageBody.map((pagePart, index) => {
            if (pagePart.key === 'heading') {
              return (
                <Typography
                  key={index}
                  ref={(el) => (headingRefs.current[index] = el)}
                  variant="h6"
                  sx={{
                    marginTop: '1rem',
                    color: siteColors.termsOfService_heading,
                  }}
                >
                  {pagePart.value}
                </Typography>
              );
            } else {
              return (
                <Typography
                  key={index}
                  sx={{
                    marginTop: '1rem',
                    color: siteColors.termsOfService_body,
                    fontSize: '1rem',
                  }}
                  dangerouslySetInnerHTML={{ __html: sanitizeHtml(pagePart.value) }}
                />
              );
            }
          })}
        </Box>
        
        <Box
          style={{
            display: isLarge ? 'flex' : 'none',
            flexDirection: 'column',
            flex: 4,
            position: 'sticky',
            top: '1rem',
            alignSelf: 'flex-start',
            backgroundColor: siteColors.termsOfService_tableOfContentsBackground,
            padding: '1rem',
            marginRight: siteConfigurations.termsOfService_tableOfContentsAlignment === 'left' ? '2rem' : null,
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            borderRadius: '8px',
            order: siteConfigurations.termsOfService_tableOfContentsAlignment === 'right' ? 2 : 1
          }}
        >
          <Typography variant="h6" sx={{ marginBottom: '1rem', color: siteColors.termsOfService_tableOfContentsHeading }}>
            {siteConfigurations.termsOfService_tableOfContentsTitle}
          </Typography>
          {actions.map(({ title, index }) => (
            <Button
              key={index}
              onClick={() => scrollToHeading(index)}
              sx={{
                textTransform: 'none',
                justifyContent: 'flex-start',
                color: siteColors.site_darkFont,
                marginBottom: '0.5rem',
                backgroundColor: 'transparent',
                '&:hover': {
                  backgroundColor: siteColors.site_hoverBackground,
                },
              }}
            >
              {title}
            </Button>
          ))}
        </Box>
      </Box>

      {!isLarge && (
        <SpeedDial
          ariaLabel="Table of Contents"
          sx={{
            position: 'fixed',
            bottom: 16,
            right: 16,
          }}
          icon={<SpeedDialIcon />}
          onClick={() => setDrawerOpen(true)}
          FabProps={{
            sx: {
              backgroundColor: siteColors.termsOfService_mobileButtonBackground, 
            }
          }}
        />
      )}

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box sx={{ padding: '1rem', width: 250 }}>
          <Typography variant="h6" sx={{ marginBottom: '1rem', color: siteColors.termsOfService_tableOfContentsHeading }}>
            Table of Contents
          </Typography>
          {actions.map(({ title, index }) => (
            <Button
              key={index}
              onClick={() => scrollToHeading(index)}
              sx={{
                textTransform: 'none',
                justifyContent: 'flex-start',
                color: siteColors.site_darkFont,
                marginBottom: '0.5rem',
                backgroundColor: 'transparent',
                '&:hover': {
                  backgroundColor: siteColors.site_hoverBackground,
                },
              }}
            >
              {title}
            </Button>
          ))}
        </Box>
      </Drawer>
    </Box>
  );
}

export default TermsOfServicePage;
