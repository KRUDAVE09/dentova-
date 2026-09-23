# Dentova Design System Documentation

## Visual Identity: Premium Soft UI with Selective Glassmorphism

Dentova uses a calm, clinical, high-end healthcare design system. It combines soft organic neutrals with tailored champagne accents and subtle glassmorphic highlights.

---

## Design Principles

1. **Clean & Calm**: Soft off-white backgrounds reduce ocular fatigue for clinical staff during long shifts.
2. **Selective Glassmorphism**: Glass effects (`backdrop-blur-md bg-white/75 border-white/60`) are reserved strictly for elevated elements:
   - Selected dashboard cards
   - Chair status cards
   - Toast notifications
   - Modals and overlays
3. **High Readability Solids**: Tables, forms, and dense data lists remain solid white (`bg-white`) to maximize contrast and scan speed.
4. **Generous Spacing & Touch Targets**: All interactive elements maintain a minimum target height of $44\text{px}$ for touch-screen operatory displays.

---

## Color Palette

| Token Name | Hex Code | Visual Purpose |
| :--- | :--- | :--- |
| **Warm Ivory (Background)** | `#FAF8F5` | Main application backdrop |
| **Deep Neutral (Text / Dark UI)** | `#1F2421` | High contrast headings, dark sidebar |
| **Muted Text** | `#6B7280` | Subtitles, helper text, captions |
| **Champagne Accent** | `#C5A059` | Primary brand accent, active state rings, badges |
| **Champagne Tint** | `#F4EBE1` | Subtle container fill, badge backgrounds |
| **Soft Border** | `#E5E0D8` | Structural card borders and dividers |
| **Success Emerald** | `#10B981` | Available chairs, completed treatments, active status |
| **Danger Rose** | `#F43F5E` | Occupied chairs, overdue payments, low stock |
| **Warning Amber** | `#F59E0B` | Cleaning status, pending follow-ups |

---

## Component Specifications

### 1. GlassCard
- **CSS Class**: `.glass-panel`, `.glass-card-selected`, `.chair-glass-occupied`, `.chair-glass-available`
- **Effect**: `backdrop-filter: blur(12px) -webkit-backdrop-filter: blur(12px)`
- **Border**: `1px solid rgba(255, 255, 255, 0.6)` or `1px solid rgba(197, 160, 89, 0.4)`

### 2. Buttons
- **Primary**: Deep Neutral (`#1F2421`) with soft hover scale
- **Champagne**: Accent (`#C5A059`) for high-priority CTA actions
- **Glass**: Semi-transparent frosted glass for overlay controls
- **Touch Target**: Minimum height $44\text{px}$ across sizes

### 3. Data Tables
- **Background**: Solid White (`#FFFFFF`)
- **Header**: `#FAF8F5` tint with bold uppercase text
- **Row Hover**: Soft `#FAF8F5` highlight with instant feedback

---

## Responsive Breakpoints

- **Desktop ($\ge 1024\text{px}$)**: Persistent 64px–256px collapsible sidebar, full operatory grid.
- **Tablet ($768\text{px} - 1023\text{px}$)**: Compact navigation, responsive 2-column card layouts.
- **Mobile ($< 768\text{px}$)**: Slide-over mobile navigation drawer, stacked content cards, $44\text{px}$ min touch targets.

---

## Accessibility (a11y) Standards

- **Semantic Tags**: Usage of `<main>`, `<aside>`, `<header>`, `<nav>`, `<dialog>`, and `<table>`.
- **Keyboard Focus**: Visible focus rings (`outline: 2px solid #C5A059`).
- **Color Independence**: Status information always pairs color with text labels or iconography.
