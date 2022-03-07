import React, { useEffect, useState, memo, useCallback, useMemo } from 'react';
import axios from 'axios';
import { Table } from 'antd';

export default memo(() => {
  const [error, setError] = useState(null);
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(false);

  const sorterGenerator = useCallback((dataIndex) => {
    return (a, b) => {
      if (a[dataIndex] === null) {
        return 1;
      }
      if (b[dataIndex] === null) {
        return -1;
      }
      return a[dataIndex].localeCompare(b[dataIndex]);
    };
  }, []);

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

  const columns = useMemo(
    () => [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        sorter: sorterGenerator('name'),
      },
      {
        title: 'Phone',
        dataIndex: 'phone',
        key: 'phone',
        sorter: sorterGenerator('phone'),
      },
      {
        title: 'Rego',
        dataIndex: 'rego',
        key: 'rego',
        sorter: sorterGenerator('rego'),
      },
    ],
    [sorterGenerator]
  );

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
