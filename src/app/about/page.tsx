import MdxContent from '@/components/mdx-content'

const mdxContent = `
I am Yevhen Nahalskyi, and I currently live in the beautiful city of Ljubljana, Slovenia.

I'm a front-end developer with over a decade of experience, specializing in JavaScript/TypeScript, ReactJS, NextJS, and CSS frameworks. I began my web development career in 2012 as a freelancer on [Upwork](https://www.upwork.com/freelancers/evgeniynagalskiy), where I completed numerous tasks and projects (over 100 contracts) and earned many satisfied clients.

From 2015 until recently, I worked at [egghead.io](https://egghead.io/) and [Skill Recordings](https://www.skillrecordings.com/), where I was involved in developing cutting-edge e-learning products. My role involved creating seamless user experiences using JavaScript/TypeScript, ReactJS, NextJS, TailwindCSS, shadcn/ui, and the CMS Sanity.io.

I am committed to continuous learning and stay updated with industry trends through platforms like Udemy and Coursera.

Outside of work, my interests are quite simple: road trips to beautiful places with my family, raising children, 1970s science fiction books, the TV series ["Columbo"](https://www.imdb.com/title/tt1466074/), good coffee, and 3D printing.
`

export default function Home() {
  return (
    <div className="container pb-16 pt-8 md:pb-24 md:pt-12 lg:pb-40">
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center">
        <h1 className="text-center text-3xl font-bold md:text-4xl">About me</h1>
        <div className="prose prose-xl mt-8 w-full max-w-none dark:prose-dark">
          <MdxContent>{mdxContent}</MdxContent>
        </div>
      </div>
    </div>
  )
}
