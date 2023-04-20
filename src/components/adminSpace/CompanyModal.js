import axios from 'axios';
import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

export default function CompanyModal({onAddCompany, show, handleClose }) {
    const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };


  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  
  

  const handleSaveClick = () => {
    const fd = new FormData();
    fd.append("name",name);
    fd.append("address",address);
    fd.append("city",city);
    axios.post('http://127.0.0.1:8000/api/createCompany',fd,{
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}` 
          }
        })
    .then((response) => {
        onAddCompany(response.data.data);});

};

  return (
    <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Add Company</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form>
        <Form.Group controlId="formCompanyName">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Enter company name" value={name} onChange={handleNameChange} />
        </Form.Group>
        <Form.Group controlId="formCompanyAddress">
          <Form.Label>Address</Form.Label>
          <Form.Control type="text" placeholder="Enter company address" value={address} onChange={handleAddressChange} />
        </Form.Group>
        <Form.Group controlId="formCompanyCity">
          <Form.Label>City</Form.Label>
          <Form.Control type="text" placeholder="Enter company city" value={city} onChange={handleCityChange} />
          </Form.Group>
         
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSaveClick}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  )
}


