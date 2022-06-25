import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';

export const AuthLayout: FC<{ [key: string]: any }> = () => {
  return (
    <div>
      鉴权布局
      <Outlet />
    </div>
  );
};
