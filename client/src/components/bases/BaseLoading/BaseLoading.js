import React from "react";
import styles from "./BaseLoading.module.scss";
import lightLoading from "../../../assets/images/light-loading.gif";
import darkLoading from "../../../assets/images/dark-loading.gif";
import { useSelector } from "react-redux";
import { gameSelector } from "../../../store/reducers/gameSlice";

const BaseLoading = () => {
  const { isDarkMode } = useSelector(gameSelector);

  return (
    <div className={styles.baseLoadingBG}>
      <img
        className={styles.baseLoading}
        src={isDarkMode ? darkLoading : lightLoading}
        alt="Loading..."
      />
    </div>
  );
};

export default BaseLoading;
