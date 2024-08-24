import Image from 'next/image'
import { Card } from '@/components/ui/card'
import LogoEggheadio from '@/components/logos/logo-eggheadio'
import LogoEpicWeb from '@/components/logos/logo-epicweb'
import LogoEpicReact from '@/components/logos/logo-epicreact'
import LogoTjs from '@/components/logos/logo-tjs'
import LogoProTailwind from '@/components/logos/logo-protailwind'
import FindMeOn from '@/components/find-me-on'

export default function Home() {
  return (
    <div className="container pb-16 md:pb-24 lg:pb-40 pt-8 md:pt-12">
      <div className="w-full flex flex-col items-center max-w-3xl mx-auto">
        <div className="flex items-center gap-4 md:gap-6 lg:gap-8 w-full">
          <div className="shrink-0 w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-2 md:border-4 border-gray-400 dark:border-slate-50">
            <Image
              src="/images/me.jpg"
              alt="Yevhen Nahalskyi"
              width={160}
              height={160}
              priority
            />
          </div>
          <div className="space-y-1 md:space-y-2 text-balance">
            <h3 className="text-xl md:text-2xl">Hey!</h3>
            <h1 className="md:text-lg">
              I’m Yevhen Nahalskyi and I’m front-end developer
            </h1>
          </div>
        </div>
        <p className="mt-8 md:text-lg md:mt-16">
          This is my personal blog where I introduce myself and occasionally
          share my thoughts on front-end development.
        </p>
        <h3 className="grayscale font-semibold mt-8 md:mt-16 lg:mt-20 w-full">
          You can find me or get in touch on:
        </h3>
        <FindMeOn className="mt-3 md:mt-4" />
        <h3 className="grayscale font-semibold mt-8 md:mt-16 lg:mt-20 w-full">
          Projects I&apos;ve collaborated on:
        </h3>
        <div className="mt-3 md:mt-4 w-full grid sm:grid-cols-2 gap-4">
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
              href="https://www.epicweb.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 flex justify-center items-center absolute inset-0 dark:text-white text-black"
            >
              <LogoEpicWeb />
            </a>
          </Card>
          <Card className="aspect-video relative shadow-none card-epicreact dark:bg-zinc-900 dark:border-zinc-600 hover:dark:bg-zinc-800 duration-300 bg-zinc-50 hover:bg-zinc-100">
            <a
              href="https://www.epicreact.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 flex justify-center items-center absolute inset-0 dark:text-white text-black"
            >
              <LogoEpicReact />
            </a>
          </Card>
          <Card className="aspect-video relative shadow-none card-tjs dark:bg-zinc-900 dark:border-zinc-600 hover:dark:bg-zinc-800 duration-300 bg-zinc-50 hover:bg-zinc-100">
            <a
              href="https://www.testingjavascript.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 flex justify-center items-center absolute inset-0 dark:text-white text-black"
            >
              <LogoTjs />
            </a>
          </Card>
          <Card className="aspect-video relative shadow-none card-protailwind dark:bg-zinc-900 dark:border-zinc-600 hover:dark:bg-zinc-800 duration-300 bg-zinc-50 hover:bg-zinc-100">
            <a
              href="https://www.protailwind.com/"
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
