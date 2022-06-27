const defaultState = {
  userInfo: JSON.parse(localStorage.getItem('cms_token') || '{}'),
};

export default (state = defaultState, dispatch: any) => {
  const newState = JSON.parse(JSON.stringify(state));
  return newState;
};
