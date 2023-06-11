import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from "axios";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'

type Person = {
  firstName: string
  lastName: string
  age: number
}

type myType = {
  id : number
  time : string
  temper : number
}

const defaultData: Person[] = [
  {
    firstName: 'tanner',
    lastName: 'linsley',
    age: 24,
  },
  {
    firstName: 'tandy',
    lastName: 'miller',
    age: 40,
  },
  {
    firstName: 'joe',
    lastName: 'dirte',
    age: 45,
  },
]


const columnHelper = createColumnHelper<myType>()

const columns = [
  columnHelper.accessor('id', {
    id : 'ID',
    cell: info => info.getValue(),
    footer: info => info.column.id,
  }),
  columnHelper.accessor(row => row.time, {
    id: '时间',
    cell: info => <i>{info.getValue()}</i>,
    header: () => <span>时间</span>,
    footer: info => info.column.id,
  }),
  columnHelper.accessor('temper', {
    header: () => '温度',
    cell: info => info.renderValue(),
    footer: info => info.column.id,
  })
]
//const axios = require('axios');
function App() {
  let list: myType[] = []
  const [data, setData] = React.useState(() => [...list])
  const rerender = React.useReducer(() => ({}), {})[1]
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })
  console.log("hello");
  axios.get('http://127.0.0.1:9096/temper')
      .then(function (response) {
        // 处理成功情况
        console.log(response);
        list = response.data;
        setData(list);
      })
      .catch(function (error) {
        // 处理错误情况
        console.log(error);
      })
      .then(function () {
        // 总是会执行
      });
  console.log(list.length);

  return (
      <div className="p-2">
        <table>
          <thead>
          {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                    <th key={header.id}>
                      {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                          )}
                    </th>
                ))}
              </tr>
          ))}
          </thead>
          <tbody>
          {table.getRowModel().rows.map(row => (
              <tr key={row.id}>
                {row.getVisibleCells().map(cell => (
                    <td key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                ))}
              </tr>
          ))}
          </tbody>
          <tfoot>
          {table.getFooterGroups().map(footerGroup => (
              <tr key={footerGroup.id}>
                {footerGroup.headers.map(header => (
                    <th key={header.id}>
                      {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.footer,
                              header.getContext()
                          )}
                    </th>
                ))}
              </tr>
          ))}
          </tfoot>
        </table>
        <div className="h-4" />
      </div>
  )
}
export default App;
