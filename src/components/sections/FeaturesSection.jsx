import React from 'react'
import { Button } from "@/components/ui/button"
import { MapPin, Vote, BadgeCheck } from 'lucide-react'
import { Link } from 'react-router-dom'

function FeaturesSection() {
  return (
    <section className="w-full bg-white py-16">
      <div className="container mx-auto px-4 text-center space-y-10">
        <h2 className="text-3xl font-bold">Funkciók, amik segítik a közösséget</h2>
        <p className="text-zinc-600 max-w-2xl mx-auto">
          A Tiszta Város rendszer lehetőséget ad, hogy egyszerűen beküldj egy problémát, szavazz mások bejelentéseire, és kövesd a megoldásokat – minden egy helyen.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          
          <div className="p-6 border rounded-lg shadow-sm hover:shadow-md transition">
            <MapPin className="w-10 h-10 mx-auto text-[#009688]" />
            <h3 className="text-xl font-semibold mt-4">Bejelentés</h3>
            <p className=" mt-2">
              Jelentsd be egyszerűen a városi problémákat: szemét, kátyúk, rongálások stb.
            </p>
          </div>
       
          <div className="p-6 border rounded-lg shadow-sm hover:shadow-md transition">
            <Vote className="w-10 h-10 mx-auto text-[#009688]" />
            <h3 className="text-xl font-semibold mt-4">Szavazás</h3>
            <p className=" mt-2">
              Szavazhatsz mások bejelentéseire, így a fontos ügyek előrébb kerülnek.
            </p>
          </div>
         
          <div className="p-6 border rounded-lg shadow-sm hover:shadow-md transition">
            <BadgeCheck className="w-10 h-10 mx-auto text-[#009688]" />
            <h3 className="text-xl font-semibold mt-4">Nyomon követés</h3>
            <p className=" mt-2">
              Kövesd nyomon, hogyan halad a megoldás, és értesülj az állapotról.
            </p>
          </div>
        </div>

        <Button className="mt-8 bg-[#009688] text-white hover:bg-[#00796b]">
          <Link to="/register" className="text-sm">Regisztrálj és próbáld ki!</Link>
        </Button>
      </div>
    </section>
  )
}

export default FeaturesSection