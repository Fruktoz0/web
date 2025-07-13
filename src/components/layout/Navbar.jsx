import React from 'react'
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import Logo from "@/assets/logo.png"

function Navbar() {
  return (
    <header className="w-full bg-[#fffff4]" >
      <div className="container mx-auto px-4 py-4 flex justify-between">
       
        <Link to="/" className="flex items-center gap-2">
          <img src={Logo} alt="Tiszta Város logó" className="h-10 w-auto" />
          <span className="text-lg font-semibold sm:inline">Tiszta Város</span>
        </Link>

        
        <Link to="/login">
          <Button variant="outline" className="hover:bg-[#37958b] hover:text-[white] border-[#37958b]/50 text-[#37958b] bg-[#fffff4]">BEJELENTKEZÉS</Button>
        </Link>
      </div>
    </header>
  )
}

export default Navbar