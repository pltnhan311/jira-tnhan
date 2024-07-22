import { Typography } from 'antd'
import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useProjectParams } from '~/components/modules/projects/hooks/use-project_params'
import { Button } from '~/components/ui/button'
import DragDrop from '~/components/ui/drag-drop/DragDrop'
import { Filter } from '~/components/ui/filter/filter'

const DetailProjectPage = () => {
  const navigate = useNavigate()
  const { data: project } = useProjectParams()

  const goBack = () => {
    navigate(-1)
  }

  return (
    <div className=''>
      <Button shape='circle' type='primary' onClick={goBack}>
        <ArrowLeft size={16} />
      </Button>
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
