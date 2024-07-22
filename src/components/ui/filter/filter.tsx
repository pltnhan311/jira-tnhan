import { Avatar, Input, Typography } from 'antd'
import { SearchIcon } from 'lucide-react'
import { IProjectDetail } from '~/utils/types'

export const Filter = ({ projectDetail }: { projectDetail?: IProjectDetail }) => {
  const renderAvatar = () => {
    return projectDetail?.members?.map(({ avatar }, index) => {
      return <Avatar className='bg-white' src={avatar} key={index} />
    })
  }

  return (
    <div className='flex gap-5 items-center my-5'>
      <div className='search-block'>
        <Input prefix={<SearchIcon size={16} />} />
      </div>
      <div className='avatar-group'>
        <Avatar.Group max={{ count: 4 }} className='rounded-full'>
          {renderAvatar()}
        </Avatar.Group>
      </div>
      <Typography.Text>Only My Issues</Typography.Text>
      <Typography.Text>Recently Updated</Typography.Text>
    </div>
  )
}
