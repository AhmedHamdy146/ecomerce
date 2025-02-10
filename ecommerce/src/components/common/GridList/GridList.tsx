import { LottieHandler } from "@components/feedback";
import { Col, Row } from "react-bootstrap";

type TProps<T> = {
  records: T[];
  render: (record: T) => React.ReactNode;
  emptyMessage: string;
};

type HasID = { id?: number };

const GridList = <T extends HasID>({
  records,
  render,
  emptyMessage,
}: TProps<T>) => {
  const categoriesList =
    records.length > 0 ? (
      records.map((record) => (
        <Col
          xs={6}
          md={3}
          key={record.id}
          className="d-flex justify-content-center mb-5 mt-2"
        >
          {render(record)}
        </Col>
      ))
    ) : (
      <Col>
        <LottieHandler type="empty" message={emptyMessage} />
      </Col>
    );

  return <Row>{categoriesList}</Row>;
};

export default GridList;
