import React from 'react';
import {Button, Checkbox, Form, Input} from 'antd';
import {UserOutlined, LockOutlined} from '@ant-design/icons';
import '../Login/index.scss'
// @ts-ignore
import logoImg from '../../assets/images/logo.jpeg'
import {useNavigate} from "react-router-dom";
import {register} from "../../apis/auth";

export const Register: React.FC = () => {
  const navigate = useNavigate()

  const gotoLogin = () => {
    navigate('/auth/login')
  }
  const onFinish = async (values: any) => {
    const res = await register(values)
    console.log(res)
  };

  return <div className="login-container">
    <Form
        className="login-form"
        name="basic"
        onFinish={onFinish}
        autoComplete="off"
        size="large"
    >
      <img src={logoImg} className="logo" alt=""/>
      <Form.Item
          name="username"
          rules={[{required: true, message: '用户名是必须的'}]}
      >
        <Input prefix={<UserOutlined/>} placeholder="请输入用户名"/>
      </Form.Item>

      <Form.Item
          name="password"
          rules={[{required: true, message: '密码是必须得'}]}
      >
        <Input.Password prefix={<LockOutlined/>} placeholder="请输入密码"/>
      </Form.Item>

      <Form.Item
          name="confirm"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: '确认密码是必须的',
            },
            ({getFieldValue}) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('两次密码输入不一致，请重新输入'));
              },
            }),
          ]}
      >
        <Input.Password prefix={<LockOutlined/>} placeholder="请输入确认密码"/>
      </Form.Item>

      <Button type="link" style={{padding: 0}} htmlType="button" size="middle" onClick={gotoLogin}>
        已有账号？前往登录
      </Button>
      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          立即注册
        </Button>
      </Form.Item>
    </Form>
  </div>;
};
