import { ImageResponse } from 'next/og'
import { getPostBySlug } from '@/lib/posts'

export const runtime = 'edge'

export const alt = 'About Acme'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug)

  const geistMedium = fetch(
    new URL('../../../../public/fonts/Geist-Medium.ttf', import.meta.url),
  ).then(res => res.arrayBuffer())

  const logoData = await fetch(
    new URL('../../../../public/images/og-logo.png', import.meta.url),
  ).then(res => res.arrayBuffer())
  const logoBase64 = Buffer.from(logoData).toString('base64')

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 64,
          background: 'black',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          position: 'relative',
        }}
      >
        <img
          src={`data:image/png;base64,${logoBase64}`}
          style={{
            width: '310px',
            height: '100px',
            position: 'absolute',
            left: '40px',
            top: '40px',
          }}
        />
        <div
          style={{
            width: '768px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            paddingTop: '50px',
          }}
        >
          {post.title}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Geist',
          data: await geistMedium,
          style: 'normal',
          weight: 400,
        },
      ],
    },
  )
}
