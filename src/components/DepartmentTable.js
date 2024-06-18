import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import axios from 'axios';
import qs from 'qs';

const getRandomuserParams = (params) => ({
  results: params.pagination?.pageSize,
  page: params.pagination?.current,
  ...params,
});

const DepartmentTable = () => {
  
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
      title: 'División',
      dataIndex: 'name',
      filters: filterData(data)(i => i.name),
      filterSearch: true,
      onFilter: (value, record) => record.name.startsWith(value),
      sorter: (a, b) => a.name.localeCompare(b.name),
      width: '20%',
    },
    {
      title: 'División superior',
      dataIndex: 'division',
      filterSearch: true,
      onFilter: (value, record) => record.division.startsWith(value),
      sorter: (a, b) => a.division.localeCompare(b.division),
      width: '20%',
    },
    {
      title: 'Colaboradores',
      dataIndex: 'employee',
      sorter: (a, b) => a.employee.localeCompare(b.employee),
    },
    {
      title: 'Nivel',
      dataIndex: 'level',
      filterSearch: true,
      onFilter: (value, record) => record.level.startsWith(value),
      sorter: (a, b) => a.level - b.level,
    },
    {
      title: 'Subdivisiones',
      dataIndex: 'subdivisions',
      sorter: true,
    },
    {
      title: 'Embajadores',
      dataIndex: 'ambassador',
      filters: filterData(data)(i => i.ambassador),
      filterSearch: true,
      onFilter: (value, record) => record.ambassador.startsWith(value),
      sorter: (a, b) => a.ambassador.localeCompare(b.ambassador),
    },
  ];

  /**
   * Llamado a la api de laravel en la dirección de la api
   */
  const GetList = () => {
    setLoading(true);
    axios.get(`https://3.137.219.233/api/departments?${qs.stringify(getRandomuserParams(tableParams))}`).then((results) => {
      
      let dataResult = results.data.map(item => ({
        key : item.id,
        name : item.name,
        division : item.division,
        employee : item.employee,
        level : item.level,
        subdivisions : item.subdivisions,
        ambassador : item.ambassador
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
export default DepartmentTable;