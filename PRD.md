# VIFIQ ACCOUNTS — Enterprise Governance Platform

VIFIQ ACCOUNTS is an enterprise governance platform delivering controlled access to virtual banking, betting, trading, and company formation infrastructure. Assist Modules (NUMSYNC, SYNCPLAYER, SYNC-IP) are VIFIQ-managed operational accelerators that support execution, compliance enforcement, and lifecycle assistance across partner systems.

**Experience Qualities**:
1. **Institutional** — Professional, trustworthy interface that communicates security and compliance at every touchpoint with polished animations and visual hierarchy
2. **Transparent** — All governance actions, validations, and entitlements are clearly visible with full audit trails and immutable logging
3. **Production-Ready** — Enterprise-grade reliability with locked authentication, polished public pages, and zero demo scaffolding in production UI

**Complexity Level**: Complex Application (advanced functionality with multiple views)
This platform requires robust state management across users, modules, validations, entitlements, transactions, and audit events. Multiple role-based views (ADMIN/OPERATOR), intricate dependency enforcement, and comprehensive audit logging demand a sophisticated architecture.

## Architecture Clarity

### Assist Modules (Internal Support)
VIFIQ-owned operational accelerators embedded within the control layer to support execution, compliance enforcement, and lifecycle assistance. **Non-infrastructure. Non-sellable. Activated contextually during workflows.**

- **NUMSYNC** — Virtual SIM Assistance: Telephony orchestration support for controlled lifecycle handling, usage observation, jurisdiction tagging, and compliance signaling
- **SYNCPLAYER** — Emulator Assistance: Testing workflow support for audit observation, dependency tracking, and access enforcement
- **SYNC-IP** — Network Assistance: Routing coordination support for geographic routing, compliance verification, and policy enforcement

### VIFIQ Partners (External Supply)
Autonomous third-party infrastructure providers operating independently. **Partners own infrastructure, are audited not controlled, and integrate via contracts and compliance.**

Examples: Wise, Revolut, Bet365, Companies House UK, Delaware Registry, Binance

**Clear Hierarchy**: Partners = External supply • Assist Modules = Internal support • Access = Outcome, not a section

## Essential Features

