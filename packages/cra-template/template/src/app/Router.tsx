import React from 'react'
import { Router } from '@reach/router'

import { AuthenticationScreen, ProtectedRoute } from '@auth'
import { HomeScreen, DashboardScreen } from './screens'

export const AppRouter = () => (
  <Router>
    <HomeScreen default />
    <ProtectedRoute component={DashboardScreen} path='/dashboard' />
    <AuthenticationScreen path='/auth' />
  </Router>
)
