import type { NextPage } from 'next'
import Link from 'next/link'

const Home: NextPage = () => {
  return (
    <Link href={`/page/1`}>
      <a>First blog</a>
    </Link>
  )
}

export default Home
