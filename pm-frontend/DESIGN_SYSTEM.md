# 🎨 Material Design 3 - Design System Context

## 📋 Tổng quan
Đây là tài liệu tổng hợp đầy đủ về **Material Design 3 principles** và **styling guidelines** đã được áp dụng trong dự án PM Frontend. Bạn có thể sử dụng context này để tái sử dụng và maintain consistency trong toàn bộ dự án.

---

## 🎯 1. CORE PRINCIPLES

### ✨ **Material Design 3 Philosophy**
- **Borderless Design**: Tối thiểu borders, sử dụng colors và elevation để phân biệt
- **Color-driven Hierarchy**: Dùng màu sắc thay vì borders để tạo visual hierarchy
- **Elevation System**: 5 levels elevation thay thế shadows phức tạp
- **Semantic Colors**: Color tokens có ý nghĩa rõ ràng (surface, outline, on-surface...)
- **Consistent Spacing**: Standardized padding/margin system
- **Typography Scale**: DM Sans với các size chuẩn

---

## 🎨 2. COLOR SYSTEM

### 🌈 **OKLCH Color Tokens**
```css
/* Core Colors */
--primary: oklch(0.41 0.177 142.5);        /* #006e1c - Green primary */
--surface: oklch(0.98 0.01 142);           /* #f7fdf7 - Main surface */
--surface-variant: oklch(0.87 0.024 142.5); /* #dde5dd - Secondary surface */
--outline: oklch(0.56 0.015 142.5);        /* #8f9f8f - Borders */
--outline-variant: oklch(0.78 0.015 142.5); /* #c4cbc4 - Subtle borders */
```

### 🎯 **Semantic Color Usage**
```css
/* Background Hierarchy */
.bg-background     /* Main page background */
.bg-surface        /* Card/container backgrounds */
.bg-surface-variant /* Secondary containers */

/* Text Hierarchy */
.text-foreground           /* Primary text */
.text-on-surface          /* Text on surface */
.text-on-surface-variant  /* Secondary text */
.text-muted-foreground    /* Tertiary text */

/* Borders */
.border-outline         /* Main borders */
.border-outline-variant /* Subtle borders */
```

### 🌓 **Dark Mode Support**
Tự động switch với CSS variables - tất cả colors có dark mode variants.

---

## 🏗️ 3. ELEVATION SYSTEM

### 📏 **5-Level Elevation**
```css
.elevation-1  /* Subtle: Cards, buttons */
.elevation-2  /* Low: Hover states */
.elevation-3  /* Medium: Dropdowns, dialogs */
.elevation-4  /* High: Navigation */
.elevation-5  /* Highest: Modals */
```

### 📐 **Usage Guidelines**
- **Level 1-2**: UI elements, cards
- **Level 3**: Floating elements (dropdowns)
- **Level 4-5**: Overlays, modals

---

## 📝 4. TYPOGRAPHY

### 🔤 **Font System**
- **Font Family**: `DM Sans` (Google Fonts)
- **Font Features**: `"rlig" 1, "calt" 1` (ligatures enabled)

### 📊 **Size Scale**
```css
.text-xs    /* 12px - Labels, captions */
.text-sm    /* 14px - Secondary text, compact UI */
.text-base  /* 16px - Body text */
.text-lg    /* 18px - Headings */
.text-xl    /* 20px - Page titles */
```

---

## 🔘 5. BORDER RADIUS SYSTEM

### 🎯 **Consistent Radii**
```css
/* Material 3 Standard Radii */
rounded-xl     /* 12px - Small components */
rounded-2xl    /* 16px - Form elements */
rounded-3xl    /* 24px - Containers */
rounded-full   /* Full - Pills, badges */
```

### 📋 **Usage Guidelines**
- **12px (`rounded-xl`)**: Buttons, small cards
- **16px (`rounded-2xl`)**: Inputs, selects, medium components  
- **24px (`rounded-3xl`)**: Large containers, main sections
- **Full (`rounded-full`)**: Pills, badges, circular elements

---

## 📏 6. SPACING SYSTEM

### 📐 **Padding Standards**
```css
/* Compact UI */
py-1.5  /* 6px vertical - Very compact */
py-2    /* 8px vertical - Compact */
py-3    /* 12px vertical - Standard */

px-3    /* 12px horizontal - Compact */
px-4    /* 16px horizontal - Standard */
px-6    /* 24px horizontal - Spacious */
```

