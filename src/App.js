import './App.scss';
import Header from './components/Header/Header.js';
import Footer from './components/Footer/Footer.js';
import ConnectionsList from './components/ConnectionsList/ConnectionsList.js';
import Messages from './components/Messages/Messages.js';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import { useState } from 'react';
import axios from 'axios';
import { API_URL } from './config/index.js';

import { ToastContainer } from 'react-toastify';


function App() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  if (isLoading) {
    return (<div>Loading ...</div>);
  }

  if (!isAuthenticated) {
    return (
      <>
        <Header isAuthenticated={isAuthenticated} />
        <div>Please sign in</div>
      </>
    )
  } else {
    //check if there is user with email in database 
    // if !user send a post to back end 
    axios.get(`${API_URL}/user/${user.email}`)
      .then(res => {
        if (res.data.sucess) {
        } else {
          axios.post(`${API_URL}/user/${user.email}`)
        }
      })
  }



  return (

    <Router>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
      />
      <main className='App'>
        <Header auth={isAuthenticated} />
        <div className='card'>
          <Switch>
            <Route path={'/messages/:id'} component={Messages} />
            <Route path={'/'} component={ConnectionsList} />
          </Switch>
        </div>
        <Footer />
      </main>
    </Router>
  );
}

export default App;
