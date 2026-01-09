export type UserRole = 'ADMIN' | 'OPERATOR'

export type UserState = 'ACTIVE' | 'RESTRICTED' | 'SUSPENDED'

export type Region = 'UK' | 'EEA' | 'INTERNATIONAL'

export interface User {
  id: string
  email: string
  pinHash: string
  role: UserRole
  state: UserState
  region: Region
  createdAt: string
  avatarUrl?: string
  displayName?: string
  notificationPreferences?: NotificationPreferences
}

export interface NotificationPreferences {
  emailNotifications: {
    validationUpdates: boolean
    entitlementChanges: boolean
    transactionAlerts: boolean
    systemAnnouncements: boolean
  }
  pushNotifications: {
    validationUpdates: boolean
    entitlementChanges: boolean
    transactionAlerts: boolean
    systemAnnouncements: boolean
  }
}

export type ModuleCategory = 'CORE' | 'COMMUNICATION' | 'INFRASTRUCTURE' | 'SECURITY'

export type ModuleStatus = 'ACTIVE' | 'DISABLED'

export interface ModulePricing {
  monthlyPrice: number
  usageUnit: string
  usagePrice: number
}

export interface Module {
  moduleKey: string
  displayName: string
  description: string
  category: ModuleCategory
  replaceable: boolean
  metered: boolean
  requiresValidation: boolean
  dependencies: string[]
  pricing: ModulePricing
  status: ModuleStatus
}

export type ValidationType = 'IDENTITY' | 'COMPLIANCE' | 'JURISDICTION' | 'RISK' | 'MANUAL_REVIEW'

export type ValidationStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'EXPIRED'

export interface Validation {
  validationId: string
  userId: string
  moduleKey: string | null
  validationType: ValidationType
  status: ValidationStatus
  evidenceReference: string
  validatedAt: string | null
  submittedAt: string
  reviewerId: string | null
  decisionReason: string | null
}

export type EntitlementStatus = 'ISSUED' | 'ACTIVE' | 'SUSPENDED' | 'REVOKED' | 'EXPIRED'

export interface Entitlement {
  entitlementId: string
  userId: string
  moduleKey: string
  scope: string
  limits: Record<string, any>
  status: EntitlementStatus
  issuedAt: string
  expiresAt: string | null
}

export type TransactionType = 'TOPUP' | 'CHARGE' | 'REFUND'

export interface Transaction {
  transactionId: string
  userId: string
  type: TransactionType
  amount: number
  currency: string
  reference: string
  atUtc: string
}

export type EntityType = 'USER' | 'MODULE' | 'VALIDATION' | 'ENTITLEMENT' | 'TRANSACTION' | 'POLICY'

export interface AuditEvent {
  eventId: string
  entityType: EntityType
  entityId: string
  action: string
  previousState: any
  newState: any
  actorId: string
  atUtc: string
  metadata: Record<string, any>
  ipAddress?: string
  userAgent?: string
}

export interface Session {
  userId: string
  email: string
  role: UserRole
}

export interface AppState {
  users: User[]
  modules: Module[]
  validations: Validation[]
  entitlements: Entitlement[]
  transactions: Transaction[]
  auditEvents: AuditEvent[]
  walletBalance: number
  policies: {
    defaultEntitlementDurationDays: number
  }
}
