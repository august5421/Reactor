import { useState, useRef, useEffect } from 'react';
import { TextField, InputAdornment, Box } from '@mui/material';
import { SketchPicker } from 'react-color';

function ColorPickerInput({ label, color, onColorChange }) {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const colorPickerRef = useRef(null);

  const toggleColorPicker = () => {
    setShowColorPicker(!showColorPicker);
  };

  const handleColorChange = (color) => {
    onColorChange(color.hex);
  };

  const handleHexChange = (event) => {
    const newColor = event.target.value;
    if (/^#[0-9A-Fa-f]{6}$/i.test(newColor)) {
      onColorChange(newColor);
    }
  };

  const handleClickOutside = (event) => {
    if (colorPickerRef.current && !colorPickerRef.current.contains(event.target)) {
      setShowColorPicker(false);
    }
  };

  useEffect(() => {
    if (showColorPicker) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showColorPicker]);

  return (
    <Box style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <TextField
        label={label}
        variant="outlined"
        size="small"
        value={color}
        onChange={handleHexChange}
        onClick={toggleColorPicker}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Box
                sx={{
                  width: '20px',
                  height: '20px',
                  backgroundColor: color,
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              />
            </InputAdornment>
          ),
        }}
      />
      {showColorPicker && (
        <Box
          ref={colorPickerRef}
          style={{ position: 'absolute', zIndex: 2, marginTop: '8px', right: 0, bottom: 0 }}
        >
          <SketchPicker color={color} onChangeComplete={handleColorChange} />
        </Box>
      )}
    </Box>
  );
}

export default ColorPickerInput;
