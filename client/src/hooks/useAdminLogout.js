import { useAdminAuthContext } from './useAdminAuthContext'


export const useAdminLogout = () => {
  const { dispatch } = useAdminAuthContext()
  

  const logout = () => {
    // remove admin from storage
    localStorage.removeItem('admin')

    // dispatch logout action
    dispatch({ type: 'LOGOUT' })
   
  }

  return { logout }
}