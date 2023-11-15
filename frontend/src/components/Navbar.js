import React from 'react';

function Navbar() {
  const handleLogout = () => {
    localStorage.removeItem("id");
    window.location.href = '/';
  }

  return (
    <div>
    <nav className="navbar navbar-dark bg-dark fixed-top">
      <div className="container-fluid">
        <div className="d-flex">
          <a className="navbar-brand" href="/">Home</a>
          <a className="navbar-brand" href="/">Cards</a>
          <a className="navbar-brand" href="/Create">Create new</a>
        </div>
        
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav" 
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="/">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/">Profile</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/">Cards</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href='/' onClick={handleLogout}>Log Out</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
  );
}

export default Navbar;

