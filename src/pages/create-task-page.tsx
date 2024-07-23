import { Form, Input, Select, Tooltip, Typography, Modal } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Button } from '~/components/ui/button'
import EditorMCE from '~/components/ui/editor-mce/EditorMCE'
import { ITaskDeTail } from '~/utils/types'
import { isEmpty } from 'lodash'

import { useCreateTask } from '~/components/modules/tasks/hooks/use-create-task'
import { useTask } from '~/components/modules/tasks/hooks/use-task'
import { useStatus } from '~/components/modules/tasks/hooks/use-status'
import { useTaskType } from '~/components/modules/tasks/hooks/use-task-type'
import { usePriority } from '~/components/modules/tasks/hooks/use-priority'
import { useUpdateTask } from '~/components/modules/tasks/hooks/use-update.task'
import { TrashIcon } from 'lucide-react'
import { useDeleteTask } from '~/components/modules/tasks/hooks/use-delete-task'
import { useProjectParams } from '~/components/modules/projects/hooks/use-project_params'
import Label from '~/components/ui/label'

type IProps = {
  taskId?: number
  onClose: () => void
}

const CreateTaskPage = ({ taskId, onClose }: IProps) => {
  const editorRef = useRef(null)
  const [form] = Form.useForm<ITaskDeTail>()
  const [isModalVisible, setIsModalVisible] = useState(false)

  const { id: projectId } = useParams()

  const { data: task } = useTask(taskId ?? 0)
  const { data: status } = useStatus()
  const { data: taskType } = useTaskType()
  const { data: priority } = usePriority()
  const { data: project } = useProjectParams()

  const { mutate: createTask } = useCreateTask()
  const { mutate: updateTask } = useUpdateTask()
  const { mutate: deleteTask } = useDeleteTask(taskId ?? 0)

  const descriptionValue = task?.description

  useEffect(() => {
    if (!task || isEmpty(task)) {
      return
    }

    const {
      statusId,
      priorityId,
      timeTrackingRemaining,
      timeTrackingSpent,
      originalEstimate,
      taskName,
      typeId,
      description,
      assigness
    } = task

    form.setFieldsValue({
      statusId,
      priorityId,
      timeTrackingRemaining,
      timeTrackingSpent,
      originalEstimate,
      taskName,
      typeId,
      description,
      listUserAsign: assigness?.map((item) => item.id)
    })
  }, [task, form])

  const onFinish = (data: ITaskDeTail) => {
    // @ts-expect-error ref
    const editorContent = editorRef?.current?.currentContent

    const formData = {
      ...data,
      projectId: projectId,
      statusId: data.statusId * 1,
      timeTrackingSpent: data.timeTrackingSpent * 1,
      timeTrackingRemaining: data.timeTrackingRemaining * 1,
      originalEstimate: data.originalEstimate * 1,
      description: editorContent
    }

    if (!isEmpty(formData) && taskId) {
      updateTask(
        {
          ...formData,
          taskId: taskId
        },
        {
          onSuccess: () => {
            onClose()
          }
        }
      )
    } else {
      createTask(formData, {
        onSuccess: () => {
          onClose()
        }
      })
    }
  }

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleOk = () => {
    deleteTask(undefined, {
      onSuccess: () => {
        setIsModalVisible(false)
        onClose()
      }
    })
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  return (
    <>
      <div className='flex items-start justify-between'>
        {taskId && (
          <div className='mb-5'>
            <Typography.Title level={5} className='!font-medium !text-gray-500'>
              {`Task_` + taskId + ' _ ' + project?.projectName}
            </Typography.Title>
          </div>
        )}

        <div>
          {taskId && (
            <Tooltip placement='bottom' title='Delete task' className='mr-10 -mt-32'>
              <Button type='text' onClick={showModal} icon={<TrashIcon className='h-4 w-4 text-red-500' />} />
            </Tooltip>
          )}
        </div>
      </div>
      <Form layout='vertical' form={form} title={projectId ? 'Update Task' : 'Create Task'} onFinish={onFinish}>
        <div className='relative flex w-full items-start gap-5 pb-5'>
          <div className='flex grow flex-col overflow-hidden border-0 border-solid border-gray-100 lg:border-r lg:pr-5'>
            <Form.Item
              label={<Label>Task name</Label>}
              name='taskName'
              rules={[{ required: true, message: 'Task name is required' }]}
            >
              <Input variant='filled' placeholder='Enter task name...' />
            </Form.Item>

            <Form.Item label={<Label>Description</Label>} name='description'>
              <EditorMCE editorRef={editorRef} description={descriptionValue} />
            </Form.Item>
          </div>

          <div className='sticky top-2 hidden w-[360px] shrink-0 flex-col py-3 lg:flex'>
            <div className='flex flex-col w-full items-start'>
              <div className='w-full'>
                <Form.Item label={<Label>Status</Label>} name='statusId' initialValue={'1'}>
                  <Select
                    allowClear
                    options={status?.map((item) => ({
                      value: item.statusId,
                      label: item.statusName
                    }))}
                  />
                </Form.Item>
              </div>
              <div className='w-full'>
                <Form.Item label={<Label>Assignees</Label>} name='listUserAsign'>
                  <Select
                    mode='multiple'
                    maxCount={4}
                    showSearch
                    allowClear
                    placeholder='Select users to assign task'
                    options={project?.members?.map((item) => ({
                      value: item.userId,
                      label: item.name
                    }))}
                  />
                </Form.Item>
              </div>

              <div className='flex w-full gap-4 justify-start'>
                <Form.Item label={<Label>Priority</Label>} name='priorityId' className='w-5/12' initialValue={1}>
                  <Select
                    allowClear
                    options={priority?.map((item) => ({
                      value: item.priorityId,
                      label: item.priority
                    }))}
                  />
                </Form.Item>
                <Form.Item label={<Label>Task Type</Label>} name='typeId' className='w-5/12' initialValue={1}>
                  <Select
                    allowClear
                    options={taskType?.map((item) => ({
                      value: item.id,
                      label: item.taskType
                    }))}
                  />
                </Form.Item>
              </div>

              <Form.Item
                label={<Label>Original Estimate</Label>}
                name='originalEstimate'
                rules={[
                  ({ getFieldValue }) => ({
                    validator() {
                      if (getFieldValue('originalEstimate') === 0) {
                        return Promise.reject(new Error('Original Estimate must be greater than 0'))
                      }
                      return Promise.resolve()
                    }
                  })
                ]}
                initialValue={0}
              >
                <Input type='number' />
              </Form.Item>
              <Form.Item
                label={<Label>Time Spent</Label>}
                name='timeTrackingSpent'
                rules={[
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (getFieldValue('timeTrackingSpent') > value) {
                        return Promise.reject(new Error('Time Spent must be less than Original Estimate'))
                      }
                      return Promise.resolve()
                    }
                  })
                ]}
                initialValue={0}
              >
                <Input type='number' />
              </Form.Item>
              <Form.Item
                label={<Label>Time Remaining</Label>}
                name='timeTrackingRemaining'
                rules={[
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (value > getFieldValue('originalEstimate') - getFieldValue('timeTrackingSpent')) {
                        return Promise.reject(new Error('Time Remaining is not valid'))
                      }
                      return Promise.resolve()
                    }
                  })
                ]}
                initialValue={0}
              >
                <Input type='number' />
              </Form.Item>
            </div>
          </div>
        </div>

        <div className='col-span-2 flex items-center justify-end gap-3 mt-2'>
          <Button htmlType='button' type='default' className='p-4' onClick={onClose}>
            Cancel
          </Button>
          <Button htmlType='submit' type='primary' className='px-3 py-4'>
            {taskId ? 'Save changes' : 'Create Task'}
          </Button>
        </div>
      </Form>

      <Modal title='Confirm Delete' open={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <p>Are you sure you want to delete this task?</p>
      </Modal>
    </>
  )
}

export default CreateTaskPage
