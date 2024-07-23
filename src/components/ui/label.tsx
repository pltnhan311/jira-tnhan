import { Typography } from 'antd'
import type { ReactNode } from 'react'
import { cn } from '~/utils/cn'

type Props = {
  className?: string
  children?: ReactNode
}

export default function Label(props: Props) {
  const { className, ...rest } = props

  return (
    <Typography.Text
      className={cn('!tracking-tight !font-medium !text-[12px] !text-gray-500 uppercase', className)}
      {...rest}
    />
  )
}
