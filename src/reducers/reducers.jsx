const initialState = {
  isMobile: false,
  isTablet: false,
  isLarge: false,
  isLoad: true,
  isButtonLoad: false,
  siteConfigurations: null,
  siteColors: null,
  blogPosts: null,
  activeBlogPost: null,
  alert: { message: '', severity: 'info', open: false },
  modal: { title: '', body: '', open: false },
  activeUser: {},
  adminUser: {},
  activePage: {Name: 'Home', In: true},
  editorScreenSize: '100%',
  onDashboard: false,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_MOBILE':
      return {
        ...state,
        isMobile: action.payload,
      };

    case 'SET_IS_TABLET':
      return {
        ...state,
        isTablet: action.payload,
      };

    case 'SET_IS_LARGE':
      return {
        ...state,
        isLarge: action.payload,
      };

    case 'SET_IS_LOAD':
      return {
        ...state,
        isLoad: action.payload,
      };

    case 'SET_IS_BUTTON_LOAD':
      return {
        ...state,
        isButtonLoad: action.payload,
      };
    
    case 'SET_SITE_CONFIGURATION': {
      return {
        ...state,
        siteConfigurations: action.payload,
      };
    };
    
    case 'UPDATE_SITE_CONFIGURATION_FIELD': {
      const { field, value } = action.payload;
      return {
        ...state,
        siteConfigurations: {
          ...state.siteConfigurations,
          [field]: value, 
        },
      };
    }

    case 'SET_BLOG_POSTS': {
      return {
        ...state,
        blogPosts: action.payload,
      };
    };
    
    case 'SET_ACTIVE_BLOG_POST': {
      return {
        ...state,
        activeBlogPost: action.payload,
      };
    };
    
    case 'SET_SITE_COLORS': {
      return {
        ...state,
        siteColors: action.payload,
      };
    };
    
    case 'UPDATE_SITE_COLOR_FIELD': {
      const { field, value } = action.payload;
      return {
        ...state,
        siteColors: {
          ...state.siteColors,
          [field]: value, 
        },
      };
    }
    
    case 'SET_ALERT': {
        const { key, value } = action.payload;
        return {
            ...state,
            alert: {
                ...state.alert,
                [key]: value,
            },
        };
    };

    case 'SET_MODAL': {
      const { key, value } = action.payload;
      return {
          ...state,
          modal: {
              ...state.modal,
              [key]: value,
          },
      };
    };
  
    case 'SET_ACTIVE_PAGE': {
        const { key, value } = action.payload;
        return {
            ...state,
            activePage: {
                ...state.activePage,
                [key]: value,
            },
        };
    };
    
    case 'SET_ACTIVE_USER': {
      return {
        ...state,
        activeUser: action.payload,
      };
    };
    
    case 'SET_ADMIN_USER': {
      return {
        ...state,
        adminUser: action.payload,
      };
    };

    case 'SET_EDITOR_SCREEN_SIZE': {
      return {
        ...state,
        editorScreenSize: action.payload,
      };
    };

    case 'SET_ON_DASHBOARD': {
      return {
        ...state,
        onDashboard: action.payload,
      };
    };

    default:
      return state;
  }
};


export default rootReducer;
