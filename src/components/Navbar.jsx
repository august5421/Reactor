import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { 
  AppBar, Toolbar, IconButton, Typography, Button, Drawer, List, ListItem, ListItemText, 
  BottomNavigation, BottomNavigationAction, Collapse, 
  Divider,
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
import Cookies from 'js-cookie';

const Navbar = ({ fireRoute }) => {
  const dispatch = useDispatch();
  const isMobile = useSelector((state) => state.isMobile);
  const onDashboard = useSelector((state) => state.onDashboard);
  const siteColors = useSelector(state => state.siteColors);
  const siteConfigurations = useSelector(state => state.siteConfigurations);
  const activePage = useSelector(state => state.activePage);
  const activeUser = useSelector(state => state.activeUser);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [bottomNavValue, setBottomNavValue] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const containerRef = useRef(null);
  
  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  useEffect(()=>{
    if (siteConfigurations.site_useRoutes) { 
        handleNavigation(fireRoute)
    }
  }, [fireRoute])

  const handleNavigation = (page) => {
    setDrawerOpen(false);
    setDropdownOpen(false);
    if (page === 'Dashboard') {
      navigate('/Dashboard');
    } else {
      if (siteConfigurations.site_useRoutes) { 
        if (page === 'Home') {
          navigate('/');
        } else {
          if (page !== 'SingleBlogPage') {
            navigate('/' + page);
          }
        }
      }
    }
  
    dispatch(setActivePage('In', false));
    setTimeout(() => {
      dispatch(setActivePage('Name', page));
      dispatch(setActivePage('In', true));
    }, 350);
  };
  

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = (x) => {
    setAnchorEl(null);
    switch (x) { 
        case 'Profile':
            handleNavigation(x);
            break; 
        case 'Logout': 
            dispatch(setActiveUser({}))
            Cookies.remove('authToken');
            handleNavigation('Home');
            break; 
        default:
            return null;
      }
  };

  const getInitials = (firstName, lastName) => {
    const firstInitial = firstName ? firstName[0].toUpperCase() : "";
    const lastInitial = lastName ? lastName[0].toUpperCase() : "";
    return `${firstInitial}${lastInitial}`;
  };
  
  const renderNavItems = () =>
    siteConfigurations.pages_pagesAvailable.map((page, index) => (
        page.active && page.inPrimaryNav && (
        <>
            {siteConfigurations.navbar_linkAnimation === 'fade' && (
            <Fade
                key={index}
                in={true}
                timeout={{ enter: 1000, exit: 500 }}
                style={{ transitionDelay: `${index * 100}ms` }}
            >
                <Button
                sx={{
                    color: activePage.Name === page.key ? siteColors.navbar_linkActive : siteColors.navbar_link,
                    "&:hover": { color: siteColors.navbar_linkHovered },
                }}
                onClick={() => handleNavigation(page.key)}
                >
                {page.key}
                </Button>
            </Fade>
            )}

            {siteConfigurations.navbar_linkAnimation === 'slide' && (
            <Slide
                key={index}
                container={containerRef.current}
                direction={siteConfigurations.navbar_linkAnimationDirection || 'up'}
                in={true}
                timeout={{ enter: 1000, exit: 500 }}
                style={{ transitionDelay: `${index * 100}ms` }}
            >
                <Button
                sx={{
                    color: activePage.Name === page.key ? siteColors.navbar_linkActive : siteColors.navbar_link,
                    "&:hover": { color: siteColors.navbar_linkHovered },
                }}
                onClick={() => handleNavigation(page.key)}
                >
                {page.key}
                </Button>
            </Slide>
            )}

            {siteConfigurations.navbar_linkAnimation === 'zoom' && (
            <Zoom
                key={index}
                in={true}
                timeout={{ enter: 1000, exit: 500 }}
                style={{ transitionDelay: `${index * 100}ms` }}
            >
                <Button
                sx={{
                    color: activePage.Name === page.key ? siteColors.navbar_linkActive : siteColors.navbar_link,
                    "&:hover": { color: siteColors.navbar_linkHovered },
                }}
                onClick={() => handleNavigation(page.key)}
                >
                {page.key}
                </Button>
            </Zoom>
            )}
        </>
    )
));


  const renderUserOptions = (dark) => {
    return (
      <>
        {siteConfigurations.pages_pagesAvailable.map((page) => (
          page.active && page.inAuthSection && (
            <MenuItem
              key={page.key}  
              onClick={() => handleCloseMenu(page.key)}
              sx={{
                color: activePage.Name === page.key ? siteColors.navbar_linkActive : (dark ? siteColors.site_darkFont : siteColors.navbar_link),
              }}
            >
              {page.key}
            </MenuItem>
          )
        ))}
        <MenuItem onClick={() => handleCloseMenu('Logout')}>Logout</MenuItem>
      </>
    );
  };
  

  const renderLoginButton = () =>
    activePage.Name !== "Auth" && (
      <Button
        sx={{
          margin: '1rem',
          color: siteColors.navbar_authButtonText,
          backgroundColor: siteColors.navbar_authButtonBackground,
          "&:hover": { backgroundColor: siteColors.navbar_authButtonHover },
        }}
        onClick={() => handleNavigation("Auth")}
      >
        Login
      </Button>
    );

  return (
    <>
      <AppBar sx={{ backgroundColor: siteColors.navbar_background, overflow: 'hidden'}} position="static" ref={containerRef}> 
        <Toolbar key="static">
          
          {siteConfigurations.navbar_logoAnimation === "fade" && (
            <Fade
                in={true}
                timeout={{ enter: 500, exit: 500 }}
            >
                <Typography variant="h4" style={{ flexGrow: 1, color: siteColors.navbar_title }}>
                    {siteConfigurations.site_appName}
                </Typography>
            </Fade>
          )}

          {siteConfigurations.navbar_logoAnimation === "slide" && (
            <Slide
                container={containerRef.current}
                direction={siteConfigurations.navbar_logoAnimationDirection || 'right'}
                in={true}
                timeout={{ enter: 500, exit: 500 }}
            >
                <Typography variant="h4" style={{ flexGrow: 1, color: siteColors.navbar_title }}>
                    {siteConfigurations.site_appName}
                </Typography>
            </Slide>
          )}

          {siteConfigurations.navbar_logoAnimation === "zoom" && (
            <Zoom
                in={true}
                timeout={{ enter: 500, exit: 500 }}
            >
                <Typography variant="h4" style={{ flexGrow: 1, color: siteColors.navbar_title }}>
                    {siteConfigurations.site_appName}
                </Typography>
            </Zoom>
          )}

          {!isMobile && renderNavItems()}

          {isMobile && siteConfigurations.navbar_mobileAmeliorator === "drawer" && (
            <>
              <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
                <MenuIcon />
              </IconButton>
              <Drawer sx={{position: 'relative'}} anchor={siteConfigurations.navbar_mobileNavDirection} open={drawerOpen} onClose={toggleDrawer(false)}>
                <CloseIcon sx={{position: 'absolute', top: 15, right: 15, zIndex: 500}} onClick={toggleDrawer(false)} />
                <List sx={{ width: 250 }}>
                    {siteConfigurations.pages_pagesAvailable.map((page) => (
                        page.active && page.inPrimaryNav && (
                            <ListItem key={page.id} button onClick={() => handleNavigation(page.key)}>
                                <ListItemText
                                primary={page.key}
                                sx={{ color: activePage.Name === page.key ? siteColors.navbar_linkActive : siteColors.site_darkFont }}
                                />
                            </ListItem>
                        )
                    ))}
                    <Divider />
                    {activeUser?.email ? renderUserOptions(true) : renderLoginButton()}
                </List>
              </Drawer>
            </>
          )}

          {isMobile && siteConfigurations.navbar_mobileAmeliorator === "dropdown" && (
            <>
              <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => setDropdownOpen(!dropdownOpen)}>
                {dropdownOpen ? (<CloseIcon />) : (<MenuIcon />)}
              </IconButton>
            </>
          )}

          {(siteConfigurations.navbar_mobileAmeliorator === "bottomNav" || !isMobile) && (
            activeUser.email ? (
                <>
                    <IconButton sx={{padding: '0px', marginLeft: '1rem'}} onClick={handleOpenMenu}>
                        {siteConfigurations.navbar_avatarAnimation === "fade" && (
                            <Fade
                                in={true}
                                timeout={{ enter: 500, exit: 500 }}
                            >
                                <Avatar>
                                    {getInitials(activeUser.firstName, activeUser.lastName)}
                                </Avatar>
                            </Fade>
                        )}
                        {siteConfigurations.navbar_avatarAnimation === "slide" && (
                            <Slide
                                container={containerRef.current}
                                direction={siteConfigurations.navbar_avatarAnimationDirection || 'left'}
                                in={true}
                                timeout={{ enter: 500, exit: 500 }}
                            >
                                <Avatar>
                                    {getInitials(activeUser.firstName, activeUser.lastName)}
                                </Avatar>
                            </Slide>
                        )}
                        {siteConfigurations.navbar_avatarAnimation === "zoom" && (
                            <Zoom
                                in={true}
                                timeout={{ enter: 500, exit: 500 }}
                            >
                                <Avatar>
                                    {getInitials(activeUser.firstName, activeUser.lastName)}
                                </Avatar>
                            </Zoom>
                        )}
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleCloseMenu}
                        transformOrigin={{ vertical: "top", horizontal: "right" }}
                        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    >
                        {renderUserOptions(true)}
                    </Menu>
                </>
            ) : (
              activePage.Name !== 'Auth' && (
                (siteConfigurations.navbar_avatarAnimation === "fade" && (
                  <Fade
                    in={true}
                    timeout={{ enter: 500, exit: 500 }}
                  >
                    <Button
                      sx={{
                        color: siteColors.navbar_authButtonText,
                        backgroundColor: siteColors.navbar_authButtonBackground,
                        marginLeft: '1rem',
                        '&:hover': {
                          backgroundColor: siteColors.navbar_authButtonHover,
                        },
                      }}
                      variant="contained"
                      onClick={() => handleNavigation('Auth')}
                    >
                      Login
                    </Button>
                  </Fade>
                )) ||
                (siteConfigurations.navbar_avatarAnimation === "slide" && (
                  <Slide
                    container={containerRef.current}
                    direction={siteConfigurations.navbar_avatarAnimationDirection || 'left'}
                    in={true}
                    timeout={{ enter: 500, exit: 500 }}
                  >
                    <Button
                      sx={{
                        color: siteColors.navbar_authButtonText,
                        backgroundColor: siteColors.navbar_authButtonBackground,
                        marginLeft: '1rem',
                        '&:hover': {
                          backgroundColor: siteColors.navbar_authButtonHover,
                        },
                      }}
                      variant="contained"
                      onClick={() => handleNavigation('Auth')}
                    >
                      Login
                    </Button>
                  </Slide>
                )) ||
                (siteConfigurations.navbar_avatarAnimation === "zoom" && (
                  <Zoom
                    in={true}
                    timeout={{ enter: 500, exit: 500 }}
                  >
                    <Button
                      sx={{
                        color: siteColors.navbar_authButtonText,
                        backgroundColor: siteColors.navbar_authButtonBackground,
                        marginLeft: '1rem',
                        '&:hover': {
                          backgroundColor: siteColors.navbar_authButtonHover,
                        },
                      }}
                      variant="contained"
                      onClick={() => handleNavigation('Auth')}
                    >
                      Login
                    </Button>
                  </Zoom>
                ))
              )              
            )
          )}

        </Toolbar>

        {isMobile && siteConfigurations.navbar_mobileAmeliorator === "dropdown" && (
          <Collapse in={dropdownOpen} timeout="auto" unmountOnExit>
            <List sx={{ backgroundColor: siteColors.navbar_background }}>
            {siteConfigurations.pages_pagesAvailable.map((page) => (
                page.active && page.inPrimaryNav && (
                    <ListItem key={page.id} button onClick={() => handleNavigation(page.key)}>
                    <ListItemText
                        primary={page.key}
                        sx={{ color: activePage.Name === page.key ? siteColors.navbar_linkActive : siteColors.navbar_link }}
                    />
                    </ListItem>
                )
            ))}
            <Divider />
            {activeUser?.email ? renderUserOptions() : renderLoginButton()}
            </List>
          </Collapse>
        )}


      </AppBar>

      {isMobile && siteConfigurations.navbar_mobileAmeliorator === "bottomNav" && (
        <BottomNavigation
          sx={{ position: onDashboard ? "absolute" : "fixed", bottom: 0, width: "100%", zIndex: 500, backgroundColor: siteColors.navbar_background }}
          value={bottomNavValue}
          onChange={(event, newValue) => {
            setBottomNavValue(newValue);
            handleNavigation(siteConfigurations.pages_pagesAvailable[newValue]?.key);
          }}
        >
          {siteConfigurations.pages_pagesAvailable.map((page, index) => (
            page.active && page.inPrimaryNav && (
                <BottomNavigationAction
                icon={<HomeIcon />}
                key={page.id}
                label={page.key}
                sx={{
                    color: activePage.Name === page.key ? siteColors.navbar_linkActive : siteColors.navbar_link,
                }}
                />
            )
          ))}
        </BottomNavigation>
      )}
      
    </>
  );
};

export default Navbar;
