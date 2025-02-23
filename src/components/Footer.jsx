import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { 
  AppBar, Toolbar, IconButton, Typography, Button, Drawer, List, ListItem, ListItemText, 
  BottomNavigation, BottomNavigationAction, Collapse, 
  Avatar,
  MenuItem,
  Menu,
  Fade,
  Slide,
  Zoom
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from '@mui/icons-material/Home';
import CloseIcon from '@mui/icons-material/Close';
import { setActivePage, setActiveUser } from "../actions/actions";
import { useNavigate } from "react-router";
import { Box } from "@mui/system";
import SocialBar from "./SocialBar";

const Footer = () => {
  const dispatch = useDispatch();
  const isMobile = useSelector((state) => state.isMobile);
  const isTablet = useSelector((state) => state.isTablet);
  const isLarge = useSelector((state) => state.isLarge);
  const onDashboard = useSelector((state) => state.onDashboard);
  const siteColors = useSelector(state => state.siteColors);
  const siteConfigurations = useSelector(state => state.siteConfigurations);
  const activePage = useSelector(state => state.activePage);

  const navigate = useNavigate();
  const containerRef = useRef(null);

  function camelCaseToSpaces(str) {
    return str.replace(/([a-z0-9])([A-Z])/g, '$1 $2');
  }

  const handleNavigation = (page) => {
    if (siteConfigurations.site_useRoutes) { 
        if (page === 'Home') {
            navigate('/')
        } else {
            navigate('/' + page)
        }
    }
    dispatch(setActivePage('In', false));
    setTimeout(() => {
      dispatch(setActivePage('Name', page));
      dispatch(setActivePage('In', true));
    }, 350);
  };
  
  const renderAuxilaryNav = () => {
    const activeAuxiliaryNavPages = siteConfigurations.pages_pagesAvailable.filter(page => page.active && page.inAuxilaryNav);
  
    return activeAuxiliaryNavPages.map((page, index) => (
      isLarge ? (
        <Box key={index} style={{ display: 'flex', flexDirection: 'row' }}>
            <MenuItem
            onClick={() => handleNavigation(page.key)}
            sx={{
                padding: '0px',
                color: activePage.Name === page.key ? siteColors.footer_linkActive : siteColors.footer_link,
                "&:hover": { color: siteColors.footer_linkHovered },
            }}
            >
            {page.key.replace(/([a-z0-9])([A-Z])/g, '$1 $2')}
            {index < activeAuxiliaryNavPages.length - 1 && (isLarge && <div style={{marginBottom: '5px'}}>&nbsp;&nbsp;|&nbsp;&nbsp;</div>)}
            </MenuItem>
        </Box>
      ) : (
        <Button
            sx={{
                color: activePage.Name === page.key ? siteColors.footer_linkActive : siteColors.footer_link,
                "&:hover": { color: siteColors.footer_linkHovered },
                justifyContent: 'flex-start',
            }}
            onClick={() => handleNavigation(page.key)}
            >
            {camelCaseToSpaces(page.key)}
        </Button>
      )
    ));
  };
  

  const renderNavItems = () =>
    siteConfigurations.pages_pagesAvailable.map((page, index) => (
        page.active && page.inPrimaryNav && (
        <Box key={`foot-${index}-${page}`}>
            {siteConfigurations.footer_linkAnimation === 'fade' && (
            <Fade
                key={index}
                in={true}
                timeout={{ enter: 1000, exit: 500 }}
                style={{ transitionDelay: `${index * 100}ms` }}
            >
                <Button
                sx={{
                    color: activePage.Name === page.key ? siteColors.footer_linkActive : siteColors.footer_link,
                    "&:hover": { color: siteColors.footer_linkHovered },
                    justifyContent: !isLarge ? 'flex-start' : '',
                }}
                onClick={() => handleNavigation(page.key)}
                >
                {page.key}
                </Button>
            </Fade>
            )}

            {siteConfigurations.footer_linkAnimation === 'slide' && (
            <Slide
                key={index}
                container={containerRef.current}
                direction={siteConfigurations.footer_linkAnimationDirection || 'up'}
                in={true}
                timeout={{ enter: 1000, exit: 500 }}
                style={{ transitionDelay: `${index * 100}ms` }}
            >
                <Button
                sx={{
                    color: activePage.Name === page.key ? siteColors.footer_linkActive : siteColors.footer_link,
                    "&:hover": { color: siteColors.footer_linkHovered },
                    justifyContent: !isLarge ? 'flex-start' : '',
                }}
                onClick={() => handleNavigation(page.key)}
                >
                {page.key}
                </Button>
            </Slide>
            )}

            {siteConfigurations.footer_linkAnimation === 'zoom' && (
            <Zoom
                key={index}
                in={true}
                timeout={{ enter: 1000, exit: 500 }}
                style={{ transitionDelay: `${index * 100}ms` }}
            >
                <Button
                sx={{
                    color: activePage.Name === page.key ? siteColors.footer_linkActive : siteColors.footer_link,
                    "&:hover": { color: siteColors.footer_linkHovered },
                    justifyContent: !isLarge ? 'flex-start' : '',
                }}
                onClick={() => handleNavigation(page.key)}
                >
                {page.key}
                </Button>
            </Zoom>
            )}
        </Box>
    )
));

  return (
    <>
      <AppBar sx={{ backgroundColor: siteColors.footer_background, overflow: 'hidden', height: isLarge ? '120px' : 'auto'}} position="static" ref={containerRef}> 
        <Toolbar sx={{height: isLarge ? '120px' : 'auto', marginBottom: siteConfigurations.navbar_mobileAmeliorator === 'bottomNav' && isMobile && '56px'}}>
            {isLarge ? (
                <Box style={{display: 'flex', flexDirection: 'row', flex: 1, height: '120px'}}>
                    <Box style={{display: 'flex', flexDirection: 'column', margin: '20px 0px', justifyContent: 'space-between'}}>
                        <Box style={{display: 'flex', flexDirection: 'row', margin: '0px', alignItems: 'center'}}>
                            {renderNavItems()}
                        </Box>
                        <Box style={{display: 'flex', flexDirection: 'row', margin: '0px', alignItems: 'center', paddingLeft: '8px'}}>
                            <Typography variant="caption">{siteConfigurations.footer_copywrite}</Typography>
                            <div style={{marginBottom: '5px'}}>&nbsp;&nbsp;|&nbsp;&nbsp;</div>
                            {renderAuxilaryNav()}
                        </Box>
                    </Box>
                    <Box style={{display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'flex-end', flexWrap: 'wrap'}}>
                        <SocialBar />
                    </Box>
                </Box>
            ) : (
                <>
                    <Box style={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="h4" sx={{ margin: '2rem 0px 1rem 0px' }}>
                        {siteConfigurations.site_appName}
                    </Typography>
                    <Typography variant="h6">
                        {siteConfigurations.footer_mobileNavPrimaryHeading.replace(/\b\w/g, char => char.toUpperCase())}
                    </Typography>
                    {renderNavItems()}
                    <Typography variant="h6" sx={{ marginTop: '2rem' }}>
                        {siteConfigurations.footer_mobileNavAuxilaryHeading.replace(/\b\w/g, char => char.toUpperCase())}
                    </Typography>
                    {renderAuxilaryNav()}
                    {isMobile && (
                        <Box style={{display: 'flex', flexDirection: 'row', marginTop: '2rem', justifyContent: 'center', minWidth: onDashboard ? 'calc(599px - 4rem)' : 'calc(100vw - 32px)'}}>
                            <SocialBar />
                        </Box>
                    )}
                    <Box
                        style={{
                        display: 'flex',
                        flexDirection: 'row',
                        margin: '2rem 0px',
                        minWidth: onDashboard ? 'calc(599px - 4rem)' : 'calc(100vw - 48px)',
                        justifyContent: isMobile ? 'center' : 'space-between'
                        }}
                    >
                        <Box style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <Typography variant="caption">{siteConfigurations.footer_copywrite}</Typography>
                        </Box>
                        {isTablet && !isMobile && (
                            <Box style={{ display: 'flex', flexDirection: 'column' }}>
                                <SocialBar />
                            </Box>
                        )}
                    </Box>
                    </Box>
                </>
            )}
        </Toolbar>

      </AppBar>

    </>
  );
};

export default Footer;
