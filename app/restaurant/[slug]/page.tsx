import Title from './components/Title'
import Description from './components/Description'
import Images from './components/Images'
import ReservationCard from './components/ReservationCard'
import Reviews from './components/Reviews'
import { PrismaClient } from '@prisma/client'
import RestaurantNavbar from './components/RestaurantNavbar'

interface Restaurant {
  id: number
  name: string
  images: string[]
  description: string
  slug: string
}

const prisma = new PrismaClient()

const fetchRestauantBySlug = async (slug: string): Promise<Restaurant> => {
  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug,
    },
    select: {
      id: true,
      name: true,
      images: true,
      description: true,
      slug: true,
    },
  })

  if (!restaurant) {
    throw new Error()
  }

  return restaurant
}

export const metadata = {
  title: 'Restaurant',
}

export default async function RestaurantDetails({
  params,
}: {
  params: { slug: string }
}) {
  const restaurant = await fetchRestauantBySlug(params.slug)
  return (
    <>
      <RestaurantNavbar slug={params.slug} />
      <Title name={restaurant.name} />
      <Description description={restaurant.description} />
      <Images images={restaurant.images} />
      <Reviews />
      <div className='w-[27%] relative text-reg'>
        <ReservationCard />
      </div>
    </>
  )
}
