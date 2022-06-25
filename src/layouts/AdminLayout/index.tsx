import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';

export const AdminLayout: FC<{ [key: string]: any }> = () => {
  return (
    <div>
      首页布局
      <Outlet />
    </div>
  );
};
