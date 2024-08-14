import React from 'react'
import { NavLink } from 'react-router-dom'
import { isUserLoggedIn, logout,getLoggedInUser } from '../services/AuthService'
import { useNavigate } from 'react-router-dom'

const HeaderComponent = () => {

    const isAuth = isUserLoggedIn();

    const navigator = useNavigate();

    const email = getLoggedInUser();

    function handleLogout(){
        logout();
        navigator('/login')
    }

  return (
      <>
          <div style={{
              backgroundImage: "url(/header.jpg)",
              objectFit: "contain",
              height: "90px",
              backgroundSize: "cover"
          }}>

          </div>

    <div>
              <header >
                  <nav className='navbar navbar-expand-md navbar-dark bg-dark'>

                      <div className='collapse navbar-collapse'>

                          {
                              isAuth &&
                              <NavLink to="/home" className="nav-link">Home</NavLink>
                          }

                      </div>

                      <div>
                          {
                              !isAuth &&
                              <NavLink to="/register" className="nav-link">Register</NavLink>
                          }

                          {
                              !isAuth &&
                              <NavLink to="/login" className="nav-link">Login</NavLink>
                          }

                          {
                              isAuth &&
                              <NavLink to="/login" className="nav-link" onClick={handleLogout}>Logout</NavLink>
                          }
                      </div>
                      <div style={{ color: "#f2f2f2", textAlign: "center", float: "right", padding: "14px 16px" }}>
                          Logged In User : {email}
                      </div>


                  </nav>
       </header>
    </div>
    </>
  )
}

export default HeaderComponent