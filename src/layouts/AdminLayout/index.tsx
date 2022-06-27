import React, {FC, useState} from 'react';
import {Outlet} from 'react-router-dom';
import {Layout} from 'antd';
import './index.scss';
import Header from './components/Header';
import {Menu} from './components/Menu';
import {Breadcrumb} from './components/Breadcrumb';

const {Footer, Content} = Layout;

export const AdminLayout: FC<{ [key: string]: any }> = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
      <Layout className="admin-layout">
        <Menu collapsed={collapsed}/>
        <Layout className="site-layout">
          <Header collapsed={collapsed} setCollapsed={setCollapsed}/>
          <Breadcrumb/>
          <Content
              className="site-layout-background"
              style={{
                margin: '24px 16px',
                padding: 24,
                minHeight: 280,
              }}
          >
            <Outlet/>
          </Content>
          <Footer className="admin-footer"> © 2018-2022 RawChen · Blog 闽ICP备18008354号-5</Footer>
        </Layout>
      </Layout>
  );
};
