import { FC } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import GeneralError from './pages/errors/general-error'
import NotFoundError from './pages/errors/not-found-error'
import MaintenanceError from './pages/errors/maintenance-error'
import { Routes } from '@/utilities/routes'
import { useQuery } from '@tanstack/react-query'
import { authService } from '@/api'
import { useAuth } from '@/hooks/use-auth'
import tokenService from '@/store/token'
import Loader from '@/components/loader'

const routers = createBrowserRouter([
  // Auth routes
  {
    path: Routes.SIGN_IN,
    lazy: async () => ({
      Component: (await import('./pages/auth/sign-in')).default,
    }),
  },
  {
    path: Routes.SIGN_UP,
    lazy: async () => ({
      Component: (await import('./pages/auth/sign-up')).default,
    }),
  },
  {
    path: Routes.FORGOT_PASSWORD,
    lazy: async () => ({
      Component: (await import('./pages/auth/forgot-password')).default,
    }),
  },
  {
    path: Routes.OTP,
    lazy: async () => ({
      Component: (await import('./pages/auth/otp')).default,
    }),
  },

  // Main routes
  {
    path: Routes.DASHBOARD,
    lazy: async () => {
      const AppShell = await import('@/components/app-shell')
      return { Component: AppShell.default }
    },
    errorElement: <GeneralError />,
    children: [
      {
        index: true,
        lazy: async () => ({
          Component: (await import('./pages/dashboard')).default,
        }),
      },
      {
        path: Routes.TASKS,
        lazy: async () => ({
          Component: (await import('./pages/tasks')).default,
        }),
      },

      {
        path: Routes.SETTINGS.ROOT,
        lazy: async () => ({
          Component: (await import('./pages/settings')).default,
        }),
        errorElement: <GeneralError />,
        children: [
          {
            index: true,
            lazy: async () => ({
              Component: (await import('./pages/settings/profile')).default,
            }),
          },
          {
            path: Routes.SETTINGS.ACCOUNT,
            lazy: async () => ({
              Component: (await import('./pages/settings/account')).default,
            }),
          },
        ],
      },
    ],
  },

  // Error routes
  { path: Routes.ERROR.GENERAL, Component: GeneralError },
  { path: Routes.ERROR.NOT_FOUND, Component: NotFoundError },
  { path: Routes.ERROR.MAINTENANCE, Component: MaintenanceError },

  // Fallback 404 route
  { path: Routes.FALLBACK, Component: NotFoundError },
])

const Router: FC = () => {
  const { login, logout, isLoggedIn, refreshToken } = useAuth()
  const { isLoading } = useQuery<Promise<boolean>>({
    queryKey: ['user'],
    queryFn: async () => {
      if (isLoggedIn) {
        try {
          const { accessToken } = await authService.getAccessToken(refreshToken)

          tokenService.setAccessToken(accessToken)
          const user = await authService.getUserInfo()
          login(user)
        } catch {
          logout()
          return true // handle this as true to load router even after refresh token give error
        }
      }
      return true
    },
  })
  if (isLoading) {
    return <Loader />
  }

  return <RouterProvider router={routers} />
}

export default Router
