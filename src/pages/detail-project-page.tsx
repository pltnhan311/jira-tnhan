import { Typography } from 'antd'
import { useProjectParams } from '~/components/modules/projects/hooks/use-project_params'
import DragDrop from '~/components/ui/drag-drop/DragDrop'
import { Filter } from '~/components/ui/filter/filter'

const DetailProjectPage = () => {
  const { data: project } = useProjectParams()

  return (
    <div className=''>
      <div>
        <Typography.Title level={3} className='!font-medium'>
          Project: {project?.projectName}
        </Typography.Title>
        <Typography.Text>{project?.description}</Typography.Text>
      </div>
      <Filter projectDetail={project} />
      <DragDrop projectDetail={project} />
    </div>
  )
}

export default DetailProjectPage
