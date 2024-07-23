export interface IMember {
  userId: number
  name: string
  avatar: string
}

export interface ICreator {
  id: number
  name: string
}

export interface IProject {
  id: number
  members: IMember[]
  creator: ICreator
  projectName: string
  description: string
  categoryId: number
  categoryName: string
  alias: string
  deleted: boolean
}

export interface IProjectDetail extends IProject {
  lstTask: {
    lstTaskDeTail: ITaskDeTail[]
    statusId: string
    statusName: string
    alias: string
  }[]
  projectCategory: {
    id: number
    name: string
  }
}

export interface IListTask {
  lstTaskDeTail: ITaskDeTail[]
  statusId: string
  statusName: string
  alias: string
}

export interface ITaskDeTail {
  projectId: string
  taskName: string
  originalEstimate: number
  timeTrackingRemaining: number
  timeTrackingSpent: number
  statusId: number
  priorityId: number
  typeId: number
  priorityTask: Partial<IPriority>
  taskTypeDetail: Partial<ITaskType>
  assigness: IAssignee[]
  taskId: number
  alias: string
  description: string
  listUserAsign: number[]
}

export interface ICategory {
  id: string
  projectCategoryName: string
}

export interface IStatus {
  statusId: string
  statusName: string
  alias: string
  deleted: string
}

export interface IPriority {
  priorityId: number
  priority: 'High' | 'Medium' | 'Low' | 'Lowest'
  description: 'High' | 'Medium' | 'Low' | 'Lowest'
  alias: 'High' | 'Medium' | 'Low' | 'Lowest'
  deleted: boolean
}

export interface ITaskType {
  id: number
  taskType: 'bug' | 'new task'
}

export interface IAssignee {
  id: number
  avatar: string
  name: string
  alias: string
}

export interface IUser {
  userId: number
  name: string
  avatar: string
  email: string
  phoneNumber: string
}
