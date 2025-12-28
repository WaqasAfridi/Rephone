# 📱 RePhone - Smart Appointment Booking System

A modern, professional appointment booking system built for mobile/phone repair services using React. This project was developed as the **Final Task (Week 6)** of the DevBazm Internship Program, demonstrating advanced React development skills, clean code architecture, and professional UI/UX design.

![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.18-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-7.11.0-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.2.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)

---

## 🎯 Project Overview

**Domain**: Mobile/Phone Repair Service  
**Project Type**: Single-Page Application with Multi-Step Booking Flow  
**Internship**: DevBazm - 6 Week Web Development Program  
**Task**: Final Assessment (Week 6)  

### 🏢 About DevBazm
DevBazm is a Pakistan-based creative web development company and tech community focused on building modern, scalable digital solutions. Operating primarily in Peshawar and the UET Peshawar tech ecosystem, DevBazm emphasizes innovation, engineering excellence, and community-driven learning.

---

## ✨ Features

### 👤 User Side
- **Service Selection**: Choose from 8 professional repair services
  - Screen Replacement ($100)
  - Battery Replacement ($70)
  - Water Damage Repair ($120)
  - Charging Port Repair ($60)
  - Camera Repair ($90)
  - Speaker Repair ($50)
  - Motherboard Repair ($200)
  - Button & Sensor Repair ($45)

- **Smart Date Picker**: 
  - Select dates with validation
  - 30-day advance booking limit
  - Helpful user guidance

- **Time Slot Management**: 
  - 9 available slots (9:00 AM - 5:00 PM)
  - Real-time availability checking
  - Booked slots automatically disabled
  - Keyboard navigation support (Enter/Space)

- **User Details Form**: 
  - Name validation
  - 11-digit phone number validation
  - Optional issue description
  - Clear format hints and helpers

- **Multi-Step Booking Flow**: 
  - 5-step guided process with progress indicator
  - Smooth animations between steps
  - Back/Next navigation
  - Form validation at each step

- **Booking Confirmation**: 
  - Review summary before confirming
  - Loading state with spinner
  - Success modal with booking details
  - Confirmation ID for reference

- **Data Persistence**: All bookings saved to LocalStorage

### 🔐 Admin Dashboard
- **Comprehensive Management Panel**:
  - View all appointments with detailed information
  - Responsive design (table on desktop, cards on mobile)
  - Latest bookings displayed first

- **Advanced Filtering**:
  - Status filter (All, Pending, Approved, Cancelled)
  - Date-based filtering with calendar picker
  - Clear filter button for quick reset
  - Real-time updates on filter changes

- **Booking Management**:
  - Approve bookings with confirmation modal
  - Cancel bookings with safeguards
  - View detailed appointment information
  - Status badges with animations

- **Status System**: 
  - 🟡 Pending (default on booking)
  - 🟢 Approved (admin action)
  - 🔴 Cancelled (admin action)

- **Pagination System**:
  - Desktop: Traditional page-based navigation with ellipsis
  - Mobile: "Load More" pattern for better UX
  - Adjustable rows per page (10, 25, 50)
  - Smart page reset on filter changes

- **Empty States**: Helpful messages when no data matches filters

---

## 🛠️ Technology Stack

### Core Technologies
- **React** (v19.2.0) - UI Library
- **JavaScript** (ES6+) - Programming Language
- **Tailwind CSS** (v4.1.18) - Utility-First CSS Framework
- **React Router DOM** (v7.11.0) - Client-Side Routing
- **Lucide React** (v0.562.0) - Icon Library

### Development Tools
- **Vite** (v7.2.4) - Build Tool & Dev Server
- **ESLint** (v9.39.1) - Code Linting
- **PostCSS** - CSS Processing

### Storage
- **LocalStorage** - Client-Side Data Persistence

---

## 📁 Project Structure

