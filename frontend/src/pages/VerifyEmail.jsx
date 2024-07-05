import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import Loader from "../components/Loader";
import { useEffect } from "react";
import { verifyEmail } from "../api/authApi";

const VerifyEmail = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const token = query.get("token");
  const navigate = useNavigate();
  useEffect(() => {
    verifyEmail(token)
      .then((response) => {
        toast.success(response.message);
        navigate("/login");
      })
      .catch((error) => {
        toast.error(error.message);
        navigate("/login");
      });
  });
  return (
    <div className="flex items-center justify-center">
      <Loader />
    </div>
  );
};

export default VerifyEmail;
