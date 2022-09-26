const { sudoku } = require("../utils/constants");
const { gameLevel } = require("../utils/enums");

/**
 * Lấy số random
 * @returns số random
 * Created by: linhpv (21/08/2022)
 */
const rand = () => Math.floor(Math.random() * sudoku.GRID_SIZE);

/**
 * Sinh ra mảng trò chơi
 * @param {*} arr mảng đáp án
 * @param {*} level số ô trống
 * @returns mảng khi đã được thêm ô trống
 * Created by: linhpv (21/08/2022)
 */
const removeCells = (arr, level) => {
  // Copy mảng arr
  let res = new Array(sudoku.GRID_SIZE);
  for (let i = 0; i < sudoku.GRID_SIZE; i++) {
    res[i] = new Array(sudoku.GRID_SIZE);
  }

  for (let i = 0; i < sudoku.GRID_SIZE; i++) {
    for (let j = 0; j < sudoku.GRID_SIZE; j++) {
      res[i][j] = arr[i][j];
    }
  }

  // Thêm các ô trống
  let attemps = level;
  while (attemps > 0) {
    let row = rand();
    let col = rand();
    while (res[row][col] === 0) {
      row = rand();
      col = rand();
    }
    res[row][col] = sudoku.UNASSIGNED;
    attemps--;
  }

  return res;
};

/**
 * Kiểm tra mảng đã được điền hết số hay chưa
 * @param {*} arr mảng
 * @returns true - nếu đủ, false - nếu chưa
 * Created by: linhpv (21/08/2022)
 */
const isFullArr = (arr) => {
  return arr.every((row, i) => {
    return row.every((value, j) => {
      return value !== sudoku.UNASSIGNED;
    });
  });
};

/**
 * Kiểm tra vị trí có phù hợp với số được truyền vào hay không
 * @param {*} arr chuỗi đề bài đang tạo
 * @param {*} index vị trí đang cần thêm số
 * @param {*} number số cần kiểm tra
 * @returns true - nếu hợp lệ, false - nếu không hợp lệ
 * Created by: linhpv (21/08/2022)
 */
const isValid = (arr, row, col, number) => {
  // 1. Check hợp lệ theo hàng và cột
  for (let i = 0; i < sudoku.GRID_SIZE; i++) {
    // Check theo hàng
    if (i !== col) {
      if (arr[row][i] === number) return false;
    }

    // Check theo cột
    if (i !== row) {
      if (arr[i][col] === number) return false;
    }
  }

  // 2. Check hợp lệ theo ô vuông
  let boxRow = Math.floor(row / sudoku.BOX_SIZE);
  let boxCol = Math.floor(col / sudoku.BOX_SIZE);
  for (let i = 0; i < sudoku.BOX_SIZE; i++) {
    for (let j = 0; j < sudoku.BOX_SIZE; j++) {
      if (
        row !== i + boxRow * sudoku.BOX_SIZE ||
        col !== j + boxCol * sudoku.BOX_SIZE
      ) {
        if (
          arr[i + boxRow * sudoku.BOX_SIZE][j + boxCol * sudoku.BOX_SIZE] ===
          number
        )
          return false;
      }
    }
  }

  // Nếu không có vấn đề gì => Trả về true
  return true;
};

/**
 * Tạo một mảng từ 1 đến 9 đã được trộn
 * @returns mảng đã trộn
 * Created by: linhpv (21/08/2022)
 */
const createShuffleArray = () => {
  // Tạo mảng từ 1 -> 9
  var newArray = [];
  for (let i = 1; i <= sudoku.GRID_SIZE; i++) {
    newArray.push(i);
  }

  // Trộn mảng vừa tạo
  let currIndex = newArray.length;
  while (currIndex !== 0) {
    // Lấy một vị trí ngẫu nhiên nhỏ hơn vị trí hiện tại
    let randIndex = Math.floor(Math.random() * currIndex);
    currIndex -= 1;

    // Đổi vị trí 2 số theo vị trí như trên
    let temp = newArray[currIndex];
    newArray[currIndex] = newArray[randIndex];
    newArray[randIndex] = temp;
  }

  return newArray;
};

/**
 * Tìm vị trí trống và gán vào pos
 * @param {*} arr mảng trò chơi
 * @param {*} pos object vị trí trống
 * @returns true - nếu có vị trí trống, false nếu tất cả đã được điền
 */
