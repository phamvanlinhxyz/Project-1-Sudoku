import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
  gameSelector,
  setNoteState,
  setPauseState,
} from "../../../store/reducers/gameSlice";
import BaseLoading from "../../bases/BaseLoading";
import GameControl from "./GameControl";
import TopScore from "./TopScore";
import Grid from "./Grid";
import styles from "./PlayPage.module.scss";
import Result from "./Result";

const PlayPage = () => {
  const { isLoadingMission, mission, isPause, isShowResult } =
    useSelector(gameSelector);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoadingMission && !mission) {
      navigate("/");
    }
  }, [mission, isLoadingMission, navigate]);

  useEffect(() => {
    dispatch(setPauseState(false));
    dispatch(setNoteState(false));
  }, [dispatch]);

  return (
    <>
      {isLoadingMission ? (
        <BaseLoading />
      ) : (
        <div className={styles.playPage}>
          <div className={styles.playPageLeft}>
            {isShowResult && <Result />}
            {isPause && <BaseLoading />}
            <Grid />
          </div>
          <div className={styles.playPageRight}>
            <GameControl />
            <TopScore />
          </div>
        </div>
      )}
    </>
  );
};

export default PlayPage;
