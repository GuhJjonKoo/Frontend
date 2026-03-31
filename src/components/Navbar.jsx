import { Link, useLocation } from 'react-router-dom'

const navItems = [
  { path: '/', label: '홈' },
  { path: '/egogift', label: '에고기프트' },
  { path: '/cardpack', label: '카드팩' },
  { path: '/event', label: '이벤트' },
]

export default function Navbar() {
  const location = useLocation()

  return (
    <nav className="bg-gray-800 border-b border-gray-700 px-6 py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-yellow-400">
          거울던전 정리
        </Link>
        <ul className="flex gap-6">
          {navItems.map(item => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`text-sm font-medium transition-colors hover:text-yellow-400 ${
                  location.pathname === item.path
                    ? 'text-yellow-400'
                    : 'text-gray-300'
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}