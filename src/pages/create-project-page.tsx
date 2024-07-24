import { Form, Input, Select } from 'antd'
import { useEffect, useRef } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useCategories } from '~/components/modules/projects/hooks/use-categories'
import { useCreateProject } from '~/components/modules/projects/hooks/use-create-project'
import { useProject } from '~/components/modules/projects/hooks/use-project'
import { Button } from '~/components/ui/button'
import EditorMCE from '~/components/ui/editor-mce/EditorMCE'
import { IProject } from '~/utils/types'
import { isEmpty } from 'lodash'
import { useUpdateProject } from '~/components/modules/projects/hooks/use-update-project'
import Label from '~/components/ui/label'

const CreateProjectPage = ({ onClose }: { onClose?: () => void }) => {
  const editorRef = useRef(null)
  const navigate = useNavigate()

  const [searchParams] = useSearchParams()
  const [form] = Form.useForm<IProject>()

  const projectId = searchParams.get('id')

  const { data: project } = useProject()
  const { data: categories } = useCategories()

  const { mutate: createProject } = useCreateProject()
  const { mutate: updateProject } = useUpdateProject()

  const descriptionValue = project?.description

  useEffect(() => {
    if (!project || isEmpty(project)) {
      return
    }

    const { projectName, description, projectCategory } = project
    const { id: categoryId } = projectCategory

    form.setFieldsValue({
      projectName,
      description,
      categoryId
    })
  }, [project, form])

  const onFinish = (data: IProject) => {
    // @ts-expect-error ref
    const editorContent = editorRef?.current?.currentContent

    const formData = {
      ...data,
      description: editorContent
    }

    if (projectId) {
      updateProject(
        {
          ...formData,
          id: parseInt(projectId)
        },
        {
          onSuccess: () => {
            if (onClose) onClose()
          }
        }
      )
    } else {
      createProject(formData, {
        onSuccess: () => {
          form.resetFields()
          navigate('/')
        }
      })
    }
  }

  return (
    <>
      <Form layout='vertical' size='middle' form={form} onFinish={onFinish} style={{ maxWidth: '600px' }}>
        <div className='flex items-center gap-4'>
          <Form.Item label={<Label>Project Id</Label>} className='w-1/3'>
            <Input disabled defaultValue={projectId as string} />
          </Form.Item>
          <Form.Item
            label={<Label>Project name</Label>}
            className='w-2/3'
            name='projectName'
            rules={[{ required: true, message: 'Project name is required' }]}
          >
            <Input variant='filled' placeholder='Enter project name...' />
          </Form.Item>
        </div>
        <Form.Item label={<Label>Description</Label>} name='description'>
          <EditorMCE editorRef={editorRef} description={descriptionValue} />
        </Form.Item>

        <Form.Item
          label={<Label>Project Category</Label>}
          name='categoryId'
          rules={[{ required: true, message: 'Category is required' }]}
          initialValue={1}
        >
          <Select
            variant='filled'
            allowClear
            options={categories?.map((item) => ({
              value: item.id,
              label: item.projectCategoryName
            }))}
          />
        </Form.Item>

        <div className='mt-10 flex justify-end gap-3'>
          {projectId && (
            <Button htmlType='button' type='default' className='p-4' onClick={onClose}>
              Cancel
            </Button>
          )}
          <Button htmlType='submit' type='primary' className='px-3 py-4'>
            {projectId ? 'Save changes' : 'Create Project'}
          </Button>
        </div>
      </Form>
    </>
  )
}

export default CreateProjectPage
