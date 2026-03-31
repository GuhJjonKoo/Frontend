import { useState } from 'react'
import keywords from '../data/keywords.json'

export default function EffectText({ text }) {
  const [tooltip, setTooltip] = useState(null)

  // 키워드를 길이 내림차순 정렬 (긴 키워드 먼저 매칭)
  const sorted = [...keywords].sort((a, b) => b.keyword.length - a.keyword.length)

  // 텍스트를 키워드 기준으로 분리
  const parts = []
  let remaining = text

  while (remaining.length > 0) {
    let matched = false
    for (const kw of sorted) {
      const idx = remaining.indexOf(kw.keyword)
      if (idx === 0) {
        parts.push({ type: 'keyword', value: kw.keyword, color: kw.color, description: kw.description })
        remaining = remaining.slice(kw.keyword.length)
        matched = true
        break
      }
    }
    if (!matched) {
      // 다음 키워드 위치 찾기
      let nextIdx = remaining.length
      for (const kw of sorted) {
        const idx = remaining.indexOf(kw.keyword)
        if (idx > 0 && idx < nextIdx) nextIdx = idx
      }
      parts.push({ type: 'text', value: remaining.slice(0, nextIdx) })
      remaining = remaining.slice(nextIdx)
    }
  }

  return (
    <span className="relative">
      {parts.map((part, i) =>
        part.type === 'keyword' ? (
          <span
            key={i}
            className="relative cursor-pointer font-bold underline decoration-dotted"
            style={{ color: part.color }}
            onMouseEnter={() => setTooltip(i)}
            onMouseLeave={() => setTooltip(null)}
          >
            {part.value}
            {tooltip === i && (
              <span className="absolute bottom-full left-0 mb-2 w-48 bg-gray-950 border border-gray-600 text-white text-xs rounded-lg p-2 z-50 shadow-lg whitespace-normal pointer-events-none">
                <span className="font-bold block mb-1" style={{ color: part.color }}>{part.value}</span>
                {part.description}
              </span>
            )}
          </span>
        ) : (
          <span key={i} className="text-gray-300">{part.value}</span>
        )
      )}
    </span>
  )
}