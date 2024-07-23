import { Typography } from 'antd'
import CardTask from '~/components/ui/card-task/CardTask'
import { IListTask } from '~/utils/types'

type IProps = {
  taskList: IListTask
}

const ListTask = ({ taskList }: IProps) => {
  const renderTask = () => {
    return taskList?.lstTaskDeTail?.map((task, index) => {
      return <CardTask key={index} task={task} />
    })
  }

  const getStatusClassName = (statusName: string) => {
    switch (statusName) {
      case 'BACKLOG':
        return {
          title: 'bg-gray-500',
          background: 'bg-zinc-100'
        }
      case 'SELECTED FOR DEVELOPMENT':
        return {
          title: 'bg-indigo-500',
          background: 'bg-zinc-100'
        }
      case 'IN PROGRESS':
        return {
          title: 'bg-orange-500',
          background: 'bg-zinc-100'
        }
      case 'DONE':
        return {
          title: 'bg-green-600',
          background: 'bg-zinc-100'
        }
      default:
        return {
          title: '',
          background: 'bg-white'
        }
    }
  }

  const statusClasses = getStatusClassName(taskList?.statusName)

  return (
    <div
      className={`list__board-item flex flex-col ${statusClasses.background} mt-2 mr-3 h-auto w-full min-h-[420px] rounded-sm`}
    >
      <Typography.Text
        className={`list__board-item-header m-2 p-0.5 rounded-sm text-white text-center ${statusClasses.title}`}
      >
        {taskList?.statusName}
      </Typography.Text>
      <div>{renderTask()}</div>
    </div>
  )
}

export default ListTask