### 🎯 **Height Standards**
```css
h-8     /* 32px - Very compact */
h-9     /* 36px - Compact (search, small buttons) */
h-10    /* 40px - Standard buttons */
h-12    /* 48px - Large buttons, table rows */
```

---

## 🎨 7. COMPONENT PATTERNS

### 📊 **Table Design**
```tsx
// Borderless table with alternating backgrounds
<div className="bg-surface rounded-3xl overflow-hidden">
  {/* Header */}
  <div className="bg-surface-variant/20 py-1.5 px-6 sticky top-0 z-10">
    <div className="flex items-center min-h-[32px]">
      {/* Header content */}
    </div>
  </div>
  
  {/* Rows */}
  <div className={`
    py-1.5 px-6 flex items-center min-h-[48px]
    ${index % 2 === 0 ? 'bg-surface' : 'bg-surface-variant/10'}
    hover:bg-surface-variant/20 transition-colors
  `}>
    {/* Row content */}
  </div>
</div>
```

### 🔘 **Button Variants**
```tsx
// Primary action
<Button className="rounded-full bg-primary hover:bg-primary/90">

// Secondary action  
<Button variant="outline" className="rounded-full border-outline bg-transparent">

// Compact button
<Button size="sm" className="h-9 px-3 text-sm rounded-full">
```

### 📝 **Form Elements**
```tsx
// Input field
<Input className="h-9 text-sm rounded-2xl border-outline" />

// Search with icon
<div className="relative">
  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
  <Input className="pl-10 h-9 text-sm rounded-full border-outline" />
</div>
```

### 💬 **Dialog/Modal**
```tsx
<DialogContent className="rounded-3xl border-outline elevation-4">
  <DialogHeader className="pb-4">
    <DialogTitle className="text-lg">Title</DialogTitle>
  </DialogHeader>
  {/* Content with consistent spacing */}
</DialogContent>
```

---

## 🎯 8. COLOR CODING PATTERNS

### 📈 **Status Colors**
```tsx
const statusColors = {
  'todo': 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200',
  'in-progress': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  'done': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  'blocked': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
}
```

### 🚨 **Priority Colors**
```tsx
const priorityColors = {
  'high': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  'medium': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  'low': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
}
```

### 🏷️ **Type Icons with Colors**
```tsx
const typeIcons = {
  'story': { icon: BookOpen, color: 'text-blue-600 dark:text-blue-400' },
  'task': { icon: CheckSquare, color: 'text-green-600 dark:text-green-400' },
  'bug': { icon: Bug, color: 'text-red-600 dark:text-red-400' },
  'epic': { icon: Zap, color: 'text-purple-600 dark:text-purple-400' }
}
```

---

## 🔧 9. LAYOUT PATTERNS

### 📱 **Responsive Grid**
```tsx
// Flexible table columns
<div className="flex items-center">
  <div className="w-8">Icon</div>
  <div className="w-16">Type</div>
  <div className="flex-1 min-w-[200px]">Title</div>
  <div className="w-24">Status</div>
  <div className="w-20">Priority</div>
  <div className="w-16">Points</div>
  <div className="w-32">Assignee</div>
  <div className="w-12">Actions</div>
</div>
```

### 📜 **Scrollable Containers**
```tsx
// Smart scrolling with sticky elements
<div className="overflow-auto" style={{ contain: 'layout style' }}>
  <div className="min-w-[1200px]">
    {/* Sticky header */}
    <div className="sticky top-0 z-10">Header</div>
    
    {/* Scrollable content */}
    <div>Content</div>
    
    {/* Sticky footer */}
    <div className="sticky bottom-0">Footer</div>
  </div>
</div>
```

### 📐 **Resizable Panels**
```tsx
// Dynamic resizing with mouse events
const [panelWidth, setPanelWidth] = useState(400)
const isResizing = useRef(false)

const handleMouseDown = useCallback(() => {
  isResizing.current = true
}, [])

const handleMouseMove = useCallback((e: MouseEvent) => {
  if (!isResizing.current) return
  const newWidth = window.innerWidth - e.clientX
  setPanelWidth(Math.max(300, Math.min(800, newWidth)))
}, [])
```

---

## 🎪 10. INTERACTIVE STATES

### ✨ **Hover Effects**
```css
/* Subtle hover transitions */
.hover:bg-surface-variant/20
.transition-colors
.duration-200

/* Button hover states */
.hover:bg-primary/90
.hover:border-outline-variant
```

### 🎯 **Focus States**
```css
/* Consistent focus rings */
.focus:outline-none
.focus:ring-2
.focus:ring-ring
.focus:ring-offset-2
```

