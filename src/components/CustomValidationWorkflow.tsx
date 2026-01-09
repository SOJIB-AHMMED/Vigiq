import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { CheckCircle, XCircle, Clock, ArrowRight, ArrowLeft, Upload, FileText, IdentificationCard, MapPin, Shield } from '@phosphor-icons/react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'
import { useAuth } from '@/lib/auth'
import type { ValidationType } from '@/lib/types'

type ValidationStep = 1 | 2 | 3 | 4 | 5

const validationTypeConfig = {
  identity: {
    title: 'Identity Validation',
    description: 'Verify your identity with official documents',
    icon: IdentificationCard,
    requiredFields: ['Full Legal Name', 'Date of Birth', 'ID Document Number'],
    evidenceType: 'Government-issued ID (Passport, Driver\'s License, or National ID)'
  },
  compliance: {
    title: 'Compliance Validation',
    description: 'Ensure regulatory compliance requirements',
    icon: Shield,
    requiredFields: ['Business Registration Number', 'Tax ID', 'Compliance Officer Name'],
    evidenceType: 'Business registration documents and compliance certificates'
  },
  jurisdiction: {
    title: 'Jurisdiction Validation',
    description: 'Verify your regional eligibility',
    icon: MapPin,
    requiredFields: ['Country of Residence', 'Proof of Address', 'Jurisdiction Code'],
    evidenceType: 'Utility bill or bank statement (last 3 months)'
  },
  risk: {
    title: 'Risk Assessment',
    description: 'Complete risk evaluation questionnaire',
    icon: Shield,
    requiredFields: ['Business Purpose', 'Expected Transaction Volume', 'Source of Funds'],
    evidenceType: 'Supporting documentation for business activities'
  },
  manual_review: {
    title: 'Manual Review',
    description: 'Additional verification by compliance team',
    icon: FileText,
    requiredFields: ['Review Reason', 'Additional Context'],
    evidenceType: 'Any supporting documents requested by compliance team'
  }
}

