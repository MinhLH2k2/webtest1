# webtest1
Dự án kiểm tra vòng 1 Fullstack Dev

# Hướng dẫn cài đặt mã nguồn

Bước 1 : Cài NodeJS (v20.17.0LTS)
 - Link tải xuống : https://nodejs.org/en/download/prebuilt-installer

Bước 2 : Clone mã nguồn
 - Link mã nguồn  : https://github.com/MinhLH2k2/webtest1

Bước 3 : Vào trong thư mục chứa mã nguồn đã clone về, mở Terminal/Shell tại thư mục này và nhập lệnh "node server.js"

Bước 4 : Sau khi lệnh chạy xong sẽ có dòng "Server is running on http://localhost:3000". Lấy địa chỉ "http://localhost:3000" và truy cập bằng trình duyệt web.

# Mô tả

- Trang web thông qua token, truy cập vào danh sách nhân viên và hiển thị vào bảng.
- Mỗi một dòng trong bảng là 1 nhân viên khác nhau.
- Trang web có 2 nút chính: "Refresh" và "View Employee"
- Khi chọn 1 nhân viên, dòng đó sẽ được "highlight" và khi ấn nút "View Employee", thông tin cá nhân của nhân viên đó sẽ được hiển thị trong 1 thẻ khác bên dưới. Trong thẻ này có nút "Close", giúp người xem đóng thẻ khi không muốn xem nữa.
- Nút "Refresh" khi được ấn sẽ làm mới danh sách nhân viên và hiện thông báo "Refreshed!".
