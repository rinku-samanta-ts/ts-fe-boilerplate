import { Input } from '@/components/ui/input'
import { ChangeEvent, FC } from 'react'
interface SearchProps {
  searchTerm: string | undefined
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
}

export const Search: FC<SearchProps> = ({
  searchTerm,
  onChange,
  placeholder,
}) => {
  return (
    <div>
      <Input
        value={searchTerm}
        onChange={onChange}
        type='search'
        placeholder={placeholder ?? 'Search...'}
        className='md:w-[100px] lg:w-[300px]'
      />
    </div>
  )
}
