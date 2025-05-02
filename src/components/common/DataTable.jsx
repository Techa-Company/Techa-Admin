import * as React from "react"
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"

import {
    ChevronDown,
    ChevronLeftIcon,
    ChevronRightIcon,
    ChevronsLeftIcon,
    ChevronsRightIcon
} from "lucide-react"

import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu"

import { Input } from "../ui/input"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table"


import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "../ui/select"

import PropTypes from "prop-types"
import { Button } from "../ui/button"

export function DataTable({ data, columns, filters }) {
    const [sorting, setSorting] = React.useState([])
    const [columnFilters, setColumnFilters] = React.useState([])
    const [columnVisibility, setColumnVisibility] =
        React.useState({})
    const [rowSelection, setRowSelection] = React.useState({})
    const [pagination, setPagination] = React.useState({
        pageIndex: 0,
        pageSize: 5,
    })

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        onPaginationChange: setPagination,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
            pagination
        },
    })

    return (
        <div className="w-full">
            <div className="flex flex-col md:flex-row py-4 gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {
                        filters.map((item, index) => {
                            return (
                                <Input
                                    key={index}
                                    placeholder={`فیلتر بر اساس ${item.placeholder}`}
                                    value={(table.getColumn(item.value)?.getFilterValue()) ?? ""}
                                    onChange={(event) =>
                                        table.getColumn(item.value)?.setFilterValue(event.target.value)
                                    }
                                    className="w-full"
                                />
                            )
                        })
                    }

                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="mr-auto">
                            ستون ها <ChevronDown className="mr-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) =>
                                            column.toggleVisibility(!!value)
                                        }
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                )
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id} className="text-center">
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id} className="px-5 text-right">
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    هیچ نتیجه ای یافت نشد.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className='flex flex-row-reverse items-center justify-between overflow-auto mt-3'>
                <div className='flex items-center gap-2'>
                    <Select
                        value={`${table.getState().pagination.pageSize}`}
                        onValueChange={(value) => {
                            table.setPageSize(Number(value))
                        }}
                    >
                        <SelectTrigger className='h-8 w-[70px]'>
                            <SelectValue placeholder={table.getState().pagination.pageSize} />
                        </SelectTrigger>
                        <SelectContent side='top'>
                            {[5, 10, 20, 30, 50].map((pageSize) => (
                                <SelectItem key={pageSize} value={`${pageSize}`}>
                                    {pageSize}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <p className='hidden text-sm font-medium sm:block'>ستون در هر صفحه</p>
                </div>
                <div className='flex items-center sm:space-x-6 lg:space-x-8'>
                    <div className='flex w-[100px] items-center justify-center text-sm font-medium'>
                        {table.getState().pagination.pageIndex + 1} از{' '}
                        {table.getPageCount()} صفحه
                    </div>
                    <div className='flex items-center space-x-2'>
                        <Button
                            variant='outline'
                            className='hidden h-8 w-8 p-0 lg:flex'
                            onClick={() => table.setPageIndex(0)}
                            disabled={!table.getCanPreviousPage()}
                        >
                            <span className='sr-only'>Go to first page</span>
                            <ChevronsRightIcon className='h-4 w-4' />
                        </Button>
                        <Button
                            variant='outline'
                            className='h-8 w-8 p-0'
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                        >
                            <span className='sr-only'>Go to previous page</span>
                            <ChevronRightIcon className='h-4 w-4' />
                        </Button>
                        <Button
                            variant='outline'
                            className='h-8 w-8 p-0'
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                        >
                            <span className='sr-only'>Go to next page</span>
                            <ChevronLeftIcon className='h-4 w-4' />
                        </Button>
                        <Button
                            variant='outline'
                            className='hidden h-8 w-8 p-0 lg:flex'
                            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                            disabled={!table.getCanNextPage()}
                        >
                            <span className='sr-only'>Go to last page</span>
                            <ChevronsLeftIcon className='h-4 w-4' />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

DataTable.propTypes = {
    data: PropTypes.array,
    columns: PropTypes.array,
    filters: PropTypes.array
}