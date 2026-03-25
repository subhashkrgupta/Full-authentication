import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './component/layout/Layout';
import Login from './component/pages/Login';
import Register from './component/pages/Register';


function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;