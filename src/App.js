import './App.scss';
import Header from './components/Header/Header.js';
import Footer from './components/Footer/Footer.js';
import Connections from './components/Connections/Connections.js';
import Messages from './components/Messages/Messages.js';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios';



function App() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  console.log("from app", isAuthenticated);
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
    axios.get(`http://localhost:8080/user/${user.email}`)
      .then(res => {
        if (res.data.sucess) {
          console.log("res form front end is true, user is already in database", res.data.sucess);
        } else {
          console.log("res form front end is false we need to add user to db", res.data.sucess);
          axios.post(`http://localhost:8080/user/${user.email}`)
            .then(res => {
              console.log('res from post front end', res)
            })
        }

      })
  }



  return (

    <Router>
      <main className='App'>
        <Header auth={isAuthenticated} />
        <div className='card'>
          <Switch>
            <Route path={'/messages'} component={Messages} />
            <Route path={'/'} component={Connections} />
          </Switch>
        </div>
        {/* <p>{JSON.stringify(user)}</p> */}
        <Footer />
      </main>
    </Router>
  );
}

export default App;
