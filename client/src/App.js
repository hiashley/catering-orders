import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Menu from './pages/Menu';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink
} from '@apollo/client';
const httpLink = createHttpLink({
  uri: '/graphql',
});
const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  // link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
function App() {
  return (
    <ApolloProvider client={client}>
    <Router>
      <Routes>
        <Route 
          path="/"
          element={<Menu />}
        />
      </Routes>
    </Router>
    </ApolloProvider>
  );
}

export default App;
