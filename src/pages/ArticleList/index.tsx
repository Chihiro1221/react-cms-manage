import { List } from '@/components/List';
import { TableList } from '@/components/TableList';
import React from 'react';

export const ArticleList: React.FC = () => {
  return (
    <div className="article-list-container">
      {/* 表格组件 */}
      {/* <TableList /> */}
      {/* 列表组件 */}
      <List />
    </div>
  );
};
