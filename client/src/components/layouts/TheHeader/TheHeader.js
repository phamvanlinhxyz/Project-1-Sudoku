import React from "react";
import { FiSun, FiMoon } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import styles from "./TheHeader.module.scss";
import {
  gameSelector,
  toggleDarkMode,
} from "../../../store/reducers/gameSlice";

const TheHeader = () => {
  // Dispatch, selector
  const dispatch = useDispatch();
  const { isDarkMode } = useSelector(gameSelector);

  const handleClickIcon = () => {
    dispatch(toggleDarkMode());
  };

  return (
    <div className={styles.theHeader}>
      <div className={styles.headerContent}>
        <div className={styles.headerContentLeft}>
          <Link to="/">
            Sudoku <span>Game</span>
          </Link>
        </div>
        <div className={styles.headerContentRight} onClick={handleClickIcon}>
          {isDarkMode && <FiSun />}
          {!isDarkMode && <FiMoon />}
        </div>
      </div>
    </div>
  );
};

export default TheHeader;
