import React, { Suspense } from "react";
import LottieHandler from "../LottieHandler/LottieHandler";

const PageSuspenseFallBack = ({ children }: { children: React.ReactNode }) => {
  return (
    <Suspense
      fallback={
        <LottieHandler type="loading" message="loading please wait...." />
      }
    >
      {children}
    </Suspense>
  );
};

export default PageSuspenseFallBack;
