const defaultState = {
  msg: 'hello world',
};

export default (state = defaultState, dispatch: any) => {
  const newState = JSON.parse(JSON.stringify(state));
  switch (dispatch.type) {
    case 'changeMsg':
      newState.msg = dispatch.value;
      break;
  }
  return newState;
};
