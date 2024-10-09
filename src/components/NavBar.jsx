import {useEffect, useState, useContext} from 'react'
import {MemeContext} from '../context/contextMeme.jsx'

const NavBar = () => {
    const {state, dispatch} = useContext(MemeContext)

useEffect(() => {
    dispatch({type: 'search', payload: state.memes})

}, [])

const handleSearch = (e) => {
    dispatch({type: 'search', payload: e.target.value})
    const searchValue = e.target.value
    const searchResults = state.memes.filter((meme) => {
        return meme.name.includes(searchValue)
    })
    dispatch({type: 'search', payload: searchResults})
}


  return (
    <nav className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">Meme-Maker</a>
      </div>
      <div className="flex-none gap-2">
        <div className="form-control">
          <input
            type="text"
            onChange={handleSearch}
            placeholder="Search"
            className="input input-bordered w-24 md:w-auto"
          />
        </div>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
