export default function LoggedInLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='min-h-screen flex flex-col'>
      <nav></nav>
      {children}  
    </div>
  )
}