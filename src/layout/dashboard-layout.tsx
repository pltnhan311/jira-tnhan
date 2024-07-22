import { Breadcrumb } from 'antd'
import { Suspense } from 'react'
import { FullPageFallback } from '~/components/fallbacks'
import Menu from '~/components/ui/menu/menu'
import Sidebar from '~/components/ui/sidebar/sidebar'
import './_dashboard.scss'

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Sidebar />
      <Menu />
      <div className='content'>
        <Breadcrumb
          className='mb-7'
          items={[
            {
              title: 'Projects'
            },
            {
              title: <a href=''>Jurassic World</a>
            },
            {
              title: 'Kanban Board'
            }
          ]}
        />
        <Suspense fallback={<FullPageFallback />}>{children}</Suspense>
      </div>
    </>
  )
}

export default DashboardLayout
