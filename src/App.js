
import './App.css';
import Homepage from './Component/Homepage';
import { Auth0Provider } from '@auth0/auth0-react';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <Auth0Provider
      domain="dev-6c0g2gk0d8ijys55.us.auth0.com"
      clientId="M9ExyKVWT5hxTN8k3P5mgPHGssqHJJ9i"
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
    >
      <div className="App">
      <Router>
        
        <Homepage />
        </Router>
      </div>
    </Auth0Provider>
  );
}

export default App;
