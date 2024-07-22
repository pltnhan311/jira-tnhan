import { useQuery } from '@tanstack/react-query'
import optionApi from '~/components/api/option-api'

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () => optionApi.getAllProjectCategories()
  })
}
