/** @format */

import { useEffect, useState } from 'react'

const useLocalStorage = (key: string, initialValue: any = '') => {
	const [value, setValue] = useState<any>(() => {
		const storedValue = localStorage.getItem(key)
		if(storedValue && storedValue !== 'undefined'){
			return JSON.parse(storedValue)
		}else{
			return initialValue
		}
	})
	const setLocalStorage = (value: any) => {
		localStorage.setItem(key, JSON.stringify(value))
		setValue(value)
	}
	const clear = () => {
		localStorage.setItem(key, '')
		setValue('')
	}
	return [value, setLocalStorage, clear]
}

export default useLocalStorage
