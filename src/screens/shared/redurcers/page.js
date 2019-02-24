const pages = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_PAGE':
      if (state[action.page.path]) return {
        ...state
      };
      return {
        ...state,
        [action.page.path]: action.page
      };
    case 'LOAD_PAGES':
      return {
        ...state
      };
    case 'REMOVE_PAGE':
      let newState = {
        ...state
      };
      delete newState[action.pagePath];
      return newState;
    default:
      return state;
  }
}

export default pages;
