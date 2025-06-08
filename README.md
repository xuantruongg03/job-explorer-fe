# Vietnam Job Explorer

Một ứng dụng web phân tích thị trường việc làm Việt Nam, giúp khám phá xu hướng và kỹ năng được yêu cầu nhất trong các ngành nghề.

## ✨ Tính năng chính

- 📊 **Phân tích dữ liệu việc làm**: Thống kê và biểu đồ về thị trường việc làm Việt Nam
- 🔍 **Tìm kiếm việc làm**: Tìm kiếm cơ hội việc làm phù hợp
- 💡 **Gợi ý kỹ năng**: Khuyến nghị kỹ năng cần thiết cho từng ngành nghề
- 📈 **Xu hướng toàn cầu**: So sánh thị trường việc làm Việt Nam với thế giới
- 🎯 **Phân tích kỹ năng**: Thống kê kỹ năng theo quốc gia và ngành nghề

## 🚀 Demo

**URL**: https://lovable.dev/projects/20b1cbb8-89a2-4b97-a39c-a5dfa316185d

## 🛠️ Cách chạy dự án

Có nhiều cách để chỉnh sửa và chạy ứng dụng này.

### Sử dụng Lovable (Khuyến nghị)

Truy cập [Lovable Project](https://lovable.dev/projects/20b1cbb8-89a2-4b97-a39c-a5dfa316185d) và bắt đầu thay đổi thông qua prompts.

Các thay đổi được thực hiện qua Lovable sẽ tự động được commit vào repo này.

### Chạy trên máy local

Nếu bạn muốn làm việc local với IDE của mình, bạn có thể clone repo này và push các thay đổi. Các thay đổi được push cũng sẽ được phản ánh trong Lovable.

Yêu cầu: Node.js & npm đã được cài đặt - [cài đặt với nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Thực hiện các bước sau:

```bash
# Bước 1: Clone repository
git clone <YOUR_GIT_URL>

# Bước 2: Di chuyển vào thư mục dự án
cd vietnam-job-explorer

# Bước 3: Cài đặt dependencies
npm install

# Bước 4: Chạy development server
npm run dev
```

### Chỉnh sửa trực tiếp trên GitHub

- Điều hướng đến file muốn chỉnh sửa
- Click nút "Edit" (biểu tượng bút chì) ở góc trên bên phải
- Thực hiện thay đổi và commit

### Sử dụng GitHub Codespaces

- Điều hướng đến trang chính của repository
- Click nút "Code" (nút màu xanh) gần góc trên bên phải
- Chọn tab "Codespaces"
- Click "New codespace" để khởi chạy môi trường Codespace mới
- Chỉnh sửa files trực tiếp trong Codespace và commit & push thay đổi khi hoàn thành

## 🏗️ Công nghệ sử dụng

Dự án này được xây dựng với:

- **Frontend Framework**: React 18 với TypeScript
- **Build Tool**: Vite
- **UI Components**: shadcn/ui
- **Styling**: Tailwind CSS
- **State Management**: TanStack Query (React Query)
- **HTTP Client**: Axios
- **Charts**: Recharts
- **Icons**: Lucide React
- **Animations**: Lottie React

## 📁 Cấu trúc dự án

```
src/
├── components/         # Các component tái sử dụng
│   ├── features/      # Components chức năng chính
│   ├── layouts/       # Layout components
│   └── ui/           # UI components (shadcn/ui)
├── pages/            # Các trang chính
│   ├── Home.tsx      # Trang chủ
│   ├── Analytics.tsx # Trang phân tích
│   ├── FindJobs.tsx  # Trang tìm việc
│   └── SearchSkills.tsx # Trang tìm kỹ năng
├── hooks/            # Custom React hooks
├── services/         # API services
├── interfaces/       # TypeScript interfaces
└── lib/             # Utilities và constants
```

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/20b1cbb8-89a2-4b97-a39c-a5dfa316185d) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
