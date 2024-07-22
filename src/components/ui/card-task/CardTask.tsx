import { Avatar, Card, Tooltip, Typography } from 'antd'
import { ArrowUp, BookmarkIcon } from 'lucide-react'
import { ITaskDeTail } from '~/utils/types'

type Props = {
  task: ITaskDeTail
}

const CardTask = ({ task }: Props) => {
  const { assigness, priorityTask, taskName } = task

  const renderAvatar = () => {
    return assigness?.map((member, index) => {
      return <Avatar src={member.avatar} key={index} />
    })
  }
  return (
    <Card className='m-2 shadow-sm'>
      <div className='-m-4 flex flex-col gap-y-4'>
        <div>
          <Typography.Text style={{ textOverflow: 'ellipsis' }}>
            {taskName.length > 15 ? taskName.slice(0, 15) + '...' : taskName}
          </Typography.Text>
        </div>
        <div className='flex items-center justify-between'>
          <div className='cards__user flex gap-2 items-center'>
            <div className='cards__user-icons flex gap-1'>
              <BookmarkIcon size={17} color='#65ba43' fill='#65ba43' />
              <Tooltip title={priorityTask?.priority} placement='bottom'>
                <ArrowUp size={17} color='red' />
              </Tooltip>
            </div>
            <span className='priority ms-2 text-[#65ba43]'>{priorityTask.priority}</span>
          </div>
          <Avatar.Group max={{ count: 2 }}>{renderAvatar()}</Avatar.Group>
        </div>
      </div>
    </Card>
  )
}

export default CardTask
