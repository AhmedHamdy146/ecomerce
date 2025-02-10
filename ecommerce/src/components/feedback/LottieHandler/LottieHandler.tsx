import Lottie from "lottie-react";
import notFound404 from "@assets/LottieFiles/NotFound404.json";
import empty from "@assets/LottieFiles/empty.json";
import error from "@assets/LottieFiles/error.json";
import loading from "@assets/LottieFiles/loading.json";

const lottieFiles = {
  notFound404,
  empty,
  error,
  loading,
};

type TLottieHandlerProps = {
  type: keyof typeof lottieFiles;
  message?: string;
  className?: string;
};

const LottieHandler = ({ type, message, className }: TLottieHandlerProps) => {
  const lottie = lottieFiles[type];
  const messageStyle =
    type === "error"
      ? { fontSize: "19px", color: "red" }
      : { fontSize: "19px", marginTop: "30px" };
  return (
    <div className={`d-flex flex-column align-items-center ${className}`}>
      <Lottie animationData={lottie} style={{ width: "400px" }} />
      {message && <h1 style={messageStyle}>{message}</h1>}
    </div>
  );
};

export default LottieHandler;
