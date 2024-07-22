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

  return (
    <div className='list__board-item flex flex-col bg-zinc-100 mt-2 mr-3 h-auto w-full min-h-[420px]'>
      <Typography.Text className='list__board-item-header m-3 text-gray-500'>{taskList?.statusName}</Typography.Text>
      <div>{renderTask()}</div>
    </div>
  )
}

export default ListTask
