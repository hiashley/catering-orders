import logo from "./logo.svg";
import "./App.css";
import { useEffect } from "react";
import { getAllMenuItems } from "./utils/api.js";
function App() {
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const {menu, options} = await getAllMenuItems();
        console.log(menu)
        console.log(options)
      } catch (error) {
        console.log(error);
      }
    };
    fetchApi();
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
