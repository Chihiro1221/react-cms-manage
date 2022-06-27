import React, {useEffect, useState} from 'react';
import {Button, Form, Input, message, Modal, PageHeader} from 'antd';
import dayjs from 'dayjs';
import {createArticle, getArticleById, updateArticleById} from '@/apis/articleApi';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import './index.scss';
import '@wangeditor/editor/dist/css/style.css';
import WangEditor from '@/components/WangEditor';

export const ArticleEdit: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [content, setContent] = useState('');
  const [formInstance] = Form.useForm();
  const [initialValues, setInitialValues] = useState({title: '', subTitle: ''});

  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  // 加载id对应的文章
  const loadArticle = async (id: string) => {
    const res = await getArticleById(id);
    if (res.errCode) {
      return message.error(res.message);
    }
    const {title, subTitle, content} = res.data;
    setInitialValues({
      title,
      subTitle,
    });
    setContent(content);
  };
  useEffect(() => {
    setInitialValues({title: '', subTitle: ''});
    setContent('');
    params.id && loadArticle(params.id);
  }, [location]);
  // 显示模态框
  const showModal = () => {
    setIsModalVisible(true);
  };

  // 提交表单
  const handleOk = () => {
    formInstance
        .validateFields()
        .then(async values => {
          let res = params.id ? await updateArticleById({
            ...values,
            content,
            id: params.id
          }) : await createArticle({...values, content});
          if (res.errCode) {
            return message.error(res.message);
          }
          message.success(res.message);
          navigate('/admin/article-list');
          setIsModalVisible(false);
        })
        .catch(err => {
          console.log(err);
        });
  };

  // 取消提交
  const handleCancel = () => {
    setIsModalVisible(false);
    formInstance.resetFields();
  };

  return (
      <div className="article-edit-container">
        <PageHeader
            onBack={params.id ? () => window.history.back() : void 0}
            title="文章编辑"
            subTitle={dayjs(new Date()).format('YYYY-MM-DD')}
            extra={
              <Button type="primary" onClick={showModal}>
                提交文章
              </Button>
            }
        />
        {/* 富文本编辑器 */}
        <div className="wangEditor-container">
          <WangEditor content={content} onChange={setContent}/>
        </div>
        {/* 模态框 */}
        <Modal title="填写文章标题" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
          <Form initialValues={initialValues} form={formInstance} name="basic" labelCol={{span: 4}}
                wrapperCol={{span: 20}} autoComplete="off">
            <Form.Item label="标题" name="title" rules={[{required: true, message: '请输入标题'}]}>
              <Input/>
            </Form.Item>
            <Form.Item label="副标题" name="subTitle">
              <Input/>
            </Form.Item>
          </Form>
        </Modal>
      </div>
  );
};
