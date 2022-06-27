import ReactDOM from 'react-dom/client';
import './assets/styles/global.scss';
import zhCN from 'antd/lib/locale/zh_CN';
import { ConfigProvider } from 'antd';
import BaseRouter from './router';

const root = ReactDOM.createRoot(document.querySelector('#root')!);
root.render(
  <ConfigProvider locale={zhCN}>
    <BaseRouter />
  </ConfigProvider>
);
