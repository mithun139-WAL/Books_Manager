/* eslint-disable react/jsx-indent */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { React, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './styles/Menubar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Navbar,
  NavItem,
  NavbarToggler,
  Collapse,
  NavLink,
  Nav,
  NavbarBrand,
} from 'reactstrap';

export default function Menubar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  window.onload = () => {
    if (localStorage.getItem('regtoken')) {
      document.querySelector('#login-btn').style.display = 'none';
      document.querySelector('#logout-btn').style.display = 'block';
      document.querySelector('.editbtn').style.visibility = 'visible';
      document.querySelector('.addbtn').style.visibility = 'visible';
      document.querySelector('#homebtn').style.display = 'block';
    } else {
      alert('Please Login!!');
      document.querySelector('#login-btn').style.display = 'block';
      document.querySelector('#logout-btn').style.display = 'none';
      document.querySelector('.editbtn').style.visibility = 'hidden';
      document.querySelector('.addbtn').style.visibility = 'hidden';
      document.querySelector('.home').style.display = 'none';
      navigate('/login');
    }
  };
  const onLogOut = () => {
    localStorage.setItem('regtoken', '');
    document.querySelector('#login-btn').style.display = 'block';
    document.querySelector('#logout-btn').style.display = 'none';
    document.querySelector('.editbtn').style.visibility = 'hidden';
    document.querySelector('.addbtn').style.visibility = 'hidden';
    navigate('/login');
  };
  return (
    <div
      style={{
        display: 'block',
      }}
    >
      <Navbar color="dark" dark expand="md">
        <NavbarBrand className="ms-5" href="/">
          Books Manager
        </NavbarBrand>
        <NavbarToggler
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink>
                <Link
                  to="/"
                  id="homebtn"
                  className="btn action-button m-1 text-primary"
                >
                  Home
                </Link>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink>
                <Link
                  id="login-btn"
                  className="btn action-button m-1 text-primary"
                  to="/login"
                >
                  Log In
                </Link>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink>
                <button
                  type="button"
                  id="logout-btn"
                  className="btn action-button text-primary m-1"
                  onClick={onLogOut}
                >
                  Log Out
                </button>
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}
