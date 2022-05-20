import { React, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal, ModalBody, ModalHeader, Col, Row } from 'reactstrap';

export default function Delete({ id }) {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const token = JSON.parse(localStorage.getItem('regtoken'));
  const deleteBook = () => {
    axios
      .create({
        headers: { token },
      })
      .delete(`/books/del/${id}`)
      .then((response) => {
        console.log('Book Details', response.data);
        toggle();
        alert('Deleted the book');
        window.location.reload();
      })
      .catch((error) => {
        console.log('An error occurred:', error.response);
      });
  };
  return (
    <div>
      <Button onClick={toggle}>Delete</Button>
      <Modal isOpen={modal} toggle={toggle} modalTransition={{ timeout: 1000 }}>
        <ModalHeader>Delete Book</ModalHeader>
        <ModalBody>
          <Row>
            <Col>
              <Button onClick={deleteBook} className="btn btn-danger w-50 mx-5">
                Yes, Delete Book
              </Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button
                onClick={toggle}
                className="btn btn-waring w-50 mx-5 my-3"
              >
                Keep Book
              </Button>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </div>
  );
}
