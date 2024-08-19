import MdxContent from '@/components/mdx-content'

const mdxContent = `
I am front end developer with over a decade of experience specializing in JavaScript/TypeScript, ReactJS, NextJS, and CSS frameworks. I began my web development career in 2012 as a freelancer on [UpWork](https://www.upwork.com/freelancers/evgeniynagalskiy), where I completed a lot of various tasks and projects (over 100 contracts) and earned numerous satisfied clients.

From 2015 until recently, I worked at [egghead.io](https://egghead.io/) and [Skill Recordings Inc.](https://www.skillrecordings.com/), where I was involved in developing cutting-edge e-learning products. My role involved creating seamless user experiences using JavaScript/TypeScript, ReactJS, NextJS, TailwindCSS and shadcn/ui, CMS Sanity.io.

I am committed to continuous learning and stay updated with industry trends through platforms like Udemy and Coursera.

Outside of work, my interests are quite simple: road trips to beautiful places with my family, raising children, 1970s science fiction books, the TV series [“Columbo”](https://www.imdb.com/title/tt1466074/), good coffee and 3D printing.

`

export default function Home() {
  return (
    <div className="container pb-40 pt-8 md:pt-12">
      <div className="w-full flex flex-col items-center max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center">About me</h1>
        <div className="mt-10 prose prose-xl max-w-none dark:prose-dark w-full">
          <MdxContent>{mdxContent}</MdxContent>
        </div>
      </div>
    </div>
  )
}
