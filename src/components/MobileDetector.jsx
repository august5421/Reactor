import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { setMobile, setLarge } from '../actions/actions';
import { setIsTablet } from '../actions/actions';

const MobileDetector = () => {
  const dispatch = useDispatch();
  const isMobile = useMediaQuery({ query: '(max-width: 599px)' });
  const isTablet = useMediaQuery({ query: '(min-width: 600px) and (max-width: 991px)' });
  const isLarge = useMediaQuery({ query: '(min-width: 992px)' });

  useEffect(() => {
    dispatch(setMobile(isMobile));
    dispatch(setIsTablet(isTablet));
    dispatch(setLarge(isLarge));
  }, [isMobile,isTablet,isLarge, dispatch]);

  return null;
};

export default MobileDetector;
