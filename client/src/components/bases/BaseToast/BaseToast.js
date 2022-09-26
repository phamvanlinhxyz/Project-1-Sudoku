import React, { useEffect } from "react";
import styles from "./BaseToast.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  gameSelector,
  setShowToastState,
} from "../../../store/reducers/gameSlice";
import {
  FiAlertTriangle,
  FiCheckCircle,
  FiHelpCircle,
  FiX,
  FiXCircle,
} from "react-icons/fi";
import { toastType } from "../../../config/enums";
import clsx from "clsx";

const BaseToast = () => {
  const { toastInfo, isShowToast } = useSelector(gameSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isShowToast) {
      const timeout = setTimeout(() => {
        dispatch(setShowToastState(false));
      }, 1500);

      return () => clearTimeout(timeout);
    }
  }, [isShowToast, dispatch]);

  const toastIcon =
    toastInfo.type === toastType.success ? (
      <FiCheckCircle />
    ) : toastInfo.type === toastType.danger ? (
      <FiXCircle />
    ) : toastInfo.type === toastType.question ? (
      <FiHelpCircle />
    ) : toastInfo.type === toastType.warning ? (
      <FiAlertTriangle />
    ) : null;

  const toastClass =
    toastInfo.type === toastType.success
      ? "toastSuccess"
      : toastInfo.type === toastType.danger
      ? "toastDanger"
      : toastInfo.type === toastType.question
      ? "toastQuestion"
      : toastInfo.type === toastType.warning
      ? "toastWarning"
      : null;

  /**
   * Sự kiện click đóng toast
   * Created by: linhpv (02/09/2022)
   */
  const handleCloseToast = () => {
    dispatch(setShowToastState(false));
  };

  return (
    <div
      className={clsx(styles.baseToast, styles[toastClass], {
        [styles.showToast]: isShowToast,
      })}
    >
      <div className={styles.toastContent}>
        <div className={styles.toastIcon}>{toastIcon}</div>
        <div className={styles.toastMsg}>{toastInfo.msg}</div>
      </div>
      <div className={styles.toastX} onClick={handleCloseToast}>
        <FiX />
      </div>
    </div>
  );
};

export default BaseToast;
