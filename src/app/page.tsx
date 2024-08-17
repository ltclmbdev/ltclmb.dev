import Image from 'next/image'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import LogoEggheadio from '@/components/logos/logo-eggheadio'
import LogoEpicWeb from '@/components/logos/logo-epicweb'
import LogoEpicReact from '@/components/logos/logo-epicreact'
import LogoTjs from '@/components/logos/logo-tjs'
import LogoProTailwind from '@/components/logos/logo-protailwind'

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center p-24 w-full">
      <div className="w-full flex flex-col items-center max-w-3xl">
        <div className="flex flex-col md:flex-row items-center gap-8 w-full">
          <div className="shrink-0 w-40 h-40 rounded-full overflow-hidden">
            <Image
              src="/me.jpg"
              alt="Yevhen Nahalskyi"
              width={160}
              height={160}
            />
          </div>
          <div className="space-y-4">
            <h3 className="text-4xl">Hey!</h3>
            <p className="text-2xl">
              I’m Yevhen Nahalskyi and I’m front-end developer
            </p>
          </div>
        </div>
        <h2 className="grayscale text-xl mt-20 w-full">
          Projects I&apos;ve collaborated on:
        </h2>
        <div className="mt-8 w-full grid grid-cols-2 gap-4">
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
    </main>
  )
}
