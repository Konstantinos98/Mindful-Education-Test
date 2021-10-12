import React, { useMemo } from 'react'
import { useTable, useFilters, useGlobalFilter, useSortBy  } from 'react-table'
import college_data from '../collegeData.json'
import { college_Columns } from './Columns'
import "./table.css"
import { TableFilter } from './TableFilter'

// To receive the data from the URl
// import axios from "axios";
// async function getColleges () {
//     const collegesUrl = "https://mindfuleducation-cdn.s3.eu-west-1.amazonaws.com/misc/data.json"
//     const response = await axios.get(collegesUrl);
//     return response.data;
// };

export const Table = () => {

  // Data
  const columns = useMemo(() => college_Columns, [])
  const data = useMemo(() => college_data, [])

  // Table Properties (State)
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter
  } = useTable(
    {
      columns,
      data
    },
    useFilters,
    useGlobalFilter,
    useSortBy
  )

  const { globalFilter } = state

  // Table Design
  return (
    <>
      <TableFilter filter={globalFilter} setFilter={setGlobalFilter} />
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}