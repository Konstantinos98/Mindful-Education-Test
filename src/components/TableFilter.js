import React, { useState } from 'react'
import { useAsyncDebounce } from 'react-table'
import "./table.css"

export const TableFilter = ({ filter, setFilter }) => {
  const [value, setValue] = useState(filter)
  const onChange = useAsyncDebounce(value => {
    setFilter(value || undefined)
  }, 1000)
  return (
    <h3>
      <input
        id = "searchbox"
        size= "50"
        type= "text"
        value={value || ''}
        onChange={e => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={'Search by Name, Ofsted Rating, Group Prefix'}
      />
    </h3>
  )
}