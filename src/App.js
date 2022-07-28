import './App.scss';
import Header from './components/Header/Header.js';
import Footer from './components/Footer/Footer.js';
import Login from './components/Login/Login.js';
import Signup from './components/Signup/Signup.js';
import Connections from './components/Connections/Connections.js';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return (<div>Loading ...</div>);
  }

  if(!isAuthenticated){
    return (
      <>
      <Header />
    <div>Please sign in</div>
</>
    )
  }


  return (

      <Router>
      <main className='App'>
      <Header />
      <div className='card'>
      <Switch>
        <Route path={'/'}  component={Connections} />
      </Switch>
      </div>
      <p>{JSON.stringify(user)}</p>
      <Footer/>
      </main>
    </Router>
  );
}

export default App;
