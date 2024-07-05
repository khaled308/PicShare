import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import store from "./store";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import UploadImage from "./pages/UploadImage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VerifyEmail from "./pages/VerifyEmail";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Toaster />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/upload" element={<UploadImage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
