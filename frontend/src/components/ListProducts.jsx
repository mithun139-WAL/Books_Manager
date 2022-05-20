/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable arrow-body-style */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Card,
  CardBody,
  CardTitle,
  CardImg,
  CardSubtitle,
  CardText,
} from 'reactstrap';
import Edit from './Edit';
import Delete from './Delete';

export default function ListBooks() {
  const [product, setProducts] = useState([]);
  const token = JSON.parse(localStorage.getItem('regtoken'));
  // Fetching the products data from the backend so that we can list the produts
  useEffect(() => {
    document.querySelector('#loading-spinner').style.visibility = 'visible';
    axios
      .create({
        headers: { token },
      })
      .get('/books')
      .then((response) => {
        console.log(response.data);
        setProducts(response.data);
        document.querySelector('#loading-spinner').style.visibility = 'hidden';
      })
      .catch((error) => {
        console.log('An error occurred:', error.response);
      });
  }, []);
  return (
    <div className="container-fluid">
      <div
        id="loading-spinner"
        className="spinner-border text-success d-block"
        role="status"
      />
      <h1 className="text-center mb-5">List of Books</h1>
      <div className="row">
        {product.map((val) => {
          return (
            <div className="mb-3 col-lg-3 col-md-5 col-sm-6 ">
              <Card>
                <CardImg
                  top
                  height={200}
                  className="p-1 w-75 mx-auto"
                  src={val.image}
                  alt={val.title}
                />
                <CardBody>
                  <CardTitle>{val.name}</CardTitle>
                  <CardSubtitle>{val.Category.name}</CardSubtitle>
                  <CardText>
                    <p>${val.price}</p>
                    <p>Author: {val.author}</p>
                  </CardText>
                  <ul className="d-flex menu1">
                    <li>
                      <Edit
                        bid={val.id}
                        bname={val.name}
                        bisbn={val.isbn_no}
                        bauthor={val.author}
                        bpublication={val.publication}
                        bimage={val.image}
                        bprice={val.price}
                        bedition={val.edition}
                        bavailability={val.availability}
                        bcategoryId={val.categoryId}
                      />
                    </li>
                    <li>
                      <Delete id={val.id} />
                    </li>
                  </ul>
                </CardBody>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
}
