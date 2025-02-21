import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { useDispatch, useSelector } from 'react-redux';
import { SocialIcon } from 'react-social-icons';
import { Box } from '@mui/system';

const SocialBar = () => {
    const dispatch = useDispatch();
    const isMobile = useSelector((state) => state.isMobile);
    const isTablet = useSelector((state) => state.isTablet);
    const isLarge = useSelector((state) => state.isLarge);
    const siteColors = useSelector(state => state.siteColors);
    const siteConfigurations = useSelector(state => state.siteConfigurations);
    const activePage = useSelector(state => state.activePage);
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const handleMouseEnter = (index) => {
        setHoveredIndex(index);
    };

    const handleMouseLeave = () => {
        setHoveredIndex(null);
    };

    const getAnimationStyle = (index) => {
        if (index !== hoveredIndex) {
            return {}; 
        }
        switch (siteConfigurations.socials_hoverAnimation) {
            case 'float':
                return {
                    transform: `translateY(${siteConfigurations.socials_animationDirection === 'down' ? '10px' : '-10px'})`,
                }
            case 'scale':
                return {
                    transform: 'scale(1.15)',
                };
            case 'rotate':
                return {
                    transform: 'rotate(15deg)',
                };
        }
    };
    
    return (
        <Box>
            {siteConfigurations.socials_activeSocials.map((social, index) => (
                social.active && (
                    <Tooltip 
                        key={social.Name || index}  
                        title={social.social} 
                        arrow
                        onMouseEnter={() => handleMouseEnter(index)}
                        onMouseLeave={handleMouseLeave}
                    >
                        <IconButton
                            onClick={() => window.open(social.link, '_blank')}
                            aria-label={social.social}
                            style={{
                                margin: isMobile ? '0px 1rem' : '0px 1rem 0px 0px',
                                borderRadius: '50%',
                                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                                padding: '0px',
                                transition: 'transform 0.3s ease',
                                ...getAnimationStyle(index),
                            }}
                        >
                            <Box>
                                <SocialIcon
                                    network={social.social.toLowerCase()}
                                    bgColor={siteConfigurations.socials_customColor ? (siteColors.socials_backgroundColor) : null}
                                    fgColor={siteConfigurations.socials_customColor ? (siteColors.socials_iconColor) : null}
                                    style={{ height: 40, width: 40 }}
                                />
                            </Box>
                        </IconButton>
                    </Tooltip>
                )
            ))}
        </Box>
    );
};

SocialBar.propTypes = {
    socials: PropTypes.arrayOf(
        PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Link: PropTypes.string.isRequired,
            Active: PropTypes.bool.isRequired,
        })
    ),
    footerBgColor: PropTypes.string,
    iconColor: PropTypes.string,
};

export default SocialBar;
