import React, {useState} from 'react';
import {Button, Form, Input, message, Upload} from "antd";
import {getUserInfo, LoginResponse, updateUser, UpdateUser} from "@/apis/authApi";
import {LoadingOutlined, PlusOutlined} from '@ant-design/icons';
import type {UploadChangeParam} from 'antd/es/upload';
import type {RcFile, UploadFile, UploadProps} from 'antd/es/upload/interface';
import {connect} from 'react-redux'

interface IProps {
  userInfo: LoginResponse
}

const InformationEdit: React.FC<IProps> = (props) => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();

  // 提交表单
  const onFinish = async (values: Required<UpdateUser>) => {
    const data: UpdateUser = {}
    // 将空值去除
    for (const key in values) {
      const newKey = key as keyof typeof values
      if (values[newKey]) {
        data[newKey] = values[newKey]
      }
    }
    const res = await updateUser(data)
    message.open({
      content: res.message,
      type: res.errCode === 0 ? 'success' : 'error',
    })
    if (res.errCode === 0) {
      const res = await getUserInfo()
      res.errCode === 0 && localStorage.setItem('cms_token', JSON.stringify(res.data))
    }
  };
  const uploadButton = (
      <div>
        {loading ? <LoadingOutlined/> : <PlusOutlined/>}
        <div style={{marginTop: 8}}>Upload</div>
      </div>
  );

  // 上传图片之前
  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      void message.error('只能上传JPG/PNG格式的文件！');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      void message.error('图片大小必须小于2MB！');
    }
    return isJpgOrPng && isLt2M;
  };

  // 转换为base64格式
  const getBase64 = (img: RcFile, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
  };

  // 处理上传图片状态
  const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      console.log(info.file.response)
      getBase64(info.file.originFileObj as RcFile, url => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  }
  return <div className="information-edit-container">
    <Form
        name="basic"
        labelCol={{span: 2}}
        wrapperCol={{span: 6}}
        onFinish={onFinish}
        autoComplete="off"
    >
      <Form.Item
          label="修改用户名"
          name="username"
      >
        <Input placeholder="请输入新用户名"/>
      </Form.Item>

      <Form.Item
          label="修改密码"
          name="password"
      >
        <Input.Password placeholder="请输入新密码"/>
      </Form.Item>

      <Form.Item wrapperCol={{offset: 6}}>
        <Button type="primary" htmlType="submit">
          提交
        </Button>
      </Form.Item>
      {/*上传头像*/}
      <div>点击下方修改头像</div>
      <Upload
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          headers={{"cms-token": props.userInfo['cms-token']}}
          action={process.env.REACT_APP_API_URL + '/upload'}
          beforeUpload={beforeUpload}
          onChange={handleChange}
      >
        {imageUrl ? <img src={imageUrl} alt="avatar" style={{width: '100%'}}/> : uploadButton}
      </Upload>
    </Form>
  </div>;
}


const mapStateToProps = (state: { userInfo: LoginResponse }) => {
  return {
    userInfo: state.userInfo
  }
}
export default connect(mapStateToProps)(InformationEdit)