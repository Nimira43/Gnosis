import Link from 'next/link'
import LogoutButton from '../logout-button'

export default function LoggedInLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='min-h-screen flex flex-col'>
      <nav className='bg-main-light '>
        <ul>
          <li>
            <Link 
              href='/my-account' 
              className='uppercase font-medium hover:text-main-dark btn-hover'
            >
            My Account
            </Link>
          </li>
          <li>
            <Link 
              href='/change-password'
              className='uppercase font-medium hover:text-main-dark btn-hover' 
            >
              Change Password
            </Link>
          </li>
        </ul>
        <div>
          <LogoutButton />
        </div>
      </nav>
      {children}  
    </div>
  )
}