import React from 'react';
import './styles.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Menu from './pages/Menu';
import Orders from './pages/Orders';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink
} from '@apollo/client';
import DrawerAppBar from './components/Nav/Navbar';
import SingleOrder from './pages/SingleOrder';

const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql',
  cache: new InMemoryCache(),
});


function App() {
  return (
    <ApolloProvider client={client}>
    <Router>
      <DrawerAppBar />
      <Routes>
        <Route 
          path="/"
          element={<Menu />}
        />
        <Route 
          path="/orders"
          element={<Orders />}
        />
        <Route 
          path="/orders/:orderId"
          element={<SingleOrder />}
        />
      </Routes>
    </Router>
    </ApolloProvider>
  );
}

export default App;
