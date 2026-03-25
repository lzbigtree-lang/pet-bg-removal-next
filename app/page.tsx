'use client'
import { useState, useCallback } from 'react'
import './globals.css'

export default function Home() {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string>('')
  const [result, setResult] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>('')

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (!selectedFile) return
    if (selectedFile.size > 10 * 1024 * 1024) {
      setError('File size must be less than 10MB')
      return
    }
    setFile(selectedFile)
    setPreview(URL.createObjectURL(selectedFile))
    setResult('')
    setError('')
  }

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile) {
      setFile(droppedFile)
      setPreview(URL.createObjectURL(droppedFile))
      setResult('')
      setError('')
    }
  }, [])

  const removeBackground = async () => {
    if (!file) return setError('Please select an image first')
    setLoading(true)
    setError('')
    const formData = new FormData()
    formData.append('image', file)
    try {
      const res = await fetch('/api/remove-bg', { method: 'POST', body: formData })
      if (!res.ok) throw new Error('Processing failed')
      const data = await res.json()
      setResult(data.url)
    } catch (err: any) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-purple-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-2xl w-full">
        <h1 className="text-4xl font-bold text-center mb-2 text-gray-800">🐾 Pet BG Removal</h1>
        <p className="text-center text-gray-500 mb-8">Remove pet photo backgrounds instantly</p>

        <label
          className="block border-4 border-dashed border-purple-300 rounded-2xl p-10 text-center cursor-pointer hover:border-purple-500 hover:bg-purple-50 transition-all"
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          {preview ? (
            <img src={preview} alt="preview" className="max-h-48 mx-auto rounded-xl object-contain" />
          ) : (
            <div>
              <div className="text-5xl mb-3">📸</div>
              <p className="text-gray-500">Click or drag & drop your pet photo</p>
              <p className="text-gray-400 text-sm mt-1">JPG, PNG, WEBP · Max 10MB</p>
            </div>
          )}
          <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
        </label>

        {file && <p className="text-center text-sm text-purple-600 mt-2">✅ {file.name}</p>}
        {error && <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm text-center">{error}</div>}

        <button
          onClick={removeBackground}
          disabled={loading || !file}
          className="w-full mt-6 py-4 bg-gradient-to-r from-purple-600 to-purple-800 text-white font-semibold rounded-2xl text-lg hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? <span className="flex items-center justify-center gap-2"><svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/></svg>Processing... (may take 1-2 min)</span> : 'Remove Background'}
        </button>

        {result && (
          <div className="mt-8 text-center">
            <p className="text-green-600 font-semibold mb-3">✅ Done!</p>
            <div className="bg-gray-100 rounded-2xl p-4 mb-4" style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'20\' height=\'20\'%3E%3Crect width=\'10\' height=\'10\' fill=\'%23ccc\'/%3E%3Crect x=\'10\' y=\'10\' width=\'10\' height=\'10\' fill=\'%23ccc\'/%3E%3C/svg%3E")'}}>
              <img src={result} alt="result" className="max-h-64 mx-auto rounded-xl object-contain" />
            </div>
            <a href={result} download="pet_no_bg.png" className="inline-block px-8 py-3 bg-green-500 text-white font-semibold rounded-2xl hover:bg-green-600 transition-all">⬇️ Download PNG</a>
          </div>
        )}
      </div>
    </div>
  )
}
