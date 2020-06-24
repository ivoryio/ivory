import React from 'react'
import { Router } from '@reach/router'

/* IMPORT-LOCATION */
import { HomeScreen, DashboardScreen } from './screens'

export const AppRouter = () => (
  <Router>
    <HomeScreen default />
    <DashboardScreen path='/dashboard' />
  </Router>
)
