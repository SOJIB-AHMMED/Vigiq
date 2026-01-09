import type { AppState, Module } from './types'

function simpleHash(str: string): string {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash
  }
  return Math.abs(hash).toString(16)
}

export function createSeedData(): AppState {
  const modules: Module[] = [
    {
      moduleKey: 'ACCOUNT_GOVERNANCE_CORE',
      displayName: 'Account & Governance Core',
      description: 'Foundational identity, validation, and access governance layer. Always present; not purchasable separately.',
      category: 'CORE',
      replaceable: false,
      metered: false,
      requiresValidation: true,
      dependencies: [],
      pricing: {
        monthlyPrice: 0,
        usageUnit: 'N/A',
        usagePrice: 0
      },
      status: 'ACTIVE'
    },
    {
      moduleKey: 'VIRTUAL_NUMBER_ACCESS',
      displayName: 'NUMSYNC - Virtual SIM Access',
      description: 'Governed virtual SIM and number provisioning with usage metering and jurisdiction validation.',
      category: 'COMMUNICATION',
      replaceable: true,
      metered: true,
      requiresValidation: true,
      dependencies: ['ACCOUNT_GOVERNANCE_CORE'],
      pricing: {
        monthlyPrice: 49.99,
        usageUnit: 'number/month',
        usagePrice: 2.50
      },
      status: 'ACTIVE'
    },
    {
      moduleKey: 'EMULATOR_ACCESS',
      displayName: 'SYNCPLAYER - Emulator Environment',
      description: 'Controlled emulator environment access for testing and development with full audit logging.',
      category: 'INFRASTRUCTURE',
      replaceable: true,
      metered: true,
      requiresValidation: true,
      dependencies: ['ACCOUNT_GOVERNANCE_CORE'],
      pricing: {
        monthlyPrice: 79.99,
        usageUnit: 'instance-hour',
        usagePrice: 0.15
      },
      status: 'ACTIVE'
    },
    {
      moduleKey: 'PROXY_VPN_ACCESS',
      displayName: 'SYNC-IP - Proxy & VPN Access',
      description: 'Governed proxy and VPN infrastructure with geographic routing controls and compliance enforcement.',
      category: 'SECURITY',
      replaceable: true,
      metered: true,
      requiresValidation: true,
      dependencies: ['ACCOUNT_GOVERNANCE_CORE', 'EMULATOR_ACCESS'],
      pricing: {
        monthlyPrice: 99.99,
        usageUnit: 'GB transferred',
        usagePrice: 0.10
      },
      status: 'ACTIVE'
    },
    {
      moduleKey: 'DATA_ANALYTICS_ACCESS',
      displayName: 'SYNC-DATA - Analytics & Monitoring',
      description: 'Governed data analytics and monitoring infrastructure with compliance reporting and audit trail visualization.',
      category: 'INFRASTRUCTURE',
      replaceable: true,
      metered: true,
      requiresValidation: true,
      dependencies: ['ACCOUNT_GOVERNANCE_CORE'],
      pricing: {
        monthlyPrice: 69.99,
        usageUnit: 'query/1000',
        usagePrice: 0.05
      },
      status: 'ACTIVE'
    }
  ]

  return {
    users: [],
    modules,
    validations: [],
    entitlements: [],
    transactions: [],
    auditEvents: [],
    walletBalance: 0,
    policies: {
      defaultEntitlementDurationDays: 30
    }
  }
}

export function hashPin(pin: string): string {
  return simpleHash(pin)
}
