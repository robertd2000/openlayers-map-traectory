import React, { FC } from 'react'
import { useSearch } from '../../hooks/useSearch'
import styles from './Search.module.css'

interface IProps {
  searchTerm: string
  onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void
}
export const Search: FC<IProps> = ({ searchTerm, onSearch }) => {
  return (
    <input
      value={searchTerm}
      onChange={onSearch}
      className={styles.input}
      type="text"
      placeholder="Search"
    />
  )
}
