import { ColumnDef } from '@tanstack/react-table'
import React from 'react'

import { User } from '@/models/user.model'

interface UseUserListTableColumnsProps {
  actionHandler: (vehicleInfo: User) => void
}

const useUserListTableColumns = ({
  actionHandler,
}: UseUserListTableColumnsProps) =>
  React.useMemo<ColumnDef<User>[]>(
    () => [
      {
        accessorKey: 'id',
        cell: (info) => info.getValue(),
        header: 'Id',
        enableSorting: true,
      },

      {
        accessorKey: 'username',
        cell: (info) => info.getValue(),
        header: 'Name',
        enableSorting: true,
      },
      {
        accessorKey: 'email',
        cell: (info) => info.getValue(),
        header: 'Email',
        enableSorting: true,
      },
      {
        accessorKey: 'actions',
        cell: ({ row: { original } }) => actionHandler(original),
        header: '',
        enableSorting: false,
      },
    ],
    [actionHandler]
  )

export { useUserListTableColumns }
