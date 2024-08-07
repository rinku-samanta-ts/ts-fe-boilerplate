import { ChangeEvent, useState } from 'react'
import { PaginationState, SortingState } from '@tanstack/react-table'

export interface TableState {
  pagination: PaginationState
  sorting?: {
    field: string
    order: string
  }
  search: string | undefined
}

interface UseTableStateProps {
  initialState: TableState
}

const useTableState = ({ initialState }: UseTableStateProps) => {
  let initialSorting: SortingState = []
  if (initialState.sorting) {
    initialSorting = [
      {
        id: initialState.sorting.field,
        desc: initialState.sorting.order === 'desc',
      },
    ]
  }

  const [sortingState, setSortingState] = useState<SortingState>(initialSorting)
  const [paginationState, setPaginationState] = useState<PaginationState>(
    initialState.pagination
  )
  const [searchTerm, setSearchTerm] = useState<string | undefined>(
    initialState.search
  )

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value ?? undefined)
    setPaginationState({
      pageIndex: 0,
      pageSize: paginationState.pageSize,
    })
  }

  const resetTableState = () => {
    setSortingState(initialSorting)
    setPaginationState(initialState.pagination)
    setSearchTerm(initialState.search)
  }

  const getTableState = () => ({
    pagination: paginationState,
    sorting: {
      data: sortingState,
      order:
        sortingState.length > 0 ? (sortingState[0].desc ? 'desc' : 'asc') : '',
      field: sortingState.length > 0 ? sortingState[0].id : '',
    },
    search: searchTerm,
  })

  return {
    tableState: getTableState(),
    handleSortChange: setSortingState,
    handlePaginationChange: setPaginationState,
    handleSearchChange,
    resetTableState,
  }
}

export { useTableState }
