import { AdminAuthContext } from "../context/AdminAuthContext"
import { useContext } from "react"

export const useAdminAuthContext = () => {
  const context = useContext(AdminAuthContext)

  if(!context) {
    throw Error('useAuthContext must be used inside an AuthContextProvider')
  }

  return context
}