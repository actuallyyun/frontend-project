import { TextInput, Button } from 'flowbite-react'
import { useState } from 'react'

import { QueryParams } from '../../misc/type'
import { setParams } from '../../misc/utils'

type Props = {
  setQuery: React.Dispatch<React.SetStateAction<QueryParams>>
}

export default function SearchProduct({ setQuery }: Props) {
  const [searchInput, setSearchInput] = useState<string>('')
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput((prev) => (prev = e.target.value))
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    setQuery(
      (prev) => (prev = setParams(prev, { type: 'title', value: searchInput }))
    )
  }
  return (
    <div className='grid md:grid-cols-3 space-between gap-4' role='search'>
      <TextInput
        name='search'
        id='base'
        type='text'
        sizing='md'
        onChange={handleChange}
        placeholder='Search products'
        aria-label='product-search-input'
        className='col-span-2'
      />
      <Button onClick={handleSearch} aria-label='product-search-button'>
        Search
      </Button>
    </div>
  )
}
