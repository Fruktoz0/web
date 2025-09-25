import React from 'react'
import HeroBackground from "@/assets/hero.png"
import { Button } from "@/components/ui/button"


function HeroSection() {
  return (
    <section
      className='w-full py-16'
      style={{
        backgroundImage: `url(${HeroBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center 40%',
        backgroundRepeat: 'no-repeat',
      }}>
      <div className="container mx-auto px-4 flex flex-col items-center justify-center gap-12 ">
        <div className="text-center md:text-middle max-w-xl space-y-6">
          <h1 className="text-4xl font-bold">
            Tiszta Város - A közösség ereje a tisztább városért
          </h1>
          <p className="text-lg">
            Csatlakozz hozzánk, és tegyünk együtt a városunk tisztaságáért! Segíts te is a közösségünknek, hogy egy szebb és tisztább környezetben élhessünk.
          </p>
          <p className="text-lg">
            Jelents, szavazz, kövess - mindenki számára átláthatóan.
          </p>
          <Button className="bg-[#009688] text-white hover:bg-[#00796b]">
            Fedezd fel a funkciókat
          </Button>
          <div>
            <a href="https://drive.google.com/file/d/1G6SkJc3GT-kPdaVMQlj4fpevLH6Qm6Vc/view?usp=sharing" target="_blank"
              class="inline-flex items-center bg-black text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-800">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.523 9.933l1.54-2.665a.75.75 0 00-1.298-.75l-1.563 2.7a8.236 8.236 0 00-7.402 0L7.236 6.518a.75.75 0 00-1.298.75l1.54 2.665A7.99 7.99 0 004 16a8 8 0 1016 0 7.99 7.99 0 00-2.477-6.067z" />
              </svg>
              <div class="flex flex-col leading-tight">
                <span class="text-xs">Letölthető</span>
                <span class="text-base font-semibold">Android APK</span>
              </div>
            </a>
          </div>
        </div>

      </div>

    </section>
  )
}

export default HeroSection
