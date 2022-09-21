import "./App.css";
import Dashboard from "./Components/Dashboard/Dashboard";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import 'bootstrap/dist/css/bootstrap.min.css';
import Default from "./Components/Layouts/Default";
import About from "./Components/About/About";

function App() {
  const auth = localStorage.getItem('currentUser')
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Default />}>
            <Route index element={<Dashboard />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
