import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, TSignUp } from "@validations/signUpSchema";
import useCheckEmailAvailability from "@hooks/useCheckEmailAvailability";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actAuthRegister, resetUI } from "@store/auth/authSlice";

const useRegister = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, error, accessToken } = useAppSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    getFieldState,
    trigger,
    formState: { errors: formErrors },
  } = useForm<TSignUp>({
    mode: "onBlur",
    resolver: zodResolver(signUpSchema),
  });

  useEffect(() => {
    return () => {
      dispatch(resetUI());
    };
  }, [dispatch]);

  const {
    emailAvailabilityStatus,
    enteredEmail,
    checkEmailAvailability,
    resetEmailAvailabilityStatus,
  } = useCheckEmailAvailability();

  const onSubmit: SubmitHandler<TSignUp> = async (data) => {
    const { firstName, lastName, email, password } = data;
    dispatch(actAuthRegister({ firstName, lastName, email, password }))
      .unwrap()
      .then(() => {
        navigate("/login?message=account_created");
      });
  };

  const emailOnBlurHandler = async (e: React.FocusEvent<HTMLInputElement>) => {
    await trigger("email");
    const value = e.target.value;
    const { invalid, isDirty } = getFieldState("email");
    if (isDirty && !invalid && enteredEmail !== value) {
      // check ava
      checkEmailAvailability(value);
    }
    if (isDirty && invalid && enteredEmail) {
      resetEmailAvailabilityStatus();
    }
  };

  return {
    loading,
    error,
    accessToken,
    formErrors,
    register,
    handleSubmit,
    emailAvailabilityStatus,
    onSubmit,
    emailOnBlurHandler,
  };
};

export default useRegister;
