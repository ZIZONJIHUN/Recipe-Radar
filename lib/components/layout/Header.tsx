import Link from 'next/link'

export default function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">
            Recipe Rader
          </Link>
          <div className="flex space-x-4">
            <Link href="/" className="hover:text-blue-600">
              홈
            </Link>
            <Link href="/recipes" className="hover:text-blue-600">
              레시피
            </Link>
            <Link href="/login" className="hover:text-blue-600">
              로그인
            </Link>
          </div>
        </nav>
      </div>
    </header>
  )
}