```
appointment-booking/
├── src/
│   ├── components/
│   │   ├── admin-dashboard/
│   │   │   ├── AppointmentDetailsModal.jsx
│   │   │   └── ConfirmModal.jsx
│   │   ├── booking-flow/
│   │   │   ├── ConfirmationModal.jsx
│   │   │   ├── ConfirmSummary.jsx
│   │   │   ├── DatePicker.jsx
│   │   │   ├── ServicePicker.jsx
│   │   │   ├── SlotSelector.jsx
│   │   │   ├── Stepper.jsx
│   │   │   └── UserForm.jsx
│   │   ├── home-sections/
│   │   │   ├── Banner.jsx
│   │   │   ├── Common-repairs.jsx
│   │   │   └── HowItWorks.jsx
│   │   └── shared/
│   │       ├── Footer.jsx
│   │       ├── Navbar.jsx
│   │       └── ServiceCard.jsx
│   ├── hooks/
│   │   └── useBookingState.js
│   ├── pages/
│   │   ├── Admin.jsx
│   │   ├── Booking.jsx
│   │   ├── Home.jsx
│   │   └── NotFoundPage.jsx
│   ├── constants.js
│   ├── utils.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── public/
│   ├── Rephone-logo.png
│   ├── RePhone-logo-icon.png
│   ├── repairing-expert-image.png
│   ├── repairing-expert-image-404Page.png
│   └── how-it-works-illustration.png
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**:
```bash
git clone https://github.com/your-username/appointment-booking.git
cd appointment-booking
```

2. **Install dependencies**:
```bash
npm install
```

3. **Start development server**:
```bash
npm run dev
```

4. **Open your browser**:
```
http://localhost:5173
```

### Build for Production

```bash
npm run build
```

The production build will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

---

## 🎨 Design Philosophy

### Color Scheme
- **Primary Brand**: Red (#ED1B24) - Represents urgency and repair expertise
- **Secondary**: Dark Gray (#231F20) - Professional and trustworthy
- **Accent Colors**: 
  - Yellow (#FFC107) - Pending status
  - Green (#10B981) - Approved status
  - Red (#EF4444) - Cancelled status

### UX Principles
1. **Progressive Disclosure**: Multi-step form prevents overwhelming users
2. **Immediate Feedback**: Real-time validation and slot availability
3. **Responsive Design**: Mobile-first approach with desktop enhancements
4. **Accessibility**: ARIA labels, semantic HTML, keyboard navigation
5. **Error Prevention**: Disabled states, confirmation modals, race condition handling
6. **Visual Feedback**: Loading states, animations, clear status indicators

---

## 🔑 Key Implementation Details

### State Management
- **Custom Hook**: `useBookingState` centralizes all booking logic
- **LocalStorage Sync**: Automatic persistence on state changes
- **Draft Management**: Incomplete bookings saved as drafts
- **Race Condition Handling**: Slot availability re-checked on confirmation

### Slot Availability Algorithm
```javascript
busySlotsForDate = (date) => {
  return appointments
    .filter(a => a.date === date)
    .map(a => a.slot);
}
```

### Sorting & Filtering
- Latest bookings displayed first (newest at top)
- Efficient memoized filtering with useMemo
- Smart pagination with page reset on filter changes

### Data Schema

**Draft Booking**:
```javascript
{
  service: string,
  date: string,        // ISO: YYYY-MM-DD
  slot: string,        // "09:00 AM"
  userDetails: {
    name: string,
    phone: string,     // 11 digits
    issue: string
  }
}
```

**Appointment**:
```javascript
{
  id: string,          // UUID
  service: string,
  date: string,
  slot: string,
  customer: {
    name: string,
    phone: string,
    issue: string
  },
  status: string,      // "Pending" | "Approved" | "Cancelled"
  createdAt: string    // ISO timestamp
}
```

---

## 🎓 Learning Outcomes

This project demonstrates proficiency in:
- ✅ React component architecture and composition
- ✅ State management with hooks (useState, useEffect, useMemo, useCallback)
- ✅ Custom hooks for reusable logic
- ✅ Form handling and validation
- ✅ Conditional rendering and dynamic UIs
- ✅ Client-side routing with React Router
- ✅ LocalStorage for data persistence
- ✅ Responsive design with Tailwind CSS
- ✅ Code organization and file structure
- ✅ User experience design
- ✅ Race condition handling
- ✅ Pagination implementation
- ✅ Keyboard accessibility
- ✅ Loading states and animations

---

## ✨ Enhanced Features

### Recent Improvements
- **Professional Footer**: Gradient design with glassmorphism effects
- **Animated Banner**: Dust/glow effects behind hero image
- **Enhanced Forms**: Clear format hints and validation messages
- **Keyboard Navigation**: Full accessibility support for slot selection
- **Loading States**: Visual feedback during booking confirmation
- **Improved 404 Page**: Professional error page with brand consistency
- **Section Animations**: Smooth slideUp transitions between steps
- **Icon Integration**: Visual hierarchy with Lucide React icons
- **Admin Sorting**: Latest bookings automatically displayed first

---

## 📱 Responsive Breakpoints

- **Mobile**: < 768px (Cards, simplified layout, full-width buttons)
- **Tablet**: 768px - 1024px (Grid adjustments, hybrid layouts)
- **Desktop**: > 1024px (Full table, multi-column grids, advanced features)

---

## 🔒 Data Storage

All data stored in browser LocalStorage:
- `bookingData` - Current draft booking
- `appointments` - Array of all confirmed appointments

**Note**: LocalStorage is browser-specific and can be cleared. For production deployment, consider implementing a backend API with database storage and user authentication.

---

## 🐛 Known Limitations

1. **LocalStorage Only**: Data is browser-specific and can be cleared
2. **No Authentication**: Admin dashboard is publicly accessible
3. **No Backend**: All logic runs client-side
4. **Time Zone**: Assumes single time zone
5. **No Email Notifications**: Users don't receive confirmation emails

---

## 🎯 DevBazm Internship Journey

### Week-by-Week Tasks

**Week 1**: Bazm Coffee Website (HTML + CSS)  
**Week 2**: Interactive Quiz Website (HTML + CSS + JavaScript)  
**Week 3**: Interactive Learning Dashboard - Mini LMS  
**Week 4**: Property Rental Dashboard (Complex React Project)  
**Week 5**: Service Booking Web App (Front-End Only)  
**Week 6**: Smart Appointment Booking System (Final Assessment) ⭐

---

## 📋 Task Requirements Met

✅ Single use case (Phone/Mobile Repair)  
✅ React with JavaScript (ES6+)  
✅ Tailwind CSS for styling  
✅ React Router for navigation  
✅ LocalStorage for persistence  
✅ No Firebase/Backend/APIs  
✅ No UI libraries (MUI, Ant Design, etc.)  
✅ All code written from scratch  
✅ Clean, understandable, and explainable code  
✅ Professional UI/UX design  
✅ Full accessibility support  

---

## 👨‍💻 Developer

**Waqas Afridi**  
DevBazm Intern (6-Week Program)  
Final Task Completion - Week 6

### Connect
- **LinkedIn**: [Your LinkedIn Profile]
- **GitHub**: [Your GitHub Profile]
- **Portfolio**: [Your Portfolio Website]

---

## 🙏 Acknowledgments

- **DevBazm Team** for providing this incredible learning opportunity
- **Moeed Ul Azeem** (CEO), **Faisal Akram** (Co-CEO), **Mujtaba Ahmad** (CTO)
- **UET Peshawar Computer Society** for community support
- **React Documentation** for comprehensive learning resources
- **Tailwind CSS** for the amazing utility-first framework

---

## 📄 License

This project was created as part of the DevBazm internship final assessment and is for educational purposes.

---

**Built with ❤️ by Waqas Afridi**  
**DevBazm Internship - Final Task (Week 6)**  
**December 2024**
