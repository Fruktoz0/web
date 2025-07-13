import React from 'react'

function Footer() {
  return (
    <footer className="bg-white border-t border-zinc-200 py-8">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-center items-center">
        <div className="text-zinc-700 mb-4 md:mb-0">
          © {new Date().getFullYear()} Tiszta Város. Minden jog fenntartva.
        </div>
      </div>
    </footer>
  )
}

export default Footer