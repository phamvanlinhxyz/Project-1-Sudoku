import clsx from "clsx";
import React from "react";
import styles from "./Result.module.scss";
import { FiClock, FiTrendingUp, FiUser } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import {
  gameSelector,
  setPauseState,
  setShowResultState,
} from "../../../../store/reducers/gameSlice";
import { gameLevel } from "../../../../config/enums";
import moment from "moment";
import { useNavigate } from "react-router";
import winFlags from "../../../../assets/images/win-flags.png";

const Result = () => {
  const { result } = useSelector(gameSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /**
   * Sự hiện click trò chơi mới
   * Created by: linhpv (01/09/2022)
   */
  const handleNewGame = () => {
    // Tắt bảng kết quả
    dispatch(setShowResultState(false));
    // Tắt trạng thái tạm dừng
    dispatch(setPauseState(false));
    // Redirect về trang chủ
    navigate("/");
  };

  return (
    <div className={clsx(styles.resultPage, styles.resultExactly)}>
      <div className={styles.resultFlags}>
        <img src={winFlags} alt="Cờ chính xác" />
      </div>
      <div className={styles.result}>
        <div className={styles.resultTitle}>Chính xác!</div>
        <div className={styles.resultInfo}>
          <div className={styles.resultInfoItem}>
            <div className={styles.resultInfoLabel}>
              <FiUser /> Người chơi
            </div>
            <div className={styles.resultInfoValue}>{result.username}</div>
          </div>
          <div className={styles.resultInfoItem}>
            <div className={styles.resultInfoLabel}>
              <FiTrendingUp /> Mức độ
            </div>
            <div className={styles.resultInfoValue}>
              {result.level === gameLevel.hard
                ? "Khó"
                : result.level === gameLevel.medium
                ? "Trung bình"
                : "Dễ"}
            </div>
          </div>
          <div className={styles.resultInfoItem}>
            <div className={styles.resultInfoLabel}>
              <FiClock /> Thời gian
            </div>
            <div className={styles.resultInfoValue}>
              {moment.utc(result.solveTime * 1000).format("HH:mm:ss")}
            </div>
          </div>
        </div>
        <div className={styles.resultButtonGr}>
          <button
            className={styles.resultButton}
            onClick={handleNewGame}
            title="Trò chơi mới"
          >
            Trò chơi mới
          </button>
        </div>
      </div>
    </div>
  );
};

export default Result;
