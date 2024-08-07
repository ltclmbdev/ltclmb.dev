import * as React from 'react'

export default function Post({ params }: { params: { postId: string } }) {
  console.log('params:', params)
  return (
    <main>
      <div>Post {params.postId}</div>
    </main>
  )
}
