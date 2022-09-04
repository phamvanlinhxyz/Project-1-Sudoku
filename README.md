# project-1-sudoku-game
## Về chúng tôi
Đề tài **Sudoku Game** được phát triển bởi **Phạm Văn Linh** sinh viên lớp **IT1-01 K64 Đại học Bách Khoa Hà Hội**. 

**Sudoku Game** giúp tôi tìm hiểu cách để tạo ra một game như sudoku bên cạnh đó cũng giúp bản thân cải thiện kỹ năng xây dựng trang web với ExpressJS, ReactJS và MongoDB.

Chúng tôi hoan nghênh những đóng góp của người dùng và các nhà phát triển khác để khắc phục những hạn chế của phiên bản hiện tại cũng như cải tiến phần mềm trong tương lai.

Mọi đóng góp và thắc mắc xin liên hệ:
- Email: linh.pv194094@sis.hust.edu.vn
- Điện thoại: 0944944996

## Tài liệu
Báo cáo của sản phẩm **Sudoku Game** [tại đây](https://github.com/phamvanlinhxyz/project-1-sudoku)

## Ngôn ngữ
- Trang web được xây dựng chủ yếu bởi ngôn ngữ ***Javascript***. 
- API được viết bởi framework ***ExpressJS***. 
- Giao diện được viết bằng ***ReactJS*** 
- Sử dụng ***MongoDB*** để lưu thông tin điểm của người chơi.

## Cài đặt
Để cài đặt và sử dụng phần mềm **Sudoku Game**, bạn hãy thực hiện các bước sau:
### Cài đặt NodeJS (Có thể cài thêm yarn)
- Bạn có thể tải **NodeJS** [tại đây](https://nodejs.org/en/download/).
- Sau đó, bạn có thể cài thêm **Yarn** [như sau](https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable)
### Clone project về máy
- Bạn có thể clone project này về máy bằng dòng lệnh dưới đây.
```bash
git clone https://github.com/phamvanlinhxyz/project-1-sudoku
```
### Install các package
- Các bạn mở **Terminal** tại 2 thư mục ***client*** và ***server*** sau đó chạy câu lệnh
```bash
npm install
```
hoặc (nếu sử dụng yarn)
```bash
yarn install
```
### Setup các biến môi trường trên BE
- Tạo một file có tên **.env** trong thư mục server
- Thêm các biến cần thiết:
	+ PORT
	+ MONGO_URL
### Chạy ứng dụng
- Các bạn mở Terminal tại 2 thư mục client và server sau đó chạy câu lệnh
```bash
npm start
```
hoặc (nếu sử dụng yarn)
```bash
yarn start
```
## Tính năng chính phần mềm
- Lấy câu đố theo 3 mức độ: dễ, trung bình, khó.
- Người chơi có thể điền vào các ô trống bằng bàn phím số hoặc bàn phím ảo trên màn hình.
- Tính thời gian người chơi giải và có thể tạm dừng khi đang chơi.
- Người chơi có thể kiểm tra câu trả lời của mình, nếu đúng điểm sẽ tự động được lưu.
- Hiển thị danh sách điểm cao theo mức độ.
