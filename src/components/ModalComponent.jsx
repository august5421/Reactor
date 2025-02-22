import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setModal } from '../actions/actions';
import { Dialog, DialogTitle, DialogContent, DialogActions, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const ModalComponent = () => {
  const dispatch = useDispatch();
  const { title, body, open } = useSelector(state => state.modal); 
  
  const handleClose = () => {
    dispatch(setModal('open', false)); 
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        {title}
        <IconButton 
          edge="end" 
          color="inherit" 
          onClick={handleClose} 
          aria-label="close" 
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <div>{body}</div>
      </DialogContent>
    </Dialog>
  );
};

export default ModalComponent;
