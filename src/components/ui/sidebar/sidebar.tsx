import { HomeIcon, InfoIcon, LogOutIcon, PlusCircleIcon, SearchIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import './_sidebar.scss'
import { Link } from 'react-router-dom'
import EditDrawer from '~/components/ui/edit-drawer/EditDrawer'

function Sidebar() {
  const [visible, setVisible] = useState(false)
  const [open, setOpen] = useState(false)
  const showDrawer = () => {
    setOpen(true)
  }

  const closeDrawer = () => {
    setOpen(false)
  }

  useEffect(() => {
    setVisible(true)
  }, [])

  return (
    <div className='sidebar'>
      <div className='sidebar-logo'>
        {/* <Link to={'/projects'}>
          <FaJira />
        </Link> */}
      </div>
      <Link to='/' className='sidebar__item mb-3 no-underline'>
        <HomeIcon className='sidebar__item-icon' />
        <span className='title'>HOME</span>
      </Link>
      <div className='sidebar__item mb-3'>
        <SearchIcon className='sidebar__item-icon' />
        <span className='title'>SEARCH PROJECT</span>
      </div>
      {visible && (
        <div className='sidebar__item' onClick={showDrawer}>
          <PlusCircleIcon className='sidebar__item-icon' />
          <span className='title'>CREATE TASK</span>
        </div>
      )}
      <div className='sidebar__bottom'>
        <div className='sidebar__item' onClick={() => {}}>
          <LogOutIcon className='sidebar__item-icon' />
          <span className='title'>LOGOUT</span>
        </div>
        <div className='sidebar__item'>
          <InfoIcon className='sidebar__item-icon' />
          <span className='title'>ABOUT</span>
        </div>
      </div>
      <EditDrawer onClose={closeDrawer} open={open} isProject={false} />
    </div>
  )
}

export default Sidebar
