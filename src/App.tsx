import React, { FC, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Loading } from './components/Loading';
import { Provider } from 'react-redux';
import store from './store';

const App: FC = () => {
  const [loading, setLoading] = React.useState(false);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const render = () => {
    return loading ? (
      <Loading />
    ) : (
      <Provider store={store}>
        <Outlet />
      </Provider>
    );
  };

  return <div>{render()}</div>;
};
export default App;
