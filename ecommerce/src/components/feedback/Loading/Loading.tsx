import CategorySkeleton from "../skeletons/CategorySkeleton/CategorySkeleton";
import ProductSkeleton from "../skeletons/ProductSkeleton/ProductSkeleton";
import CartSkeleton from "../skeletons/CartSkeleton/CartSkeleton";
import { TLoading } from "@types";
import LottieHandler from "../LottieHandler/LottieHandler";

// dynamic react component pattern
const skeletonTypes = {
  category: CategorySkeleton,
  product: ProductSkeleton,
  cart: CartSkeleton,
};

type ILoading = {
  status: TLoading;
  error: string | null;
  children: React.ReactNode;
  type: keyof typeof skeletonTypes;
};

const Loading = ({ status, error, children, type = "category" }: ILoading) => {
  const Component = skeletonTypes[type];
  if (status === "pending") {
    return <Component />;
  }

  if (status === "failed") {
    return (
      <div>
        <LottieHandler type="error" message={error as string} />
      </div>
    );
  }

  return <div>{children}</div>;
};

export default Loading;
