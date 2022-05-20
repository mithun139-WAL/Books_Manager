/* eslint-disable arrow-body-style */
/* eslint-disable react/jsx-one-expression-per-line */
import { React, useState, useEffect } from 'react';
import { BsFillPencilFill } from 'react-icons/bs';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';

export default function Edit({
  bid,
  bname,
  bisbn,
  bauthor,
  bpublication,
  bprice,
  bavailability,
  bedition,
  bcategoryId,
}) {
  const [name, setName] = useState(bname);
  const [isbn, setIsbn] = useState(bisbn);
  const [author, setAuthor] = useState(bauthor);
  const [edition, setEdition] = useState(bedition);
  const [price, setPrice] = useState(bprice);
  const [publication, setPublication] = useState(bpublication);
  const [availability, setAvailability] = useState(bavailability);
  const [categoryId, setCategoryId] = useState(bcategoryId);
  const [categorydata, setCategorydata] = useState([]);

  const token = JSON.parse(localStorage.getItem('regtoken'));
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

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

  const editBook = () => {
    axios
      .create({
        headers: { token },
      })
      .put(`/books/edit/${bid}`, {
        name,
        isbn_no: isbn,
        author,
        edition,
        publication,
        price,
        availability,
        categoryId,
      })
      .then((response) => {
        console.log('Book Details', response.data);
        toggle();
        alert('Updated successfully');
        window.location.reload();
      })
      .catch((error) => {
        console.log('An error occurred:', error.response);
      });
  };

  return (
    <div>
      <Button className="edit btn btn-warning" onClick={toggle}>
        <BsFillPencilFill /> Edit
      </Button>
      <Modal isOpen={modal} toggle={toggle} modalTransition={{ timeout: 1000 }}>
        <ModalHeader>Edit Product</ModalHeader>
        <ModalBody>
          <input
            required
            type="text"
            name="bookName"
            className="form-control my-3  mx-auto"
            placeholder="Enter Book Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <input
            required
            type="number"
            name="bookPrice"
            className="form-control my-3 mx-auto"
            placeholder="Enter Book Price"
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          />
          <select
            required
            name="category"
            id="category"
            className="form-control my-3 mx-auto"
            value={categoryId}
            onChange={(e) => {
              setCategoryId(e.target.value);
            }}
          >
            {categorydata.map((value) => {
              return <option value={value.id}>{value.name}</option>;
            })}
          </select>
          <input
            required
            type="text"
            name="author"
            className="form-control my-3 mx-auto"
            placeholder="Enter Book Author"
            value={author}
            onChange={(e) => {
              setAuthor(e.target.value);
            }}
          />
          <select
            required
            name="availability"
            id="availability"
            className="form-control my-3 mx-auto"
            value={availability}
            onChange={(e) => {
              setAvailability(e.target.value);
            }}
          >
            <option value={1}>Available</option>
            <option value={0}>Unavailable</option>
          </select>
          <input
            required
            type="text"
            name="isbn"
            className="form-control my-3 mx-auto"
            placeholder="Enter Book ISBN No."
            value={isbn}
            onChange={(e) => {
              setIsbn(e.target.value);
            }}
          />
          <input
            required
            type="text"
            name="publication"
            className="form-control my-3 mx-auto"
            placeholder="Enter Book Publication"
            value={publication}
            onChange={(e) => {
              setPublication(e.target.value);
            }}
          />
          <input
            required
            type="number"
            name="edition"
            value={edition}
            className="form-control my-3 mx-auto"
            placeholder="Enter Book Edition"
            onChange={(e) => {
              setEdition(e.target.value);
            }}
          />
        </ModalBody>
        <ModalFooter>
          <button
            className="btn btn-primary my-2 w-50"
            type="submit"
            onClick={editBook}
          >
            Edit
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
