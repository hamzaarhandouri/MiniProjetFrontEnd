import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

export default function EditEmployeeModal({id ,company ,show , handleClose}) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [country, setCountry] = useState('');
    const [role, setRole] = useState('administrateur');
    const [company_id, setCompany_ID] = useState();
  
    useEffect( ()  => {
        console.log("wesh a sat : ",id);
       axios.get(`http://127.0.0.1:8000/api/getuser/${id}`,{
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}` 
          }
        })
      .then((response) => {
        setName(response.data.user.name)
        setRole(response.data.user.type)
    })
    }, [])
    

    const handleNameChange = (event) => {
      setName(event.target.value);
    };
  
    const handleEmailChange = (event) => {
      setEmail(event.target.value);
    };
  
  
    const handlePasswordChange = (event) => {
      setPassword(event.target.value);
    };
  
    const handleCountryChange = (event) => {
      setCountry(event.target.value);
    };
    const handleRoleChange = (event) => {
      setRole(event.target.value);
    }
  
    const handleCompanyChange = (event) => {
      setCompany_ID(event.target.value);
    }
    const handleSaveClick = () => {}
  return (
    <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Edit Employee</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form>
        <Form.Group controlId="formCompanyName">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Enter company name" value={name} onChange={handleNameChange} />
        </Form.Group>
        <Form.Group controlId="formCompanyAddress">
          <Form.Label>Email</Form.Label>
          <Form.Control type="text" placeholder="Enter company address" value={email} onChange={handleEmailChange} />
        </Form.Group>
        {role === "administrateur" ?  (<Form.Group controlId="formCompanyAddress">
          <Form.Label>password</Form.Label>
          <Form.Control type="password" placeholder="Enter password" value={password} onChange={handlePasswordChange} />
        </Form.Group>):""}
       
          <Form.Group controlId="Form.SelectCustom">
        <Form.Label>Select a role </Form.Label>
        <Form.Control as="select" custom value={role} onChange={handleRoleChange}>
          <option value="administrateur">Administrateur</option>
          <option value="normal"> Employee</option>
        </Form.Control>
      </Form.Group>
      {role === "administrateur" ? "":(
        <Form.Group controlId="Form.SelectCustom">
        <Form.Label>Select a company </Form.Label>
        <Form.Control as="select" custom value={company_id} onChange={handleCompanyChange}>
            {company.map((comp)=>(
          <option value={comp.id}>{comp.name}</option>

            ))}
        </Form.Control>
      </Form.Group>
       )} </Form>
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
