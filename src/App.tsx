import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { Toaster } from '@/components/ui/sonner'
import { AuthProvider, useAuth } from '@/lib/auth'
import { Homepage } from '@/components/Homepage'
import { SignInPage } from '@/components/SignInPage'
import { AppLayout } from '@/components/AppLayout'
import { OverviewPage } from '@/components/pages/OverviewPage'
import { MarketplacePage } from '@/components/pages/MarketplacePage'
import { ActiveModulesPage } from '@/components/pages/ActiveModulesPage'
import { ValidationPage } from '@/components/pages/ValidationPage'
import { BillingPage } from '@/components/pages/BillingPage'
import { AuditLogPage } from '@/components/pages/AuditLogPage'
import { AdminPage } from '@/components/pages/AdminPage'
import { SettingsPage } from '@/components/pages/SettingsPage'
import { ForumPage } from '@/components/pages/ForumPage'
import { ProfilePage } from '@/components/pages/ProfilePage'
import { ServiceDetailPage } from '@/components/pages/ServiceDetailPage'
import { TermsPage } from '@/components/pages/TermsPage'
import { PrivacyPage } from '@/components/pages/PrivacyPage'
import { RefundPolicyPage } from '@/components/pages/RefundPolicyPage'
import { AcceptableUsePage } from '@/components/pages/AcceptableUsePage'
import { KYCPolicyPage } from '@/components/pages/KYCPolicyPage'
import { DPAPage } from '@/components/pages/DPAPage'
import { LoadingBar } from '@/components/LoadingProgress'
import { useEffect, useState } from 'react'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { session } = useAuth()
  
  if (!session) {
    return <Navigate to="/signin" replace />
  }
  
  return <>{children}</>
}

function AppRoutes() {
  const location = useLocation()
  const [isNavigating, setIsNavigating] = useState(false)

  useEffect(() => {
    setIsNavigating(true)
    const timeout = setTimeout(() => {
      setIsNavigating(false)
    }, 600)
    
    return () => clearTimeout(timeout)
  }, [location.pathname])

  return (
    <>
      <LoadingBar isLoading={isNavigating} duration={600} />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/service/:domain" element={<ServiceDetailPage />} />
        <Route path="/policy/terms" element={<TermsPage />} />
        <Route path="/policy/privacy" element={<PrivacyPage />} />
        <Route path="/policy/refund" element={<RefundPolicyPage />} />
        <Route path="/policy/acceptable-use" element={<AcceptableUsePage />} />
        <Route path="/policy/kyc" element={<KYCPolicyPage />} />
        <Route path="/policy/dpa" element={<DPAPage />} />
        
        <Route path="/app/*" element={
          <ProtectedRoute>
            <AppLayout>
              <Routes>
                <Route path="overview" element={<OverviewPage />} />
                <Route path="profile" element={<ProfilePage />} />
                <Route path="marketplace" element={<MarketplacePage />} />
                <Route path="active" element={<ActiveModulesPage />} />
                <Route path="validation" element={<ValidationPage />} />
                <Route path="billing" element={<BillingPage />} />
                <Route path="audit" element={<AuditLogPage />} />
                <Route path="forum" element={<ForumPage />} />
                <Route path="admin" element={<AdminPage />} />
                <Route path="settings" element={<SettingsPage />} />
                <Route path="*" element={<Navigate to="/app/overview" replace />} />
              </Routes>
            </AppLayout>
          </ProtectedRoute>
        } />
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
        <Toaster position="top-right" />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
