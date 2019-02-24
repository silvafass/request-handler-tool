const loadPages = (pages) => {
  return {
    type: 'LOAD_PAGES',
    pages
  };
}

export const chromeStorageGet = function() {
  return dispatch => {
    return chrome.storage.sync.get([
      'pages'
    ], config => {
      dispatch(loadPages(config.pages || {}));
    });
  }
}

export const chromeStorageSet = function(pages) {
  return dispatch => {
    return chrome.storage.sync.set({
      'pages': pages
    }, () => {
      dispatch(loadPages(pages || {}));
    });
  }
}
