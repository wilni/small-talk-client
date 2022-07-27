import './App.scss';
import Header from './components/Header/Header.js';
import Footer from './components/Footer/Footer.js';
import Login from './components/Login/Login.js';
import Signup from './components/Signup/Signup.js';
import Connections from './components/Connections/Connections.js';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <main className='App'>
      <Header />
      <Switch>
        <Route path={'/login'} component={Login} />
        <Route path={'/signup'} component={Signup} />
        <Route path={'/'}  component={Connections} />
      </Switch>
      <Footer/>
      </main>
    </Router>
  );
}

export default App;
