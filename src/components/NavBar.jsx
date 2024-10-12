import {useEffect, useContext} from 'react'
import {Link} from 'react-router-dom'
import {MemeContext} from '../context/contextMeme.jsx'

const NavBar = () => {
    const {state, dispatch} = useContext(MemeContext)

useEffect(() => {
    dispatch({type: 'search', payload: state.memes})

}, [])

const handleSearch = (e) => {
    dispatch({type: 'searchValue', payload: e.target.value})
    dispatch({type: 'search', payload: state.memes.filter((meme) => {
      return meme.name.toLowerCase().includes(state.searchValue.toLowerCase());
    })})
}


  return (
    <nav className="navbar bg-base-100">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">Meme-Maker</Link>
        <Link to="/memeMaker" className="btn btn-ghost">Create new Meme</Link>
        <Link to="/gallery" className="btn btn-ghost">Gallery</Link>
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
              <Link to="/memeMaker" className="justify-between">
                Profile
                <span className="badge">New</span>
              </Link>
            </li>
            <li>
              <Link to="/">Settings</Link>
            </li>
            <li>
              <Link to="/">Logout</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
