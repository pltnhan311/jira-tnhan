import { Avatar, Card, Modal, Tooltip, Typography } from 'antd'
import { useState } from 'react'
import { ArrowDown, ArrowUp, BugIcon, CheckSquare2 } from 'lucide-react'
import { ITaskDeTail } from '~/utils/types'
import CreateTaskPage from '~/pages/create-task-page'
import { priorityMappings } from '~/utils/config'
import { useSearchParams } from 'react-router-dom'

type Props = {
  task: ITaskDeTail
}

const CardTask = ({ task }: Props) => {
  const { assigness, priorityTask, taskName, taskId, taskTypeDetail } = task
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [, setSearchParams] = useSearchParams()

  const renderAvatar = () => {
    return assigness?.map((member, index) => {
      return <Avatar src={member.avatar} key={index} />
    })
  }

  const showModal = () => {
    setIsModalVisible(true)
    setSearchParams({ taskId: taskId.toString() })
  }

  const handleCancel = () => {
    setIsModalVisible(false)
    setSearchParams({})
  }

  // @ts-expect-error color
  const priority = priorityMappings[priorityTask.priority]

  return (
    <>
      <Card
        className='m-2 shadow-sm rounded-sm hover:cursor-pointer transform transition-transform duration-300 hover:scale-105'
        onClick={showModal}
      >
        <div className='-m-4 flex flex-col gap-y-4'>
          <div>
            <Typography.Text style={{ textOverflow: 'ellipsis' }}>
              {taskName.length > 25 ? taskName.slice(0, 15) + '...' : taskName}
            </Typography.Text>
          </div>
          <div className='flex items-center justify-between'>
            <div className='cards__user flex gap-2 items-center'>
              <div className='cards__user-icons flex gap-1'>
                <Tooltip title={taskTypeDetail?.taskType} placement='bottom'>
                  {taskTypeDetail?.taskType === 'bug' ? (
                    <BugIcon color={priority.color} size={17} />
                  ) : (
                    <CheckSquare2 color={priority.color} size={17} />
                  )}
                </Tooltip>
                {priorityTask?.priority === 'High' || priorityTask?.priority === 'Medium' ? (
                  <ArrowUp size={17} color={priority.color} />
                ) : (
                  <ArrowDown size={17} color={priority.color} />
                )}
              </div>
              <span className='priority ms-2' style={{ color: priority.textColor }}>
                {priorityTask.priority}
              </span>
            </div>
            <Avatar.Group max={{ count: 2 }}>{renderAvatar()}</Avatar.Group>
          </div>
        </div>
      </Card>

      <Modal open={isModalVisible} onCancel={handleCancel} footer={null} style={{ top: 20 }} width='80%'>
        <CreateTaskPage taskId={taskId} onClose={handleCancel} />
      </Modal>
    </>
  )
}

export default CardTask
