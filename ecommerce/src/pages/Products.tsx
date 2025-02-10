import { GridList, Heading } from "@components/common";
import { Product } from "@components/eCommerce";
import { Loading } from "@components/feedback";
import useProducts from "@hooks/useProducts";
import { TProduct } from "@types";

export default function Products() {
  const { loading, error, productsFullInfo, productPrefix } = useProducts();
  return (
    <>
      <Heading title={`${productPrefix?.toUpperCase()} Products`} />
      <Loading status={loading} error={error} type="product">
        <GridList<TProduct>
          emptyMessage="No products found"
          records={productsFullInfo}
          render={(record) => <Product {...record} />}
        />
      </Loading>
    </>
  );
}
