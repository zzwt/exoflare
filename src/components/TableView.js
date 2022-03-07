import React, {
  useEffect,
  useState,
  memo,
  useCallback,
  useMemo,
  useRef,
} from 'react';
import axios from 'axios';
import { Table, Input, Button, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

export default memo(() => {
  const [error, setError] = useState(null);
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(false);
  const searchInput = useRef();

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

  const getColumnSearchProps = useCallback(
    (dataIndex) => ({
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => (
        <div style={{ padding: 8 }}>
          <Input
            ref={(node) => {
              searchInput.current = node;
            }}
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => confirm()}
            style={{ marginBottom: 8, display: 'block' }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => confirm()}
              icon={<SearchOutlined />}
              size="small"
              style={{ width: 90 }}
            >
              Search
            </Button>
            <Button
              onClick={() => {
                clearFilters();
                confirm({ closeDropdown: true });
              }}
              size="small"
              style={{ width: 90 }}
            >
              Reset
            </Button>
          </Space>
        </div>
      ),
      filterIcon: (filtered) => (
        <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
      ),
      onFilter: (value, record) =>
        record[dataIndex]
          ? record[dataIndex]
              .toString()
              .toLowerCase()
              .includes(value.toLowerCase())
          : '',
      onFilterDropdownVisibleChange: (visible) => {
        if (visible) {
          setTimeout(() => searchInput.current.select(), 100);
        }
      },
    }),
    []
  );

  const columns = useMemo(
    () => [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        sorter: sorterGenerator('name'),
        ...getColumnSearchProps('name'),
      },
      {
        title: 'Phone',
        dataIndex: 'phone',
        key: 'phone',
        sorter: sorterGenerator('phone'),
        ...getColumnSearchProps('phone'),
      },
      {
        title: 'Rego',
        dataIndex: 'rego',
        key: 'rego',
        sorter: sorterGenerator('rego'),
        ...getColumnSearchProps('rego'),
      },
    ],
    [sorterGenerator, getColumnSearchProps]
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
