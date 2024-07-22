import { AutoComplete } from 'antd'
import { useRef, useState } from 'react'
import { IUser } from '~/utils/types'

type IProps = {
  data: IUser[]
  onSearch?: (value: string) => void
  onSelect?: (value: string) => void
}

const SearchUserProject = ({ data, onSelect, onSearch }: IProps) => {
  const [valueSearch, setValueSearch] = useState<string | undefined>()
  const searchRef = useRef()

  const options = data?.slice(-10).map((user) => {
    return { label: user.name, value: user.userId.toString() }
  })

  return (
    <AutoComplete
      style={{ width: '100%' }}
      value={valueSearch}
      onChange={(value) => {
        setValueSearch(value)
      }}
      options={options}
      placeholder='Username'
      onSelect={(value, option) => {
        setValueSearch(option.label)
        onSelect && onSelect(value)
        setValueSearch('')
      }}
      onSearch={(value) => {
        if (searchRef.current) {
          clearTimeout(searchRef.current)
        }
        // @ts-expect-error ref
        searchRef.current = setTimeout(() => {
          // @ts-expect-error ref
          onSearch(value)
        }, 300)
      }}
    />
  )
}

export default SearchUserProject
