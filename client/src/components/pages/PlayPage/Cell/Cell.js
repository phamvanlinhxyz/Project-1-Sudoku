import clsx from "clsx";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { gameSelector } from "../../../../store/reducers/gameSlice";
import styles from "./Cell.module.scss";

const Cell = ({
  children,
  notDup,
  sameNum,
  selected,
  fill,
  error,
  flag,
  numPress,
  empty,
}) => {
  const { isPause, isNote } = useSelector(gameSelector);
  const [noteList, setNoteList] = useState({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false,
    8: false,
    9: false,
  });

  /**
   * Bắt sự kiện note các số
   * Created by: linhpv (17/09/2022)
   */
  useEffect(() => {
    // Check trạng thái note
    if (isNote && numPress !== null) {
      if (numPress !== 0) {
        setNoteList((prev) => ({ ...prev, [numPress]: !prev[numPress] }));
      } else {
        setNoteList({
          1: false,
          2: false,
          3: false,
          4: false,
          5: false,
          6: false,
          7: false,
          8: false,
          9: false,
        });
      }
    }
  }, [isNote, flag, numPress]);

  /**
   * Bắt sự kiện người dùng điền vào ô số thì reset lại noteList
   * Created by: linhpv (24/09/2022)
   */
  useEffect(() => {
    if (fill) {
      setNoteList({
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
        6: false,
        7: false,
        8: false,
        9: false,
      });
    }
  }, [fill]);

  // Ghi chú
  const noteElm = (
    <div className={styles.cellNoteList}>
      <div className={styles.cellNote}>{noteList[1] ? "1" : null}</div>
      <div className={styles.cellNote}>{noteList[2] ? "2" : null}</div>
      <div className={styles.cellNote}>{noteList[3] ? "3" : null}</div>
      <div className={styles.cellNote}>{noteList[4] ? "4" : null}</div>
      <div className={styles.cellNote}>{noteList[5] ? "5" : null}</div>
      <div className={styles.cellNote}>{noteList[6] ? "6" : null}</div>
      <div className={styles.cellNote}>{noteList[7] ? "7" : null}</div>
      <div className={styles.cellNote}>{noteList[8] ? "8" : null}</div>
      <div className={styles.cellNote}>{noteList[9] ? "9" : null}</div>
    </div>
  );

  return (
    <div
      className={
        isPause
          ? styles.gridCell
          : clsx(styles.gridCell, {
              [styles.gridCellNotDup]: notDup,
              [styles.gridCellSameNum]: sameNum,
              [styles.gridCellSelected]: selected,
              [styles.gridCellFill]: fill,
              [styles.gridCellError]: error,
            })
      }
    >
      {/* Nếu đã điền mà bật ghi chú thì vẫn hiện số đã đièn */}
      {!isPause && fill && children > 0 && children}
      {/* Nếu là ô ban đầu có thì luôn hiển thị */}
      {!isPause && !empty && children > 0 && children}
      {/* Nếu chưa điền mà có ghi chú thì hiển thị ghi chú */}
      {!isPause && empty && !fill && noteElm}
    </div>
  );
};

export default Cell;
