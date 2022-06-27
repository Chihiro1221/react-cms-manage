import {Button, message, Table} from 'antd';
import React, {useEffect, useState} from 'react';
import {getArticles, ArticleApi} from '@/apis/articleApi';
import './index.scss';
import {ColumnsType, TablePaginationConfig} from 'antd/lib/table';
import dayjs from 'dayjs';

export const TableList = () => {
  const [dataSource, setDataSource] = useState<ArticleApi[]>([]);
  const [pagination, setPagination] = useState({current: 1, pageSize: 10, total: 0});
  const loadArticle = () => {
    getArticles({num: pagination.current, count: pagination.pageSize})
        .then(res => {
          if (res.errCode) {
            return message.error(res.message);
          }
          const {arr, count, num, total} = res.data;
          // 设置数据并且更新分页
          setDataSource(arr);
          setPagination({total, current: num, pageSize: count});
        })
        .catch(err => {
          message.error('获取文章列表失败');
        });
  };
  useEffect(() => {
    loadArticle();
  }, []);

  // 监听分页修改
  const handlePaginationChange = (pagination: TablePaginationConfig) => {
    // 重新获取请求配置
    console.log(pagination);
    loadArticle();
  };
  // 表格配置
  const columns: ColumnsType<ArticleApi> = [
    {
      dataIndex: 'title',
      key: 'title',
      width: '70%',
      render(text: string, record: ArticleApi) {
        return (
            <div className="title-wrap">
              <div className="title">{text}</div>
              <div className="subtitle">{record.subTitle}</div>
            </div>
        );
      },
    },
    {
      dataIndex: 'date',
      key: 'date',
      render(text: string, record: ArticleApi) {
        return <div>{dayjs(text).format('YYYY-MM-DD hh:mm:ss')}</div>;
      },
    },
    {
      dataIndex: 'action',
      key: 'action',
      render(text: string, record: ArticleApi) {
        return (
            <div className="operator">
              <Button type="primary">编辑</Button>
              <Button type="primary" danger>
                删除
              </Button>
            </div>
        );
      },
    },
  ];

  return <Table rowKey="id" showHeader={false} dataSource={dataSource} columns={columns} pagination={pagination}
                onChange={handlePaginationChange}/>;
};
