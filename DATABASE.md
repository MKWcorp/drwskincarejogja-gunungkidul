# Database Setup - DRW Skincare

## Overview
Proyek ini menggunakan PostgreSQL database yang di-host di Neon (serverless PostgreSQL).

## Connection Details
- **Provider**: Neon Database
- **Database**: neondb 
- **Connection**: Pooled connection via ap-southeast-1.aws.neon.tech

## Setup

### 1. Environment Variables
File `.env.local` sudah dibuat dengan connection string yang aman.

### 2. Dependencies
- `@neondatabase/serverless` - Driver untuk koneksi ke Neon

### 3. Database Connection
File `lib/db.ts` mengelola koneksi database dengan fungsi:
- `sql` - Direct SQL query dengan template literals
- `query()` - Wrapper function untuk query dengan parameter
- `testConnection()` - Test koneksi database

## API Endpoints

### Database Management
- `POST /api/setup-db` - Membuat tabel yang diperlukan
- `GET /api/test-db` - Test koneksi database

### Testimonials
- `GET /api/testimonials` - Ambil semua testimoni
- `POST /api/testimonials` - Tambah testimoni baru
  ```json
  {
    "name": "John Doe",
    "message": "Pelayanan sangat baik!",
    "rating": 5
  }
  ```

### Contacts
- `GET /api/contacts` - Ambil semua kontak
- `POST /api/contacts` - Tambah kontak baru
  ```json
  {
    "name": "Jane Doe", 
    "phone": "08123456789",
    "message": "Saya ingin konsultasi"
  }
  ```

## Tables Schema

### testimonials
```sql
CREATE TABLE testimonials (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  rating INTEGER DEFAULT 5,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### contacts
```sql
CREATE TABLE contacts (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

## Usage Examples

### Test Database Connection
```bash
curl http://localhost:3001/api/test-db
```

### Setup Database Tables
```bash
curl -X POST http://localhost:3001/api/setup-db
```

### Add Testimonial
```bash
curl -X POST http://localhost:3001/api/testimonials \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","message":"Great service!","rating":5}'
```

### Get Testimonials
```bash
curl http://localhost:3001/api/testimonials
```

## Security Notes
- Connection string disimpan di `.env.local` dan tidak di-commit ke Git
- Semua query menggunakan parameterized queries untuk mencegah SQL injection
- SSL mode required untuk semua koneksi

## Next Steps
1. Integrasikan dengan form di frontend
2. Tambahkan validasi data yang lebih ketat
3. Implementasikan rate limiting
4. Tambahkan caching jika diperlukan