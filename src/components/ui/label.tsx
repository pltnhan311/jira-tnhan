import { Typography } from 'antd'
import type { ReactNode } from 'react'
import { cn } from '~/utils/cn'

type Props = {
  className?: string
  children?: ReactNode
}

export default function Label(props: Props) {
  const { className, ...rest } = props

  return <Typography.Text className={cn('font-medium', className)} {...rest} />
}
