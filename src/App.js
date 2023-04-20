import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Dashboard from './components/adminSpace/Dashboard';
import Login from './components/auth/Login';
import AdminProfile from './components/adminSpace/AdminProfile';
import RedirectMail from './components/employeeSpace/RedirectMail';
import DashboardEmployee from './components/employeeSpace/DashboardEmployee';
import ProfileEmployee from './components/employeeSpace/ProfileEmployee';
import History from './components/adminSpace/History';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/AdminProfile">
            <AdminProfile />
          </Route>
          <Route path="/RedirectMail">
            <RedirectMail />
          </Route>
          <Route path="/Employee">
            <DashboardEmployee />
          </Route>
          <Route path="/ProfileEmployee">
            <ProfileEmployee />
          </Route>
          <Route path="/History">
            <History />
          </Route>
        </Switch>
      </div>
      
      </Router>
  );
}

export default App;
