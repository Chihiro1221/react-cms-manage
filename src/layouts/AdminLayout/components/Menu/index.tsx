// @ts-ignore
import menuImg from '@/assets/images/11.jpg';
import { Layout, Menu as AMenu } from 'antd';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

type Props = {
  collapsed: boolean;
};
export const Menu = (props: Props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [defaultSelectedKey, setDefaultSelectedKey] = useState('');
  // 只执行一次
  useEffect(() => {
    const path = location.pathname.replace('/admin', '');
    const current = menus.find(item => {
      return path.includes(item.key);
    });
    setDefaultSelectedKey(current?.key || path);
  }, [location.pathname]);

  const handleSelected = (item: any) => {
    navigate('/admin' + item.key);
  };
  const menus = [
    {
      key: '/article-list',
      icon: <UserOutlined />,
      label: '文章列表',
    },
    {
      key: '/article-edit',
      icon: <VideoCameraOutlined />,
      label: '文章编辑',
    },
    {
      key: '/information-edit',
      icon: <UploadOutlined />,
      label: '修改资料',
    },
  ];
  return (
    <Layout.Sider trigger={null} collapsible collapsed={props.collapsed}>
      <img className="logo" src={menuImg} />
      <AMenu theme="dark" mode="inline" selectedKeys={[defaultSelectedKey]} items={menus} onClick={handleSelected} />
    </Layout.Sider>
  );
};
