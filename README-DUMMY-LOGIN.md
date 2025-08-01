# Dummy Login Data

Sistem ini menyediakan 2 akun dummy untuk testing dengan role yang berbeda dan menu yang dinamis.

## Akun Dummy

### 1. Admin Account
- **Email:** `admin@analyticspro.com`
- **Password:** `admin123`
- **Role:** Admin
- **Company:** Analytics Pro
- **Plan:** Enterprise ($299/month)
- **Permissions:** Full access to all features
- **Menu Items:**
  - Dashboard Admin
  - Menu ke CRM
  - Menu ke AI Chat
  - CRUD Modules
  - CRUD Permission
  - CRUD Roles
  - CRUD Plans
  - Menu Settings

### 2. Tenant Account
- **Email:** `tenant@startup.com`
- **Password:** `tenant123`
- **Role:** Tenant
- **Company:** Startup Ventures
- **Plan:** Basic ($49/month)
- **Permissions:** Limited access features
- **Menu Items:**
  - Dashboard Tenant
  - Menu ke CRM
  - Menu ke AI Chat

## Cara Login

1. Buka halaman `/login`
2. Masukkan email dan password sesuai akun di atas
3. Klik tombol "Sign In"
4. Setelah login berhasil, akan diarahkan ke `/dashboard`

## Menu Berdasarkan Role

### Admin Menu
- **Dashboard Admin:** Overview dengan statistik lengkap
- **Menu ke CRM:** Customer Relationship Management dengan fitur admin
- **Menu ke AI Chat:** AI Assistant dengan fitur system management
- **CRUD Modules:** Manajemen modul sistem (Create, Read, Update, Delete)
- **CRUD Permission:** Manajemen permission user
- **CRUD Roles:** Manajemen role user
- **CRUD Plans:** Manajemen paket subscription
- **Menu Settings:** Konfigurasi sistem

### Tenant Menu
- **Dashboard Tenant:** Overview dengan statistik terbatas
- **Menu ke CRM:** Customer Relationship Management dengan akses terbatas
- **Menu ke AI Chat:** AI Assistant untuk business queries

## Fitur Role-Based

### Admin Features
- Akses penuh ke semua menu
- CRUD operations untuk modules, permissions, roles, plans
- System management dan configuration
- Advanced analytics dan insights
- User management capabilities

### Tenant Features
- Akses terbatas ke dashboard
- CRM dengan data terbatas
- AI Chat untuk business support
- Basic profile management

## Testing

Untuk testing, Anda bisa:

1. **Login sebagai Admin:**
   - Masukkan: admin@analyticspro.com / admin123
   - Cek semua menu tersedia
   - Test CRUD operations di Modules
   - Test AI Chat dengan fitur admin

2. **Login sebagai Tenant:**
   - Masukkan: tenant@startup.com / tenant123
   - Cek menu terbatas
   - Test CRM dengan data terbatas
   - Test AI Chat untuk business queries

## Logout

Untuk logout, klik tombol "Logout" di sidebar dashboard. User akan diarahkan kembali ke halaman login.

## Data Persistence

Data login disimpan di localStorage browser, jadi session akan bertahan sampai:
- User logout
- Browser cache di-clear
- Tab browser ditutup

## Halaman yang Tersedia

### Admin Pages
- `/dashboard` - Dashboard Admin
- `/crm` - CRM System
- `/ai-chat` - AI Chat Assistant
- `/admin/modules` - CRUD Modules
- `/admin/permissions` - CRUD Permissions
- `/admin/roles` - CRUD Roles
- `/admin/plans` - CRUD Plans
- `/admin/settings` - System Settings

### Tenant Pages
- `/dashboard` - Dashboard Tenant
- `/crm` - CRM System (limited)
- `/ai-chat` - AI Chat Assistant (business focus) 