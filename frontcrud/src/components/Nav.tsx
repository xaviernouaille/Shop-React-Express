import { NavLink, useHistory, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

export const Nav = () => {
  const [mobileNav, setMobileNav] = useState<boolean>(false)
  const location = useLocation()

  useEffect(()=>{
    setMobileNav(false)
  }, [location])

  return (
    <header>
      <nav className="flex p-8 container mx-auto font-medium text-gray-600 shadow-md rounded-md relative z-50 bg-white">
        <ul className="hidden md:flex">
          <NavLink to="/">Accueil</NavLink>
        </ul>
        <ul className="flex-grow justify-end space-x-10 hidden md:flex">
          <li>
            <NavLink to="/explore">Toutes les annonces</NavLink>
          </li>
          <li>
            <NavLink
              className="p-3 bg-indigo-500 text-white rounded-md text-medium"
              to="/contact">
              Contact
            </NavLink>
          </li>
        </ul>

        <div className='flex flex-col space-y-3 md:hidden'>
        <ul>
            <button onClick={()=> setMobileNav(!mobileNav)}>Nav</button>
        </ul>
        {
          mobileNav ?
        <div>
          <ul className="flex flex-col space-y-2">
            <li>
              <NavLink to="/explore">Toutes les annonces</NavLink>
            </li>
          </ul>
        </div>
        : ""
        }
        </div>
      </nav>
    </header>
  )
}
