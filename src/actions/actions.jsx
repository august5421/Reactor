export const setMobile = (state) => ({
  type: 'SET_MOBILE',
  payload: state,
});
export const setIsTablet = (state) => ({
  type: 'SET_IS_TABLET',
  payload: state,
});
export const setLarge = (state) => ({
  type: 'SET_IS_LARGE',
  payload: state,
});
export const setIsLoad = (state) => ({
  type: 'SET_IS_LOAD',
  payload: state,
});
export const setIsButtonLoad = (state) => ({
  type: 'SET_IS_BUTTON_LOAD',
  payload: state,
});
export const setSiteConfiguration = (state) => ({
  type: 'SET_SITE_CONFIGURATION',
  payload: state,
});  
export const updateSiteConfigurationField = (field, value) => ({
  type: 'UPDATE_SITE_CONFIGURATION_FIELD',
  payload: { field, value },
});
export const setBlogPosts = (state) => ({
  type: 'SET_BLOG_POSTS',
  payload: state,
});   
export const setActiveBlogPost = (state) => ({
  type: 'SET_ACTIVE_BLOG_POST',
  payload: state,
});  
export const setSiteColors = (state) => ({
  type: 'SET_SITE_COLORS',
  payload: state,
});  
export const updateSiteColorField = (field, value) => ({
  type: 'UPDATE_SITE_COLOR_FIELD',
  payload: { field, value },
});
export const setActivePage = (key, value) => ({
  type: 'SET_ACTIVE_PAGE',
  payload: { key, value },
});
export const setAlert = (key, value) => ({
  type: 'SET_ALERT',
  payload: { key, value },
});
export const setModal = (key, value) => ({
  type: 'SET_MODAL',
  payload: { key, value },
});
export const setActiveUser = (state) => ({
  type: 'SET_ACTIVE_USER',
  payload: state,
});
export const setAdminUser = (state) => ({
  type: 'SET_ADMIN_USER',
  payload: state,
});
export const setEditorScreenSize = (state) => ({
  type: 'SET_EDITOR_SCREEN_SIZE',
  payload: state,
});
export const setOnDashboard = (state) => ({
  type: 'SET_ON_DASHBOARD',
  payload: state,
});


