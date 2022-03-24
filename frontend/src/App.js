import './App.css';
import Header from './components/Header';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Cookies from 'universal-cookie';
import JobList from './components/JobList';
import {useState, useEffect} from 'react' 
import LogRegScreen from './screens/LogRegScreen';
import ClientReg from './components/ClientReg';
import ClientRegScreen from './screens/ClientRegScreen';
import ClientList from './components/ClientList';
import JobRegScreen from './screens/JobRegScreen';
import ClientUpdate from './components/ClientUpdate';
import ClientJobs from './components/ClientJobs';
import JobUpdate from './components/JobUpdate';





function App() {
  
  const cookies = new Cookies();
  const token = cookies.get('mycookie')


  return (
    <BrowserRouter>
    <Header ></Header>
    
      <Routes>
        <Route exact path="/log_reg" element={<LogRegScreen/>}></Route>
        <Route exact path="/joblist" element={<JobList/>} ></Route>
        <Route exact path="/client_reg" element={<ClientRegScreen/>} ></Route>
        <Route exact path="/client_list" element={<ClientList/>} ></Route>
        <Route exact path="/client/:id" element={<ClientUpdate/>} ></Route>
        <Route exact path="/job_list/:name" element={<ClientJobs/>} ></Route>
        <Route exact path="/job_reg" element={<JobRegScreen/>} ></Route>
        <Route exact path="/job_update" element={<JobUpdate/>} ></Route>
        <Route exact path="/job/:id" element={<JobUpdate/>} ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
