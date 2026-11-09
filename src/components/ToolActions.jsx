import { useState } from 'react'

export function downloadText(filename, text) {
  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}

export default function ToolActions({ text, filename }) {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      const ta = document.createElement('textarea')
      ta.value = text
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      ta.remove()
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <div className="output-actions">
      <button type="button" className="btn" onClick={copy}>{copied ? 'Copied!' : 'Copy result'}</button>
      <button type="button" className="btn btn-secondary" onClick={() => downloadText(filename, text)}>Download .txt</button>
      <button type="button" className="btn btn-ghost" onClick={() => window.print()}>Print</button>
    </div>
  )
}
