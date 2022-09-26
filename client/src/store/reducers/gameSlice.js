import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { gameLevel, toastType } from "../../config/enums";
import axios from "axios";
import constants from "../../config/constants";

export const getTopScore = createAsyncThunk(
  "game/getTopScore",
  async (level) => {
    try {
      const res = await axios.get(
        `${constants.API_URL}/api/${constants.API_VERISON}/scores/${level}`
      );

      return res.data.data;
    } catch (error) {
      console.log(error);
    }
  }
);

/**
 * Check kết quả từ BE
 * Created by: linhpv (01/09/2022)
 */
export const checkSolution = createAsyncThunk(
  "game/checkSolution",
  async (formData, { rejectWithValue }) => {
    try {
      await axios.post(
        `${constants.API_URL}/api/${constants.API_VERISON}/missions`,
        formData
      );

      return formData;
    } catch (error) {
      return rejectWithValue(error.response.data.msg);
    }
  }
);

/**
 * Lấy câu hỏi từ BE
 * Created by: linhpv (29/08/2022)
 */
export const getMission = createAsyncThunk("game/setMission", async (level) => {
  try {
    const res = await axios.get(
      `${constants.API_URL}/api/${constants.API_VERISON}/missions/${level}`
    );

    return res.data;
  } catch (error) {
    console.log(error);
  }
});

const gameSlice = createSlice({
  name: "game",
  initialState: {
    isDarkMode: false, // Trạng thái chế độ tối
    username: "", // Tên người chơi
    level: gameLevel.easy, // Mức độ game
    mission: null, // Đề bài
    tmpMission: null, // Đề bài copy
    isLoadingMission: false, // Trạng thái load đề bài
    isPause: false, // Trang thái dừng trò chơi
    selectedPos: {
      col: -1,
      row: -1,
    }, // Vị trí đc chọn
    selectedNum: -1, // Số đang chọn
    isShowResult: false, // Trạng thái hiển thị kết quả
    isCheckSolution: false, // Trạng thái kiểm tra kết quả
    result: null, // Kết quả
    toastInfo: {
      type: toastType.success,
      msg: "",
    }, // Thông tin của toast
    isShowToast: false, // Trạng thái hiển thị toast
    topScores: [], // Danh sách điểm cao
    isNote: false, // Chế độ ghi chú
    numPress: null, // Số được người dùng ấn từ bàn phím
  },
  reducers: {
    /**
     * Cập nhật trạng thái ghi chú
     * @param {*} state
     * @param {*} action
     * Created by: linhpv (25/09/2022)
     */
    setNoteState(state, action) {
      state.isNote = action.payload;
    },
    /**
     * Bật tắt chế độ ghi chú
     * @param {*} state
     * Created by: linhpv (24/09/2022)
     */
    toggleNoteState(state) {
      state.isNote = !state.isNote;
      state.numPress = null;
    },
    /**
     * Cập nhật thông tin của toast
     * @param {*} state
     * @param {*} action
     * Created by: linhpv (02/09/2022)
     */
    setToastInfo(state, action) {
      state.toastInfo = action.payload;
    },
    /**
     * Cập nhật trạng thái hiển thị toast
     * @param {*} state
     * @param {*} action
     * Created by: linhpv (02/09/2022)
     */
    setShowToastState(state, action) {
      state.isShowToast = action.payload;
    },
    /**
     * Cập nhật trang thái show kết quả
     * @param {*} state
     * @param {*} action
     * Created by: linhpv (01/09/2022)
     */
    setShowResultState(state, action) {
      state.isShowResult = action.payload;
    },
    /**
     * Cập nhật trạng thái pause
     * @param {*} state
     * @param {*} action
     * Created by: linhpv (01/09/2022)
     */
    setPauseState(state, action) {
      state.isPause = action.payload;
    },
    /**
     * Cập nhật bảng trò chơi tạm
     * @param {*} state
     * @param {*} action
     * Created by: linhpv (31/09/2022)
     */
    updateTmpMission(state, action) {
      state.numPress = action.payload;
      if (!state.isNote) {
        state.tmpMission = state.tmpMission.map((row, i) => {
          if (i === state.selectedPos.row) {
            return row.map((cell, j) => {
              if (j === state.selectedPos.col) {
                return action.payload;
              }
              return cell;
            });
          }
          return row;
        });
        state.selectedNum = action.payload !== 0 ? action.payload : -1;
      } else {
        state.tmpMission = state.tmpMission.map((row, i) => {
          if (i === state.selectedPos.row) {
            return row.map((cell, j) => {
              if (j === state.selectedPos.col) {
                return 0;
              }
              return cell;
            });
          }
          return row;
        });
        state.selectedNum = -1;
      }
    },
    /**
     * Set số được chọn
     * @param {*} state
     * @param {*} action
     * Created by: linhpv (31/08/2022)
     */
    setSelectedNum(state, action) {
      state.selectedNum = action.payload;
      state.numPress = null;
    },
    /**
     * Set vị trí ô đang chọn
     * @param {*} state
     * @param {*} action
     * Created by: linhpv (31/08/2022)
     */
    setSelectedPos(state, action) {
      state.selectedPos = action.payload;
    },
    /**
     * Cập nhật level game
     * @param {*} state
     * @param {*} action
     * Created by: linhpv (28/08/2022)
     */
    setGameLevel(state, action) {
      state.level = action.payload;
    },
    /**
     * Đăt username
     * @param {*} state
     * @param {*} action
     * Created by: linhpv (27/08/2022)
     */
    setUsername(state, action) {
      state.username = action.payload;
    },
    /**
     * Cập nhật trạng thái dark mode
     * @param {*} state state
     * Created by: linhpv (26/08/2022)
     */
    toggleDarkMode(state) {
      state.isDarkMode = !state.isDarkMode;
    },
  },
  extraReducers: {
    [getTopScore.fulfilled]: (state, action) => {
      state.topScores = action.payload;
    },
    [checkSolution.pending]: (state) => {
      state.isPause = true;
      state.isCheckSolution = true;
    },
    [checkSolution.fulfilled]: (state, action) => {
      state.result = action.payload;
      state.isShowResult = true;
      state.isCheckSolution = false;
    },
    [checkSolution.rejected]: (state, action) => {
      state.isPause = false;
      state.toastInfo = {
        type: toastType.warning,
        msg: action.payload,
      };
      state.isShowToast = true;
      state.isCheckSolution = false;
    },
    [getMission.pending]: (state) => {
      state.isLoadingMission = true;
    },
    [getMission.fulfilled]: (state, action) => {
      state.mission = action.payload.data;
      state.tmpMission = action.payload.data;
      state.isLoadingMission = false;
    },
  },
});

// Reducer
const gameReducer = gameSlice.reducer;

// Selector
export const gameSelector = (state) => state.gameReducer;

// Action
export const {
  setToastInfo,
  setShowToastState,
  toggleDarkMode,
  setUsername,
  setGameLevel,
  setSelectedPos,
  setSelectedNum,
  updateTmpMission,
  setPauseState,
  setShowResultState,
  toggleNoteState,
  setNoteState,
} = gameSlice.actions;

export default gameReducer;
