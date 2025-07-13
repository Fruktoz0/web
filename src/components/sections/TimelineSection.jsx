import React from 'react'
import {
  CircleCheck,
  UserPlus,
  Camera,
  Users,
  ActivitySquare,
} from "lucide-react"




function TimelineSection() {
  return (
     <section className="w-full bg-[#f9f9f9] py-20">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-12">Hogyan működik?</h2>
        <div className="relative max-w-4xl mx-auto">
          <div className="hidden md:block border-l-2 border-zinc-300 absolute h-full left-1/2 transform -translate-x-1/2"></div>
          <div className="space-y-12">
            
      
            <div className="flex flex-col md:flex-row items-center md:flex-row-reverse">
              <div className="w-full md:w-1/2 px-6 text-left">
                <div className="flex items-center gap-3">
                  <div className="bg-white border border-zinc-300 rounded-full p-3 shadow">
                    <UserPlus className="w-6 h-6 text-[#009688]" />
                  </div>
                  <h3 className="text-xl font-semibold">Csatlakozás</h3>
                </div>
                <p className="text-zinc-600 mt-2">
                  Regisztrálj, és légy része egy közösségnek, amely a város tisztaságáért dolgozik.
                </p>
              </div>
              <div className="w-full md:w-1/2 h-0 md:h-24"></div>
            </div>

       
            <div className="flex flex-col md:flex-row items-center">
              <div className="w-full md:w-1/2 px-6 text-left">
                <div className="flex items-center gap-3">
                  <div className="bg-white border border-zinc-300 rounded-full p-3 shadow">
                    <Camera className="w-6 h-6 text-[#009688]" />
                  </div>
                  <h3 className="text-xl font-semibold">Probléma bejelentése</h3>
                </div>
                <p className="text-zinc-600 mt-2">
                  Küldj be fotót, címet és leírást - gyorsan és egyszerűen.
                </p>
              </div>
              <div className="w-full md:w-1/2 h-0 md:h-24"></div>
            </div>

        
            <div className="flex flex-col md:flex-row items-center md:flex-row-reverse">
              <div className="w-full md:w-1/2 px-6 text-left">
                <div className="flex items-center gap-3">
                  <div className="bg-white border border-zinc-300 rounded-full p-3 shadow">
                    <Users className="w-6 h-6 text-[#009688]" />
                  </div>
                  <h3 className="text-xl font-semibold">Közösségi visszajelzés</h3>
                </div>
                <p className="text-zinc-600 mt-2">
                  A felhasználók szavazhatnak - így dől el, mi a legfontosabb.
                </p>
              </div>
              <div className="w-full md:w-1/2 h-0 md:h-24"></div>
            </div>

           
            <div className="flex flex-col md:flex-row items-center">
              <div className="w-full md:w-1/2 px-6 text-left">
                <div className="flex items-center gap-3">
                  <div className="bg-white border border-zinc-300 rounded-full p-3 shadow">
                    <ActivitySquare className="w-6 h-6 text-[#009688]" />
                  </div>
                  <h3 className="text-xl font-semibold">Állapot követése</h3>
                </div>
                <p className="text-zinc-600 mt-2">
                  Kövesd, hogy elindult-e a megoldás, és hol tart éppen.
                </p>
              </div>
              <div className="w-full md:w-1/2 h-0 md:h-24"></div>
            </div>

     
            <div className="flex flex-col md:flex-row items-center md:flex-row-reverse">
              <div className="w-full md:w-1/2 px-6 text-left">
                <div className="flex items-center gap-3">
                  <div className="bg-white border border-zinc-300 rounded-full p-3 shadow">
                    <CircleCheck className="w-6 h-6 text-[#009688]" />
                  </div>
                  <h3 className="text-xl font-semibold">Visszajelzés</h3>
                </div>
                <p className="text-zinc-600 mt-2">
                  Amint elkészült, értesítünk, és értékelheted a megoldást.
                </p>
              </div>
              <div className="w-full md:w-1/2 h-0 md:h-24"></div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}

export default TimelineSection