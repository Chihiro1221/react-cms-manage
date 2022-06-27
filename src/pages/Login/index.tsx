import React from 'react';
import {Button, Form, Input, message} from 'antd';
import {UserOutlined, LockOutlined} from '@ant-design/icons';
import './index.scss';
// @ts-ignore
import logoImg from '@/assets/images/logo.jpeg';
import {useNavigate} from 'react-router-dom';
import {login} from '@/apis/authApi';

export const Login: React.FC = () => {
  const navigate = useNavigate();

  const gotoRegister = () => {
    navigate('/auth/register');
  };
  const onFinish = async (values: any) => {
    const res = await login(values);
    if (res.errCode) {
      return message.error(res.message);
    }
    localStorage.setItem('cms_token', JSON.stringify(res.data));
    message.success(res.message);
    navigate('/');
  };

  return (
      <div className="login-container">
        <Form className="login-form" name="basic" onFinish={onFinish} autoComplete="off" size="large">
          <img src={logoImg} className="logo" alt=""/>
          <Form.Item name="username" rules={[{required: true, message: '用户名是必须的'}]}>
            <Input prefix={<UserOutlined/>} placeholder="请输入用户名"/>
          </Form.Item>

          <Form.Item name="password" rules={[{required: true, message: '密码是必须得'}]}>
            <Input.Password prefix={<LockOutlined/>} placeholder="请输入密码"/>
          </Form.Item>
          <Button type="link" style={{padding: 0}} htmlType="button" size="middle" onClick={gotoRegister}>
            还没账号？立即注册
          </Button>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
  );
};
