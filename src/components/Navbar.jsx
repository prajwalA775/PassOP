import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-slate-800 text-white w-screen'>
      <div className="mycontainer flex justify-between items-center px-4 py-5 h-15">
        <div className="logo font-bold text-white text-2xl">
          <span className='text-green-500'>&lt;</span>
          Pass
          <span className='text-green-500'>OP/&gt;</span>
        </div>
        {/* <ul>
          <li className=' flex gap-4'>
            <a className='hover:font-bold' href="/">Home</a>
            <a className='hover:font-bold' href="/">About</a>
            <a className='hover:font-bold' href="/">Contact</a>
          </li>
        </ul> */}
        <button className='text-white font-bold bg-green-600 rounded-full flex gap-1 justify-between items-center px-2 ring-white ring-1 hover:shadow-2xl hover:scale-[1.01] transition-all duration-300 cursor-pointer'>
          <a href="https://github.com" target='_blank'><img src="/github logo.png" alt="github logo" className='invert w-10 p-1 ' /></a>
        Github</button>
      </div>
    </nav>
  )
}

export default Navbar