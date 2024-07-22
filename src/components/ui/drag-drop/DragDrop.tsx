import ListTask from '~/components/ui/list-task/listtask'
import { IProjectDetail } from '~/utils/types'

const DragDrop = ({ projectDetail }: { projectDetail?: IProjectDetail }) => {
  const renderTaskList = () => {
    return projectDetail?.lstTask?.map((taskList, index) => {
      return <ListTask key={index} taskList={taskList} />
    })
  }

  return <div className='list__board flex items-center justify-start basis-auto'>{renderTaskList()}</div>
}

export default DragDrop
