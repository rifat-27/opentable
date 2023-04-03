import Header from './components/Header'
import RestaurantNavbar from './components/RestaurantNavbar'

export default function RestaurantLayout({
  children,
  params,
}: {
  params: { slug: string }
  children: React.ReactNode
}) {
  return (
    <>
      <Header slug={params.slug} />
      <div className='flex m-auto w-2/3 justify-between items-start 0 -mt-11'>
        <div className='bg-white w-[70%] rounded p-3 shadow'>{children}</div>
      </div>
    </>
  )
}
