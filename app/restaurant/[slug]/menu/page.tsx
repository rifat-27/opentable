import { PrismaClient } from '@prisma/client'
import Menu from '../components/Menu'
import RestaurantNavbar from '../components/RestaurantNavbar'

export const metadata = {
  title: 'Menu',
}

const prisma = new PrismaClient()

const fetchRestaurantMenu = async (slug: string) => {
  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug,
    },
    select: {
      items: true,
    },
  })

  if (!restaurant) {
    throw new Error()
  }
  return restaurant.items
}

export default async function RestaurantMenu({
  params,
}: {
  params: { slug: string }
}) {
  const menu = await fetchRestaurantMenu(params.slug)
  return (
    <>
      <RestaurantNavbar slug={params.slug} />
      <Menu menu={menu} />
    </>
  )
}
