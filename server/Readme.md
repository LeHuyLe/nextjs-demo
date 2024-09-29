
# Công nghệ sử dụng
 Em dùng Node.js + Fastify + Sqlite
# Format response trả về
Em cho định dạng trả về là JSON, và luôn có trường message,errors
## Chi tiết các API
API xác thực người dùng em có dùng session token, session token này là một JWT, secret key JWT này sẽ verify token
Đối với các API cần xác thực thì có 2 cách để server biết:
1. Gửi session token thông qua header sessionToken
2. Để cookie tự gửi lên (vì khi gọi api login hay register thì server sẽ set cookie)
# Test (auth) bằng posman
### Authentication
- `POST /auth/register`: Đăng ký tài khoản
Khi register, login thành công thì server sẽ tự động set cookie cho domain là `localhost` với tên là `sessionToken`
- `POST /auth/login`: Đăng nhập
# đặt biệt em có tìm hiểu để tăng thời gian hết hạn của session tokenm
- `POST /auth/slide-session`: Tăng thời gian hết hạn của session token. Yêu cầu cần phải gửi lên `sessionToken` 
- `POST /auth/logout`: Đăng xuất với body là {}, yêu cầu xác thực
Khi logout thì server của mình sẽ tự động remove cookie sessionToken đi
### Account: Cần xác thực
- `GET /account/me`: Lấy thông tin cá nhân
- `PUT /account/me`: Cập nhật thông tin cá nhân