### ⚡ **Loading States**
```tsx
// Disabled states with visual feedback
<Button disabled={isLoading} className="disabled:opacity-50">
  {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
  Submit
</Button>
```

---

## 🛠️ 11. IMPLEMENTATION GUIDELINES

### 📦 **Component Structure**
1. **Container**: `bg-surface rounded-3xl` 
2. **Header**: `bg-surface-variant/20 py-1.5 px-6`
3. **Content**: `py-1.5 px-6` with alternating backgrounds
4. **Actions**: `rounded-full` buttons with proper spacing

### 🎨 **Styling Priority**
1. **Semantic colors** over hardcoded colors
2. **Elevation** over box-shadow
3. **Color differentiation** over borders
4. **Consistent spacing** using design tokens
5. **Responsive design** with flexible layouts

### ⚡ **Performance**
- Use `contain: 'layout style'` for scroll containers
- Apply `transition-colors` for smooth interactions
- Implement `setTimeout` for layout recalculations when needed

---

## 📚 12. USAGE EXAMPLES

### 🔍 **Search & Filter Bar**
```tsx
<div className="flex items-center gap-4 flex-wrap">
  <div className="relative flex-1 max-w-sm">
    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
    <Input
      placeholder="Search..."
      className="pl-10 h-9 text-sm rounded-full border-outline"
    />
  </div>
  <Button variant="outline" size="sm" className="h-9 px-3 text-sm rounded-full border-outline bg-transparent">
    <Filter className="w-4 h-4 mr-2" />
    Filter
  </Button>
</div>
```

### 📝 **Quick Create Row**
```tsx
<div className="py-1.5 px-6 flex items-center min-h-[48px] bg-surface-variant/5 border-t border-outline-variant/30 sticky bottom-0">
  {!showCreateForm ? (
    <button
      onClick={() => setShowCreateForm(true)}
      className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
    >
      <Plus className="w-4 h-4" />
      <span className="text-sm">Create</span>
    </button>
  ) : (
    <div className="flex items-center gap-4 w-full">
      <Select value={quickCreateType} onValueChange={setQuickCreateType}>
        <SelectTrigger className="w-32 h-8 text-sm rounded-xl border-outline">
          <SelectValue />
        </SelectTrigger>
      </Select>
      <Input
        placeholder="Enter title..."
        className="flex-1 h-8 text-sm rounded-xl border-outline"
        value={quickCreateTitle}
        onChange={(e) => setQuickCreateTitle(e.target.value)}
      />
      <Button size="sm" className="h-8 px-3 text-sm rounded-full" onClick={handleQuickCreate}>
        Add
      </Button>
    </div>
  )}
</div>
```

---

## 🎯 13. CONTEXT REUSE INSTRUCTIONS

### 📋 **Để tái sử dụng context này:**

1. **Copy design tokens** từ `app/globals.css`
2. **Apply component patterns** theo examples trên
3. **Follow color hierarchy**: surface → surface-variant → outline
4. **Use consistent spacing**: py-1.5, px-6 cho compact UI
5. **Apply border radius**: rounded-3xl cho containers, rounded-2xl cho forms
6. **Implement elevation** thay vì custom shadows
7. **Maintain semantic naming** cho colors và components

### 🔧 **Quick Setup:**
```bash
# Copy design system files
cp app/globals.css your-project/
cp components.json your-project/

# Install dependencies
npm install @radix-ui/react-* lucide-react tailwindcss
```

### 🎨 **Key Classes to Remember:**
```css
/* Containers */
.bg-surface .rounded-3xl .elevation-1

/* Tables */
.bg-surface-variant/10 .py-1.5 .px-6

/* Buttons */
.rounded-full .h-9 .px-3 .text-sm

/* Inputs */
.rounded-2xl .border-outline .h-9 .text-sm

/* Text */
.text-on-surface .text-muted-foreground
```

---

## 🚀 **Kết luận**

Context này cung cấp **complete Material Design 3 implementation** với:
- ✅ **Color system** hoàn chỉnh với OKLCH
- ✅ **Elevation system** 5 levels
- ✅ **Typography scale** chuẩn
- ✅ **Component patterns** tái sử dụng
- ✅ **Layout guidelines** responsive
- ✅ **Interactive states** smooth
- ✅ **Dark mode** support

**Sử dụng tài liệu này như reference** để maintain consistency và implement new features theo đúng Material Design 3 principles! 🎨✨
