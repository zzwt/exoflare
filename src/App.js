import React, { memo, useState } from 'react';
import './App.css';
import 'antd/dist/antd.min.css';
import TableView from './components/TableView';
import DetailView from './components/DetailView';
import { Row, Col } from 'antd';

export default memo(() => {
  const [selected, setSelected] = useState(null);

  return (
    <div className="App">
      <Row gutter={16}>
        <Col span={12}>
          <TableView
            selected={selected}
            onSelect={(record) => setSelected(record)}
          />
        </Col>
        <Col span={12}>
          <DetailView selected={selected} />
        </Col>
      </Row>
    </div>
  );
});
