import { GridList, Heading } from "@components/common";
import { Category } from "@components/eCommerce";
import { Loading } from "@components/feedback";
import useCategories from "@hooks/useCategories";
import { TCategory } from "@types";

export default function Categories() {
  const { loading, error, records } = useCategories();
  return (
    <>
      <Heading title="Categories" />
      <Loading status={loading} error={error} type="category">
        <GridList<TCategory>
          emptyMessage="No categories found"
          records={records}
          render={(record) => <Category {...record} />}
        />
      </Loading>
    </>
  );
}
