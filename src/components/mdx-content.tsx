import * as React from 'react'
import { compileMDX, type MDXRemoteProps } from 'next-mdx-remote/rsc'
import ImageWithBlur from '@/components/image-with-blur'
import IosCalculator from '@/components/playground/ios-calculator/ios-calculator'
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

const components: MDXRemoteProps['components'] = {
  code: CodeComponent,
  pre: ({ children }) => children,
  ImageWithBlur,
  IosCalculator,
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
