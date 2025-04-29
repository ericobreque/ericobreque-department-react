import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import axios from 'axios';
import qs from 'qs';

const getRandomuserParams = (params) => ({
  results: params.pagination?.pageSize,
  page: params.pagination?.current,
  ...params,
});

const TagTable = () => {
  
  const [data, setData] = useState(); // En 'data' se cargará el istado obtenido de la api
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  const filterData = data => formatter => data?.map( item => ({
    text: formatter(item),
    value: formatter(item)
  }));
  
  /**
   * Lista de columnas que tendrá la tabla, junto con filtros y sorter dependiendo de cada caso puesto en figma
   */
  const columns = [
    {
      title: 'Caja',
      dataIndex: 'box',
      filters: filterData(data)(i => i.box),
      filterSearch: true,
      onFilter: (value, record) => record.box.startsWith(value),
      sorter: (a, b) => a.box.localeCompare(b.box),
      width: '25%',
    },
    {
      title: 'Code',
      dataIndex: 'code',
      filterSearch: true,
      onFilter: (value, record) => record.code.startsWith(value),
      sorter: (a, b) => a.code.localeCompare(b.code),
      width: '25%',
    },
    {
      title: 'Estado',
      dataIndex: 'status',
      filterSearch: true,
      onFilter: (value, record) => record.status.startsWith(value),
      sorter: (a, b) => a.status.localeCompare(b.status),
      width: '50%',
    },
  ];

  /**
   * Llamado a la api de laravel en la dirección de la api
   */
  const GetList = () => {
    setLoading(true);
    axios.get(`http://nahuelbutalaravel.test/api/tags?${qs.stringify(getRandomuserParams(tableParams))}`).then((results) => {
      
      let dataResult = results.data.map(item => ({
        key : item.id,
        box : item.box,
        code : item.code,
        status : item.status,
      }));
      setData(dataResult);
      setLoading(false);
      setTableParams({
        ...tableParams,
        pagination: {
          ...tableParams.pagination,
          total: results.data.length,
        },
      });
          
    });
  };

  useEffect(() => {
    GetList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableParams.pagination?.current, tableParams.pagination?.pageSize]);
  
  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });

    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }
  };

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  
  const onSelectChange = (newSelectedRowKeys) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return (
    <Table
      rowSelection={rowSelection}
      columns={columns}
      rowKey={(data) => data.id}
      dataSource={data}
      pagination={tableParams.pagination}
      loading={loading}
      onChange={handleTableChange}
    />
  );
};
export default TagTable;