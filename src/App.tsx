import React, { FC } from 'react';
import { Button } from 'antd';
import { Outlet } from 'react-router-dom';

const App: FC = () => {
  return <Outlet />;
};
export default App;
