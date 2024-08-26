import Image from 'next/image'
import FindMeOn from '@/components/find-me-on'
import LogoEggheadio from '@/components/logos/logo-eggheadio'
import LogoEpicReact from '@/components/logos/logo-epicreact'
import LogoEpicWeb from '@/components/logos/logo-epicweb'
import LogoProTailwind from '@/components/logos/logo-protailwind'
import LogoTjs from '@/components/logos/logo-tjs'
import { Card } from '@/components/ui/card'

export default function Home() {
  return (
    <div className="container pb-16 pt-8 md:pb-24 md:pt-12 lg:pb-40">
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center">
        <div className="flex w-full items-center gap-4 md:gap-6 lg:gap-8">
          <div className="h-24 w-24 shrink-0 overflow-hidden rounded-full border-2 border-gray-400 dark:border-slate-50 md:h-28 md:w-28 md:border-4">
            <Image
              src="/images/me.jpg"
              alt="Yevhen Nahalskyi"
              width={160}
              height={160}
              priority
            />
          </div>
          <div className="space-y-1 text-balance md:space-y-2">
            <h3 className="text-xl md:text-2xl">Hey!</h3>
            <h1 className="md:text-lg">
              I’m Yevhen Nahalskyi and I’m front-end developer
            </h1>
          </div>
        </div>
        <p className="mt-8 md:mt-16 md:text-lg">
          This is my personal blog where I introduce myself and occasionally
          share my thoughts on front-end development.
        </p>
        <h3 className="mt-8 w-full font-semibold grayscale md:mt-16 lg:mt-20">
          You can find me or get in touch on:
        </h3>
        <FindMeOn className="mt-3 md:mt-4" />
        <h3 className="mt-8 w-full font-semibold grayscale md:mt-16 lg:mt-20">
          Projects I&apos;ve collaborated on:
        </h3>
        <div className="mt-3 grid w-full gap-4 sm:grid-cols-2 md:mt-4">
          <Card className="card-eggheadio relative aspect-video bg-zinc-50 shadow-none duration-300 hover:bg-zinc-100 dark:border-zinc-600 dark:bg-zinc-900 hover:dark:bg-zinc-800">
            <a
              href="https://egghead.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute inset-0 flex items-center justify-center p-6 text-black dark:text-white"
            >
              <LogoEggheadio />
            </a>
          </Card>
          <Card className="card-epicweb relative aspect-video bg-zinc-50 shadow-none duration-300 hover:bg-zinc-100 dark:border-zinc-600 dark:bg-zinc-900 hover:dark:bg-zinc-800">
            <a
              href="https://www.epicweb.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute inset-0 flex items-center justify-center p-6 text-black dark:text-white"
            >
              <LogoEpicWeb />
            </a>
          </Card>
          <Card className="card-epicreact relative aspect-video bg-zinc-50 shadow-none duration-300 hover:bg-zinc-100 dark:border-zinc-600 dark:bg-zinc-900 hover:dark:bg-zinc-800">
            <a
              href="https://www.epicreact.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute inset-0 flex items-center justify-center p-6 text-black dark:text-white"
            >
              <LogoEpicReact />
            </a>
          </Card>
          <Card className="card-tjs relative aspect-video bg-zinc-50 shadow-none duration-300 hover:bg-zinc-100 dark:border-zinc-600 dark:bg-zinc-900 hover:dark:bg-zinc-800">
            <a
              href="https://www.testingjavascript.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute inset-0 flex items-center justify-center p-6 text-black dark:text-white"
            >
              <LogoTjs />
            </a>
          </Card>
          <Card className="card-protailwind relative aspect-video bg-zinc-50 shadow-none duration-300 hover:bg-zinc-100 dark:border-zinc-600 dark:bg-zinc-900 hover:dark:bg-zinc-800">
            <a
              href="https://www.protailwind.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute inset-0 flex items-center justify-center p-6 text-black dark:text-white"
            >
              <LogoProTailwind />
            </a>
          </Card>
        </div>
      </div>
    </div>
  )
}
