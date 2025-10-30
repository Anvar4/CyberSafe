import React, { ReactNode, useEffect } from 'react'
import { useUserState } from '../store/user-store'
import { auth } from '@/firebase'

export const userProvider = ({children} : {children : ReactNode}) => {
	 const {isLoading, setUser} = useUserState()

	 useEffect(() => {
		auth.onAuthStateChanged(user => {
			user && setUser(user)
		})
	 }, [])
	
	 return isLoading ? <>Loading</> : <>{children}</>
}