### Public Homepage
- **Functionality**: Enterprise-grade marketing presentation of VIFIQ governance capabilities with AI-powered chatbot, polished animations, gradient backgrounds, professional visual hierarchy, and ACCESS MARKET service catalog
- **Purpose**: Communicate platform value and governance guarantees before authentication with institutional design language, plus showcase premium services through controlled access flow, and provide immediate assistance via integrated chatbot
- **Trigger**: User visits root URL
- **Progression**: 
  - Animated hero section with large shield icon and VIFIQ ACCOUNTS branding
  - Enterprise positioning statement explaining governed infrastructure
  - Key statistics (users, services, countries, uptime)
  - Premium Infrastructure Services section showcasing 4 categories (Virtual Banking, Betting Accounts, Company Formation, Trading & Crypto)
  - ACCESS MARKET service catalog with multi-step pipeline (7 steps: Welcome → Category Selection → Service Family → Variant Selection → Summary → Intake Form → Validation & Routing)
  - "How it works" section with 6 enhanced steps featuring icons and animations
  - **Assist Modules section** with NUMSYNC, SYNCPLAYER, and SYNC-IP positioned as VIFIQ-managed operational accelerators (non-infrastructure, support layer, contextually activated)
  - **VIFIQ Partners section** showcasing external infrastructure providers (Wise, Revolut, Bet365, Companies House UK, Delaware Registry, Binance) as autonomous entities that own infrastructure and integrate via compliance
  - Operational Framework & Endpoint Validation FAQ explaining how assist modules support partner systems
  - Partner testimonials and case studies
  - Governance Guarantees with 4 pillars and enterprise compliance badges
  - Service comparison, request tracking, pricing calculator, and service templates
  - Contact form for inquiries
  - Final CTA section with gradient background
  - Comprehensive footer with social links, newsletter signup, trust badges
  - **AI Chatbot**: Floating button in bottom-right corner opens conversational interface
    - Powered by GPT-4o-mini for intelligent responses
    - Answers questions about services, validation, pricing, governance
    - Quick question shortcuts for common queries
    - WhatsApp integration for escalation
    - Real-time typing indicators and smooth animations
    - Persistent across page (doesn't reload)
- **Success criteria**: 
  - Clear communication of platform positioning
  - No language implying evasion or bypass
  - Smooth scroll-triggered animations throughout
  - Gradient accents and shadows for premium feel
  - Responsive layout for all device sizes
  - Locked modules clearly indicated
  - ACCESS MARKET branded consistently
  - Service categories include: Company Formation, Business Banks, Marketplace Accounts, Virtual Banks, Crypto Wallet & Exchange, Trading Accounts, Betting Accounts
  - Sequential navigation enforced in service selection flow
  - Chatbot provides accurate, helpful responses within 2-3 seconds
  - Chatbot maintains institutional tone and governance focus
  - Mobile-optimized chatbot interface
  - Visual distinction between major service categories using color coding

### Authentication System
- **Functionality**: Email + 4-digit PIN authentication with production-grade real-time validation feedback, gradient design, and polished loading states
- **Purpose**: Secure access with role assignment (ADMIN/OPERATOR) and enterprise-grade validation UX
- **Trigger**: User clicks "Sign In" or attempts to access protected routes
- **Progression**: View polished auth page with gradient background → Enter email + display name (optional) + PIN → Real-time field validation with green/red states and icons → Smooth loading animation → Validate credentials → Store session → Redirect to dashboard with transition
- **Success criteria**: Persistent sessions via localStorage; role-based access control enforced; real-time validation prevents invalid submissions with visual feedback (CheckCircle/XCircle icons); loading states provide smooth feedback; email normalization (trim + lowercase); display name captured during registration; all new accounts start with ACTIVE state; polished card design with shadows and gradients; tab switching with smooth transitions; demo account info clearly displayed for testing; back button with icon and hover effect

### Module Marketplace
- **Functionality**: Catalog of governed service modules with dependency chains and validation requirements
- **Purpose**: Display available integrations as governed entitlements, not uncontrolled products
- **Trigger**: User navigates to /app/marketplace
- **Progression**: Browse modules → Check dependencies → Review validation requirements → Request activation → Submit for validation (if needed) → Complete mock checkout → Receive entitlement
- **Success criteria**: Dependency enforcement (PROXY_VPN requires EMULATOR_ACCESS); validation gating works correctly; accounts must be ACTIVE to activate modules

### Validation Workflow
- **Functionality**: Multi-type validation requests with approval/rejection lifecycle and custom step-by-step workflow
- **Purpose**: Ensure compliance and risk assessment before granting entitlements with guided user experience
- **Trigger**: Module activation requiring validation or manual submission via custom workflow
- **Progression**: 
  - **Step 1**: Select validation type (identity, compliance, jurisdiction, risk, manual_review) with visual cards showing purpose and requirements
  - **Step 2**: Fill required fields based on validation type with module selection option
  - **Step 3**: Upload evidence documentation with description (simulated upload for demo)
  - **Step 4**: Review all submitted information before final submission
  - **Step 5**: Confirmation and submission with unique request ID generation
  - Admin reviews → Approve/reject with reason → Audit event generated → Status updated
- **Success criteria**: 
  - All state changes audited
  - Only admins can approve
  - Validations block entitlement issuance
  - Clear progress indicator shows current step (1-5)
  - Each validation type has specific required fields
  - Evidence description captured for review
  - Smooth animations between workflow steps
  - Form validation prevents incomplete submissions

### Entitlement Management
- **Functionality**: Time-bound, revocable licenses for service modules
- **Purpose**: Granular control over access rights with expiration and suspension
- **Trigger**: Successful module activation or admin grant
- **Progression**: Issue entitlement → Set expiration → Monitor status → Pause/revoke as needed → Log all changes
- **Success criteria**: Entitlements auto-expire; dependencies enforced (can't activate child without parent)

### Audit Log
- **Functionality**: Immutable event stream of all governance actions
- **Purpose**: Complete transparency and accountability for compliance
- **Trigger**: Any state mutation (user state change, validation decision, entitlement issue/revoke, etc.)
- **Progression**: Action occurs → Event generated with before/after state → Event persisted → Visible in audit log → Exportable as JSON
- **Success criteria**: No deletion possible; all critical actions captured; filterable by entity type, action, actor, date

### Mock Payment System
- **Functionality**: Simulated wallet and transaction processing
- **Purpose**: Demonstrate billing integration without real payments
- **Trigger**: User adds funds or purchases module activation
- **Progression**: Select amount → Mock payment → Update balance → Create transaction record → Display in billing history
- **Success criteria**: Balance updates correctly; transactions logged; no real payment processing

### Admin Controls
- **Functionality**: Module registry management, user state control, policy configuration
- **Purpose**: Administrative governance over platform behavior
- **Trigger**: Admin navigates to /app/admin
- **Progression**: View module registry → Create/edit/disable modules → Set policies → Manage user states → Review actions in audit log
- **Success criteria**: Only ADMIN role can access; all admin actions audited; module changes affect marketplace immediately

### User Profile Management
- **Functionality**: Enterprise-grade identity profile management with avatar uploads, display name editing, and comprehensive account metadata
- **Purpose**: Governed identity management emphasizing account integrity and controlled personalization
- **Trigger**: User navigates to /app/profile
- **Progression**: View identity profile → Upload/change avatar (hover interaction) → Edit display name (inline editing with validation) → View account metadata (User ID, status, region, creation date) → All changes audited with IP tracking
- **Success criteria**: Avatar upload with file type/size validation (5MB max); inline display name editing with character limits (50 chars); clean institutional UI with minimal clutter; all modifications generate audit events; responsive layout for mobile/desktop; hover-to-upload avatar interaction

### Service Comparison Tool
- **Functionality**: Interactive comparison matrix allowing users to compare up to 4 service domains side-by-side across features, pricing, delivery times, and support options
- **Purpose**: Help users make informed decisions by highlighting differences between service domains
- **Trigger**: Displayed on homepage in dedicated section
- **Progression**: View default comparison (Wise vs Revolut) → Select/deselect services (2-4 max) → View detailed comparison table → Click "View Details" to navigate to service page
- **Success criteria**: 
  - Maximum 4 services compared at once with validation feedback
  - Comparison table shows: setup price, monthly fees, delivery time, support level, regions, and all features
  - Visual indicators (checkmarks/crosses) for feature availability
  - Sticky left column for feature names during horizontal scroll
  - Responsive design with horizontal scroll on mobile
  - Smooth animations when changing selection
  - Direct navigation to service detail pages

### Service Request Tracking System
- **Functionality**: Complete request lifecycle management with status updates, history tracking, and admin workflow controls
- **Purpose**: Provide transparency and accountability for service enablement requests from submission to completion
- **Trigger**: User creates new service request or views existing requests
- **Progression**: 
  - Create request: Select domain → Enter service type → Specify jurisdiction → Choose urgency (Standard/Priority) → Add notes → Submit → Receive unique request ID
  - Track requests: Search by ID/service → Filter by status → View request cards → Click for detailed history → Update status (role-based actions) → Export data
- **Success criteria**: 
  - Unique request IDs generated (REQ-TIMESTAMP-RANDOM format)
  - 7 status types: PENDING, UNDER_REVIEW, APPROVED, IN_PROGRESS, COMPLETED, REJECTED, CANCELLED
  - Complete status history with timestamps and notes
  - Role-based actions (users can cancel pending, admins can approve/reject)
  - Estimated delivery calculation based on urgency
  - Search and filter functionality
  - JSON export for reporting
  - Real-time status updates with toast notifications
  - Data persisted using useKV hook

### Customer Testimonials & Reviews
- **Functionality**: Verified customer reviews with filtering, carousel navigation, and service-specific testimonials
- **Purpose**: Build trust and provide social proof through authentic customer feedback
- **Trigger**: Displayed on homepage and individual service detail pages
- **Progression**: 
  - Homepage: View overall rating → Filter by service domain → Navigate carousel → Click review to expand
  - Service pages: View domain-specific reviews → Read full testimonials → See verified badges
- **Success criteria**: 
  - 10+ authentic reviews across all service domains
  - 5-star rating system with visual stars
  - Verified customer badges
  - Author details (initials, jurisdiction)
  - Carousel navigation (previous/next with position indicator)
  - Filter by service domain with automatic reset
  - Average rating calculation
  - Service-specific reviews shown on detail pages
  - Helpful count for each review
  - Professional card layout with hover effects
  - Responsive grid on homepage (6 reviews visible)

### Breadcrumb Navigation
- **Functionality**: Contextual navigation trail showing current location within the app hierarchy
- **Purpose**: Improve spatial awareness and enable quick navigation to parent pages
- **Trigger**: User navigates to any page within the authenticated app
- **Progression**: View breadcrumb trail → Click parent page link → Navigate back to previous level
- **Success criteria**: Breadcrumbs display on all authenticated pages; Home icon shown on Overview page; Parent pages are clickable; Current page is highlighted with accent background; Smooth transitions and hover states; Consistent spacing and typography

## Edge Case Handling

- **Missing Dependencies** — Module activation blocked with clear message indicating required parent modules
- **Expired Entitlements** — Status automatically updated to EXPIRED; user notified in dashboard
- **Invalid Validations** — Rejected validations prevent module activation with reason displayed
- **Session Expiry** — Automatic redirect to sign-in; session state cleared
- **Role Violations** — Admin-only routes return 403 for operators; action blocked with message
- **Circular Dependencies** — Prevented during module creation; validation enforced
- **Demo Data Reset** — All localStorage cleared; seed data reloaded; user session persisted

## Design Direction

The design should evoke authority, precision, and institutional trust. This is a governance platform used by compliance-conscious organizations, not a consumer product. Visual language should communicate security, transparency, and non-negotiable enforcement of rules.

## Color Selection

A dark, authoritative palette with enhanced contrast and vibrant accents for critical actions and states.

- **Primary Color**: Deep Navy `oklch(0.22 0.05 250)` — Communicates authority, trust, and institutional security with increased depth
- **Secondary Colors**: 
  - Charcoal Gray `oklch(0.15 0.015 250)` for backgrounds and cards (darker, more professional)
  - Warm Gray `oklch(0.30 0.02 250)` for muted elements
- **Accent Color**: Vibrant Cyan `oklch(0.75 0.18 195)` — High-visibility indicator for active states, CTAs, and focus with increased saturation
- **Foreground/Background Pairings**:
  - Background (Deep Charcoal `oklch(0.10 0.015 250)`): Bright text (`oklch(0.97 0.01 250)`) — Ratio 16.2:1 ✓
  - Primary (Deep Navy `oklch(0.22 0.05 250)`): White text (`oklch(1 0 0)`) — Ratio 12.4:1 ✓
  - Accent (Vibrant Cyan `oklch(0.75 0.18 195)`): Dark text (`oklch(0.10 0.015 250)`) — Ratio 12.8:1 ✓
  - Success (Emerald `oklch(0.68 0.20 155)`): Dark text (`oklch(0.10 0.015 250)`) — Ratio 10.5:1 ✓
  - Warning (Amber `oklch(0.78 0.18 75)`): Dark text (`oklch(0.10 0.015 250)`) — Ratio 12.2:1 ✓
  - Destructive (Crimson `oklch(0.58 0.24 15)`): White text (`oklch(1 0 0)`) — Ratio 5.8:1 ✓

## Font Selection

Typography conveys modern technical precision with a distinctive, geometric aesthetic for enhanced visual interest.

- **Primary Font**: Space Grotesk — Contemporary geometric sans-serif with technical character; distinctive and memorable
- **Monospace Font**: JetBrains Mono — For IDs, keys, timestamps, and technical data

- **Typographic Hierarchy**:
  - H1 (Page Titles): Space Grotesk SemiBold / 32px / -0.01em letter spacing / 1.2 line height
  - H2 (Section Headers): Space Grotesk SemiBold / 24px / normal letter spacing / 1.3 line height
  - H3 (Card Titles): Space Grotesk Medium / 18px / normal letter spacing / 1.4 line height
  - Body (Primary Text): Space Grotesk Regular / 15px / normal letter spacing / 1.6 line height
  - Small (Meta Info): Space Grotesk Regular / 13px / normal letter spacing / 1.5 line height
  - Code (IDs/Keys): JetBrains Mono Regular / 13px / normal letter spacing / 1.4 line height

## Animations

Animations should be purposeful, subtle, and reinforce the sense of structured governance with professional polish. Framer Motion used for scroll-triggered and page transitions.

- **Page Entry**: 600ms fade-up from opacity 0 with ease-out for main content sections
- **Scroll Triggers**: Elements fade and slide up when entering viewport with staggered delays (100ms per item)
- **Hero Elements**: Gradient glow effects on icons with blur; background radial gradients with opacity layers
- **State Transitions**: 200ms ease-out for badge color changes, status updates
- **Card Hovers**: 300ms border color transition from border/50 to accent/30; shadow lift with accent glow
- **Button Interactions**: 150ms ease-out for background changes; icon translations on hover (ArrowRight moves right 4px)
- **Panel Slides**: 300ms ease-in-out for drawer/sheet entry with subtle fade
- **Loading States**: Smooth button text transitions; disabled states with opacity reduction
- **Tab Switching**: Content fade with 200ms duration; smooth panel transitions
- **Input Validation**: Icons appear with 150ms fade; border color changes with 200ms transition

## Component Selection

- **Components**:
  - **Layout**: Custom sidebar navigation with collapsible groups; top bar with status badges; breadcrumb navigation trail
  - **Breadcrumbs**: Custom component using shadcn Button for clickable links with House icon, CaretRight separators, and accent highlighting for current page
  - **Cards**: shadcn Card for module display, KPI panels, and content containers
  - **Tables**: shadcn Table for audit logs, transactions, entitlements, validations
  - **Dialogs**: shadcn Dialog for module details, validation submission
  - **Sheets**: shadcn Sheet for side drawers (validation detail, entitlement detail)
  - **Badges**: shadcn Badge for status indicators (VERIFIED, ACTIVE, PENDING, REVOKED, etc.)
  - **Forms**: shadcn Form with react-hook-form for validation requests, module creation
  - **Buttons**: shadcn Button with variants (default, destructive, outline, ghost)
  - **Inputs**: shadcn Input for text fields; shadcn Select for dropdowns
  - **Alerts**: sonner Toast for success/error feedback
  - **Tabs**: shadcn Tabs for marketplace categories, settings sections
  - **Separator**: shadcn Separator for visual hierarchy in dense layouts
  - **ScrollArea**: shadcn ScrollArea for long lists and tables

- **Customizations**:
  - **Status Timeline**: Custom component showing validation lifecycle with connector lines
  - **Dependency Tree**: Visual representation of module dependency chains
  - **Audit Event Card**: Expandable card showing before/after state diffs

- **States**:
  - **Buttons**: Subtle elevation on hover; pressed state with slight scale (0.98); disabled with reduced opacity and no interaction
  - **Cards**: Border highlight on hover for interactive cards; shadow lift for module cards
  - **Inputs**: Accent border on focus; error state with destructive border; success state with emerald border
  - **Status Badges**: Color-coded (green=active/approved, yellow=pending, red=revoked/rejected, gray=expired/disabled)

- **Icon Selection**:
  - Shield (security/governance), Lock (restricted access), CheckCircle (approved), XCircle (rejected), Clock (pending), Eye (audit visibility), Database (modules), Users (admin), CreditCard (billing), Warning (alerts)

- **Spacing**:
  - Page padding: p-6 on desktop, p-4 on mobile
  - Card padding: p-6
  - Section gaps: gap-6 for major sections, gap-4 for related groups
  - Table cell padding: px-4 py-3
  - Button padding: px-4 py-2 (default), px-6 py-3 (large)

- **Mobile**:
  - Sidebar collapses to hamburger menu using Sheet component
  - Tables convert to stacked cards with key fields visible on mobile
  - Two-column layouts stack to single column on screens < 768px
  - Touch targets minimum 44x44px for all interactive elements
  - Reduce padding to p-4 for pages, p-4 for cards on mobile
  - Header badges and info compress or hide secondary info on small screens
  - Navigation labels shorten on mobile (e.g., "Module Registry" → "Modules")
  - Tabs use grid layout to ensure equal width distribution
  - Export/action buttons show icon-only or shortened text on mobile
  - All grids use responsive breakpoints: grid-cols-1 (mobile), sm:grid-cols-2, md:grid-cols-3, lg:grid-cols-4
