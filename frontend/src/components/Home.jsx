import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AddBooks from './Addbook';
import ListBooks from './List';

export default function Home() {
  const navigate = useNavigate();
  const token = localStorage.getItem('regtoken');
  window.onload = () => {
    if (localStorage.getItem('regtoken')) {
      document.querySelector('#edit-book').style.display = 'block';
    } else {
      navigate('/login');
    }
  };
  return (
    <div>
      {token ? (
        <div>
          <ul className="d-flex menu">
            <li>
              <AddBooks />
            </li>
            <li>
              <Link
                to="/editbook"
                id="edit-book"
                className="editbtn btn btn-primary"
              >
                Edit Book
              </Link>
            </li>
          </ul>
          <ListBooks />
        </div>
      ) : (
        <div>
          <Link to="/login" className="btn btn-info p-3 getstarted">
            Get Started
          </Link>
        </div>
      )}
    </div>
  );
}
