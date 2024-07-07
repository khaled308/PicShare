import { GoogleLoginButton } from "react-social-login-buttons";
import { useGoogleLogin } from "@react-oauth/google";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { googleLoginService } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const GoogleLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, error, success } = useSelector((state) => state.auth);
  const googleLogin = useGoogleLogin({
    onSuccess: async (response) => {
      //   const res = await axios.get(
      //     "https://www.googleapis.com/oauth2/v3/userinfo",
      //     {
      //       headers: { Authorization: `Bearer ${response.access_token}` },
      //     }
      //   );
      dispatch(googleLoginService({ token: response.access_token }));
    },
  });

  useEffect(() => {
    if (user && success) {
      navigate("/");
    }

    if (error) {
      toast.error(error);
    }
  }, [user, error, navigate, success]);
  return (
    <div className="mb-3" onClick={() => googleLogin()}>
      <GoogleLoginButton>Continue with Google</GoogleLoginButton>
    </div>
  );
};

export default GoogleLogin;
