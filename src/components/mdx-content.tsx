import * as React from 'react'
import Image from 'next/image'
import { compileMDX } from 'next-mdx-remote/rsc'
import { MDXRemoteProps } from 'next-mdx-remote/rsc'
import { getHighlighter, highlightCode } from '@/utils/code-highlight'

const CodeComponent: React.FC<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
> = props => {
  const { className, children } = props
  const isInline = !className
  const language = className ? className.replace(/language-/, '') : 'text'
  const code = React.isValidElement(children)
    ? children.props.children
    : children

  if (typeof code !== 'string') {
    return isInline ? (
      <code {...props}>{children}</code>
    ) : (
      <pre>
        <code {...props}>{children}</code>
      </pre>
    )
  }

  if (isInline) {
    return <code>{code}</code>
  }

  const highlightedCode = highlightCode(code, language)
  return <div dangerouslySetInnerHTML={{ __html: highlightedCode }} />
}

// const ImageComponent: React.FC<
//   React.ImgHTMLAttributes<HTMLImageElement>
// > = props => {
//   const { src, alt, width, height, ...rest } = props

//   if (!src) {
//     return null
//   }

//   return (
//     <span className="image-wrapper">
//       <Image
//         src={src}
//         alt={alt || ''}
//         width={Number(width) || 600}
//         height={Number(height) || 400}
//         {...rest}
//       />
//     </span>
//   )
// }

const components: MDXRemoteProps['components'] = {
  code: CodeComponent,
  pre: ({ children }) => children,
  // img: ImageComponent,
}

interface MdxContentProps {
  children: string
}

export default async function MdxContent({ children }: MdxContentProps) {
  await getHighlighter()

  const { content } = await compileMDX({
    source: children,
    components,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        rehypePlugins: [],
      },
    },
  })

  return content
}
