# Technical Agent Guide — Frontend

## Quy ước ghi nhớ

- Mọi task có thay đổi trong `frontend` phải được ghi tại file này.
- Nội dung ghi gồm: ngày, thay đổi chính, file liên quan, lý do, kết quả kiểm tra và rủi ro còn lại.
- Không ghi thay đổi frontend vào nhật ký backend.
- Các task chỉ sửa backend sẽ được ghi trong guide riêng của `backend`.

## Changelog ngắn (2026-08-21)

- Tách nhật ký kỹ thuật theo phạm vi repository vì `frontend` và `backend` là hai Git repository riêng.
- Frontend đã tích hợp `lucide-react` cho icon mắt hiện/ẩn mật khẩu; `package.json` và `package-lock.json` đã được commit cùng dependency.
- Từ các task sau, thay đổi frontend sẽ cập nhật file này; thay đổi backend sẽ cập nhật guide backend tương ứng.

## Hôm nay đã học được gì

- `useState` lưu dữ liệu thay đổi trên giao diện; khi gọi setter như `setErrors`, component sẽ render lại và React chỉ cập nhật DOM cần thay đổi.
- `useContext` đọc dữ liệu dùng chung từ Provider; vì vậy notification có thể dùng cho toàn app thay vì truyền `notify` qua nhiều tầng props.
- Client Component cần `"use client"` khi dùng state, context hoặc event như `onSubmit`; Server Component vẫn phù hợp cho nội dung không tương tác.
- Controlled form dùng state để tự kiểm soát validation; `noValidate` được dùng để tắt validation mặc định của trình duyệt khi muốn hiển thị lỗi theo rule riêng.
- Validation được tách thành `features/auth/validation` để component form chỉ điều phối dữ liệu, còn rule email/mật khẩu có thể tái sử dụng và kiểm thử độc lập.
- API domain `features/auth/api/auth-api.ts` tách việc gọi `/api/auth/login` khỏi UI; cách này giúp component dễ đọc và thay đổi endpoint không làm lẫn với giao diện.
- CSRF token được lấy trước khi gọi API login vì backend yêu cầu token cho request thay đổi trạng thái; cookie session do backend quản lý nên frontend không cần tự lưu access token.
- DTO TypeScript mô tả contract response để bắt lỗi lúc compile; `ApiResponse<T>` chuẩn bị cho cấu trúc response thống nhất `{ status, code, message, data }` khi backend hoàn thiện.
- `NotificationVariant` được truyền cùng message vì thông báo thành công và lỗi cần màu/semantic khác nhau; không nên cố định mọi notification là success.
- `TextField` nhận `endAdornment` để nút hiện/ẩn mật khẩu tái sử dụng được; icon dùng `lucide-react` thay vì tự vẽ SVG path để thống nhất thư viện icon.
- Responsive layout cần tránh margin âm lớn như `-mt-5`; trên màn hình hẹp nó có thể kéo link chồng lên input, nên dùng khoảng cách dương/nhẹ như `mt-1`.
- `package.json` và `package-lock.json` cần commit khi thêm dependency như `lucide-react`; `node_modules` không commit vì được cài lại từ lockfile.

## Vì sao các quyết định này cần thiết

- Tách UI, validation và API giúp mỗi phần có một trách nhiệm rõ ràng, dễ học, sửa và kiểm thử.
- Dùng Context cho notification vì nhiều feature có thể cần thông báo; đặt Provider ở cấp app giúp auth và các màn hình sau này dùng chung được.
- Giữ type DTO theo JSON backend giúp frontend và backend có cùng ngôn ngữ dữ liệu; khi backend đổi wrapper response thì chỉ cần cập nhật contract và adapter tương ứng.
- Ưu tiên accessibility bằng button thật cho icon mắt, `aria-label` và `noValidate` có chủ đích; không thay button bằng `span` chỉ để tránh một phần tử HTML.
