import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, TextField, Typography, MenuItem, Select, FormControl, InputLabel, Collapse, Button } from '@mui/material';
import { updateSiteColorField, updateSiteConfigurationField } from '../../actions/actions';
import ColorPickerInput from '../components/ColorPickerInput';

function BlogSettingsForm() {
  const dispatch = useDispatch();
  const siteConfigurations = useSelector(state => state.siteConfigurations);
  const siteColors = useSelector(state => state.siteColors);
  const blogPosts = useSelector((state) => state.blogPosts);

  const handleFieldChange = (fieldName, value) => {
    dispatch(updateSiteConfigurationField(fieldName, value));
  };

  const handleColorChange = (color, fieldName) => {
    dispatch(updateSiteColorField(fieldName, color));
  };

  const handleArrayChange = (arrayName, index, field, value) => {
    const updatedArray = [...siteConfigurations[arrayName]];
    updatedArray[index][field] = value;
    dispatch(updateSiteConfigurationField(arrayName, updatedArray));
  };

  return (
    <Box style={{ display: 'flex', flexDirection: 'column' }}>
      

      <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
        <Box style={{ display: 'flex', flexDirection: 'column'}}>
          <TextField
            label="Blog Title"
            variant="outlined"
            fullWidth
            size="small"
            value={siteConfigurations?.blog_blogTitle || ''}
            onChange={(event) => handleFieldChange('blog_blogTitle', event.target.value)}
          />
        </Box>
        <Box style={{ display: 'flex', flexDirection: 'column' }}>
          <ColorPickerInput
            color={siteColors?.blog_title || ''}
            label="Blog Title Color"
            onColorChange={(color) => handleColorChange(color, 'blog_title')}
          />
        </Box>
      </Box>

      <TextField
        label="Blog Description"
        variant="outlined"
        sx={{marginTop: '16px'}}
        fullWidth
        size="small"
        value={siteConfigurations?.blog_blogDescription || ''}
        onChange={(event) => handleFieldChange('blog_blogDescription', event.target.value)}
      />
      <TextField
        label="Blog Header Image"
        variant="outlined"
        sx={{marginTop: '16px'}}
        fullWidth
        size="small"
        value={siteConfigurations?.blog_blogHeaderImage || ''}
        onChange={(event) => handleFieldChange('blog_blogHeaderImage', event.target.value)}
      />
      <TextField
        label="Blog Posts Per Page"
        variant="outlined"
        type="number"
        sx={{marginTop: '16px'}}
        fullWidth
        size="small"
        value={siteConfigurations?.blog_blogPostsPerPage || ''}
        onChange={(event) => handleFieldChange('blog_blogPostsPerPage', event.target.value)}
      />
      <Box style={{display: 'flex', flexDirection: 'row', marginTop: '16px'}}>
        <FormControl fullWidth size="small">
          <InputLabel id="use-cat-filter-label">Use Category Filter</InputLabel>
          <Select
            labelId="use-cat-filter-label"
            value={siteConfigurations?.blog_useCategoryFilters}
            onChange={(event) => handleFieldChange('blog_useCategoryFilters', event.target.value)}
            label="Use Category Filter"
          >
            <MenuItem value={true}>Category Filtering</MenuItem>
            <MenuItem value={false}>No Category Filtering</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth size="small">
          <InputLabel id="use-sorting-label">Use Sorting</InputLabel>
          <Select
            labelId="use-sorting-label"
            value={siteConfigurations?.blog_useSorting}
            onChange={(event) => handleFieldChange('blog_useSorting', event.target.value)}
            label="Use Sorting"
          >
            <MenuItem value={true}>Allow Sorting</MenuItem>
            <MenuItem value={false}>Do Not Allow Sorting</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Collapse in={siteConfigurations.blog_useCategoryFilters}>
        <Box style={{ marginTop: '16px' }}>
          <ColorPickerInput
            color={siteColors?.blog_nonActiveCategoryChip || ''}
            label="Blog Chip Inactive Background Color"
            onColorChange={(color) => handleColorChange(color, 'blog_nonActiveCategoryChip')}
          />
        </Box>
        <Box style={{ marginTop: '16px' }}>
          <ColorPickerInput
            color={siteColors?.blog_activeCategoryChipBackground || ''}
            label="Blog Chip Active Background Color"
            onColorChange={(color) => handleColorChange(color, 'blog_activeCategoryChipBackground')}
          />
        </Box>
      </Collapse>
      <Box style={{ marginTop: '16px' }}>
        <ColorPickerInput
          color={siteColors?.blog_blogPostTitle || ''}
          label="Blog Post Title Color"
          onColorChange={(color) => handleColorChange(color, 'blog_blogPostTitle')}
        />
      </Box>

    </Box>
  );
}

export default BlogSettingsForm;
