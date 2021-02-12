import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Home from './components/home';
import Register from './components/register';
import Login from './components/login';
import Add from './components/addAppointments';
import Appointments from './components/appointments';
import Update from './components/updatePage';
import {BrowserRouter, Route} from 'react-router-dom';
//The following are all the components I used in my app and their respective paths
function App() {
  return (
    <div className="App">
     <BrowserRouter>
     <Route path="/" exact={true} component={Home}/>
     <Route path="/register" component={Register}/>
     <Route path="/login" component={Login}/>
     <Route path="/add appointments" component={Add}/>
     <Route path="/appointments" component={Appointments}/>
     <Route path="/update" component={Update}/>
     </BrowserRouter>
    </div>
  );
}

export default App;