export function CustomValidationWorkflow() {
  const { getCurrentUser, appState, updateAppState, addAuditEvent } = useAuth()
  const currentUser = getCurrentUser()

  const [currentStep, setCurrentStep] = useState<ValidationStep>(1)
  const [selectedType, setSelectedType] = useState<ValidationType | null>(null)
  const [moduleKey, setModuleKey] = useState('')
  const [evidenceText, setEvidenceText] = useState('')
  const [formData, setFormData] = useState<Record<string, string>>({})

  if (!currentUser) return null

  const progress = (currentStep / 5) * 100

  const handleTypeSelect = (type: ValidationType) => {
    setSelectedType(type)
    setCurrentStep(2)
  }

  const handleFormSubmit = () => {
    const config = selectedType ? validationTypeConfig[selectedType] : null
    if (!config) return

    const missingFields = config.requiredFields.filter(field => !formData[field]?.trim())
    if (missingFields.length > 0) {
      toast.error(`Please fill all required fields: ${missingFields.join(', ')}`)
      return
    }

    setCurrentStep(3)
  }

  const handleEvidenceSubmit = () => {
    if (!evidenceText.trim()) {
      toast.error('Please provide evidence details')
      return
    }
    setCurrentStep(4)
  }

  const handleReview = () => {
    setCurrentStep(5)
  }

  const handleFinalSubmit = () => {
    if (!selectedType) return

    const validationId = `VAL-${Date.now().toString(36).toUpperCase()}`
    
    const newValidation = {
      validationId,
      userId: currentUser.id,
      moduleKey: moduleKey || null,
      validationType: selectedType,
      status: 'PENDING' as const,
      evidenceReference: evidenceText,
      submittedAt: new Date().toISOString(),
      validatedAt: null,
      reviewerId: null,
      decisionReason: null
    }

    updateAppState(state => ({
      ...state,
      validations: [...state.validations, newValidation]
    }))

    addAuditEvent({
      entityType: 'VALIDATION',
      entityId: validationId,
      action: 'VALIDATION_CREATED',
      previousState: null,
      newState: { status: 'PENDING', type: selectedType },
      actorId: currentUser.id,
      metadata: { 
        validationType: selectedType,
        moduleKey: moduleKey || undefined,
        formData
      }
    })

    toast.success('Validation request submitted successfully', {
      description: `Request ID: ${validationId}`
    })

    setCurrentStep(1)
    setSelectedType(null)
    setModuleKey('')
    setEvidenceText('')
    setFormData({})
  }

  const handleReset = () => {
    setCurrentStep(1)
    setSelectedType(null)
    setModuleKey('')
    setEvidenceText('')
    setFormData({})
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Custom Validation Workflow</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Step-by-step validation request process
          </p>
        </div>
        {currentStep > 1 && (
          <Button variant="outline" size="sm" onClick={handleReset}>
            <ArrowLeft className="mr-2" size={16} />
            Start Over
          </Button>
        )}
      </div>

      <Card className="border-accent/20">
        <CardHeader>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Validation Progress</CardTitle>
              <Badge variant="outline" className="bg-accent/10 text-accent border-accent/30">
                Step {currentStep} of 5
              </Badge>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </CardHeader>
      </Card>

      <AnimatePresence mode="wait">
        {currentStep === 1 && (
          <motion.div
            key="step-1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Select Validation Type</CardTitle>
                <CardDescription>
                  Choose the type of validation you need to complete
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  {(Object.entries(validationTypeConfig) as [ValidationType, typeof validationTypeConfig.identity][]).map(([type, config]) => {
                    const Icon = config.icon
                    return (
                      <Card
                        key={type}
                        className="cursor-pointer border-border/50 hover:border-accent/50 hover:bg-accent/5 transition-all duration-300"
                        onClick={() => handleTypeSelect(type)}
                      >
                        <CardHeader>
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                              <Icon size={20} className="text-accent" />
                            </div>
                            <div>
                              <CardTitle className="text-base">{config.title}</CardTitle>
                            </div>
                          </div>
                          <CardDescription className="mt-2">
                            {config.description}
                          </CardDescription>
                        </CardHeader>
                      </Card>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {currentStep === 2 && selectedType && (
          <motion.div
            key="step-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>{validationTypeConfig[selectedType].title}</CardTitle>
                <CardDescription>
                  Fill in the required information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="module-key">Related Module (Optional)</Label>
                    <Select value={moduleKey} onValueChange={setModuleKey}>
                      <SelectTrigger id="module-key">
                        <SelectValue placeholder="Select a module" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None - General Validation</SelectItem>
                        {appState.modules.filter(m => m.status === 'ACTIVE').map(module => (
                          <SelectItem key={module.moduleKey} value={module.moduleKey}>
                            {module.displayName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator />

                  {validationTypeConfig[selectedType].requiredFields.map(field => (
                    <div key={field}>
                      <Label htmlFor={field}>{field} *</Label>
                      <Input
                        id={field}
                        value={formData[field] || ''}
                        onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                        placeholder={`Enter ${field.toLowerCase()}`}
                        className="mt-1.5"
                      />
                    </div>
                  ))}
                </div>

                <div className="flex justify-end gap-3">
                  <Button variant="outline" onClick={() => setCurrentStep(1)}>
                    <ArrowLeft className="mr-2" size={16} />
                    Back
                  </Button>
                  <Button onClick={handleFormSubmit} className="bg-accent text-accent-foreground hover:bg-accent/90">
                    Continue
                    <ArrowRight className="ml-2" size={16} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {currentStep === 3 && selectedType && (
          <motion.div
            key="step-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Upload Evidence</CardTitle>
                <CardDescription>
                  Provide supporting documentation for your validation
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="rounded-lg border border-dashed border-border/50 p-8 text-center">
                  <Upload size={40} className="mx-auto mb-4 text-muted-foreground" />
                  <p className="text-sm font-medium mb-2">Required Evidence Type</p>
                  <p className="text-xs text-muted-foreground mb-4">
                    {validationTypeConfig[selectedType].evidenceType}
                  </p>
                  <Badge variant="outline" className="text-xs">
                    Simulated Upload - Describe your evidence below
                  </Badge>
                </div>

                <div>
                  <Label htmlFor="evidence">Evidence Description *</Label>
                  <Textarea
                    id="evidence"
                    value={evidenceText}
                    onChange={(e) => setEvidenceText(e.target.value)}
                    placeholder="Describe the evidence you would upload (e.g., 'UK Passport #123456789, issued 2020, expires 2030')"
                    rows={6}
                    className="mt-1.5"
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    In production, you would upload actual documents here
                  </p>
                </div>

                <div className="flex justify-end gap-3">
                  <Button variant="outline" onClick={() => setCurrentStep(2)}>
                    <ArrowLeft className="mr-2" size={16} />
                    Back
                  </Button>
                  <Button onClick={handleEvidenceSubmit} className="bg-accent text-accent-foreground hover:bg-accent/90">
                    Continue
                    <ArrowRight className="ml-2" size={16} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {currentStep === 4 && selectedType && (
          <motion.div
            key="step-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Review Your Submission</CardTitle>
                <CardDescription>
                  Verify all information before submitting for review
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-start justify-between p-4 bg-accent/5 rounded-lg border border-accent/20">
                    <div>
                      <p className="text-sm font-medium mb-1">Validation Type</p>
                      <p className="text-sm text-muted-foreground">
                        {validationTypeConfig[selectedType].title}
                      </p>
                    </div>
                    <Badge className="bg-accent/20 text-accent border-accent/30">
                      {selectedType.toUpperCase()}
                    </Badge>
                  </div>

                  {moduleKey && moduleKey !== 'none' && (
                    <div className="p-4 bg-card rounded-lg border border-border/50">
                      <p className="text-sm font-medium mb-1">Related Module</p>
                      <p className="text-sm text-muted-foreground">
                        {appState.modules.find(m => m.moduleKey === moduleKey)?.displayName || moduleKey}
                      </p>
                    </div>
                  )}

                  <div className="p-4 bg-card rounded-lg border border-border/50">
                    <p className="text-sm font-medium mb-3">Submitted Information</p>
                    <div className="space-y-2">
                      {Object.entries(formData).map(([key, value]) => (
                        <div key={key} className="flex justify-between text-sm">
                          <span className="text-muted-foreground">{key}:</span>
                          <span className="font-medium">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 bg-card rounded-lg border border-border/50">
                    <p className="text-sm font-medium mb-2">Evidence Description</p>
                    <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                      {evidenceText}
                    </p>
                  </div>
                </div>

                <div className="rounded-lg border border-warning/30 bg-warning/5 p-4">
                  <div className="flex gap-3">
                    <Clock size={20} className="text-warning flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-warning mb-1">Estimated Review Time</p>
                      <p className="text-xs text-muted-foreground">
                        Most validation requests are reviewed within 24-48 hours. You'll receive a notification once your request is processed.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3">
                  <Button variant="outline" onClick={() => setCurrentStep(3)}>
                    <ArrowLeft className="mr-2" size={16} />
                    Back
                  </Button>
                  <Button onClick={handleReview} className="bg-accent text-accent-foreground hover:bg-accent/90">
                    Review Complete
                    <ArrowRight className="ml-2" size={16} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {currentStep === 5 && selectedType && (
          <motion.div
            key="step-5"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="border-accent/30">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                    <CheckCircle size={24} className="text-accent" />
                  </div>
                  <div>
                    <CardTitle>Ready to Submit</CardTitle>
                    <CardDescription>
                      Your validation request is ready for compliance review
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <CheckCircle size={18} className="text-success" />
                    <span>All required fields completed</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <CheckCircle size={18} className="text-success" />
                    <span>Evidence documentation provided</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <CheckCircle size={18} className="text-success" />
                    <span>Information reviewed and verified</span>
                  </div>
                </div>

                <Separator />

                <div className="rounded-lg border border-accent/30 bg-accent/5 p-4">
                  <p className="text-sm font-medium mb-2">Next Steps</p>
                  <ul className="space-y-2 text-xs text-muted-foreground">
                    <li>• Your request will be assigned to a compliance reviewer</li>
                    <li>• You'll receive a unique request ID for tracking</li>
                    <li>• Status updates will appear in your validation dashboard</li>
                    <li>• You'll be notified via email when a decision is made</li>
                  </ul>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <Button variant="outline" onClick={() => setCurrentStep(4)}>
                    <ArrowLeft className="mr-2" size={16} />
                    Back
                  </Button>
                  <Button onClick={handleFinalSubmit} className="bg-accent text-accent-foreground hover:bg-accent/90">
                    <CheckCircle className="mr-2" size={18} />
                    Submit Request
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
