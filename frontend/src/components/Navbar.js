import React from 'react';

function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-dark bg-dark">
        <a className="navbar-brand" href="/">To Do App</a>
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
              <a className="nav-link" href="/">Eka linkki</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/about">Toka linkki</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/about">jne</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/contact">Log Out</a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;

