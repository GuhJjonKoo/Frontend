import { useState } from 'react'
import egogifts from '../data/egogifts.json'
import EffectText from '../components/EffectText'

const gradeColors = {
  1: 'text-gray-400 border-gray-400',
  2: 'text-green-400 border-green-400',
  3: 'text-blue-400 border-blue-400',
  4: 'text-yellow-400 border-yellow-400',
}

const gradeLabel = { 1: 'I', 2: 'II', 3: 'III', 4: 'IV' }

const attributes = ['전체', '화상', '출혈', '파열', '침잠', '진동', '기타']

export default function EgoGift() {
  const [search, setSearch] = useState('')
  const [selectedAttr, setSelectedAttr] = useState('전체')
  const [selected, setSelected] = useState(null)
  const [enhanceLevel, setEnhanceLevel] = useState('base')

  const filtered = egogifts.filter(g => {
    const matchName = g.name.includes(search)
    const matchAttr = selectedAttr === '전체' || g.attribute === selectedAttr
    return matchName && matchAttr
  })

  return (
    <main className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-yellow-400 mb-6">에고기프트</h1>

      {/* 검색 & 필터 */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          type="text"
          placeholder="기프트 이름 검색..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 flex-1"
        />
        <div className="flex gap-2 flex-wrap">
          {attributes.map(attr => (
            <button
              key={attr}
              onClick={() => setSelectedAttr(attr)}
              className={`px-3 py-2 rounded-lg text-sm font-medium border transition-colors ${
                selectedAttr === attr
                  ? 'bg-yellow-400 text-gray-900 border-yellow-400'
                  : 'bg-gray-800 text-gray-300 border-gray-600 hover:border-yellow-400'
              }`}
            >
              {attr}
            </button>
          ))}
        </div>
      </div>

      {/* 카드 그리드 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filtered.map(gift => (
          <div
            key={gift.id}
            onClick={() => { setSelected(gift); setEnhanceLevel('base') }}
            className={`bg-gray-800 border-2 rounded-xl p-3 cursor-pointer hover:bg-gray-700 transition-colors ${gradeColors[gift.grade]}`}
          >
            <div className="aspect-square bg-gray-700 rounded-lg mb-2 overflow-hidden flex items-center justify-center">
              {gift.image ? (
                <img src={gift.image} alt={gift.name} className="w-full h-full object-cover" />
              ) : (
                <span className="text-gray-500 text-xs">이미지 없음</span>
              )}
            </div>
            <div className={`text-xs font-bold mb-1 ${gradeColors[gift.grade].split(' ')[0]}`}>
              {gradeLabel[gift.grade]}등급
            </div>
            <div className="text-white text-sm font-medium leading-tight">{gift.name}</div>
            <div className="text-gray-400 text-xs mt-1">{gift.attribute} · {gift.price}💰</div>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="text-gray-500 col-span-5">검색 결과가 없습니다.</p>
        )}
      </div>

      {/* 상세 모달 */}
      {selected && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-gray-900 border border-gray-700 rounded-2xl max-w-lg w-full p-6 relative"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl"
            >✕</button>

            <div className="flex gap-4 mb-4">
              <div className="w-20 h-20 bg-gray-700 rounded-xl overflow-hidden flex-shrink-0">
                {selected.image ? (
                  <img src={selected.image} alt={selected.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500 text-xs">없음</div>
                )}
              </div>
              <div>
                <div className={`text-lg font-bold ${gradeColors[selected.grade].split(' ')[0]}`}>
                  {gradeLabel[selected.grade]} {selected.name}
                </div>
                <div className="text-gray-400 text-sm mt-1">{selected.attribute} · {selected.price}💰</div>
                {selected.canEnhance && (
                  <div className="text-xs text-green-400 mt-1">강화 가능</div>
                )}
                <div className="flex gap-1 mt-2 flex-wrap">
                  {selected.tags.map(tag => (
                    <span key={tag} className="text-xs bg-gray-700 text-gray-300 px-2 py-0.5 rounded-full">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* 강화 단계 탭 */}
            {selected.canEnhance && (
              <div className="flex gap-2 mb-3">
                {[['base', '기본'], ['plus', '+'], ['plusplus', '++']].map(([key, label]) => (
                  <button
                    key={key}
                    onClick={() => setEnhanceLevel(key)}
                    className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                      enhanceLevel === key
                        ? 'bg-yellow-400 text-gray-900'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            )}

            <div className="text-sm leading-relaxed bg-gray-800 rounded-xl p-4">
              {(selected.effects[enhanceLevel] || selected.effects.base)
                .split('\n')
                .map((line, i) => (
                  <p key={i} className="mb-1">
                    <EffectText text={line} />
                  </p>
                ))
              }
            </div>
          </div>
        </div>
      )}
    </main>
  )
}