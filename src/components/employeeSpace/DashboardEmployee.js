import React, { useState, useEffect } from 'react';
import EmployeeBar from '../sideBar/EmployeeBar';
import { Table } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';

export default function DashboardEmployee() {
    const [users, setUsers] = useState([]);
    const [company, setCompany] = useState("");

    const history = useHistory();


    useEffect(() => {
      if (!localStorage.getItem('id')) {
        history.push('/');
        window.location.reload();
              }
    axios.get(`http://127.0.0.1:8000/api/getuser/${localStorage.getItem('id')}`,{
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}` 
          }
        })
        .then((response) => {

            if (response.data.user.type !== "normal") {
                history.push('/');
                window.location.reload();
            }

        })
        axios.get(`http://127.0.0.1:8000/api/usersCompany/${localStorage.getItem('id')}`,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}` 
              }
            })
            .then(response => {
              console.log(response.data);
              setUsers(response.data.data);
            })
            .catch(error => {
              console.log(error);
            });

        axios.get(`http://127.0.0.1:8000/api/getCurrentcompany/${localStorage.getItem('id')}`,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}` 
              }
            })
            .then(response => {
             setCompany(response.data.data);
            })
            .catch(error => {
              console.log(error);
            })
            

     
    }, [])
    


  return (
    <div>
        <EmployeeBar/>
        <br/>
        <h1>Your CO-WORKERS </h1>
        <br/>
        <Table striped bordered hover>
      <thead>
        <tr>
          <th>id</th>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.phoneNumber}</td>
          </tr>
        ))}
      </tbody>
    </Table>
    <br/>
    <h1>Your company Info</h1>
    <br/>
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{company.name}</Card.Title>
        <Card.Text>{company.address}</Card.Text>
        <Card.Footer>{company.city}</Card.Footer>
      </Card.Body>
    </Card>
        </div>
  )
}
