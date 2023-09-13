import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Menu from './pages/Menu';
import Orders from './pages/Orders';
import Navbar from './components/Nav/Navbar';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink
} from '@apollo/client';


const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql',
  cache: new InMemoryCache(),
});


function App() {
  return (
    <ApolloProvider client={client}>
    <Router>
      <Navbar />
      <Routes>
        <Route 
          path="/"
          element={<Menu />}
        />
        <Route 
          path="/orders"
          element={<Orders />}
        />
      </Routes>
    </Router>
    </ApolloProvider>
  );
}

export default App;
