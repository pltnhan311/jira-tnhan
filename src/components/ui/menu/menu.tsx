import { PlusIcon, Table } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import useInfo from '~/hooks/use-info'
import './_menu.scss'
import { Divider } from 'antd'

function Menu() {
  const user = useInfo()
  return (
    <div className='menu'>
      <div className='menu__user'>
        <img src={user?.avatar} alt='avatar' />
        <div className='menu__user-info'>
          <div className='framework'>{user.name}</div>
          <div className='project'>Jira Clone 4.0</div>
        </div>
      </div>
      <NavLink to='/' className='menu__item'>
        <Table className='menu__item-icon' size={20} />
        <span>All Projects</span>
      </NavLink>
      <NavLink to='/create' className='menu__item'>
        <PlusIcon className='menu__item-icon' size={20} />
        <span>Create Project</span>
      </NavLink>
      <Divider className='my-5 bg-gray-300' />
    </div>
  )
}

export default Menu
