import { useQuery } from '@tanstack/react-query'
import { useReactTable, getCoreRowModel } from '@tanstack/react-table'
import { userService } from '@/api'
import { useUserListTableColumns } from '../hooks/use-users-list-table-columns'
import { User } from '@/models/user.model'
import { Button } from '@/components/custom/button'
import { Search } from '@/components/search'
import { IconEdit, IconTrash } from '@tabler/icons-react'
import { useTableState } from '@/hooks/use-table-state'
import DataTable from '@/components/ui/data-table'
import { DataTableRowActions } from '@/components/ui/data-table-row-actions'
import { DataTablePagination } from '@/components/ui/data-table-pagination'
import { DataTableViewOptions } from '@/components/ui/data-table-view-options'

const initialTableState = {
  pagination: {
    pageIndex: 0,
    pageSize: 10,
  },
  search: '',
}

export const UsersList = () => {
  const {
    tableState,
    handlePaginationChange,
    handleSortChange,
    handleSearchChange,
  } = useTableState({
    initialState: initialTableState,
  })

  const { data, isFetching, error } = useQuery({
    queryKey: ['user-list', tableState],
    queryFn: () => userService.getAllUsers(tableState),
  })

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const getActionItems = (_user: User) => {
    const actionItems = [
      {
        label: 'Edit',
        icon: <IconEdit className='mr-2' />,
        onClick: () => {},
      },
      {
        label: 'Delete',
        icon: <IconTrash className='mr-2' />,
        onClick: () => {},
        className: 'text-red focus:text-red ',
      },
    ]

    return <DataTableRowActions items={actionItems} />
  }
  const columns = useUserListTableColumns({
    actionHandler: getActionItems,
  })

  const tableProps = useReactTable({
    data: data?.data?.users || [],
    columns,
    rowCount: data?.data?.count ?? 0,
    state: {
      pagination: tableState.pagination,
      sorting: tableState.sorting.data,
    },
    onPaginationChange: handlePaginationChange,
    onSortingChange: handleSortChange,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    manualSorting: true,
  })

  return (
    <div>
      <div className='mb-3 flex flex-col items-center gap-2 md:flex-row'>
        <Search
          onChange={handleSearchChange}
          searchTerm={tableState.search}
          placeholder='Search User...'
        />
        <div className='flex flex-row items-center gap-4 sm:flex-col md:ml-auto md:flex-row'>
          <DataTableViewOptions table={tableProps} />

          <Button className='rounded-lg px-8 py-4 text-base'>Add User</Button>
        </div>
      </div>

      <div className='rounded-md border'>
        <DataTable<User>
          tableProps={tableProps}
          isFetching={isFetching}
          isError={!!error}
          totalColumn={columns.length}
          hasRecord={!!data?.data?.users?.length}
        />
      </div>
      <div className='mt-4'>
        <DataTablePagination table={tableProps} />
      </div>
    </div>
  )
}
