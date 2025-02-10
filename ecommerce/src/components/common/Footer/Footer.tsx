import styles from "./styles.module.css";

const { footerContainer } = styles;

export default function Footer() {
  return (
    <footer className={footerContainer}>
      &copy; 2024 our eCom. All rights reserved
    </footer>
  );
}
