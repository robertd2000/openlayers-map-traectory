import React, { useState } from 'react'

export const useSearch = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  return {
    searchTerm,
    onSearch,
  }
}
