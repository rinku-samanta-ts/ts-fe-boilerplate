import { FC } from 'react'
import { UsersList } from './components/users-list'
import { Layout } from '@/components/custom/layout'
import { UserNav } from '@/components/user-nav'
import ThemeSwitch from '@/components/theme-switch'

const Users: FC = () => {
  return (
    <Layout>
      <Layout.Header>
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <UserNav />
        </div>
      </Layout.Header>
      <Layout.Body>
        <UsersList />
      </Layout.Body>
    </Layout>
  )
}

export default Users
