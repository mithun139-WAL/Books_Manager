/* eslint-disable no-alert */
/* eslint-disable react/button-has-type */
/* eslint-disable arrow-body-style */
/* eslint-disable no-shadow */
/* eslint-disable indent */
/* eslint-disable object-shorthand */
/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Form,
  Input,
  Button,
} from 'reactstrap';
// eslint-disable-next-line import/no-unresolved
// import './styles/List.css';

export default function AddProducts() {
  const [name, setName] = useState('');
  const [isbn, setIsbn] = useState('');
  const [author, setAuthor] = useState('');
  const [edition, setEdition] = useState('');
  const [price, setPrice] = useState('');
  const [publication, setPublication] = useState('');
  const [availability, setAvailability] = useState(0);
  const [categoryId, setCategoryId] = useState(0);
  const [file, setFile] = useState();
  // eslint-disable-next-line no-unused-vars
  const [fileName, setFileName] = useState('');
  const [categorydata, setCategorydata] = useState([]);
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const token = JSON.parse(localStorage.getItem('regtoken'));

  const saveFile = (e) => {
    console.log(e.target.files[0]);
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  useEffect(async () => {
    console.log(localStorage.getItem('regtoken'));
    await axios
      .create({
        headers: { token },
      })
      .get(' /categories')
      .then((response) => {
        console.log('Category Data', response.data);
        setCategorydata(response.data);
      })
      .catch((error) => {
        console.log('An error occurred:', error.response);
      });
  }, []);

  const addBook = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', file);
    formData.append('author', author);
    formData.append('name', name);
    formData.append('isbn_no', isbn);
    formData.append('edition', edition);
    formData.append('publication', publication);
    formData.append('categoryId', categoryId);
    formData.append('price', price);
    formData.append('availability', availability);

    if (categoryId.length > 0) {
      axios
        .create({
          headers: { token },
        })
        .post('/books/add', formData)
        .then((response) => {
          if (!response.data.errors) {
            console.log('Book Details', response);
            toggle();
            alert('Added successfully');
            window.location.reload();
          } else {
            alert('Validation Error');
            console.log(response.data.errors);
          }
        })
        .catch((error) => {
          console.log('An error occurred:', error.response);
        });
    } else {
      alert('please select category');
    }
  };
  return (
    <div>
      <button className="btn btn-primary addbtn" onClick={toggle}>
        Add Book
      </button>
      <Modal isOpen={modal} toggle={toggle} modalTransition={{ timeout: 1000 }}>
        <ModalHeader>Add Product</ModalHeader>
        <ModalBody>
          <Form onSubmit={addBook}>
            <Input
              required
              type="text"
              name="bookName"
              className="form-control my-3  mx-auto"
              placeholder="Enter Book Name"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <Input
              required
              type="number"
              name="bookPrice"
              className="form-control my-3 mx-auto"
              placeholder="Enter Book Price"
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            />
            <Input
              required
              type="file"
              accept="image/*"
              name="productImage"
              className="form-control my-3 mx-auto"
              onChange={saveFile}
              id="file_input required"
            />
            <select
              required
              name="category"
              id="category"
              className="form-control my-3 mx-auto"
              onChange={(e) => {
                setCategoryId(e.target.value);
              }}
            >
              <option>---Select Category---</option>
              {categorydata.map((value) => {
                // eslint-disable-next-line no-underscore-dangle
                return <option value={value.id}>{value.name}</option>;
              })}
            </select>
            <Input
              required
              type="text"
              name="author"
              className="form-control my-3 mx-auto"
              placeholder="Enter Book Author"
              onChange={(e) => {
                setAuthor(e.target.value);
              }}
            />
            <select
              required
              name="availability"
              id="availability"
              className="form-control my-3 mx-auto"
              onChange={(e) => {
                setAvailability(e.target.value);
              }}
            >
              <option>---Set Availability---</option>
              <option value={1}>Available</option>
              <option value={0}>Unavailable</option>
            </select>
            <Input
              required
              type="text"
              name="isbn"
              className="form-control my-3 mx-auto"
              placeholder="Enter Book ISBN No."
              onChange={(e) => {
                setIsbn(e.target.value);
              }}
            />
            <Input
              required
              type="text"
              name="publication"
              className="form-control my-3 mx-auto"
              placeholder="Enter Book Publication"
              onChange={(e) => {
                setPublication(e.target.value);
              }}
            />
            <Input
              required
              type="number"
              name="edition"
              className="form-control my-3 mx-auto"
              placeholder="Enter Book Edition"
              onChange={(e) => {
                setEdition(e.target.value);
              }}
            />
            <ModalFooter>
              <Button className="btn btn-primary my-2 " type="submit">
                Add Book
              </Button>
            </ModalFooter>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
}
