/** @format */

import axios from 'axios'

const token = () => {
	try {
		return JSON.parse(localStorage.getItem('auth')!).token
	} catch (error) {
		return ''
	}
}

const axiosInstance = axios.create({
	baseURL: 'http://192.168.1.100:5000',
	headers: {
		'Authorization': 'Bearer ' + token(),
	},
})

export const fetchUsers = async () => {
	try {
		const response = await axiosInstance.request({
			method: 'get',
			url: '/users',
		})
		console.log('fetchUsers: ', response.data)
		return response
	} catch (error) {
		console.log('error fetchUsers: ', error)
		return error
	}
}

export const fetchUserById = async (id: string) => {
	try {
		const response = await axiosInstance.request({
			method: 'get',
			url: `/users/${id}`,
		})
		console.log('fetchUserById: ', response.data)
		return response
	} catch (error) {
		console.log('error fetchUserById: ', error)
		return error
	}
}

export const createUser = async (userData: any) => {
	try {
		const response = await axiosInstance.request({
			method: 'post',
			url: '/users',
			data: userData,
		})
		console.log('createUser: ', response.data)
		return response
	} catch (error) {
		console.log('error createUser: ', error)
		return error
	}
}

export const updateUser = async (id: string, userData: any) => {
	try {
		const response = await axiosInstance.request({
			method: 'patch',
			url: `/users/${id}`,
			data: userData,
		})
		console.log('updateUser: ', response.data)
		return response
	} catch (error) {
		console.log('error updateUser: ', error)
		return error
	}
}

export const deleteUser = async (id: string) => {
	try {
		const response = await axiosInstance.request({
			method: 'delete',
			url: `/users/${id}`,
		})
		console.log('deleteUser: ', response.data)
		return response
	} catch (error) {
		console.log('error deleteUser: ', error)
		return error
	}
}
