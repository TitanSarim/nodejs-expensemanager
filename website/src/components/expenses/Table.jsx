import React,{useMemo, useState} from 'react'
import {flexRender, useReactTable, getCoreRowModel, getPaginationRowModel, getSortedRowModel  } from '@tanstack/react-table';
import {DateTime} from 'luxon'
import {MdKeyboardArrowDown, MdOutlineKeyboardArrowUp} from 'react-icons/md'
import {BiSolidEditAlt} from 'react-icons/bi'
import {ImBin2} from 'react-icons/im'
import {AiOutlineEye} from 'react-icons/ai'


import './Table.css'
import { Link } from 'react-router-dom';

const Table = ({mydata}) => {


    const data = useMemo(() => mydata, [])

    const columns = [
          {
            header: 'Expense ID',
            accessorKey: 'expenseid',
          },
          {
            header: 'Category',
            accessorKey: 'expenseCategory',
          },
          {
            header: 'Expense Name',
            accessorKey: 'expensename',
          },
          {
            header: 'Total Amount',
            accessorKey: 'totalAmount',
          },
          {
            header: 'Paid Amount',
            accessorKey: 'paidAmount',
          },
          {
            header: 'Remaining Amount',
            accessorKey: 'remainingAmount',
          },
          {
            header: 'Created At',
            accessorKey: 'createdAt',
            cell: info => DateTime.fromISO(info.getValue()).toLocaleString(DateTime.DATE_MED)
          },
          {
            id: 'actions',
            header: 'Action',
            accessorKey: 'expenseid',
          }
        ]
        
    const [sorting, setSorting] = useState([])

    const table = useReactTable(
        {
            data, 
            columns, 
            getCoreRowModel: getCoreRowModel(), 
            getPaginationRowModel: getPaginationRowModel(), 
            getSortedRowModel: getSortedRowModel(), 
            state: {
                sorting: sorting
            },
            onSortingChange: setSorting
        }
    )



  return (

    <div className='table__container'>

        <table>
            <thead>
                {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map(header => 
                        <th key={header.id} onClick={header.column.getToggleSortingHandler()}>
                            <div className='filters__table'>
                                {flexRender(header.column.columnDef.header, header.getContext())}
                                {
                                    {asc: <MdOutlineKeyboardArrowUp size={24}/>, desc: <MdKeyboardArrowDown size={24}/>}[header.column.getIsSorted() ?? null]
                                }
                            </div>
                        </th>)}
                    </tr>   
                ))}
            </thead>
            <tbody>
                {table.getRowModel().rows.map(row=>(
                    <tr key={row.id}>
                        {row.getVisibleCells().map(cell => (
                            <td key={cell.id}>
                    {cell.column.id === 'actions'
                        ? (
                            <div className='table__actions'>
                                <Link>
                                    <AiOutlineEye size={21}/>
                                </Link>
                                <Link to={`/UpdateExpenses/${row.original.expenseid}`}>
                                    <BiSolidEditAlt size={21}/>
                                </Link>
                                <Link>
                                    <ImBin2 size={21}/>
                                </Link>
                            </div>
                        )
                        : flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
                        ))}
                    </tr>
                ))}
            </tbody>

        </table>

        <div className='table-btns'>
            <button onClick={() => table.setPageIndex(0)}>First Page</button>
            <button disabled={!table.getCanPreviousPage()} onClick={() => table.previousPage()}>Previous Page</button>
            <button disabled={!table.getCanNextPage()} onClick={() => table.nextPage()}>Mext Page</button>
            <button onClick={() => table.setPageIndex(table.getPageCount()-1)}>Last Page</button>
        </div>


    </div>
  )
}

export default Table