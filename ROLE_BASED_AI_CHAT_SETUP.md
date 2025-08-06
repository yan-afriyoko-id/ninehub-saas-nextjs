# Setup AI Chat Berbeda Berdasarkan Role

## Perubahan yang Telah Dibuat

### 1. Konfigurasi Menu (`src/app/config/menu.ts`)

Menu AI Chat sekarang memiliki dua versi yang berbeda berdasarkan role:

```typescript
// AI Chat - Admin version (internal)
{
  id: 'ai-chat-admin',
  label: 'Menu ke AI Chat',
  icon: 'message-circle',
  path: '/ai-chat', // Internal path untuk admin
  permission: 'chat.send',
  roles: ['admin', 'super-admin'],
  isAdmin: true,
},

// AI Chat - User/Tenant version (external)
{
  id: 'ai-chat-user',
  label: 'Menu ke AI Chat',
  icon: 'message-circle',
  path: 'http://localhost:3001/', // External URL untuk user/tenant
  permission: 'chat.send',
  external: true,
  roles: ['tenant', 'user'], // Hanya untuk user/tenant, bukan admin
},
```

### 2. RoleBasedDashboard (`src/app/components/RoleBasedDashboard.tsx`)

Menu AI Chat di RoleBasedDashboard juga diupdate:

```typescript
// AI Chat - Admin version (internal)
{
  id: "ai-chat-admin",
  label: "Menu ke AI Chat",
  icon: <Bot size={20} />,
  permission: ["admin"],
  href: "/ai-chat", // Internal path for admin
},
// AI Chat - User/Tenant version (external)
{
  id: "ai-chat-user",
  label: "Menu ke AI Chat",
  icon: <Bot size={20} />,
  permission: ["tenant"],
  href: "http://localhost:3001/", // External URL for user/tenant
},
```

## Perilaku Menu AI Chat

### 🔵 Untuk Admin (`admin`, `super-admin`)
- **Path**: `/ai-chat` (internal)
- **Perilaku**: Membuka halaman AI Chat internal di aplikasi
- **Fitur**: Full-featured AI chat dengan interface lengkap
- **Navigation**: Menggunakan Next.js Link untuk optimal performance

### 🟢 Untuk User/Tenant (`tenant`, `user`)
- **Path**: `http://localhost:3001/` (external)
- **Perilaku**: Membuka URL eksternal di tab baru
- **Fitur**: Mengarah ke aplikasi AI Chat eksternal
- **Navigation**: Menggunakan anchor tag dengan `target="_blank"`

## Komponen yang Diupdate

1. **SecureDashboard.tsx**: Menangani link eksternal dan internal
2. **DashboardLayout.tsx**: Konsistensi dalam penanganan menu
3. **RoleBasedDashboard.tsx**: Menu hardcoded dengan role-based AI Chat
4. **config/menu.ts**: Konfigurasi menu utama dengan dua versi AI Chat

## Cara Menggunakan

### 1. Ganti URL Eksternal
Ubah URL placeholder di `src/app/config/menu.ts`:

```typescript
path: 'http://localhost:3001/', // Ganti dengan URL AI Chat eksternal Anda
```

### 2. Ganti URL di RoleBasedDashboard
Update juga di `src/app/components/RoleBasedDashboard.tsx`:

```typescript
href: "http://localhost:3001/", // External URL for user/tenant
```

### 3. Pastikan Halaman Internal Ada
Halaman `/ai-chat` sudah ada dan lengkap dengan fitur AI Chat internal.

## Testing

### Test untuk Admin:
1. Login sebagai admin
2. Klik menu "Menu ke AI Chat"
3. Harus membuka halaman AI Chat internal di `/ai-chat`
4. Interface AI Chat lengkap dengan sidebar, chat history, dll.

### Test untuk User/Tenant:
1. Login sebagai user atau tenant
2. Klik menu "Menu ke AI Chat"
3. Harus membuka URL eksternal di tab baru
4. Mengarah ke aplikasi AI Chat eksternal

## Fitur yang Ditambahkan

1. **Role-Based Routing**: Menu AI Chat berbeda berdasarkan role user
2. **Internal AI Chat**: Admin mendapat akses ke AI Chat internal yang lengkap
3. **External AI Chat**: User/Tenant diarahkan ke aplikasi AI Chat eksternal
4. **Security**: Link eksternal menggunakan `rel="noopener noreferrer"`
5. **Performance**: Link internal menggunakan Next.js Link

## Catatan

- Admin akan melihat AI Chat internal yang full-featured
- User/Tenant akan diarahkan ke aplikasi AI Chat eksternal
- Permission `chat.send` tetap diperlukan untuk kedua versi
- Menu lain tetap berfungsi normal seperti sebelumnya 