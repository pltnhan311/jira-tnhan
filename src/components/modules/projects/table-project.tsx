import { Avatar, Typography, Table, Space, Tooltip, Popover, Modal } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { PencilIcon, PlusIcon, TrashIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import optionApi from '~/components/api/option-api'
import { useAssignUserProject } from '~/components/modules/projects/hooks/use-assign-user-project'
import { useProjects } from '~/components/modules/projects/hooks/use-projects'
import { useRemoveUserProject } from '~/components/modules/projects/hooks/use-remove-user-project'
import { Button } from '~/components/ui/button'
import EditDrawer from '~/components/ui/edit-drawer/EditDrawer'
import SearchUserProject from '~/components/ui/search/search-user-project'
import useInfo from '~/hooks/use-info'
import { IProject, IUser } from '~/utils/types'

export default function TableProject() {
  const navigate = useNavigate()
  const { data: projects, isPending: isLoading } = useProjects()
  const [userData, setUserData] = useState<IUser[]>()

  const { mutate: assignUserProject } = useAssignUserProject()
  const { mutate: removeUserProject } = useRemoveUserProject()
  const { id: myId } = useInfo()

  const [open, setOpen] = useState(false)
  const [, setSearchParams] = useSearchParams()
  const [isRemoveUserModalVisible, setIsRemoveUserModalVisible] = useState(false)
  const [isDeleteProjectModalVisible, setIsDeleteProjectModalVisible] = useState(false)
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null)
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null)

  const myProjects = projects?.filter((item) => item.creator.id === myId) || []

  const showDrawer = (projectId: string) => {
    setSearchParams({ id: projectId })
    setOpen(true)
  }

  const closeDrawer = () => {
    setOpen(false)
    setSearchParams({})
  }

  const fetchData = async (value?: string) => {
    try {
      const res = await optionApi.getUser(value || '')
      setUserData(res)
      return res
    } catch (error) {
      console.error('Failed to fetch user data:', error)
    }
  }

  useEffect(() => {
    fetchData() // Call fetchData with no keyword to fetch all users on component mount
  }, []) // Empty dependency array means this effect runs once on mount

  const handleRemoveUser = (projectId: string, userId: string) => {
    setSelectedProjectId(projectId)
    setSelectedUserId(userId)
    setIsRemoveUserModalVisible(true)
  }

  const handleConfirmRemoveUser = () => {
    if (selectedProjectId && selectedUserId) {
      removeUserProject({
        projectId: String(selectedProjectId),
        userId: String(selectedUserId)
      })
      setIsRemoveUserModalVisible(false)
    }
  }

  const handleDeleteProject = (projectId: string) => {
    setSelectedProjectId(projectId)
    setIsDeleteProjectModalVisible(true)
  }

  const handleConfirmDeleteProject = () => {
    // Implement project deletion logic here
    setIsDeleteProjectModalVisible(false)
  }

  const columns: ColumnsType<IProject> = [
    {
      key: 'no',
      title: 'No.',
      align: 'center',
      width: 70,
      render: (_, __, index) => index + 1
    },
    {
      key: 'projectId',
      title: 'Project ID',
      width: 130,
      render: (_, item) => (
        <Typography.Text ellipsis={{ tooltip: item.id || '-' }} className='truncate'>
          {item.id || '-'}
        </Typography.Text>
      )
    },
    {
      key: 'projectName',
      title: 'Tên dự án',
      width: 150,
      render: (_, item) => (
        <Typography.Text
          ellipsis={{ tooltip: item.projectName || '-' }}
          className='truncate hover:text-green-700 cursor-pointer duration-100 ease-in'
          onClick={() => navigate(`/board/${item.id}`)}
        >
          {item.projectName || '-'}
        </Typography.Text>
      )
    },
    {
      key: 'categoryName',
      title: 'Category',
      width: 150,
      render: (_, item) => (
        <Typography.Text ellipsis={{ tooltip: item.categoryName || '-' }} className='truncate'>
          {item.categoryName || '-'}
        </Typography.Text>
      )
    },
    {
      key: 'creator',
      title: 'Creator',
      width: 100,
      render: (_, item) => (
        <Typography.Text ellipsis={{ tooltip: item.creator.name || '-' }} className='truncate'>
          {item.creator.name || '-'}
        </Typography.Text>
      )
    },
    {
      key: 'members',
      title: 'Members',
      width: 180,
      render: (_, item) => {
        return (
          <div className='flex gap-1'>
            <div className='flex items-center gap-1'>
              {item?.members?.slice(0, 3).map((member, index) => {
                return (
                  <Popover
                    key={index}
                    placement='top'
                    content={() => {
                      return (
                        <div style={{ overflowY: 'auto', maxHeight: '300px' }}>
                          <table className='table'>
                            <tbody>
                              {item?.members?.map((record, index) => {
                                return (
                                  <tr key={index}>
                                    <td>{record.name}</td>
                                    <td>
                                      <Button
                                        type='text'
                                        shape='circle'
                                        icon={<TrashIcon size={14} color='red' />}
                                        onClick={() => handleRemoveUser(String(item.id), String(record.userId))}
                                      />
                                    </td>
                                  </tr>
                                )
                              })}
                            </tbody>
                          </table>
                        </div>
                      )
                    }}
                  >
                    <Avatar key={index} className='bg-white' src={member?.avatar} />
                  </Popover>
                )
              })}

              {item.members?.length > 3 ? <Avatar className='bg-zinc-200 text-black'>...</Avatar> : ''}
            </div>

            <Popover
              placement='rightTop'
              title={'Add member'}
              trigger='click'
              content={() => {
                return (
                  <SearchUserProject
                    data={userData || []}
                    onSelect={(value: string) => {
                      assignUserProject({
                        projectId: String(item.id),
                        userId: value
                      })
                    }}
                    onSearch={(value: string) => {
                      fetchData(value)
                    }}
                  />
                )
              }}
            >
              <Button type='primary' shape='circle' icon={<PlusIcon size={14} />} />
            </Popover>
          </div>
        )
      }
    },
    {
      title: 'Thao tác',
      dataIndex: 'action',
      key: 'action',
      width: 100,
      render: (_, item) => (
        <Space size='small'>
          <Tooltip title='Chỉnh sửa'>
            <Button
              type='text'
              htmlType='button'
              className='inline-flex items-center justify-center'
              icon={<PencilIcon className='h-4 w-4' />}
              onClick={() => showDrawer(String(item.id))}
            />
          </Tooltip>
          <Tooltip title='Xóa'>
            <Button
              danger
              type='text'
              htmlType='button'
              className='inline-flex items-center justify-center'
              icon={<TrashIcon className='h-4 w-4' />}
              onClick={() => handleDeleteProject(String(item.id))}
            />
          </Tooltip>
        </Space>
      )
    }
  ]

  return (
    <>
      <Table<IProject>
        className='w-full overflow-auto font-light'
        loading={isLoading}
        rowKey={(item) => item.id}
        dataSource={myProjects}
        pagination={{
          defaultPageSize: 10,
          showTotal: (total) => `Total ${total} projects`,
          position: ['bottomCenter']
        }}
        columns={columns}
        scroll={{ x: 880 }}
      />
      <EditDrawer onClose={closeDrawer} open={open} isProject={true} />
      <Modal
        title='Confirm User Removal'
        open={isRemoveUserModalVisible}
        onOk={handleConfirmRemoveUser}
        onCancel={() => setIsRemoveUserModalVisible(false)}
      >
        <p>Are you sure you want to remove this user from the project?</p>
      </Modal>
      <Modal
        title='Confirm Project Deletion'
        open={isDeleteProjectModalVisible}
        onOk={handleConfirmDeleteProject}
        onCancel={() => setIsDeleteProjectModalVisible(false)}
      >
        <p>Are you sure you want to delete this project?</p>
      </Modal>
    </>
  )
}
