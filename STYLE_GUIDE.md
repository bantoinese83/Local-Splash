# Local Splash Style Guide

## 🎨 **Pop Art Aesthetic Compliance**

### **Brand Colors (PRD Compliant)**
- **Electric Blue**: `hsl(210, 100%, 50%)` - Primary brand color
- **Vivid Red**: `hsl(0, 84.2%, 60.2%)` - Secondary color  
- **Sunny Yellow**: `hsl(48, 96%, 59%)` - Accent color
- **Bold Black**: `#000000` - Outline and contrast color

### **Typography (Energetic & Bold)**
- **Display Font**: `font-display` - For headlines and hero text
- **Uppercase**: Used for major headings with `uppercase` class
- **Tracking**: `tracking-tighter` for compressed, energetic look
- **Font Weights**: Bold (`font-bold`) for emphasis and energy

### **Pop Art Design Elements**

#### **1. Bold Outlines**
- All cards and buttons use `border-2 border-black`
- Creates strong graphic definition
- Maintains Pop Art aesthetic

#### **2. Shadow Effects**
- `shadow-[4px_4px_0px_#000]` for 3D Pop Art effect
- `hover:shadow-none` for interactive feedback
- Creates depth and energy

#### **3. Pattern Backgrounds**
- `pattern-dots-md` for textured backgrounds
- Adds visual interest and Pop Art feel

#### **4. Color Combinations**
- **Yellow Background + Black Text**: High contrast, energetic
- **Blue Primary + White Text**: Clean, professional
- **Red Secondary + White Text**: Bold, attention-grabbing

### **Component Standards**

#### **Buttons**
```css
/* Primary Button */
className='font-bold border-2 border-black shadow-[4px_4px_0px_#000] hover:shadow-none transition-shadow duration-200'

/* Secondary Button */
className='font-bold border-2 border-black shadow-[2px_2px_0px_#000] hover:shadow-none transition-shadow duration-200'
```

#### **Cards**
```css
/* Artwork Cards */
className='border-2 border-black dark:border-white shadow-[8px_8px_0px_#000] dark:shadow-[8px_8px_0px_#fff] group-hover:shadow-none transition-shadow duration-200'
```

#### **Sections**
```css
/* Hero Sections */
className='border-2 border-black dark:border-white rounded-lg bg-brand-yellow pattern-dots-md text-black'
```

### **Layout Principles**

#### **1. Clean Gallery View**
- Minimal distractions in artwork display
- Focus on individual artwork details
- Clean, readable text

#### **2. Pop Art Accents**
- Bold graphics outside main gallery
- Energetic typography for headings
- Strong color contrasts

#### **3. Responsive Design**
- Mobile-first approach
- Consistent spacing and proportions
- Maintains aesthetic across devices

### **Color Usage Guidelines**

#### **Primary (Electric Blue)**
- Main call-to-action buttons
- Links and interactive elements
- Brand highlights

#### **Secondary (Vivid Red)**
- Secondary actions
- Error states
- Attention-grabbing elements

#### **Accent (Sunny Yellow)**
- Background highlights
- Success states
- Hero sections

#### **Black**
- Text and outlines
- Strong contrast
- Graphic definition

### **Animation Standards**

#### **Hover Effects**
- `hover:shadow-none` - Removes shadow on hover
- `transition-shadow duration-200` - Smooth transitions
- `group-hover:scale-105` - Subtle scale on images

#### **Loading States**
- Spinner animations for loading
- Smooth transitions between states
- Visual feedback for user actions

### **Accessibility Compliance**

#### **Color Contrast**
- High contrast ratios for readability
- Dark text on light backgrounds
- Light text on dark backgrounds

#### **Focus States**
- Visible focus indicators
- Keyboard navigation support
- Screen reader compatibility

### **Authentication Styling**

#### **Auth Forms**
```css
/* Auth Form Container */
className='bg-brand-yellow border-2 border-black rounded-lg p-6 shadow-[4px_4px_0px_#000]'

/* Form Labels */
className='text-black font-bold uppercase tracking-tight'

/* Form Inputs */
className='border-2 border-black focus:border-brand-blue focus:ring-2 focus:ring-brand-blue'

/* Submit Buttons */
className='font-bold border-2 border-black shadow-[4px_4px_0px_#000] hover:shadow-none transition-shadow duration-200 bg-brand-blue hover:bg-brand-red text-white uppercase tracking-tight'
```

#### **Auth Pages**
- **Login**: Blue to red gradient background
- **Signup**: Red to yellow gradient background
- **Headings**: Large, bold, uppercase display fonts
- **Links**: Brand color highlights with hover effects

### **Theme Configuration**

#### **Light Theme Default**
- **Default Theme**: Light theme is now the default
- **System Theme**: Users can still switch to dark theme if preferred
- **Viewport Colors**: White theme color for both light and dark preferences
- **Background**: Clean white backgrounds with high contrast text

### **Implementation Checklist**

- ✅ **Colors**: Electric blue, vivid red, sunny yellow with black outlines
- ✅ **Typography**: Bold, energetic display fonts with uppercase headings
- ✅ **Shadows**: 3D Pop Art shadow effects on interactive elements
- ✅ **Borders**: Bold black borders on all major elements
- ✅ **Patterns**: Dotted patterns for visual interest
- ✅ **Animations**: Smooth hover transitions and loading states
- ✅ **Responsive**: Mobile-first design that scales properly
- ✅ **Accessibility**: High contrast and keyboard navigation
- ✅ **Authentication**: Pop Art styled auth forms and pages
- ✅ **Light Theme**: Clean, bright default theme with Pop Art accents

This style guide ensures complete compliance with the PRD's Pop Art aesthetic requirements while maintaining usability and accessibility standards in a clean light theme.
