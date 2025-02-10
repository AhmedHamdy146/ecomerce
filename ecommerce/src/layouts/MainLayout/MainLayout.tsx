import { Container } from "react-bootstrap";
import styles from "./styles.module.css";
import { Header, Footer } from "@components/common";
import { Outlet } from "react-router-dom";

const { container, wrapper } = styles;
export default function MainLayout() {
  return (
    <Container className={container}>
      <Header />
      <main className={wrapper}>
        <Outlet />
      </main>
      <Footer />
    </Container>
  );
}
