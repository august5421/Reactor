import { useSelector } from 'react-redux';
import { Box, Typography, Divider, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DOMPurify from 'dompurify';
import { useState } from 'react';

function FAQPage() {
  const isMobile = useSelector((state) => state.isMobile);
  const siteColors = useSelector((state) => state.siteColors);
  const siteConfigurations = useSelector((state) => state.siteConfigurations);
  const onDashboard = useSelector((state) => state.onDashboard);

  const sanitizeHtml = (x) => DOMPurify.sanitize(x);

  return (
    <Box
      sx={{
        minHeight: isMobile ? 'calc(100vh - 56px - 4rem)' : 'calc(100vh - 64px - 4rem)',
        width: onDashboard ? "calc(100% - 4rem)" : "calc(100vw - 4rem)",
        padding: '2rem',
        backgroundColor: siteColors.pages_faq,
      }}
    >
      <Typography variant="h5" sx={{ marginBottom: '1rem', color: siteColors.faq_title }}>
        {siteConfigurations.faq_termsOfServiceTitle}
      </Typography>
      <Typography variant="caption" sx={{ marginBottom: '1rem', color: siteColors.site_darkFont }}>
        Last Updates: {siteConfigurations.faq_lastUpdated}
      </Typography>
      <Divider sx={{ margin: '1rem 0' }} />

      {siteConfigurations.faq_pageBody.map((pagePart, index) => (
        pagePart.key === 'heading' && (
          <Accordion key={index}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              sx={{ backgroundColor: siteColors.faq_questionBackround, color: siteColors.faq_questionHeading }}
            >
              <Typography>{pagePart.value}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {siteConfigurations.faq_pageBody[index + 1]?.key !== 'heading' && (
                <Typography
                  sx={{ color: siteColors.site_darkFont, fontSize: '1rem' }}
                  dangerouslySetInnerHTML={{ __html: sanitizeHtml(siteConfigurations.faq_pageBody[index + 1]?.value || '') }}
                />
              )}
            </AccordionDetails>
          </Accordion>
        )
      ))}
    </Box>
  );
}

export default FAQPage;
