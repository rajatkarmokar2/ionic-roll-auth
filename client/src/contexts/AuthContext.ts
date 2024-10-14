/** @format */

import { createContext } from 'react'
import { initAuth } from '../providers/AuthProvider'

export const AuthContext = createContext<any>(initAuth)
