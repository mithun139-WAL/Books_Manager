/* eslint-disable react/jsx-one-expression-per-line */
import { React, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';

export default function Describe({
  name,
  isbn,
  author,
  publication,
  image,
  category,
  price,
  edition,
}) {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  return (
    <div>
      <Button onClick={toggle}>More...</Button>
      <Modal isOpen={modal} toggle={toggle} modalTransition={{ timeout: 1000 }}>
        <ModalHeader>{name}</ModalHeader>
        <ModalBody>
          <img
            top
            height={200}
            className="p-1 w-75 mx-auto"
            src={image}
            alt={name}
          />
          <p>{category}</p>
          <p>₹{price}</p>
          <p>
            <i>{publication}</i>
          </p>
          <p>{edition}</p>
          <p>ISBN: {isbn}</p>
        </ModalBody>
        <ModalFooter>
          <small>Author</small>
          <i>{author}</i>
        </ModalFooter>
      </Modal>
    </div>
  );
}
