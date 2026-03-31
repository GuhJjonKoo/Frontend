import { Link } from 'react-router-dom'

const cards = [
  { path: '/egogift', label: '에고기프트', desc: '에고기프트 목록과 조합식을 확인하세요' },
  { path: '/cardpack', label: '카드팩', desc: '카드팩별 출현 에고기프트를 확인하세요' },
  { path: '/event', label: '이벤트 선택지', desc: '던전 이벤트와 선택지를 확인하세요' },
]

export default function Home() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold text-center text-yellow-400 mb-4">
        거울던전 정리
      </h1>
      <p className="text-center text-gray-400 mb-12">
        림버스 컴퍼니 거울던전 정보 사이트
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map(card => (
          <Link
            key={card.path}
            to={card.path}
            className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:border-yellow-400 transition-colors"
          >
            <h2 className="text-xl font-bold text-yellow-400 mb-2">{card.label}</h2>
            <p className="text-gray-400 text-sm">{card.desc}</p>
          </Link>
        ))}
      </div>
    </main>
  )
}