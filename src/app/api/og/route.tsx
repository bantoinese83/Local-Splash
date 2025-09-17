import { ImageResponse } from 'next/og'
import { SITE_CONFIG } from '@/lib/constants'

export const runtime = 'edge'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  const title = searchParams.get('title') || SITE_CONFIG.name
  const description = searchParams.get('description') || SITE_CONFIG.description

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#fff',
          fontFamily: '"Bungee", sans-serif',
          color: '#000',
          border: '20px solid #0055ff', // Electric Blue
          padding: '40px',
        }}
      >
        <div style={{ fontSize: 72, textTransform: 'uppercase' }}>{title}</div>
        <div style={{ fontSize: 32, marginTop: 20, color: '#333' }}>{description}</div>
        <div style={{ position: 'absolute', bottom: 40, fontSize: 24, color: '#0055ff' }}>
          {SITE_CONFIG.name}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
