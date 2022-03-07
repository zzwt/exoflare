import React, { memo } from 'react';
import './App.css';
import 'antd/dist/antd.min.css';
import TableView from './components/TableView';
import { Row, Col } from 'antd';

export default memo(() => {
  return (
    <div className="App">
      <Row gutter={16}>
        <Col className="gutter-row" span={12}>
          <TableView />
        </Col>
      </Row>
    </div>
  );
});
