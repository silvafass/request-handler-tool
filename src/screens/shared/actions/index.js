export const addPage = (pagePath) => {
  return {
    type: 'ADD_PAGE',
    page: {
      path: pagePath,
      requests: []
    }
  };
}

export const loadPages = () => {
  return {
    type: 'LOAD_PAGES'
  };
}
