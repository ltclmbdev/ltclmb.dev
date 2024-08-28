import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'Posts'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  const geistMedium = fetch(
    new URL('../../../public/fonts/Geist-Medium.ttf', import.meta.url),
  ).then(res => res.arrayBuffer())

  const logoData = await fetch(
    new URL('../../../public/images/og-logo.png', import.meta.url),
  ).then(res => res.arrayBuffer())
  const logoBase64 = Buffer.from(logoData).toString('base64')

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 80,
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
        {/*
          We're using <img> here because the Next.js Image component is not compatible with ImageResponse.
          This is a valid use case for <img> in Next.js.
        */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`data:image/png;base64,${logoBase64}`}
          width={310}
          height={100}
          alt="Logo"
          style={{
            position: 'absolute',
            left: '40px',
            top: '40px',
          }}
        />
        <div
          style={{
            width: '768px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            marginTop: '40px',
            fontFamily: 'GeistMedium',
            textTransform: 'uppercase',
            color: '#8f8f8f',
          }}
        >
          posts
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'GeistMedium',
          data: await geistMedium,
          style: 'normal',
          weight: 400,
        },
      ],
    },
  )
}
