/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import PATH_NAME from '@/app/constans/pathname'
import useDataUser from '@/lib/store/client/infomationUser'
import { _isEmpty } from '@/lib/utils/utilsFunc'
import { getCookie } from 'cookies-next'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'

const BaseComponent = () => {
	const pathname = usePathname()

	const router = useRouter()

	const { updateUser, updateStatusAuth, userInfo } = useDataUser()

	const tokenUser = getCookie('__token') as string

	const listIsRequiredAuth = [
		PATH_NAME.PROFILE,
		PATH_NAME.CREATE_PROJECT,
		PATH_NAME.TABLE_PROJECT,
		PATH_NAME.TABLE_USER,
		PATH_NAME.DASHBOARD
	]

	const listNotRequiredAuth = [PATH_NAME.SIGN_IN, PATH_NAME.SIGN_UP]

	const pageIsAuth = listIsRequiredAuth.includes(pathname as string)

	const pageIsNotAuth = listNotRequiredAuth.includes(pathname as string)

	if (typeof window !== 'undefined' && !getCookie('__token') && pageIsAuth && _isEmpty(userInfo)) {
		window.location.href = PATH_NAME.SIGN_IN
	}

	if (typeof window !== 'undefined' && getCookie('__token') && pageIsNotAuth && !_isEmpty(userInfo)) {
		window.location.href = PATH_NAME.PROFILE
	}

	useEffect(() => {
		if (!getCookie('__token') || _isEmpty(userInfo)) {
			updateUser(undefined)
			return router.push(PATH_NAME.SIGN_IN)
		}

		if (!_isEmpty(userInfo) && getCookie('__token')) {
			updateStatusAuth(true)
			return router.push(pathname)
		}
	}, [tokenUser, userInfo])

	return <></>
}

export default BaseComponent
