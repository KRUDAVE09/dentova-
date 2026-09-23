# Dentova Frontend Architecture Documentation

## Overview
Dentova is a real-world dental clinic management SaaS built with a modern React, TypeScript, and Vite tech stack. This document details the frontend architecture, folder organization, state management, service abstractions, routing, and multi-chair design principles.

---

## Directory Structure

```
dentova/
├── docs/
│   ├── FRONTEND.md
│   └── DESIGN.md
└── frontend/
    ├── src/
    │   ├── assets/        # Static media assets & icons
    │   ├── components/
    │   │   ├── ui/        # Atomic & reusable UI component library
    │   │   └── layout/    # Page shells, sidebar, header, mobile drawer
    │   ├── constants/     # App route keys, clinic defaults, design tokens
    │   ├── context/       # Global state contexts (ClinicContext, ToastContext)
    │   ├── hooks/         # Custom React hooks (useClinic, useToast, useMediaQuery)
    │   ├── pages/         # Page components for each app route
    │   ├── routes/        # Router tree configuration (AppRoutes.tsx)
    │   ├── services/      # Centralized API service abstractions (apiClient, stubs)
    │   ├── types/         # TypeScript interfaces & types (clinic, ui, navigation)
    │   └── utils/         # Helper functions (class merging cn())
    ├── .env.example       # Template environment variables
    ├── .gitignore         # Ignored files (secrets, node_modules, build outputs)
    ├── package.json
    ├── tsconfig.json
    └── vite.config.ts
```

---

## Technical Stack

| Layer | Technology | Usage |
| :--- | :--- | :--- |
| **Framework** | React 19 + TypeScript | Component tree & strict type checking |
| **Build Tool** | Vite 8 | Fast ESM hot module reloading & bundling |
| **Styling** | Tailwind CSS v4 | Utility-first styling & custom design tokens |
| **Routing** | React Router v7 (`react-router-dom`) | Declarative SPA route management |
| **Icons** | Lucide React | Modern, accessible iconography |

---

## Multi-Chair Architecture

Dentova is engineered to scale seamlessly across clinics of any size without hardcoding for a single operatory.

### Supported Configurations
- **1 Chair** (Solo Practice)
- **2 Chairs** (Duo Operatory)
- **5 Chairs** (Standard Dental Suite)
- **10+ Chairs** (Enterprise Dental Center)

### Implementation
- `ClinicContext` (`src/context/ClinicContext.tsx`) manages the active clinic scale preset and list of chairs.
- `Chair` interface (`src/types/clinic.ts`) models chair statuses (`available`, `occupied`, `cleaning`, `maintenance`), assigned doctor, current patient, and procedure details.
- Header and Sidebar components include an interactive preset switcher for testing operatory scale dynamically.

---

## Routing & Page Structure

Routes are declared in `src/routes/AppRoutes.tsx` using `react-router-dom`:

| Path | Component | Description | Layout |
| :--- | :--- | :--- | :--- |
| `/login` | `LoginPage` | Authentication placeholder | Standalone |
| `/dashboard` | `DashboardPage` | Operatory overview & metrics | MainLayout |
| `/patients` | `PatientsPage` | Patient directory & search | MainLayout |
| `/patients/:id` | `PatientDetailPage` | Patient chart & medical history | MainLayout |
| `/appointments` | `AppointmentsPage` | Multi-chair appointment calendar | MainLayout |
| `/waiting-room` | `WaitingRoomPage` | Patient check-in & dispatch queue | MainLayout |
| `/follow-ups` | `FollowUpsPage` | Post-op care tracking & call logs | MainLayout |
| `/treatments` | `TreatmentsPage` | ADA procedure catalog & fees | MainLayout |
| `/billing` | `BillingPage` | Invoices & insurance claims | MainLayout |
| `/inventory` | `InventoryPage` | Supplies stock & sterilisation logs | MainLayout |
| `/messages` | `MessagesPage` | Staff messaging & patient SMS logs | MainLayout |
| `/reports` | `ReportsPage` | Analytics & chair utilization | MainLayout |
| `/settings` | `SettingsPage` | Practice details & operatory scale setup | MainLayout |

---

## Service Layer Abstraction

All future backend communication is encapsulated inside `src/services/`:
- **`apiClient.ts`**: Unified `fetch` wrapper handling base URLs, JSON headers, and `ApiError` handling.
- **`patientService.ts`**: Endpoint stubs for patient CRUD operations.
- **`appointmentService.ts`**: Endpoint stubs for scheduling & chair dispatches.
- **`clinicService.ts`**: Endpoint stubs for practice & chair setup.

---

## Security Practices

1. **Zero Hardcoded Secrets**: Secrets and API keys are strictly excluded from code.
2. **Environment Template**: `.env.example` provides configuration keys without real values.
3. **Git Hygiene**: `.env` and `.env.local` files are ignored in `.gitignore`.
4. **No Sensitive Local Storage**: Patient PHI is not saved to unencrypted `localStorage`.
5. **DOM Protection**: `dangerouslySetInnerHTML` is forbidden to eliminate XSS risks.
