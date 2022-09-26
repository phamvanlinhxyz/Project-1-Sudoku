import React from "react";
import styles from "./TheContent.module.scss";
import { BaseToast } from "../../../components";

const TheContent = ({ children }) => {
  return (
    <div className={styles.theContent}>
      <div className={styles.theContentInner}>{children}</div>
      <BaseToast />
    </div>
  );
};

export default TheContent;
