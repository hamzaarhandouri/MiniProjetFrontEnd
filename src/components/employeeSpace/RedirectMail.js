import axios from 'axios'
import React , {useEffect,useState} from 'react';
import { useLocation , useHistory } from 'react-router-dom';
import { Form, Button , Alert } from 'react-bootstrap';


export default function RedirectMail() {
    const [expired, setExpired] = useState(false);
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [birthday, setBirthday] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [alertVariant, setAlertVariant] = useState("danger");
    const [alertMessage, setAlertMessage] = useState("");

    const location = useLocation();
    const history = useHistory();

    const firstPathname = location.pathname.split('/')[2];;
    const secondPathname = location.pathname.split('/')[3];
 


    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/verifyExpired/${secondPathname}`,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}` 
              }
            })
        .then((response) => {
            if (response.data.status === 'expired')
            {
                setExpired(true)
            }
            else{
                axios.get(`http://127.0.0.1:8000/api/getuser/${firstPathname}`,{
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}` 
                      }
                    })
                .then((response) => {
                    setName(response.data.user.name  == null ? "" : response.data.user.name);
                    setAddress(response.data.user.adress == null ? "" : response.data.user.adress);
                    setEmail(response.data.user.email  == null ? "" : response.data.user.email);
                    setPhone(response.data.user.phoneNumber  == null ? "" : response.data.user.phoneNumber);
                    setBirthday(response.data.user.birthDate  == null ? "" : response.data.user.birthDate);
                });
            }
        })
    
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault();
        if(name == "" || address == "" || email == "" || currentPassword == "" || confirmPassword == null || phone == "" || birthday == "" ) {
            setAlertVariant("danger");
            setAlertMessage("A fieled is empty");
            setShowAlert(true);
            return ;
        } else {
            const fd = new FormData;
            fd.append("name",name);
            fd.append('email',email);
            fd.append("adress",address);
            fd.append("password",currentPassword);
            fd.append("phone",phone);
            fd.append("birthday",birthday);
            
            
            axios.post(`http://127.0.0.1:8000/api/updateUser/${firstPathname}`,fd)
            .then((response) => {
                console.log("response update : ", response);
                axios.post(`http://127.0.0.1:8000/api/modifyInvitation/${secondPathname}`)
                .then((response) => {
                    console.log("response modify invitation : ", response);
                    history.push('/');
                    window.location.reload();
                });
            })
           
        }
      };
        
    
  return (
    <div>{ expired  === true ?( <h1>Votre lien est expiré contacter support</h1>) : 
     (<div className='w-50 justify-content-center lign-items-center'>
         {showAlert && (
            <Alert variant={alertVariant} onClose={() => setShowAlert(false)} dismissible>
              {alertMessage}
            </Alert>
          )}
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

  <Button type="submit">Validate</Button>
</Form></div>
)
        
        }
        
        </div>
  )
}
