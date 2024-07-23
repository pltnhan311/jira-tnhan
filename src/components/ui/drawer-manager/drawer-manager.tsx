// DrawerManager.tsx
import { useState } from 'react'
import EditDrawer from '~/components/ui/edit-drawer/EditDrawer'
import { PlusIcon } from 'lucide-react'
import '../sidebar/_sidebar.scss'

const DrawerManager = ({ isProject = false }) => {
  const [open, setOpen] = useState(false)

  const showDrawer = () => setOpen(true)
  const closeDrawer = () => setOpen(false)

  return (
    <>
      <div className='sidebar__item' onClick={showDrawer}>
        <PlusIcon className='sidebar__item-icon' />
        <span className='title'>CREATE TASK</span>
      </div>
      <EditDrawer onClose={closeDrawer} open={open} isProject={isProject} />
    </>
  )
}

export default DrawerManager
