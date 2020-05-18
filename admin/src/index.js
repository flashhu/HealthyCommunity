import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import { configure } from 'mobx';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';

import App from './App';
import injects from './store';

// 不允许在action之外修改状态
configure({enforceActions: 'observed'})

ReactDOM.render(
  <Provider {...injects}>
    <ConfigProvider locale={zhCN}>
      <App />
    </ConfigProvider>
  </Provider>,
  document.getElementById('root')
);

