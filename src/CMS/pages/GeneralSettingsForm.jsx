import { useSelector, useDispatch } from 'react-redux';
import { Box, TextField, Typography, MenuItem, Select, FormControl, InputLabel, Collapse, ListSubheader, FormControlLabel, Switch } from '@mui/material';
import { updateSiteConfigurationField, updateSiteColorField } from '../../actions/actions';
import ColorPickerInput from '../components/ColorPickerInput';
import { useEffect, useRef } from 'react';

function GeneralSettingsForm({setActiveAlert, activeAlert}) {
  const dispatch = useDispatch();
  const siteConfigurations = useSelector(state => state.siteConfigurations);
  const siteColors = useSelector(state => state.siteColors);

  const handleFieldChange = (fieldName, value) => {
    dispatch(updateSiteConfigurationField(fieldName, value));
  };

  const handleColorChange = (color, fieldName) => {
    dispatch(updateSiteColorField(fieldName, color));
  };
  
  const handleToggle = (event) => {
    setActiveAlert(event.target.checked);
  };

  return (
    <Box style={{ display: 'flex', flexDirection: 'column' }}>
      <TextField
        label="App Name"
        variant="outlined"
        fullWidth
        size="small"
        value={siteConfigurations?.site_appName || ''}
        onChange={(event) => handleFieldChange('site_appName', event.target.value)}
      />

      <Box style={{ marginTop: '16px' }}>
        <ColorPickerInput
          color={siteColors?.site_background || ''}
          label="App Background Color"
          onColorChange={(color) => handleColorChange(color, 'site_background')}
        />
      </Box>
      <Box style={{display: 'flex', flexDirection: 'row', marginTop: '16px', justifyContent: 'space-between'}}>
        <ColorPickerInput
          color={siteColors?.site_darkFont || ''}
          label="Dark Font Color"
          onColorChange={(color) => handleColorChange(color, 'site_darkFont')}
        />
        <ColorPickerInput
          color={siteColors?.site_lightFont || ''}
          label="Light Font Color"
          onColorChange={(color) => handleColorChange(color, 'site_lightFont')}
        />
      </Box>
      <Box style={{display: 'flex', flexDirection: 'row', marginTop: '16px', justifyContent: 'space-between'}}>
        <FormControlLabel
          control={
            <Switch
              checked={Boolean(siteConfigurations?.site_useRoutes)} 
              onChange={(event) => handleFieldChange('site_useRoutes', event.target.checked)}
              color="primary"
            />
          }
          label="Use Routes"
        />
      </Box>
      <Typography variant='caption'>This setting controls whether the site uses web addresses (URLs) to identify pages. When it's turned on, pages are accessed using clean, readable links like <i>mywebsite.com/about-us</i></Typography>
      <Typography style={{ marginTop: '16px', marginBottom: '16px' }} variant="subtitle1">Page Settings</Typography>
      <FormControl fullWidth size="small">
        <InputLabel id="page-transition">Page Transition</InputLabel>
        <Select
          labelId="page-transition"
          value={siteConfigurations?.pages_transition || "drawer"}
          onChange={(event) => handleFieldChange('pages_transition', event.target.value)}
          label="Page Transition"
        >
          <MenuItem value="fade">Cross-Fade</MenuItem>
          <MenuItem value="collapse">Collapse</MenuItem>
          <MenuItem value="jawa">Custom Animations</MenuItem>
        </Select>
      </FormControl>

      <Collapse in={siteConfigurations?.pages_transition === 'collapse'}>
        <FormControl fullWidth size="small" style={{ marginTop: '16px' }}>
          <InputLabel id="page-transition">Page Transition Direction</InputLabel>
          <Select
            labelId="page-transition-direction"
            value={siteConfigurations?.pages_orientation || "vertical"}
            onChange={(event) => handleFieldChange('pages_orientation', event.target.value)}
            label="Page Transition Direction"
          >
            <MenuItem value="vertical">Vertical</MenuItem>
            <MenuItem value="horizontal">Horizontal</MenuItem>
          </Select>
        </FormControl>
      </Collapse>

      <Collapse in={siteConfigurations?.pages_transition === 'jawa'}>
        <FormControl fullWidth size="small" style={{ marginTop: '16px' }}>
          <InputLabel id="page-transition-custome-animation-in-label">Custom Page Animation In</InputLabel>
          <Select
            labelId="page-transition-custom-animation-in-label"
            value={siteConfigurations?.pages_animationIn || 'animate__fadeIn'}
            onChange={(event) => handleFieldChange('pages_animationIn', event.target.value)}
            label="Custom Page Animation In"
          >
            <ListSubheader>Back Ins</ListSubheader>
            <MenuItem value="animate__backInDown">Back In Down</MenuItem>
            <MenuItem value="animate__backInLeft">Back In Left</MenuItem>
            <MenuItem value="animate__backInRight">Back In Right</MenuItem>
            <MenuItem value="animate__backInUp">Back In Up</MenuItem>

            <ListSubheader>Bounce Ins</ListSubheader>
            <MenuItem value="animate__bounceIn">Bounce In</MenuItem>
            <MenuItem value="animate__bounceInDown">Bounce In Down</MenuItem>
            <MenuItem value="animate__bounceInLeft">Bounce In Left</MenuItem>
            <MenuItem value="animate__bounceInRight">Bounce In Right</MenuItem>
            <MenuItem value="animate__bounceInUp">Bounce In Up</MenuItem>

            <ListSubheader>Fade Ins</ListSubheader>
            <MenuItem value="animate__fadeIn">Fade In</MenuItem>
            <MenuItem value="animate__fadeInDown">Fade In Down</MenuItem>
            <MenuItem value="animate__fadeInLeft">Fade In Left</MenuItem>
            <MenuItem value="animate__fadeInRight">Fade In Right</MenuItem>
            <MenuItem value="animate__fadeInUp">Fade In Up</MenuItem>
            <MenuItem value="animate__fadeInDownBig">Fade In Down Big</MenuItem>
            <MenuItem value="animate__fadeInLeftBig">Fade In Left Big</MenuItem>
            <MenuItem value="animate__fadeInRightBig">Fade In Right Big</MenuItem>
            <MenuItem value="animate__fadeInUpBig">Fade In Up Big</MenuItem>
            <MenuItem value="animate__fadeInTopLeft">Fade In Top Left</MenuItem>
            <MenuItem value="animate__fadeInTopRight">Fade In Top Right</MenuItem>
            <MenuItem value="animate__fadeInBottomLeft">Fade In Bottom Left</MenuItem>
            <MenuItem value="animate__fadeInBottomRight">Fade In Bottom Right</MenuItem>

            <ListSubheader>Flip Ins</ListSubheader>
            <MenuItem value="animate__flip">Flip</MenuItem>
            <MenuItem value="animate__flipInX">Flip In X</MenuItem>
            <MenuItem value="animate__flipInY">Flip In Y</MenuItem>

            <ListSubheader>LightSpeed Ins</ListSubheader>
            <MenuItem value="animate__lightSpeedInRight">Light Speed In Right</MenuItem>
            <MenuItem value="animate__lightSpeedInLeft">Light Speed In Left</MenuItem>

            <ListSubheader>Rotate Ins</ListSubheader>
            <MenuItem value="animate__rotateIn">Rotate In</MenuItem>
            <MenuItem value="animate__rotateInDownLeft">Rotate In Down Left</MenuItem>
            <MenuItem value="animate__rotateInDownRight">Rotate In Down Right</MenuItem>
            <MenuItem value="animate__rotateInUpLeft">Rotate In Up Left</MenuItem>
            <MenuItem value="animate__rotateInUpRight">Rotate In Up Right</MenuItem>

            <ListSubheader>Slide Ins</ListSubheader>
            <MenuItem value="animate__slideInUp">Slide In Up</MenuItem>
            <MenuItem value="animate__slideInDown">Slide In Down</MenuItem>
            <MenuItem value="animate__slideInLeft">Slide In Left</MenuItem>
            <MenuItem value="animate__slideInRight">Slide In Right</MenuItem>

            <ListSubheader>Zoom Ins</ListSubheader>
            <MenuItem value="animate__zoomIn">Zoom In</MenuItem>
            <MenuItem value="animate__zoomInDown">Zoom In Down</MenuItem>
            <MenuItem value="animate__zoomInLeft">Zoom In Left</MenuItem>
            <MenuItem value="animate__zoomInRight">Zoom In Right</MenuItem>
            <MenuItem value="animate__zoomInUp">Zoom In Up</MenuItem>

            <ListSubheader>Specials</ListSubheader>
            <MenuItem value="animate__jackInTheBox">Jack In The Box</MenuItem>
            <MenuItem value="animate__rollIn">Roll In</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth size="small" style={{ marginTop: '16px' }}>
          <InputLabel id="page-transition-custome-animation-out-label">Custom Page Animation Out</InputLabel>
          <Select
            labelId="page-transition-custom-animation-out-label"
            value={siteConfigurations?.pages_animationOut || 'animate__fadeOut'}
            onChange={(event) => handleFieldChange('pages_animationOut', event.target.value)}
            label="Custom Page Animation Out"
          >
            <ListSubheader>Back Outs</ListSubheader>
            <MenuItem value="animate__backOutDown">Back Out Down</MenuItem>
            <MenuItem value="animate__backOutLeft">Back Out Left</MenuItem>
            <MenuItem value="animate__backOutRight">Back Out Right</MenuItem>
            <MenuItem value="animate__backOutUp">Back Out Up</MenuItem>

            <ListSubheader>Bounce Outs</ListSubheader>
            <MenuItem value="animate__bounceOut">Bounce Out</MenuItem>
            <MenuItem value="animate__bounceOutDown">Bounce Out Down</MenuItem>
            <MenuItem value="animate__bounceOutLeft">Bounce Out Left</MenuItem>
            <MenuItem value="animate__bounceOutRight">Bounce Out Right</MenuItem>
            <MenuItem value="animate__bounceOutUp">Bounce Out Up</MenuItem>

            <ListSubheader>Fade Outs</ListSubheader>
            <MenuItem value="animate__fadeOut">Fade Out</MenuItem>
            <MenuItem value="animate__fadeOutDown">Fade Out Down</MenuItem>
            <MenuItem value="animate__fadeOutLeft">Fade Out Left</MenuItem>
            <MenuItem value="animate__fadeOutRight">Fade Out Right</MenuItem>
            <MenuItem value="animate__fadeOutUp">Fade Out Up</MenuItem>
            <MenuItem value="animate__fadeOutDownBig">Fade Out Down Big</MenuItem>
            <MenuItem value="animate__fadeOutLeftBig">Fade Out Left Big</MenuItem>
            <MenuItem value="animate__fadeOutRightBig">Fade Out Right Big</MenuItem>
            <MenuItem value="animate__fadeOutUpBig">Fade Out Up Big</MenuItem>
            <MenuItem value="animate__fadeOutTopLeft">Fade Out Top Left</MenuItem>
            <MenuItem value="animate__fadeOutTopRight">Fade Out Top Right</MenuItem>
            <MenuItem value="animate__fadeOutBottomLeft">Fade Out Bottom Left</MenuItem>
            <MenuItem value="animate__fadeOutBottomRight">Fade Out Bottom Right</MenuItem>

            <ListSubheader>Flip Outs</ListSubheader>
            <MenuItem value="animate__flipOutX">Flip Out X</MenuItem>
            <MenuItem value="animate__flipOutY">Flip Out Y</MenuItem>

            <ListSubheader>LightSpeed Outs</ListSubheader>
            <MenuItem value="animate__lightSpeedOutRight">Light Speed Out Right</MenuItem>
            <MenuItem value="animate__lightSpeedOutLeft">Light Speed Out Left</MenuItem>

            <ListSubheader>Rotate Outs</ListSubheader>
            <MenuItem value="animate__rotateOut">Rotate Out</MenuItem>
            <MenuItem value="animate__rotateOutDownLeft">Rotate Out Down Left</MenuItem>
            <MenuItem value="animate__rotateOutDownRight">Rotate Out Down Right</MenuItem>
            <MenuItem value="animate__rotateOutUpLeft">Rotate Out Up Left</MenuItem>
            <MenuItem value="animate__rotateOutUpRight">Rotate Out Up Right</MenuItem>

            <ListSubheader>Slide Outs</ListSubheader>
            <MenuItem value="animate__slideOutUp">Slide Out Up</MenuItem>
            <MenuItem value="animate__slideOutDown">Slide Out Down</MenuItem>
            <MenuItem value="animate__slideOutLeft">Slide Out Left</MenuItem>
            <MenuItem value="animate__slideOutRight">Slide Out Right</MenuItem>

            <ListSubheader>Zoom Outs</ListSubheader>
            <MenuItem value="animate__zoomOut">Zoom Out</MenuItem>
            <MenuItem value="animate__zoomOutDown">Zoom Out Down</MenuItem>
            <MenuItem value="animate__zoomOutLeft">Zoom Out Left</MenuItem>
            <MenuItem value="animate__zoomOutRight">Zoom Out Right</MenuItem>
            <MenuItem value="animate__zoomOutUp">Zoom Out Up</MenuItem>

            <ListSubheader>Specials</ListSubheader>
            <MenuItem value="animate__hinge">Hinge</MenuItem>
            <MenuItem value="animate__rollOut">Roll Out</MenuItem>
          </Select>
        </FormControl>
      </Collapse>
      
      {/* TODO page activation, renaming, and deltions */}

      <Typography style={{ marginTop: '16px', marginBottom: '16px' }} variant="subtitle1">Navbar Settings</Typography>
      <ColorPickerInput
        color={siteColors?.navbar_background || ''}
        label="Navbar Background Color"
        onColorChange={(color) => handleColorChange(color, 'navbar_background')}
      />

      <FormControl fullWidth size="small" style={{marginTop: '16px'}}>
        <InputLabel id="navbar-mobile-amelioration-label">Navbar Mobile Amelioration</InputLabel>
        <Select
          labelId="navbar-mobile-amelioration-label"
          value={siteConfigurations?.navbar_mobileAmeliorator || "drawer"}
          onChange={(event) => handleFieldChange('navbar_mobileAmeliorator', event.target.value)}
          label="Navbar Mobile Amelioration"
        >
          <MenuItem value="drawer">Drawer</MenuItem>
          <MenuItem value="dropdown">Dropdown</MenuItem>
          <MenuItem value="bottomNav">Bottom Navigation</MenuItem>
        </Select>
      </FormControl>

      <Collapse in={siteConfigurations?.navbar_mobileAmeliorator === 'drawer'}>
        <FormControl fullWidth size="small" style={{ marginTop: '16px' }}>
          <InputLabel id="navbar-mobile-amelioration-direction-label">Navbar Mobile Amelioration Direction</InputLabel>
          <Select
            labelId="navbar-mobile-amelioration-direction-label"
            value={siteConfigurations?.navbar_mobileNavDirection || 'right'}
            onChange={(event) => handleFieldChange('navbar_mobileNavDirection', event.target.value)}
            label="Navbar Logo Animation Direction"
          >
            <MenuItem value="right">Right</MenuItem>
            <MenuItem value="left">Left</MenuItem>
          </Select>
        </FormControl>
      </Collapse>

      <Typography style={{ marginTop: '16px', marginBottom: '16px' }} variant="subtitle1">Navbar Logo Section</Typography>

      <FormControl fullWidth size="small">
        <InputLabel id="navbar-logo-animation-label">Navbar Logo Animation</InputLabel>
        <Select
          labelId="navbar-logo-animation-label"
          value={siteConfigurations?.navbar_logoAnimation || 'slide'}
          onChange={(event) => handleFieldChange('navbar_logoAnimation', event.target.value)}
          label="Navbar Logo Animation"
        >
          <MenuItem value="fade">Fade</MenuItem>
          <MenuItem value="slide">Slide</MenuItem>
          <MenuItem value="zoom">Zoom</MenuItem>
        </Select>
      </FormControl>

      <Collapse in={siteConfigurations?.navbar_logoAnimation === 'slide'}>
        <FormControl fullWidth size="small" style={{ marginTop: '16px' }}>
          <InputLabel id="navbar-logo-animation-direction-label">Navbar Logo Animation Direction</InputLabel>
          <Select
            labelId="navbar-logo-animation-direction-label"
            value={siteConfigurations?.navbar_logoAnimationDirection || 'right'}
            onChange={(event) => handleFieldChange('navbar_logoAnimationDirection', event.target.value)}
            label="Navbar Logo Animation Direction"
          >
            <MenuItem value="up">Up</MenuItem>
            <MenuItem value="down">Down</MenuItem>
            <MenuItem value="right">Right</MenuItem>
            <MenuItem value="left">Left</MenuItem>
          </Select>
        </FormControl>
      </Collapse>

      <Box style={{ marginTop: '16px' }}>
        <ColorPickerInput
          color={siteColors?.navbar_title || ''}
          label="Logo Color"
          onColorChange={(color) => handleColorChange(color, 'navbar_title')}
        />
      </Box>

      <Typography style={{ marginTop: '16px', marginBottom: '16px' }} variant="subtitle1">Navbar Link Section</Typography>
      <FormControl fullWidth size="small">
        <InputLabel id="navbar-link-animation-label">Navbar Link Animation</InputLabel>
        <Select
          labelId="navbar-link-animation-label"
          value={siteConfigurations?.navbar_linkAnimation || 'fade'}
          onChange={(event) => handleFieldChange('navbar_linkAnimation', event.target.value)}
          label="Navbar Link Animation"
        >
          <MenuItem value="fade">Fade</MenuItem>
          <MenuItem value="slide">Slide</MenuItem>
          <MenuItem value="zoom">Zoom</MenuItem>
        </Select>
      </FormControl>

      <Box style={{ marginTop: '16px' }}>
        <ColorPickerInput
          color={siteColors?.navbar_link || ''}
          label="Link Color"
          onColorChange={(color) => handleColorChange(color, 'navbar_link')}
        />
      </Box>
      <Box style={{ marginTop: '16px' }}>
        <ColorPickerInput
          color={siteColors?.navbar_linkActive || ''}
          label="Active Link Color"
          onColorChange={(color) => handleColorChange(color, 'navbar_linkActive')}
        />
      </Box>
      <Box style={{ marginTop: '16px' }}>
        <ColorPickerInput
          color={siteColors?.navbar_linkHovered || ''}
          label="Hovered Link Color"
          onColorChange={(color) => handleColorChange(color, 'navbar_linkHovered')}
        />
      </Box>

      <Typography style={{ marginTop: '16px', marginBottom: '16px' }} variant="subtitle1">Navbar Auth Section</Typography>

      <FormControl fullWidth size="small">
        <InputLabel id="navbar-logo-animation-label">Navbar Auth Animation</InputLabel>
        <Select
          labelId="navbar-logo-animation-label"
          value={siteConfigurations?.navbar_avatarAnimation || 'slide'}
          onChange={(event) => handleFieldChange('navbar_avatarAnimation', event.target.value)}
          label="Navbar Auth Animation"
        >
          <MenuItem value="fade">Fade</MenuItem>
          <MenuItem value="slide">Slide</MenuItem>
          <MenuItem value="zoom">Zoom</MenuItem>
        </Select>
      </FormControl>

      <Collapse in={siteConfigurations?.navbar_avatarAnimation === 'slide'}>
        <FormControl fullWidth size="small" style={{ marginTop: '16px' }}>
          <InputLabel id="navbar-auth-animation-direction-label">Navbar Auth Animation Direction</InputLabel>
          <Select
            labelId="navbar-auth-animation-direction-label"
            value={siteConfigurations?.navbar_avatarAnimationDirection || 'right'}
            onChange={(event) => handleFieldChange('navbar_avatarAnimationDirection', event.target.value)}
            label="Navbar Auth Animation Direction"
          >
            <MenuItem value="up">Up</MenuItem>
            <MenuItem value="down">Down</MenuItem>
            <MenuItem value="right">Right</MenuItem>
            <MenuItem value="left">Left</MenuItem>
          </Select>
        </FormControl>
      </Collapse>

      <Box style={{ marginTop: '16px' }}>
        <ColorPickerInput
          color={siteColors?.navbar_authButtonBackground || ''}
          label="Login Button Background Color"
          onColorChange={(color) => handleColorChange(color, 'navbar_authButtonBackground')}
        />
      </Box>
      <Box style={{ marginTop: '16px' }}>
        <ColorPickerInput
          color={siteColors?.navbar_authButtonText || ''}
          label="Login Button Text Color"
          onColorChange={(color) => handleColorChange(color, 'navbar_authButtonText')}
        />
      </Box>
      <Box style={{ marginTop: '16px' }}>
        <ColorPickerInput
          color={siteColors?.navbar_authButtonHover || ''}
          label="Login Button Hover background Color"
          onColorChange={(color) => handleColorChange(color, 'navbar_authButtonHover')}
        />
      </Box>

      <Typography style={{ marginTop: '16px', marginBottom: '16px' }} variant="subtitle1">Footer Settings</Typography>
      <Box>
        <ColorPickerInput
          color={siteColors?.footer_background || ''}
          label="Footer Background Color"
          onColorChange={(color) => handleColorChange(color, 'footer_background')}
        />
      </Box>
      <TextField
        label="Copyright Verbiage"
        variant="outlined"
        style={{ marginTop: '16px'}}
        fullWidth
        size="small"
        value={siteConfigurations?.footer_copywrite || ''}
        onChange={(event) => handleFieldChange('footer_copywrite', event.target.value)}
      />
      
      <TextField
        label="Primary Menu Name (mobile)"
        variant="outlined"
        fullWidth
        size="small"
        sx={{marginTop: '16px'}}
        value={siteConfigurations?.footer_mobileNavPrimaryHeading || ''}
        onChange={(event) => handleFieldChange('footer_mobileNavPrimaryHeading', event.target.value)}
      />
      <TextField
        label="Auxilary Menu Name (mobile)"
        variant="outlined"
        fullWidth
        size="small"
        sx={{marginTop: '16px'}}
        value={siteConfigurations?.footer_mobileNavAuxilaryHeading || ''}
        onChange={(event) => handleFieldChange('footer_mobileNavAuxilaryHeading', event.target.value)}
      />
      <Typography style={{ marginTop: '16px', marginBottom: '16px' }} variant="subtitle1">Footer Links</Typography>
      <FormControl fullWidth size="small">
        <InputLabel id="footer-link-animation-label">Footer Link Animation</InputLabel>
        <Select
          labelId="footer-link-animation-label"
          value={siteConfigurations?.footer_linkAnimation || 'fade'}
          onChange={(event) => handleFieldChange('footer_linkAnimation', event.target.value)}
          label="Footer Link Animation"
        >
          <MenuItem value="fade">Fade</MenuItem>
          <MenuItem value="slide">Slide</MenuItem>
          <MenuItem value="zoom">Zoom</MenuItem>
        </Select>
      </FormControl>
      <Box style={{ marginTop: '16px'}}>
        <ColorPickerInput
          color={siteColors?.footer_link || ''}
          label="Footer Link Color"
          onColorChange={(color) => handleColorChange(color, 'footer_link')}
        />
      </Box>
      <Box style={{ marginTop: '16px'}}>
        <ColorPickerInput
          color={siteColors?.footer_linkActive || ''}
          label="Footer Active Link Color"
          onColorChange={(color) => handleColorChange(color, 'footer_linkActive')}
        />
      </Box>
      <Box style={{ marginTop: '16px'}}>
        <ColorPickerInput
          color={siteColors?.footer_linkHovered || ''}
          label="Footer Hovered Link Color"
          onColorChange={(color) => handleColorChange(color, 'footer_linkHovered')}
        />
      </Box>

      <Typography style={{ marginTop: '16px', marginBottom: '16px' }} variant="subtitle1">Social Bar Settings</Typography>
      <FormControl fullWidth size="small">
        <InputLabel id="socials-use-custom-color-label">Social Icon Custom Color</InputLabel>
        <Select
          labelId="socials-use-custom-color-label"
          value={siteConfigurations?.socials_customColor}
          onChange={(event) => handleFieldChange('socials_customColor', event.target.value)}
          label="Social Icon Custom Color"
        >
          <MenuItem value={true}>Custom Color</MenuItem>
          <MenuItem value={false}>App Color</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth size="small" sx={{marginTop: '16px'}}>
        <InputLabel id="socials-icon-hover-animation-label">Social Icon Hover Animation</InputLabel>
        <Select
          labelId="socials-icon-hover-animation-label"
          value={siteConfigurations?.socials_hoverAnimation}
          onChange={(event) => handleFieldChange('socials_hoverAnimation', event.target.value)}
          label="Social Icon Custom Color"
        >
          <MenuItem value="scale">Scale</MenuItem>
          <MenuItem value="rotate">Rotate</MenuItem>
          <MenuItem value="float">Float</MenuItem>
        </Select>
      </FormControl>
      <Collapse in={siteConfigurations?.socials_hoverAnimation === 'float'}>
        <FormControl fullWidth size="small" style={{ marginTop: '16px' }}>
          <InputLabel id="socials-icon-hover-animation-direction-label">Social Icon Hover Animation Direction</InputLabel>
          <Select
            labelId="socials-icon-hover-animation-direction-label"
            value={siteConfigurations?.socials_animationDirection}
            onChange={(event) => handleFieldChange('socials_animationDirection', event.target.value)}
            label="Social Icon Hover Animation Direction"
          >
            <MenuItem value="up">Up</MenuItem>
            <MenuItem value="down">Down</MenuItem>
          </Select>
        </FormControl>
      </Collapse>
      <Collapse in={siteConfigurations?.socials_customColor}>
        <Box style={{ marginTop: '16px' }}>
          <ColorPickerInput
            color={siteColors?.socials_backgroundColor || ''}
            label="Social Icon Background Color"
            onColorChange={(color) => handleColorChange(color, 'socials_backgroundColor')}
          />
        </Box>
        <Box style={{ marginTop: '16px' }}>
          <ColorPickerInput
            color={siteColors?.socials_iconColor || ''}
            label="Social Icon Color"
            onColorChange={(color) => handleColorChange(color, 'socials_iconColor')}
          />
        </Box>
      </Collapse>
      
      <Typography style={{ marginTop: '16px', marginBottom: '16px' }} variant="subtitle1">Alert Settings</Typography>
      <FormControlLabel
        control={
          <Switch
            checked={activeAlert}
            onChange={handleToggle}
            color="primary"
          />
        }
        label="Show Alert For Testing"
      />
      <FormControl fullWidth size="small" style={{ marginTop: '16px' }}>
        <InputLabel id="alert-horizontal-arrangement-label">Alert Vertical Arrangement</InputLabel>
        <Select
          labelId="alert-horizontal-arrangement-label"
          value={siteConfigurations?.alert_horizontalArrange}
          onChange={(event) => handleFieldChange('alert_horizontalArrange', event.target.value)}
          label="Alert Vertical Arrangement"
        >
          <MenuItem value="right">Right</MenuItem>
          <MenuItem value="left">Left</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth size="small" style={{ marginTop: '16px' }}>
        <InputLabel id="alert-horizontal-arrangement-label">Alert Horizontal Arrangement</InputLabel>
        <Select
          labelId="alert-horizontal-arrangement-label"
          value={siteConfigurations?.alert_verticalArrange}
          onChange={(event) => handleFieldChange('alert_verticalArrange', event.target.value)}
          label="Alert Horizontal Arrangement"
        >
          <MenuItem value="top">Top</MenuItem>
          <MenuItem value="bottom">Bottom</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

export default GeneralSettingsForm;
