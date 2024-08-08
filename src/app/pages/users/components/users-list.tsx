import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useReactTable, getCoreRowModel } from '@tanstack/react-table'
import { userService } from '@/api'
import { useUserListTableColumns } from '../hooks/use-users-list-table-columns'
import { User, UserFilter } from '@/models/user.model'
import { Button } from '@/components/custom/button'
import { Search } from '@/components/search'
import { IconEdit, IconTrash } from '@tabler/icons-react'
import { useTableState } from '@/hooks/use-table-state'
import DataTable from '@/components/ui/data-table'
import { DataTableRowActions } from '@/components/ui/data-table-row-actions'
import { DataTablePagination } from '@/components/ui/data-table-pagination'
import { DataTableViewOptions } from '@/components/ui/data-table-view-options'
import { QueryKeys } from '@/data/constants/query-key'
import { DataTableFilter } from '@/components/ui/data-table-filter'
import { Cross2Icon } from '@radix-ui/react-icons'
import React, { ChangeEvent, useState } from 'react'
import { roleOptions } from '@/data/options'
import { UserForm } from './user-form'

const initialTableState = {
  pagination: {
    pageIndex: 0,
    pageSize: 10,
  },
  filter: {
    role: [],
    search: '',
  },
}

export const UsersList = () => {
  const queryClient = useQueryClient()
  const [userForm, setUserForm] = useState<{
    isOpen: boolean
    user?: User
  }>({
    isOpen: false,
  })

  const handleUserFormOpen = (user?: User) => {
    setUserForm({ isOpen: true, user })
  }

  const handleUserFormClose = (isValueUpdated?: boolean) => {
    if (isValueUpdated) {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.USER_LIST] })
    }
    setUserForm({ isOpen: false })
  }

  const {
    tableState,
    handlePaginationChange,
    handleSortChange,
    handleFilterChange,
    resetFilters,
    canReset,
  } = useTableState<UserFilter>({
    initialState: initialTableState,
  })

  const { data, isFetching, error } = useQuery({
    queryKey: [QueryKeys.USER_LIST, tableState],
    queryFn: () => userService.getAllUsers(tableState),
  })

  const getActionItems = (user: User) => {
    const actionItems = [
      {
        label: 'Edit',
        icon: <IconEdit className='mr-2' />,
        onClick: () => handleUserFormOpen(user),
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

  const handleRoleChange = (newSelectedValues: string[]) => {
    handleFilterChange({
      ...tableState.filter,
      role: newSelectedValues,
    })
  }

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleFilterChange({
      ...tableState.filter,
      search: event.target.value ?? '',
    })
  }

  return (
    <React.Fragment>
      <div className='flex items-center justify-between'>
        <div className='flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2'>
          <Search
            onChange={handleSearchChange}
            searchTerm={tableState.filter.search}
            placeholder='Search User...'
          />
          <div className='flex gap-x-2'>
            <DataTableFilter
              title='Role'
              options={roleOptions}
              selectedValues={tableState.filter.role}
              onChange={handleRoleChange}
            />
          </div>
          {canReset() && (
            <Button
              variant='ghost'
              onClick={resetFilters}
              className='h-8 px-2 lg:px-3'
            >
              Reset
              <Cross2Icon className='ml-2 h-4 w-4' />
            </Button>
          )}
          <div className='flex flex-row items-center justify-center gap-2 sm:!ml-auto '>
            <DataTableViewOptions table={tableProps} />
            <Button
              variant='default'
              onClick={() => handleUserFormOpen()}
              className='ms-2 h-8 px-2 lg:px-3'
            >
              Add User
            </Button>
          </div>
        </div>
      </div>

      <div className='mt-4 rounded-md border'>
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
      <UserForm
        isOpen={userForm.isOpen}
        initialData={userForm.user}
        handleClose={handleUserFormClose}
      />
    </React.Fragment>
  )
}
