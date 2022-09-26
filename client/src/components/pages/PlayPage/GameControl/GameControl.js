import React, { useEffect, useState } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { gameLevel } from "../../../../config/enums";
import {
  checkSolution,
  gameSelector,
  setPauseState,
  toggleNoteState,
  updateTmpMission,
} from "../../../../store/reducers/gameSlice";
import styles from "./GameControl.module.scss";

import { FiPause, FiPlay } from "react-icons/fi";
import clsx from "clsx";

const GameControl = () => {
  const dispatch = useDispatch();
  const {
    username,
    level,
    isPause,
    isLoadingMission,
    selectedPos,
    mission,
    tmpMission,
    isShowResult,
    isCheckSolution,
    isNote,
  } = useSelector(gameSelector);
  const navigate = useNavigate();
  const [second, setSecond] = useState(0);

  useEffect(() => {
    if (!isPause && !isLoadingMission) {
      const timer = setInterval(() => {
        setSecond((prev) => prev + 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isPause, isLoadingMission]);

  const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  /**
   * Xử lý sự kiện người dùng bấm ghi chú
   * Created by: linhpv (24/09/2022)
   */
  const handleNoteBtnClick = () => {
    dispatch(toggleNoteState());
  };

  /**
   * Người dùng ấn số trên bàn phím số ảo
   * Created by: linhpv (31/08/2022)
   */
  const handleClickNumPad = (num) => {
    if (!isShowResult && !isCheckSolution) {
      // Check vị trí đang chọn
      if (selectedPos.row >= 0 && selectedPos.col >= 0) {
        // Check vị trí đó có thay đổi được hay không
        if (
          isNaN(mission[selectedPos.row][selectedPos.col]) ||
          mission[selectedPos.row][selectedPos.col] <= 0
        ) {
          dispatch(updateTmpMission(num));
        }
      }
    }
  };

  /**
   * Xử lý sự kiện kiểm tra kết quả
   * Created by: linhpv (31/08/2022)
   */
  const handleCheckSolution = () => {
    if (!isShowResult && !isCheckSolution) {
      // Kiểm tra kết quả
      dispatch(
        checkSolution({
          solution: tmpMission,
          username: username,
          solveTime: second,
          level: level,
        })
      );
    }
  };

  /**
   * Người dùng ấn trò chơi mới
   * Created by: linhpv (31/08/2022)
   */
  const handleNewGame = () => {
    if (!isShowResult && !isCheckSolution) {
      dispatch(setPauseState(false));
      navigate("/");
    }
  };

  /**
   * Xự kiện người dùng ấn tạm dừng
   * Created by: linhpv (31/08/2022)
   */
  const handlePauseGame = () => {
    if (!isShowResult && !isCheckSolution) {
      // Cập nhật state trong redux
      dispatch(setPauseState(!isPause));
    }
  };

  return (
    <div
      className={clsx(styles.gameControl, {
        [styles.controlDisable]: isCheckSolution || isShowResult,
      })}
    >
      <div className={styles.gameInfo}>
        <div className={styles.username}>{username}</div>
        <div className={styles.level}>
          {level === gameLevel.hard
            ? "Khó"
            : level === gameLevel.medium
            ? "Trung bình"
            : "Dễ"}
        </div>
      </div>
      <div className={styles.controlButton}>
        <div className={styles.newGameButton} onClick={handleNewGame}>
          Trò chơi mới
        </div>
        <div className={styles.checkButton} onClick={handleCheckSolution}>
          Kiểm tra
        </div>
        <div
          className={clsx(styles.noteButton, {
            [styles.isNote]: isNote,
          })}
          onClick={handleNoteBtnClick}
        >
          Ghi chú
        </div>
        <div className={styles.pauseButton} onClick={handlePauseGame}>
          <span>{moment.utc(second * 1000).format("HH:mm:ss")}</span>
          <div className={styles.pauseIcon}>
            {isPause ? <FiPlay /> : <FiPause />}
          </div>
        </div>
      </div>
      <div className={styles.numPad}>
        {nums.map((num) => {
          return (
            <div
              className={styles.numPadItem}
              key={num}
              tabIndex="0"
              onClick={() => handleClickNumPad(num)}
            >
              {num}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GameControl;
