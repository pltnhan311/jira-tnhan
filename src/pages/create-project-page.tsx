import { Form, Input, Select, Typography } from 'antd'
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

const CreateProjectPage = () => {
  const editorRef = useRef(null)
  const navigate = useNavigate()

  const [searchParams] = useSearchParams()
  const [form] = Form.useForm<IProject>()

  const projectId = searchParams.get('id')

  const { data: project, isPending: isLoading } = useProject()
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
      updateProject({
        ...formData,
        id: parseInt(projectId)
      })
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
      <Typography.Title level={3} className='!font-bold'>
        {projectId ? 'Update ' : 'Create '} Project
      </Typography.Title>
      <Form
        disabled={isLoading}
        layout='vertical'
        size='middle'
        form={form}
        onFinish={onFinish}
        style={{ maxWidth: '600px', marginTop: '20px' }}
      >
        <Form.Item
          label='Project name'
          name='projectName'
          rules={[{ required: true, message: 'Project name is required' }]}
        >
          <Input placeholder='Enter project name...' />
        </Form.Item>
        <Form.Item
          label='Description'
          name='description'
          // rules={[{ required: true, message: 'Description is required' }]}
        >
          <EditorMCE editorRef={editorRef} description={descriptionValue} />
        </Form.Item>

        <Form.Item
          label='Project Category'
          name='categoryId'
          rules={[{ required: true, message: 'Category is required' }]}
        >
          <Select
            allowClear
            defaultValue={1}
            options={categories?.map((item) => ({
              value: item.id,
              label: item.projectCategoryName
            }))}
          />
        </Form.Item>

        <div className='mt-10 flex justify-end'>
          <Button disabled={isLoading} htmlType='submit' type='primary' className='px-4 py-5'>
            {projectId ? 'Save changes' : 'Create Project'}
          </Button>
        </div>
      </Form>
    </>
  )
}

export default CreateProjectPage
