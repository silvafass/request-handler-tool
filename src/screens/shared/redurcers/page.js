const pages = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_PAGE':
      return {
        ...state,
        [action.page.path]: action.page
      };
    case 'LOAD_PAGES':
      return {
        ...state
      };
    default:
      return state;
  }
}

export default pages;
