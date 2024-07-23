import { HomeIcon, InfoIcon, LogOutIcon, SearchIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import './_sidebar.scss'
import { Link, useParams } from 'react-router-dom'
import DrawerManager from '~/components/ui/drawer-manager/drawer-manager'

function Sidebar() {
  const [visible, setVisible] = useState(false)
  const { id: projectId } = useParams()

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
      {visible && projectId && <DrawerManager />}
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
    </div>
  )
}

export default Sidebar
