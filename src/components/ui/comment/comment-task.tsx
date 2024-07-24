import { Avatar, Input } from 'antd'
import { isEmpty } from 'lodash'
import { useRef, useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useCommentsOfTask } from '~/components/modules/comments/hooks/use-comments'
import { useDeleteComment } from '~/components/modules/comments/hooks/use-delete-comment'
import { useInsertComment } from '~/components/modules/comments/hooks/use-insert-comment'
import { useUpdateComment } from '~/components/modules/comments/hooks/use-update-comment'
import { Button } from '~/components/ui/button'
import useInfo from '~/hooks/use-info'

const CommentTask = () => {
  const inputRef = useRef(null)
  const textAreaRef = useRef(null)
  const { avatar } = useInfo()
  const [text, setText] = useState('')
  const [isInputFocused, setIsInputFocused] = useState(false)
  const [editCommentId, setEditCommentId] = useState<number | null>(null)
  const [editText, setEditText] = useState('')

  const [searchParams] = useSearchParams()
  const taskId = searchParams.get('taskId')

  const { data: listComments } = useCommentsOfTask()

  const { mutate: insertComment, isPending: isInserting } = useInsertComment()
  const { mutate: updateComment, isPending: isUpdating } = useUpdateComment()
  const { mutate: deleteComment } = useDeleteComment()

  useEffect(() => {
    if (isInputFocused && textAreaRef.current) {
      // @ts-expect-error tsr
      textAreaRef.current.focus()
    }
  }, [isInputFocused])

  const renderComments = () => {
    return listComments?.map((cmt, index) => (
      <div key={index} className='flex gap-3 border-b border-gray-200 mb-5'>
        <Avatar src={cmt.user.avatar || avatar} />
        <div className='flex flex-col gap-1 w-full'>
          <div className='flex items-center gap-2'>
            <span className='font-medium'>{cmt?.user?.name}</span>
            <span className='text-gray-500'>8 days ago</span>
          </div>
          {editCommentId === cmt.id ? (
            <div className='flex flex-col gap-3'>
              <Input.TextArea
                placeholder='Edit your comment...'
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                autoSize={{ minRows: 2, maxRows: 6 }}
              />
              <div className='flex space-x-2'>
                <Button type='primary' loading={isUpdating} onClick={() => handleUpdateComment(cmt.id)}>
                  Save
                </Button>
                <Button
                  type='text'
                  onClick={() => {
                    setEditCommentId(null)
                    setEditText('')
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <>
              <p className='mt-1'>{cmt?.contentComment}</p>
              <div className='flex items-center gap-4 mt-1 text-gray-500 hover:cursor-pointer duration-200'>
                <p
                  className='hover:underline'
                  onClick={() => {
                    setEditCommentId(cmt?.id)
                    setEditText(cmt?.contentComment)
                  }}
                >
                  Edit
                </p>
                <p
                  className='hover:underline'
                  onClick={() => {
                    deleteComment(cmt?.id)
                  }}
                >
                  Delete
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    ))
  }

  const handleSendComment = () => {
    insertComment({ taskId: parseInt(taskId as string), contentComment: text })
    setText('')
    setIsInputFocused(false)
  }

  const handleUpdateComment = (id: number) => {
    updateComment({ id, contentComment: editText })
    setEditCommentId(null)
    setEditText('')
  }

  const handleCancel = () => {
    setText('')
    setIsInputFocused(false)
  }

  return (
    <>
      <div className='flex gap-3'>
        <Avatar src={avatar} />
        <div className='flex flex-col gap-3 w-full'>
          {!isInputFocused ? (
            <Input
              ref={inputRef}
              variant='filled'
              placeholder='Add a comment...'
              value={text}
              onChange={(e) => setText(e.target.value)}
              onFocus={() => setIsInputFocused(true)}
            />
          ) : (
            <Input.TextArea
              ref={textAreaRef}
              placeholder='Add a comment...'
              value={text}
              onChange={(e) => setText(e.target.value)}
              onBlur={() => setIsInputFocused(false)}
              autoSize={{ minRows: 2, maxRows: 6 }}
            />
          )}
          {isInputFocused && (
            <div className='flex space-x-2'>
              <Button type='primary' loading={isInserting} onMouseDown={handleSendComment}>
                Save
              </Button>
              <Button type='text' onMouseDown={handleCancel}>
                Cancel
              </Button>
            </div>
          )}
        </div>
      </div>
      {taskId && !isEmpty(listComments) && listComments && listComments?.length > 0 && (
        <div className='mt-6 overflow-y-auto max-h-[200px]'>{renderComments()}</div>
      )}
    </>
  )
}

export default CommentTask
