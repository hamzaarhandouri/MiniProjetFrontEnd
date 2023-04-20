import axios from 'axios'
import React, {useEffect , useState} from 'react'
import AdminSidebar from '../sideBar/AdminSidebar'
import { Form, Button } from 'react-bootstrap';

export default function AdminProfile() {
      const [name, setName] = useState('');
        const [address, setAddress] = useState('');
        const [email, setEmail] = useState('');
        const [previousPassword, setPreviousPassword] = useState('');
        const [currentPassword, setCurrentPassword] = useState('');
        const [confirmPassword, setConfirmPassword] = useState('');
        const [phone, setPhone] = useState('');
        const [birthday, setBirthday] = useState('');
    
    useEffect(() => {
      axios.get(`http://127.0.0.1:8000/api/getuser/${localStorage.getItem('id')}`,{
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}` 
          }
        })
      .then((response) =>{console.log("response : ", response.data.user);
      setName(response.data.user.name  == null ? "" : response.data.user.name);
      setAddress(response.data.user.adress == null ? "" : response.data.user.adress);
      setEmail(response.data.user.email  == null ? "" : response.data.user.email);
      setPhone(response.data.user.phoneNumber  == null ? "" : response.data.user.phoneNumber);
      setBirthday(response.data.user.birthDate  == null ? "" : response.data.user.birthDate);
    })
    
      
    }, []);


  const handleSubmit = (event) => {
    event.preventDefault();
    const fd = new FormData ;
    // if (currentPassword !== confirmPassword){
    //     return false;
    // }
    fd.append("name",name);
    fd.append('email',email);
    fd.append("adress",address);
    fd.append("password",currentPassword);
    fd.append("phone",phone);
    fd.append("birthday",birthday);
    
    axios.post(`http://127.0.0.1:8000/api/updateUser/${localStorage.getItem('id')}`,fd,{
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}` 
          }
        })
    .then((response) => {
        console.log("response update : ", response);
    })
    // handle form submission here
  };
    

  return (
    

    <div>
        <AdminSidebar/>
        <br/>
      <h1>  Edit your Profile </h1>
        <br/>
        <div className='w-50 justify-content-center lign-items-center'>
        <Form onSubmit={handleSubmit}>
      <Form.Group controlId="name">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" value={name} onChange={(event) => setName(event.target.value)} />
      </Form.Group>

      <Form.Group controlId="address">
        <Form.Label>Address</Form.Label>
        <Form.Control type="text" value={address} onChange={(event) => setAddress(event.target.value)} />
      </Form.Group>

      <Form.Group controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
      </Form.Group>

      <Form.Group controlId="previousPassword">
        <Form.Label>Previous Password</Form.Label>
        <Form.Control type="password" value={previousPassword} onChange={(event) => setPreviousPassword(event.target.value)} />
      </Form.Group>

      <Form.Group controlId="currentPassword">
        <Form.Label>Current Password</Form.Label>
        <Form.Control type="password" value={currentPassword} onChange={(event) => setCurrentPassword(event.target.value)} />
      </Form.Group>

      <Form.Group controlId="confirmPassword">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control type="password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} />
      </Form.Group>

      <Form.Group controlId="phone">
        <Form.Label>Phone</Form.Label>
        <Form.Control type="text" value={phone} onChange={(event) => setPhone(event.target.value)} />
      </Form.Group>

      <Form.Group controlId="birthday">
        <Form.Label>Birthday</Form.Label>
        <Form.Control type="date" value={birthday} onChange={(event) => setBirthday(event.target.value)} />
      </Form.Group>
      <br />

      <Button type="submit">Save Changes</Button>
    </Form>
    </div></div>
  )
}
