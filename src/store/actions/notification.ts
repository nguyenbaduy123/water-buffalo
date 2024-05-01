import LifeApi from 'api/LifeApi'
import { ActionFunc } from './types'

export const getNotifications: ActionFunc = () => {
  return async (dispatch) => {
    const resp = await LifeApi.loadNotifications()

    if (resp.success) {
      dispatch({
        type: 'LOAD_USER_NOTIFICATIONS',
        payload: { notifications: resp.notifications },
      })
    }
  }
}