const findUnassignedPos = (arr, pos) => {
  for (let row = 0; row < sudoku.GRID_SIZE; row++) {
    for (let col = 0; col < sudoku.GRID_SIZE; col++) {
      if (arr[row][col] === sudoku.UNASSIGNED) {
        pos.row = row;
        pos.col = col;
        return true;
      }
    }
  }

  return false;
};

/**
 * Tạo kết quả của trò chơi
 * @param {*} arr mảng ban đầu
 * @returns true - tạo thành công, false - tạo thất bại
 */
const createSolution = (arr) => {
  // Vị trí trống ban đầu
  let unassignedPos = {
    row: -1,
    col: -1,
  };

  // Nếu không còn vị trí nào trống thì return true
  // Cập nhật vị trí trống
  if (!findUnassignedPos(arr, unassignedPos)) return true;

  // Tạo một array số ngẫu nhiên
  const shuffleArray = createShuffleArray();

  // Gán vị trí cần điền số
  let row = unassignedPos.row;
  let col = unassignedPos.col;

  // Duyệt từng phần tử trong shuffle
  shuffleArray.forEach((num) => {
    //Nếu num hợp lệ thì gán vào vị trí unassigned
    if (isValid(arr, row, col, num)) {
      arr[row][col] = num;

      // Kiểm tra các ô đã được điền số hết hay chưa
      if (isFullArr(arr)) {
        return true;
      } else {
        if (createSolution(arr)) {
          return true;
        }
      }

      // Nếu không có kết quả hợp lệ => gán lại bằng 0 và tiếp tục for
      arr[row][col] = sudoku.UNASSIGNED;
    }
  });

  // Nếu các ô số đã được điền hết thì return true
  return isFullArr(arr);
};

/**
 * Tạo mảng mới theo kích thước
 * @param {*} size kích thước hàng và cột
 * @returns Mảng ban đầu
 * Created by: linhpv (21/08/2022)
 */
const createArray = (size) => {
  let newArr = new Array(size);

  for (let i = 0; i < size; i++) {
    newArr[i] = new Array(size);
    for (let j = 0; j < size; j++) {
      newArr[i][j] = sudoku.UNASSIGNED;
    }
  }

  return newArr;
};

/**
 * Sinh câu hỏi mới
 * @returns câu hỏi mới
 * Created by: linhpv (20/08/2022)
 */
const getMissionService = (level) => {
  // Đặt kích thước mặc định
  const size = sudoku.GRID_SIZE;
  // Tạo mảng câu hỏi mới
  var newArr = createArray(size);

  // Sinh ra mảng kết quả mới
  var isSuccess = createSolution(newArr);
  while (!isSuccess) {
    isSuccess = createSolution(newArr);
  }

  // Sinh ra đề bài
  // Check level
  level = parseInt(level);
  let sudokuLevel = sudoku.EASY_LEVEL;

  switch (level) {
    case gameLevel.EASY:
      sudokuLevel = sudoku.EASY_LEVEL;
      break;
    case gameLevel.MEDIUM:
      sudokuLevel = sudoku.MEDIUM_LEVEL;
      break;
    case gameLevel.HARD:
      sudokuLevel = sudoku.HARD_LEVEL;
      break;
    default:
      sudokuLevel = sudoku.EASY_LEVEL;
      break;
  }

  const mission = removeCells(newArr, sudokuLevel);

  return mission;
};

/**
 * Kiểm tra lời giải đúng không
 * @param {*} solution lời giải
 * @returns true - nếu đúng, false - nếu sai
 * Created by: linhpv (20/08/2022)
 */
const checkSolutionService = (solution) => {
  // Khởi tạo ô trống ban đầu
  var unassignedPos = {
    row: -1,
    col: -1,
  };

  // Kiểm tra các ô đã full hay chưa => nếu chưa return false
  if (findUnassignedPos(solution, unassignedPos)) return false;

  // Kiểm tra các ô thỏa mãn hay không
  for (let row = 0; row < sudoku.GRID_SIZE; row++) {
    for (let col = 0; col < sudoku.GRID_SIZE; col++) {
      if (!isValid(solution, row, col, solution[row][col])) {
        return false;
      }
    }
  }

  return true;
};

module.exports = {
  getMissionService,
  checkSolutionService,
};
