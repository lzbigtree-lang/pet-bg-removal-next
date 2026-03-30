import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const image = formData.get('image') as File
    
    if (!image) {
      return NextResponse.json({ error: 'No image provided' }, { status: 400 })
    }

    console.log('Processing:', image.name, image.size)
    
    const localFormData = new FormData()
    localFormData.append('image', image)
    
    const apiUrl = process.env.REMOVE_BG_API_URL || 'http://43.156.142.219:5000/remove-bg'
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      body: localFormData
    })

    if (!response.ok) {
      console.error('Local API error')
      return NextResponse.json({ error: 'Processing failed' }, { status: 500 })
    }

    const buffer = await response.arrayBuffer()
    const base64 = Buffer.from(buffer).toString('base64')
    const dataUrl = `data:image/png;base64,${base64}`
    
    console.log('Success!')
    return NextResponse.json({ url: dataUrl })
  } catch (error: any) {
    console.error('Error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
