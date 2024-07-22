import { PlusCircleIcon, SettingsIcon, Table } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import useInfo from '~/hooks/use-info'
import './_menu.scss'
import { Divider } from 'antd'

function Menu() {
  const user = useInfo()
  return (
    <div className='menu'>
      <div className='menu__user'>
        <img src='https://www.logodesign.net/mascot_logo/mascot-5891ld.png?size=1' alt='avatar' />
        <div className='menu__user-info'>
          <div className='framework'>{user.name}</div>
          <div className='project'>Jira Clone 2.0</div>
        </div>
      </div>
      {/* <Button
        type='link'
        // onClick={() => {
        //   if (projectDetail?.id) navigate(`/board/${projectDetail?.id}`)
        //   else navigate('/projects')
        // }}
        className='menu__item'
      >
        <LayoutDashboardIcon className='menu__item-icon' />
        <span>Kanban Board</span>
      </Button> */}
      <NavLink to='/create' className='menu__item'>
        <Table className='menu__item-icon' />
        <span>Kanban Board</span>
      </NavLink>
      <NavLink to='/create' className='menu__item'>
        <PlusCircleIcon className='menu__item-icon' />
        <span>Create Projects</span>
      </NavLink>
      <NavLink to='/projects' className='menu__item'>
        <SettingsIcon className='menu__item-icon' />
        <span>Project Settings</span>
      </NavLink>
      <Divider className='my-5 bg-gray-300' />
    </div>
  )
}

export default Menu
