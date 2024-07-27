import Link from 'next/link'
export const Navigation = () => {
  return (
    <header className="py-4">
      <nav className="container max-w-none flex justify-between">
        <Link href="/" className="text-4xl">
          🙌
        </Link>
        {/* <div className="flex items-center"></div> */}
      </nav>
    </header>
  )
}
