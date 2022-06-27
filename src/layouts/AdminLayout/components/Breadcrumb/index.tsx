import React, { useEffect, useState } from 'react';
import { HomeOutlined } from '@ant-design/icons';
import { Breadcrumb as ABreadcrumb } from 'antd';
import { useLocation } from 'react-router-dom';
import './index.scss';

export const Breadcrumb: React.FC = () => {
  const { pathname } = useLocation();
  const [subtitle, setSubtitle] = useState('');
  const map = {
    '/article-list': '文章列表',
    '/article-edit': '文章编辑',
    '/information-edit': '修改资料',
  };
  useEffect(() => {
    // const path = ('/' + pathname.split('/').pop()) as keyof typeof map;
    const path = pathname.replace('/admin', '') as keyof typeof map;
    const current = Object.keys(map).find(key => {
      return path.includes(key);
    }) as keyof typeof map;
    setSubtitle(map[current || path]);
  }, [pathname]);

  return (
    <div className="breadcrumb">
      <ABreadcrumb>
        <ABreadcrumb.Item href="/">
          <HomeOutlined />
        </ABreadcrumb.Item>
        <ABreadcrumb.Item>{subtitle}</ABreadcrumb.Item>
      </ABreadcrumb>
    </div>
  );
};
