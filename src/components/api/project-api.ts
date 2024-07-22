import privateClient from '~/config/private-client'
import { IProject, IProjectDetail } from '~/utils/types'

const projectApi = {
  async getAllProjects() {
    const { data } = await privateClient.get<{ content: IProject[] }>('/Project/getAllProject')
    return data.content
  },

  async getProjectDetails(projectId: string) {
    const { data } = await privateClient.get<{ content: IProjectDetail }>(`/Project/getProjectDetail?id=${projectId}`)
    return data.content
  },

  async createProject(project: Partial<IProject>) {
    return await privateClient.post('/Project/createProjectAuthorize', project)
  },

  async updateProject(project: Partial<IProject>) {
    return await privateClient.put(`/Project/updateProject?projectId=${project?.id}`, project)
  },

  async assignUserProject({ projectId, userId }: { projectId: string; userId: string }) {
    const data = { projectId, userId }
    return await privateClient.post('/Project/assignUserProject', data)
  },

  async removeUserProject({ projectId, userId }: { projectId: string; userId: string }) {
    const data = { projectId, userId }
    return await privateClient.post('/Project/removeUserFromProject', data)
  }
}

export default projectApi
