import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import { auth } from '@/auth';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
})

export const metadata: Metadata = {
  title: 'Gnosis',
  description: 'Authentication application using Next JS, TypeScript, Tailwind, Shadcn UI, Zode and Neon',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth()
  return (
    <html lang='en'>
      <body className={poppins.className}>
        <div>{session?.user?.email ?? 'No user logged in'}</div>
        {children}
      </body>
    </html>
  )
}
