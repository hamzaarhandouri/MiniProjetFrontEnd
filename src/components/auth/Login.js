import React  , { useState } from 'react';
//import { Link } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import axios from 'axios';
import AdminSideBar from '../sideBar/AdminSidebar';
import { Link ,useHistory} from 'react-router-dom';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [alertVariant, setAlertVariant] = useState("danger");
    const [alertMessage, setAlertMessage] = useState("");

    const history = useHistory();

  
    const handleSubmit = (e) => {
      e.preventDefault();
      let fd  = new FormData();
      fd.append("email",email);
      fd.append("password" ,password);
      axios.post('http://127.0.0.1:8000/api/login',fd)
      .then((data)=>{
        console.log("data : " , data.data);
        if(data.status === 200) {
            
         localStorage.setItem("token",data.data.authorisation.token);
         localStorage.setItem("name",data.data.user.name);
         localStorage.setItem("id",data.data.user.id);
         localStorage.setItem("type",data.data.user.type);
          setAlertVariant("success");
          setAlertMessage("Login successful");
          setShowAlert(true);
          if(data.data.user.type === "administrateur") {
            console.log("in admin");
            history.push('/dashboard');
            window.location.reload();
          } else if (data.data.user.type === "normal" && data.data.user.email_verified_at  === null) {
            setAlertVariant("danger");
            setAlertMessage("Votre compte n'est pas encore vérifier");
            setShowAlert(true);
          }else if(data.data.user.type === "normal" && data.data.user.email_verified_at !== null) {
            history.push('/Employee');
            window.location.reload();
          }
       
          
  
        }
  
      })
      .catch((error)=>{
        if(error.response.status === 401) {
            setAlertVariant("danger");
            setAlertMessage("Invalid email or password");
            setShowAlert(true);
        }else{
        console.log("Mario is error");
        console.log("data : ",error.response.data);
        console.log("status : ",error.response.status);
        console.log("headers : ",error.response.headers);
        console.log("message : ",error.message);
      }
      })
    };  
  return (
    <div>
    <div className="container mt-5">
      <div className="row justify-content-center">
      {showAlert && (
            <Alert variant={alertVariant} onClose={() => setShowAlert(false)} dismissible>
              {alertMessage}
            </Alert>
          )}
        <div className="col-md-6">
          <div className="card">
            <div className="card-header bg-primary text-white">
              <h4 className="mb-0">Login</h4>
            </div>
            <div className="card-body">
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                <Button  className="mt-3 primary"  type="submit">
                  Login
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}
