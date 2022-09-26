import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import styles from "./StartPage.module.scss";
import {
  gameSelector,
  getMission,
  getTopScore,
  setGameLevel,
  setShowToastState,
  setToastInfo,
  setUsername,
} from "../../../store/reducers/gameSlice";
import { gameLevel, toastType } from "../../../config/enums";

const StartPage = () => {
  /**
   * Hook
   * isDispatch
   */
  const dispatch = useDispatch();
  // useState
  const [inputTitle, setInputTitle] = useState(""); // Title ô input
  const [name, setName] = useState(""); // Tên người dùng nhập vào
  const [valid, setValid] = useState(true); // Tên hợp lệ
  const [levelName, setLevelName] = useState(""); // Tên mức độ
  // useNavigate
  const navigate = useNavigate();
  // useSelector
  const { username, level } = useSelector(gameSelector);
  // useEffect
  useEffect(() => {
    setName(username);
  }, [username]);
  useEffect(() => {
    if (level === gameLevel.hard) {
      setLevelName("Khó");
    } else if (level === gameLevel.medium) {
      setLevelName("Trung bình");
    } else {
      setLevelName("Dễ");
    }
  }, [level]);
  // useRef
  const inputNameRef = useRef();

  /**
   * Thay đổi mức độ game
   * Created by: linhpv (27/08/2022)
   */
  const handleChangeLevel = () => {
    let gl = gameLevel.easy;
    switch (level) {
      case gameLevel.easy:
        gl = gameLevel.medium;
        break;
      case gameLevel.medium:
        gl = gameLevel.hard;
        break;
      case gameLevel.hard:
        gl = gameLevel.easy;
        break;
      default:
        break;
    }
    dispatch(setGameLevel(gl));
  };

  /**
   * Sự kiện nhập tên người dùng
   * @param {*} e
   * Created by: linhpv (28/08/2022)
   */
  const handleInputUsername = (e) => {
    // Check input có trống hay không
    if (e.target.value) {
      // Set title trống và valid true
      setInputTitle("");
      setValid(true);
    } else {
      setInputTitle("Tên người dùng không được để trống");
      setValid(false);
    }
    // Set tên user
    setName(e.target.value);
  };

  /**
   * Bắt đầu trò chơi mới
   * Created by: linhpv (27/08/2022)
   */
  const handleStartGame = () => {
    // Check tên người chơi để trống
    if (!name) {
      // Set các state của ô input
      setInputTitle("Tên người chơi không được để trống.");
      setValid(false);
      // Hiển thị toast
      dispatch(
        setToastInfo({
          type: toastType.danger,
          msg: "Tên người chơi không được để trống.",
        })
      );
      dispatch(setShowToastState(true));
      // Focus vào ô input
      inputNameRef.current.focus();
    } else {
      // Lưu tên lưu tên người chơi
      dispatch(setUsername(name));
      // Lấy trò chơi mới
      dispatch(getMission(level));
      // Lấy danh sách top điểm
      dispatch(getTopScore(level));
      // Redirect đến trang trò chơi
      navigate("/play");
    }
  };

  return (
    <div className={styles.startPage}>
      <input
        className={clsx(styles.startPageInput, {
          [styles.inputError]: !valid,
        })}
        title={inputTitle}
        type="text"
        maxLength={18}
        value={name}
        onChange={handleInputUsername}
        ref={inputNameRef}
        placeholder="Tên của bạn"
      />
      <button className={styles.startPageButton} onClick={handleChangeLevel}>
        Mức độ: {levelName}
      </button>
      <button
        className={clsx(styles.startPageButton, styles.buttonStart)}
        onClick={handleStartGame}
      >
        Trò chơi mới
      </button>
    </div>
  );
};

export default StartPage;
