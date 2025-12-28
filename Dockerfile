# Sử dụng Python 3.10 bản gọn nhẹ (slim)
FROM python:3.10-slim

# Cài đặt một số thư viện hệ thống cần thiết cho GeoAlchemy (nếu cần sau này)
RUN apt-get update && apt-get install -y \
    libpq-dev gcc \
    && rm -rf /var/lib/apt/lists/*

# Thiết lập thư mục làm việc
WORKDIR /app

# Copy file requirements trước để tận dụng cache của Docker
COPY requirements.txt .

# Cài đặt các thư viện Python
RUN pip install --no-cache-dir -r requirements.txt

# Copy toàn bộ code vào trong container
COPY . .

# Mở cổng 8000
EXPOSE 8000

# Lệnh chạy server (Reload mode để code sửa là tự cập nhật)
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]