import Link from 'next/link'
import LogoutButton from './logout-button'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'

export default async function LoggedInLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()
  
  if (!session?.user?.id) {
    redirect('/login')
  }
  return (
    <div className='min-h-screen flex flex-col'>
      <nav className='bg-grey-light flex justify-between p-4 items-center'>
        <ul className='flex gap-4'>
          <li>
            <Link 
              href='/my-account' 
              className='uppercase font-medium hover:text-main btn-hover'
            >
            My Account
            </Link>
          </li>
          <li>
            <Link 
              href='/change-password'
              className='uppercase font-medium hover:text-main btn-hover' 
            >
              Change Password
            </Link>
          </li>
        </ul>
        <div>
          <LogoutButton />
        </div>
      </nav>
      <div className='flex-1 flex justify-center items-center'>
        {children}
      </div>
    </div>
  )
}