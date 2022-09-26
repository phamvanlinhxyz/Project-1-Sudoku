import React from "react";
import styles from "./TopScore.module.scss";
import clsx from "clsx";
import { useSelector } from "react-redux";
import { gameSelector } from "../../../../store/reducers/gameSlice";
import moment from "moment";

const TopScore = () => {
  const { topScores } = useSelector(gameSelector);

  return (
    <div className={styles.topScore}>
      <h3 className={styles.topScoreTitle}>Danh sách điểm cao</h3>
      {topScores.map((score, index) => {
        return (
          <div
            className={clsx(styles.scoreItem, {
              [styles.first]: index === 0,
              [styles.second]: index === 1,
              [styles.third]: index === 2,
            })}
            key={index}
          >
            <div className={styles.scoreIndex}>{index + 1}</div>
            <div className={styles.scoreInfo}>
              <div className={styles.username}>{score.username}</div>
              <div className={styles.solveTime}>
                {moment.utc(score.solveTime * 1000).format("mm:ss")}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TopScore;
