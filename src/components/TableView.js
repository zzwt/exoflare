import React, { useEffect, useState, memo } from 'react';
import axios from 'axios';
import { Table } from 'antd';

export default memo(() => {
  const [error, setError] = useState(null);
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getDrivers = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:3005/drivers');
        setDrivers(response.data);
      } catch (error) {
        console.log(error);
        setError('Fetching drivers error');
      } finally {
        setLoading(false);
      }
    };
    getDrivers();
  }, []);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Rego',
      dataIndex: 'rego',
      key: 'rego',
    },
  ];

  if (error) return <div>{error}</div>;

  return (
    <Table
      columns={columns}
      rowKey={(record) => record.id}
      dataSource={drivers}
      loading={loading}
      pagination={false}
      sortDirections={['ascend', 'descend']}
    />
  );
});
