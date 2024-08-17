import Image from 'next/image'
import { Card } from '@/components/ui/card'
import LogoEggheadio from '@/components/logos/logo-eggheadio'
import LogoEpicWeb from '@/components/logos/logo-epicweb'
import LogoEpicReact from '@/components/logos/logo-epicreact'
import LogoTjs from '@/components/logos/logo-tjs'
import LogoProTailwind from '@/components/logos/logo-protailwind'

export default function Home() {
  return (
    <div className="container pb-40 pt-8 md:pt-12">
      <div className="w-full flex flex-col items-center max-w-3xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center gap-6 lg:gap-8 w-full">
          <div className="shrink-0 w-32 h-32 lg:w-40 lg:h-40 rounded-full overflow-hidden">
            <Image
              src="/me.jpg"
              alt="Yevhen Nahalskyi"
              width={160}
              height={160}
            />
          </div>
          <div className="lg:space-y-4 space-y-3 text-center sm:text-left text-balance">
            <h3 className="text-3xl lg:text-4xl">Hey!</h3>
            <p className="text-xl lg:text-2xl">
              I’m Yevhen Nahalskyi and I’m front-end developer
            </p>
          </div>
        </div>
        <h2 className="grayscale text-lg font-semibold md:text-xl mt-16 lg:mt-20 w-full">
          Projects I&apos;ve collaborated on:
        </h2>
        <div className="mt-4 md:mt-8 w-full grid sm:grid-cols-2 gap-4">
          <Card className="aspect-video relative shadow-none card-eggheadio dark:bg-zinc-900 dark:border-zinc-600 hover:dark:bg-zinc-800 duration-300 bg-zinc-50 hover:bg-zinc-100">
            <a
              href="https://egghead.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 flex justify-center items-center absolute inset-0 dark:text-white text-black"
            >
              <LogoEggheadio />
            </a>
          </Card>
          <Card className="aspect-video relative shadow-none card-epicweb dark:bg-zinc-900 dark:border-zinc-600 hover:dark:bg-zinc-800 duration-300 bg-zinc-50 hover:bg-zinc-100">
            <a
              href="https://egghead.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 flex justify-center items-center absolute inset-0 dark:text-white text-black"
            >
              <LogoEpicWeb />
            </a>
          </Card>
          <Card className="aspect-video relative shadow-none card-epicreact dark:bg-zinc-900 dark:border-zinc-600 hover:dark:bg-zinc-800 duration-300 bg-zinc-50 hover:bg-zinc-100">
            <a
              href="https://egghead.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 flex justify-center items-center absolute inset-0 dark:text-white text-black"
            >
              <LogoEpicReact />
            </a>
          </Card>
          <Card className="aspect-video relative shadow-none card-tjs dark:bg-zinc-900 dark:border-zinc-600 hover:dark:bg-zinc-800 duration-300 bg-zinc-50 hover:bg-zinc-100">
            <a
              href="https://egghead.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 flex justify-center items-center absolute inset-0 dark:text-white text-black"
            >
              <LogoTjs />
            </a>
          </Card>
          <Card className="aspect-video relative shadow-none card-protailwind dark:bg-zinc-900 dark:border-zinc-600 hover:dark:bg-zinc-800 duration-300 bg-zinc-50 hover:bg-zinc-100">
            <a
              href="https://egghead.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 flex justify-center items-center absolute inset-0 dark:text-white text-black"
            >
              <LogoProTailwind />
            </a>
          </Card>
        </div>
      </div>
    </div>
  )
}
