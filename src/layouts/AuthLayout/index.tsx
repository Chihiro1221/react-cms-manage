import React, {FC} from 'react';
import {Outlet} from 'react-router-dom';

export const AuthLayout: FC<{ [key: string]: any }> = () => {
  return (
      <div>
        <Outlet/>
      </div>
  );
};
