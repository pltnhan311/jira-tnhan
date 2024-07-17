import { Card, Form, FormProps, Input } from 'antd'
import { LockIcon, UserIcon } from 'lucide-react'
import { useState } from 'react'
import { Button } from '~/components/ui/button'
import Label from '~/components/ui/label'
import { loginAction } from '~/store/auth/action'
import { useAppDispatch } from '~/store/store'

type AuthType = {
  email: string
  passWord: string
}

type FormType = FormProps<AuthType>

const LoginPage = () => {
  const dispatch = useAppDispatch()

  const [form] = Form.useForm<AuthType>()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const onFinish: FormType['onFinish'] = async (value) => {
    try {
      setIsSubmitting(true)
      await dispatch(loginAction(value))
    } catch (error) {
      console.log("🚀 ~ file: sign-in.tsx:25 ~ constonFinish:FormType['onFinish']= ~ error:", {
        error
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className='flex-center h-screen'>
      <Card className='w-96'>
        <div className='flex items-center justify-center'>
          <img
            src='https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/4709a921-40b5-4f98-9a59-e1049ca20cad/dejde9g-485b5664-57e4-4831-a814-e443927d94be.png/v1/fill/w_600,h_440/logo_jurassic_park_jungle_by_onipunisher_dejde9g-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzQ3MDlhOTIxLTQwYjUtNGY5OC05YTU5LWUxMDQ5Y2EyMGNhZFwvZGVqZGU5Zy00ODViNTY2NC01N2U0LTQ4MzEtYTgxNC1lNDQzOTI3ZDk0YmUucG5nIiwiaGVpZ2h0IjoiPD00NDAiLCJ3aWR0aCI6Ijw9NjAwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLndhdGVybWFyayJdLCJ3bWsiOnsicGF0aCI6Ilwvd21cLzQ3MDlhOTIxLTQwYjUtNGY5OC05YTU5LWUxMDQ5Y2EyMGNhZFwvb25pcHVuaXNoZXItNC5wbmciLCJvcGFjaXR5Ijo5NSwicHJvcG9ydGlvbnMiOjAuNDUsImdyYXZpdHkiOiJjZW50ZXIifX0.HB7naDq4s2Y8-K-TteusEBxzNaGfKJrSDSQd9WU7KZw'
            alt='logo'
            className='h-20 mb-5'
          />
        </div>

        <Form form={form} className='space-y-6' layout='vertical' onFinish={onFinish}>
          <Form.Item
            label={<Label>Email</Label>}
            name='email'
            rules={[{ required: true, message: 'Vui lòng nhập tài khoản' }]}
          >
            <Input prefix={<UserIcon className='h-4 w-4 text-gray-500' />} size='large' />
          </Form.Item>
          <Form.Item
            label={<Label>Mật khẩu</Label>}
            name='passWord'
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập mật khẩu'
              }
            ]}
          >
            <Input.Password prefix={<LockIcon className='h-4 w-4 text-gray-500' />} size='large' />
          </Form.Item>

          <Button disabled={isSubmitting} size='large' htmlType='submit' type='primary' className='w-full'>
            Đăng nhập
          </Button>
        </Form>
      </Card>
    </div>
  )
}

export default LoginPage
