import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, TextField, Typography, MenuItem, Select, FormControl, InputLabel, Collapse, Button } from '@mui/material';
import { setActiveBlogPost, setAlert, setModal, updateSiteColorField, updateSiteConfigurationField } from '../../actions/actions';
import ColorPickerInput from '../components/ColorPickerInput';
import { addDocument, deleteDocument, getDocumentById, updateDocument } from '../../services/DbManipulationService';
import ReactQuill from 'react-quill';

function BlogSettingsForm() {
  const dispatch = useDispatch();
  const siteConfigurations = useSelector(state => state.siteConfigurations);
  const siteColors = useSelector(state => state.siteColors);
  const blogPosts = useSelector((state) => state.blogPosts);
  const [editedPost, setEditedPost] = useState(null);
  const [addingPost, setAddingPost] = useState(false);

  const handleSavePost = async () => {
    if (editedPost) {
      try {
        if (addingPost) {
          await addDocument("Blog", editedPost); 
        } else {
          await updateDocument("Blog", editedPost.id, editedPost); 
        }
        dispatch(setAlert('open', true));
        dispatch(setAlert('severity', 'success'));
        dispatch(setAlert('message', "Post saved successfully."));
        window.location.reload(); 
      } catch (error) {
        dispatch(setAlert('open', true));
        dispatch(setAlert('severity', 'error'));
        dispatch(setAlert('message', "We're sorry there was a problem saving your post."));
      }
    }
  };

  const handleEditFieldChange = (fieldName, value) => {
    setEditedPost((prevPost) => ({
      ...prevPost,
      [fieldName]: value,
    }));
  };

  const handleFieldChange = (fieldName, value) => {
    dispatch(updateSiteConfigurationField(fieldName, value));
  };

  const handleColorChange = (color, fieldName) => {
    dispatch(updateSiteColorField(fieldName, color));
  };

  useEffect(() => {
    if (editedPost) {
      dispatch(setModal('title', `Editing: ${editedPost?.title}`));
      dispatch(setModal('body', (
        <Box style={{display: 'flex', flexDirection: 'column'}}>
          <TextField
            label="Blog Post Title"
            sx={{marginTop: '16px'}}
            variant="outlined"
            fullWidth
            size="small"
            value={editedPost?.title || ''}
            onChange={(event) => handleEditFieldChange('title', event.target.value)} 
          />
          <TextField
            label="Blog Post Header Image"
            sx={{marginTop: '16px'}}
            variant="outlined"
            fullWidth
            size="small"
            value={editedPost?.headerImage || ''}
            onChange={(event) => handleEditFieldChange('headerImage', event.target.value)} 
          />
          <Box style={{display: 'flex', flexDirection: 'row', margin: '16px 0px'}}>
            <FormControl fullWidth size="small">
              <InputLabel>Post Author</InputLabel>
              <Select
                value={editedPost?.author}
                label="Post Author"
                onChange={(event) => handleEditFieldChange('author', event.target.value)} 
              >
                {siteConfigurations?.blog_authors?.map((author) => (
                  <MenuItem key={author} value={author}>
                    {author}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth size="small">
              <InputLabel>Post Category</InputLabel>
              <Select
                value={editedPost?.category}
                label="Post Category"
                onChange={(event) => handleEditFieldChange('category', event.target.value)}
              >
                {siteConfigurations?.blog_categories?.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <ReactQuill
            value={editedPost?.body || ''} 
            onChange={(content) => handleEditFieldChange('body', content)}
            modules={{
              toolbar: [
                [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                ['bold', 'italic', 'underline'],
                ['link'],
                [{ 'align': [] }],
                ['image']
              ],
            }}
            formats={['header', 'font', 'list', 'bold', 'italic', 'underline', 'link', 'align', 'image']}
          />
          <Button 
            sx={{
              color: siteColors.auth_submitButtonText,
              backgroundColor: siteColors.auth_submitButtonBackground,
              marginTop: 2,
              '&:hover': {
                backgroundColor: siteColors.auth_submitButtonHover,
              },
            }}
            variant="contained" 
            color="primary" 
            onClick={handleSavePost}
          >
            Save Post
          </Button>
        </Box>
      )));
      dispatch(setModal('open', true));
    }
  }, [editedPost]);  

  const handleEditPost = (post) => {
      setEditedPost(post)
  }
  
  const handleAddPost = () => {
    setAddingPost(true)
    setEditedPost({
      title: '',
      headerImage: '',
      author: '',
      category: '',
      body: '',
    })
  }

  const handleDeletePost = async (postId) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this post?");
    if (isConfirmed) {
      try {
        await deleteDocument('Blog', postId); 
        window.location.reload(); 
      } catch (error) {
        console.error("Error deleting post:", error);
        alert("Failed to delete the post. Please try again.");
      }
    }
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
      <Typography variant="h6" style={{ marginTop: '16px', marginBottom: '16px' }}>Blog Posts</Typography>
      {blogPosts.map((post) => (
        <Box key={post.id} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: '10px', padding: '8px' }}>
          <Typography >
            {post.title.length > 28 ? post.title.slice(0, -3) + "..." : post.title}
          </Typography>
          <Box style={{display: 'flex', flexDirection: 'row'}}>
            <Button variant="outlined" color="secondary" sx={{marginRight: 2}} onClick={() => handleEditPost(post)}>Edit</Button>
            <Button variant="outlined" color="error" onClick={() => handleDeletePost(post.id)}>Delete</Button>
          </Box>
        </Box>
      ))}
      <Button 
        sx={{
          color: siteColors.auth_submitButtonText,
          backgroundColor: siteColors.auth_submitButtonBackground,
          marginTop: 2,
          '&:hover': {
            backgroundColor: siteColors.auth_submitButtonHover,
          },
        }}
        variant="contained" 
        color="primary" 
        onClick={() => handleAddPost()}
      >
        Add New Post
      </Button>
    </Box>
  );
}

export default BlogSettingsForm;
