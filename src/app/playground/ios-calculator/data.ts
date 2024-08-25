import { StaticImageData } from 'next/image'
import postImage from '@/components/playground/ios-calculator/assets/images/post-image.png'

export const pageMetadata: {
  title: string
  description: string
  postImage: StaticImageData
} = {
  title: 'iOS 17 Calculator App clone',
  description:
    'Here I create an iOS 17 Calculator App clone (with some help of Claude)',
  postImage: postImage,
}
