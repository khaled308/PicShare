import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from "react-hot-toast";
import store from "./store";
import Navbar from "./components/Navbar";
import {
  ForgetPassword,
  Home,
  Login,
  Register,
  ResetPassword,
  UploadImage,
  VerifyEmail,
} from "./pages";

function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
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
            <Route path="/forget-password" element={<ForgetPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
          </Routes>
        </Router>
      </Provider>
    </GoogleOAuthProvider>
  );
}

export default App;
