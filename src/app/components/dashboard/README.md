# Dashboard Components

Komponen-komponen ini mengikuti prinsip SOLID untuk memastikan maintainability dan reusability.

## Components

### OverviewCard
Menampilkan statistik dengan ikon dan perubahan persentase.

**Props:**
- `title`: Judul card
- `value`: Nilai yang ditampilkan
- `change`: Teks perubahan (e.g., "+12% from last month")
- `changeType`: 'positive' | 'negative'
- `icon`: Lucide icon component
- `iconColor`: Warna background ikon

### SubscriptionCard
Menampilkan status langganan dengan tanggal berakhir dan tombol renew.

**Props:**
- `plan`: Nama paket langganan
- `endDate`: Tanggal berakhir langganan
- `daysLeft`: Jumlah hari tersisa
- `onRenew`: Callback untuk tombol renew

### ChartCard
Wrapper untuk chart dengan header dan action buttons.

**Props:**
- `title`: Judul chart
- `children`: Chart component
- `onDownload`: Callback untuk download
- `onFilter`: Callback untuk filter

### BarChart
Chart bar sederhana dengan data dinamis.

**Props:**
- `data`: Array of { month: string, value: number }
- `maxValue`: Nilai maksimum (optional)

### PieChart
Chart pie dengan data dinamis.

**Props:**
- `data`: Array of { label: string, value: number, color: string }
- `size`: Ukuran chart (default: 128)

### DataTable
Tabel data dengan sorting dan row click.

**Props:**
- `columns`: Array of { key: string, label: string, sortable?: boolean }
- `data`: Array of row data
- `title`: Judul tabel
- `onSort`: Callback untuk sorting
- `onRowClick`: Callback untuk row click

### FormCard
Wrapper untuk form dengan header dan action buttons.

**Props:**
- `title`: Judul form
- `children`: Form fields
- `onSubmit`: Callback untuk submit
- `submitText`: Teks tombol submit (default: "Save")
- `cancelText`: Teks tombol cancel (default: "Cancel")
- `onCancel`: Callback untuk cancel

### FormField
Field input yang reusable dengan berbagai tipe.

**Props:**
- `label`: Label field
- `name`: Name attribute
- `type`: 'text' | 'email' | 'password' | 'number' | 'textarea' | 'select'
- `value`: Nilai field
- `onChange`: Callback untuk perubahan
- `placeholder`: Placeholder text
- `required`: Apakah required
- `error`: Pesan error
- `options`: Array untuk select options
- `rows`: Jumlah rows untuk textarea

### ImageCard
Card untuk menampilkan gambar dengan overlay option.

**Props:**
- `title`: Judul gambar
- `imageUrl`: URL gambar
- `alt`: Alt text
- `description`: Deskripsi gambar
- `onClick`: Callback untuk click
- `showOverlay`: Tampilkan overlay (default: false)

## Usage Example

```tsx
import { 
  OverviewCard, 
  SubscriptionCard, 
  ChartCard, 
  BarChart 
} from '../components/dashboard';

// Dalam component
<OverviewCard
  title="Total Users"
  value="12,847"
  change="+12% from last month"
  changeType="positive"
  icon={Users}
  iconColor="#3B82F6"
/>

<ChartCard title="Monthly Growth">
  <BarChart data={chartData} />
</ChartCard>
```

## SOLID Principles

1. **Single Responsibility**: Setiap component memiliki satu tanggung jawab
2. **Open/Closed**: Component dapat diperluas tanpa modifikasi
3. **Liskov Substitution**: Component dapat diganti dengan implementasi lain
4. **Interface Segregation**: Props interface yang spesifik
5. **Dependency Inversion**: Component bergantung pada abstraksi (props) 