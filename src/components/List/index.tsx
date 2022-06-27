import React, {useEffect, useState} from 'react';
import {Button, List as AList, message, Skeleton, Pagination, Popconfirm} from 'antd';
import {ArticleApi, getArticles, removeArticleById} from '@/apis/articleApi';
import dayjs from 'dayjs';
import './index.scss';
import {useNavigate} from 'react-router-dom';

export const List: React.FC = () => {
  const [list, setList] = useState<ArticleApi[]>([]);
  const [pagination] = useState({current: 1, pageSize: 10, total: 0});
  const navigate = useNavigate();
  // 获取文章列表，只触发一次

  const loadArticles = () => {
    getArticles({num: pagination.current, count: pagination.pageSize}).then(res => {
      if (res.errCode) {
        return message.error(res.message);
      }
      setList(res.data.arr);
    });
  };
  useEffect(() => {
    loadArticles();
  }, []);

  // 分页操作
  const handlePaginationChange = (page: number, pageSize: number) => {
    console.log(page, pageSize);
  };

  // 删除文章
  const removeArticle = async (id: string) => {
    const res = await removeArticleById(id);
    message.open({
      type: res.errCode ? 'error' : 'success',
      content: res.message,
    });
    loadArticles();
  };

  return (
      <>
        <AList
            className="list"
            itemLayout="horizontal"
            dataSource={list}
            renderItem={item => (
                <AList.Item
                    actions={[
                      <Button type="primary" onClick={() => navigate(`/admin/article-edit/${item.id}`)}>
                        编辑
                      </Button>,
                      <Popconfirm title="确认删除这篇文章吗？" onConfirm={() => removeArticle(item.id)} okText="确认"
                                  cancelText="取消">
                        <Button type="primary" danger>
                          删除
                        </Button>
                        ,
                      </Popconfirm>,
                    ]}
                >
                  <Skeleton title={false} loading={!item} active>
                    <AList.Item.Meta title={<a href="https://ant.design">{item.title}</a>} description={item.subTitle}/>
                    <div>{dayjs(item.date).format('YYYY-MM-DD hh:mm:ss')}</div>
                  </Skeleton>
                </AList.Item>
            )}
        />
        <Pagination
            className="list-pagination"
            current={pagination.current}
            pageSize={pagination.pageSize}
            total={pagination.total}
            onChange={handlePaginationChange}
        />
      </>
  );
};
