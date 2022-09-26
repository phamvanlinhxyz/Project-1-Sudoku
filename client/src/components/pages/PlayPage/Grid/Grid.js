import React, { useEffect, useState } from "react";
import styles from "./Grid.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  gameSelector,
  setSelectedNum,
  setSelectedPos,
  updateTmpMission,
} from "../../../../store/reducers/gameSlice";
import Cell from "../Cell";
import constants from "../../../../config/constants";

const Grid = () => {
  // useSelector
  const { mission, selectedPos, selectedNum, tmpMission, numPress } =
    useSelector(gameSelector);

  // useDispatch
  const dispatch = useDispatch();

  // useEffect
  useEffect(() => {
    dispatch(setSelectedNum(-1));
    dispatch(
      setSelectedPos({
        row: -1,
        col: -1,
      })
    );
  }, [dispatch]);

  // useState
  const [flag, setFlag] = useState(true);

  /**
   * Check ô số nhập vào hợp lệ
   * @param {*} row hàng
   * @param {*} col cột
   * @param {*} num số
   * @returns true nếu sai - false nếu đúng
   */
  const checkCellError = (row, col, num) => {
    // Check num khác 0 và không phải ô gốc
    if (num !== constants.UNASSIGNED && mission[row][col] !== num) {
      // Check theo hàng, cột
      for (let i = 0; i < 9; i++) {
        if (i !== col) {
          if (tmpMission[row][i] === num) return true;
        }
        if (i !== row) {
          if (tmpMission[i][col] === num) return true;
        }
      }
      // Check theo box
      let boxRow = Math.floor(row / constants.BOX_SIZE);
      let boxCol = Math.floor(col / constants.BOX_SIZE);
      for (let i = 0; i < constants.BOX_SIZE; i++) {
        for (let j = 0; j < constants.BOX_SIZE; j++) {
          if (
            row !== i + boxRow * constants.BOX_SIZE ||
            col !== j + boxCol * constants.BOX_SIZE
          ) {
            if (
              tmpMission[i + boxRow * constants.BOX_SIZE][
                j + boxCol * constants.BOX_SIZE
              ] === num
            )
              return true;
          }
        }
      }
    }
    return false;
  };

  /**
   * Sự kiện người dùng nhập số từ bàn phím
   * @param {*} e
   * Created by: linhpv (29/08/2022)
   */
  const handleKeydown = (e) => {
    let key = e.key;
    let regex = /[1-9]/;
    if (selectedPos.row >= 0 && selectedPos.col >= 0) {
      if (
        (isNaN(mission[selectedPos.row][selectedPos.col]) ||
          mission[selectedPos.row][selectedPos.col] <= 0) &&
        key.match(regex)
      ) {
        if (parseInt(key) === numPress) {
          setFlag((prev) => !prev);
        }
        dispatch(updateTmpMission(parseInt(key)));
      } else if (key === "Delete" || key === "Backspace") {
        dispatch(updateTmpMission(0));
      }
    }
  };

  /**
   * Sự kiện click vào một ô trong bảng
   * @param {*} e event
   * @param {*} i vị trí hàng
   * @param {*} j vị trí cột
   * Created by: linhpv (29/08/2022)
   */
  const handleClickCell = (e, i, j) => {
    // Set vị trí đang select
    dispatch(
      setSelectedPos({
        row: i,
        col: j,
      })
    );

    // Nếu có số thì set số đang chọn
    dispatch(setSelectedNum(parseInt(e.target.textContent)));
  };

  return (
    <div className={styles.grid}>
      {tmpMission &&
        tmpMission.map((row, i) => {
          return (
            <div className={styles.gridRow} key={i}>
              {row.map((cell, j) => {
                return (
                  <div
                    className={styles.gridCellWrap}
                    key={j}
                    tabIndex="0"
                    onClick={(event) => handleClickCell(event, i, j)}
                    onKeyDown={(event) => handleKeydown(event)}
                  >
                    {/* {!isPause && cell > 0 && cell} */}
                    <Cell
                      notDup={
                        selectedPos.row === i ||
                        selectedPos.col === j ||
                        (Math.floor(selectedPos.col / 3) ===
                          Math.floor(j / 3) &&
                          Math.floor(selectedPos.row / 3) === Math.floor(i / 3))
                      }
                      sameNum={cell === selectedNum}
                      selected={selectedPos.row === i && selectedPos.col === j}
                      fill={mission[i][j] !== tmpMission[i][j]}
                      error={checkCellError(i, j, tmpMission[i][j])}
                      flag={
                        selectedPos.row === i && selectedPos.col === j
                          ? flag
                          : null
                      }
                      numPress={
                        selectedPos.row === i && selectedPos.col === j
                          ? numPress
                          : null
                      }
                      empty={mission[i][j] === 0}
                    >
                      {cell}
                    </Cell>
                  </div>
                );
              })}
            </div>
          );
        })}
    </div>
  );
};

export default Grid;
