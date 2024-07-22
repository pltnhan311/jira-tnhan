// DrawerManager.tsx
import { useState } from 'react'
import EditDrawer from '~/components/ui/edit-drawer/EditDrawer'
import '../sidebar/_sidebar.scss'
import { PlusCircleIcon } from 'lucide-react'

const DrawerManager = ({ isProject = false }) => {
  const [open, setOpen] = useState(false)

  const showDrawer = () => setOpen(true)
  const closeDrawer = () => setOpen(false)

  return (
    <>
      <div className='sidebar__item' onClick={showDrawer}>
        <PlusCircleIcon className='sidebar__item-icon' />
        <span className='title'>CREATE TASK</span>
      </div>
      <EditDrawer onClose={closeDrawer} open={open} isProject={isProject} />
    </>
  )
}

export default DrawerManager
