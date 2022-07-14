import React from "react";
import styles from "./Footer.module.css"



const Footer = () => {
  return (
    <div>
      <footer className={styles.footer}>
        <p>
          <span>Made with ❤️ by <a href="https://github.com/mateusleitao">Lange</a></span> @ 2022
          
        </p>
      </footer>
    </div>
  );
};

export default Footer;
