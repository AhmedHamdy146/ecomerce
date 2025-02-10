import { GridList, Heading } from "@components/common";
import { Loading } from "@components/feedback";

import { Product } from "@components/eCommerce";
import useWishlist from "@hooks/useWishlist";
import { TProduct } from "@types";

const Wishlist = () => {
  const { loading, error, records } = useWishlist();
  return (
    <div>
      <Heading title="Your Wishlist" />
      <Loading status={loading} error={error} type="product">
        <GridList<TProduct>
          emptyMessage="No products found"
          records={records}
          render={(record) => <Product {...record} />}
        />
      </Loading>
    </div>
  );
};

export default Wishlist;
