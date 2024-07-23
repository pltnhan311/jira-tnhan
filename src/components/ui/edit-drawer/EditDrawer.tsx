import { Drawer } from 'antd'
import CreateProjectPage from '~/pages/create-project-page'
import CreateTaskPage from '~/pages/create-task-page'

type IProps = {
  onClose: () => void
  open: boolean
  isProject: boolean
}

const EditDrawer = ({ onClose, open, isProject }: IProps) => {
  return (
    <>
      <Drawer width={isProject ? 600 : 1000} onClose={onClose} open={open}>
        {isProject ? <CreateProjectPage onClose={onClose} /> : <CreateTaskPage onClose={onClose} />}
      </Drawer>
    </>
  )
}

export default EditDrawer
