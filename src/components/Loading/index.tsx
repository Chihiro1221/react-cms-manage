// @flow
import * as React from 'react';
import {Spin} from 'antd';
import './index.scss'

type Props = {};
export const Loading = (props: Props) => {
  return (
      <div className="loading-container">
        <Spin size="large" wrapperClassName="custom-loading"/>
      </div>
  );
};