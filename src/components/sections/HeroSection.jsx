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
          Tiszta Város - A közösség ereje a tisztább városért alma 
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
      </div>

    </div>
    
   </section>
  )
}

export default HeroSection