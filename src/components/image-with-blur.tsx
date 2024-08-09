import * as React from 'react'
import Image, { ImageProps } from 'next/image'
import { getPlaiceholder } from 'plaiceholder'
import { cn } from '@/utils/cn'

const ImageWithBlur: React.FC<ImageProps> = async props => {
  const { src, alt, width, height, className, ...rest } = props

  if (!src || typeof src !== 'string') {
    return null
  }

  let blurDataURL = ''
  try {
    const response = await fetch(src)
    const buffer = await response.arrayBuffer()
    const { base64 } = await getPlaiceholder(Buffer.from(buffer))
    blurDataURL = base64
  } catch (error) {
    console.error('Error generating placeholder:', error)
  }

  return (
    <Image
      src={src}
      alt={alt || ''}
      width={width}
      height={height}
      placeholder="blur"
      blurDataURL={blurDataURL}
      className={cn('border border-muted rounded-lg', className)}
      {...rest}
    />
  )
}

export default ImageWithBlur
