import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actAuthLogin, resetUI } from "@store/auth/authSlice";
import { signInSchema, TSignIn } from "@validations/signInSchema";

const useLogin = () => {
  const dispatch = useAppDispatch();
  const { loading, error, accessToken } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const [searchParam, setSearchParam] = useSearchParams();

  useEffect(() => {
    return () => {
      dispatch(resetUI());
    };
  }, [dispatch]);

  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<TSignIn>({
    mode: "onBlur",
    resolver: zodResolver(signInSchema),
  });

  const onSubmit: SubmitHandler<TSignIn> = async (data) => {
    if (searchParam.get("message")) {
      setSearchParam("");
    }
    dispatch(actAuthLogin(data))
      .unwrap()
      .then(() => {
        navigate("/");
      });
  };

  return {
    loading,
    error,
    register,
    formErrors,
    onSubmit,
    handleSubmit,
    accessToken,
    searchParam,
  };
};

export default useLogin;
