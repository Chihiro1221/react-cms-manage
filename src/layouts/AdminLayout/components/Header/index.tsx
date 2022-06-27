// @flow
import * as React from 'react';
import {CaretDownOutlined, MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined} from '@ant-design/icons';
import {Avatar, Button, Dropdown, Menu, message, Space} from 'antd';
import {Layout} from 'antd';
import {connect} from 'react-redux';
import {LoginResponse} from '../../../../apis/authApi';
import {useNavigate} from 'react-router-dom';

type Props = {
  collapsed: boolean;
  userInfo?: LoginResponse;
  setCollapsed: (value: boolean) => void;
};
const Header = (props: Props) => {
  const navigate = useNavigate();
  const logout = () => {
    navigate('/auth/login');
    localStorage.removeItem('cms_token');
    message.success('退出成功！');
  };
  const dropdownMenu = (
      <Menu
          items={[
            {
              key: '1',
              label: (
                  <Button type="text" size="small">
                    修改资料
                  </Button>
              ),
            },
            {
              key: '2',
              label: (
                  <Button type="text" size="small" onClick={logout}>
                    退出登录
                  </Button>
              ),
            },
          ]}
      />
  );
  return (
      <Layout.Header className="site-layout-background" style={{padding: 0}}>
        {React.createElement(props.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
          className: 'trigger',
          onClick: () => props.setCollapsed(!props.collapsed),
        })}
        <div className="user-info">
          <Avatar
              src={props.userInfo?.avatar ? 'http://47.93.114.103:6688/' + props.userInfo.avatar : 'http://47.93.114.103:6688/default_avatar.jpg'}
              size="large"
          />
          <Dropdown overlay={dropdownMenu}>
            <a onClick={e => e.preventDefault()}>
              <Space>
                <div className="username">
                  <span>{props.userInfo?.username}</span>
                  <CaretDownOutlined/>
                </div>
              </Space>
            </a>
          </Dropdown>
        </div>
      </Layout.Header>
  );
};

const mapStateToProps = (state: { userInfo?: LoginResponse }) => {
  return {
    userInfo: state.userInfo,
  };
};
export default connect(mapStateToProps)(Header);
