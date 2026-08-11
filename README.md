# Money Tracking Frontend

Frontend sử dụng Next.js App Router, React, TypeScript và Tailwind CSS. Mã nguồn được tổ chức theo feature-first để route chỉ ghép màn hình, nghiệp vụ nằm trong feature và phần dùng chung nằm trong `shared`.

## Chạy dự án

```bash
npm install
copy .env.example .env.local
npm run dev
```

API Gateway local mặc định chạy tại `http://localhost:8080`. Có thể đổi `NEXT_PUBLIC_API_BASE_URL` trong `.env.local`.

## Kiểm tra

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

## Cấu trúc

```text
src/
├── app/                     # Route, metadata và layout của Next.js
│   └── (auth)/
│       ├── login/page.tsx
│       ├── register/page.tsx
│       └── layout.tsx
├── features/
│   └── auth/                # UI và hành vi thuộc nghiệp vụ xác thực
│       ├── components/
│       └── index.ts         # Public API của feature
├── shared/
│   ├── api/                 # HTTP client, API error và CSRF helper
│   ├── config/              # Kiểm tra biến môi trường bằng Zod
│   ├── i18n/                # Translation key, fallback và resolver
│   └── ui/form/             # Component form dùng chung
└── test/                    # Thiết lập test dùng chung
```

`(auth)` là Route Group nên URL vẫn là `/login` và `/register`. Page và layout giữ vai trò Server Component; chỉ form có state/event handler mới dùng Client Component.

## Quy tắc phụ thuộc

Chiều phụ thuộc bắt buộc là:

```text
app → features → shared
```

- `app` import feature qua public entrypoint, ví dụ `@/features/auth`.
- Feature không import `app` hoặc feature khác.
- `shared` không phụ thuộc `app` hoặc `features`.
- Các module shared có public entrypoint riêng như `@/shared/api`, `@/shared/i18n` và `@/shared/ui/form`; không deep-import từ bên ngoài module.

ESLint kiểm tra các ranh giới này. Chỉ tạo feature hoặc shared module khi đã có mã nguồn thực sự cần sử dụng, không tạo thư mục placeholder.

## API foundation

`apiRequest<T>()` sử dụng native `fetch`, gửi cookie bằng `credentials: "include"`, hỗ trợ JSON, `AbortSignal`, CSRF header và chuẩn hóa lỗi Gateway thành `ApiError`. `getCsrfToken()` lấy token từ `/api/auth/csrf`.

Form login/register hiện vẫn chỉ mô phỏng submit; chưa gọi API, refresh token hoặc retry request.
