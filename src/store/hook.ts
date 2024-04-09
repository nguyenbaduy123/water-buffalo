import { useDispatch } from 'react-redux'
import { AppDispatch } from 'store'

export const useAppDispatch = () => {
  const dispatch: AppDispatch = useDispatch()
  return dispatch
}
