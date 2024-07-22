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
      <Drawer width={isProject ? 500 : 600} onClose={onClose} open={open}>
        {isProject ? <CreateProjectPage /> : <CreateTaskPage />}
      </Drawer>
    </>
  )
}

export default EditDrawer
