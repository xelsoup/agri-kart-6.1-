"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { useAuth } from "@/components/auth-provider"

type Step = 1 | 2 | 3 | 4

export default function SellerOnboardingPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [step, setStep] = useState<Step>(1)

  // Core profile
  const [farmName, setFarmName] = useState("")
  const [farmLocation, setFarmLocation] = useState("")
  const [produceType, setProduceType] = useState("")
  const [aboutFarm, setAboutFarm] = useState("")

  // Verification docs
  const [govIdFile, setGovIdFile] = useState<File | null>(null)
  const [farmRegFile, setFarmRegFile] = useState<File | null>(null)
  const [landProofFile, setLandProofFile] = useState<File | null>(null)
  const [certFile, setCertFile] = useState<File | null>(null)
  const [farmMediaFile, setFarmMediaFile] = useState<File | null>(null)
  const [taxId, setTaxId] = useState("")

  // References
  const [referenceName, setReferenceName] = useState("")
  const [referenceContact, setReferenceContact] = useState("")

  // Contact verification
  const [phone, setPhone] = useState("")
  const [emailCode, setEmailCode] = useState("")
  const [phoneCode, setPhoneCode] = useState("")
  const [emailSent, setEmailSent] = useState(false)
  const [smsSent, setSmsSent] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (!isLoading && (!user || user.type !== "seller")) {
      router.replace("/auth")
    }
  }, [user, isLoading, router])

  const canContinueStep1 = farmName && farmLocation && produceType
  const canContinueStep2 = !!govIdFile && !!farmRegFile && !!landProofFile && !!farmMediaFile
  const canContinueStep3 = referenceName && referenceContact
  const canFinishStep4 = emailCode.length >= 4 && phoneCode.length >= 4 && phone

  const sendEmailCode = () => {
    setEmailSent(true)
    // simulate email sending
    setTimeout(() => {}, 800)
  }

  const sendSmsCode = () => {
    if (!phone) return
    setSmsSent(true)
    // simulate sms sending
    setTimeout(() => {}, 800)
  }

  const completeOnboarding = async () => {
    setSubmitting(true)
    await new Promise((r) => setTimeout(r, 1200))
    router.push("/dashboard")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container py-10">
          <div className="mx-auto max-w-2xl">
            <h1 className="mb-6 text-2xl font-bold">Seller Onboarding</h1>
            <p className="mb-8 text-sm text-muted-foreground">Complete these quick steps to verify your farm and start selling.</p>

            <div className="mb-6 grid grid-cols-4 gap-2 text-xs">
              {[1,2,3,4].map((s) => (
                <div key={s} className={`rounded border px-2 py-1 ${step === s ? "bg-primary text-primary-foreground" : "bg-muted"}`}>Step {s}</div>
              ))}
            </div>

            {step === 1 && (
              <Card className="p-6 space-y-4">
                <div>
                  <Label htmlFor="farmName">Farm Name</Label>
                  <Input id="farmName" value={farmName} onChange={(e) => setFarmName(e.target.value)} placeholder="Green Valley Farms" />
                </div>
                <div>
                  <Label htmlFor="farmLocation">Farm Location</Label>
                  <Input id="farmLocation" value={farmLocation} onChange={(e) => setFarmLocation(e.target.value)} placeholder="City, Region" />
                </div>
                <div>
                  <Label htmlFor="produceType">Primary Produce</Label>
                  <Input id="produceType" value={produceType} onChange={(e) => setProduceType(e.target.value)} placeholder="Tomatoes, Corn" />
                </div>
                <div>
                  <Label htmlFor="aboutFarm">About Your Farm (optional)</Label>
                  <Textarea id="aboutFarm" value={aboutFarm} onChange={(e) => setAboutFarm(e.target.value)} placeholder="Brief description, acreage, practices..." />
                </div>
                <div className="flex justify-end">
                  <Button disabled={!canContinueStep1} onClick={() => setStep(2 as Step)}>Continue</Button>
                </div>
              </Card>
            )}

            {step === 2 && (
              <Card className="p-6 space-y-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Upload Verification Documents</p>
                  <p className="text-xs text-muted-foreground">Accepted: PDF, JPG, PNG, MP4. Max ~10MB each.</p>
                </div>
                <div>
                  <Label>Government-Issued ID</Label>
                  <Input type="file" accept="image/*,application/pdf" onChange={(e) => setGovIdFile(e.target.files?.[0] ?? null)} />
                </div>
                <div>
                  <Label>Farm Registration or License</Label>
                  <Input type="file" accept="image/*,application/pdf" onChange={(e) => setFarmRegFile(e.target.files?.[0] ?? null)} />
                </div>
                <div>
                  <Label>Proof of Land Ownership or Lease</Label>
                  <Input type="file" accept="image/*,application/pdf" onChange={(e) => setLandProofFile(e.target.files?.[0] ?? null)} />
                </div>
                <div>
                  <Label>Agricultural Certification (optional)</Label>
                  <Input type="file" accept="image/*,application/pdf" onChange={(e) => setCertFile(e.target.files?.[0] ?? null)} />
                </div>
                <div>
                  <Label>Photo or Video of Farm</Label>
                  <Input type="file" accept="image/*,video/*" onChange={(e) => setFarmMediaFile(e.target.files?.[0] ?? null)} />
                </div>
                <div>
                  <Label>Business/Tax ID</Label>
                  <Input placeholder="Optional if sole proprietor" value={taxId} onChange={(e) => setTaxId(e.target.value)} />
                </div>
                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setStep(1 as Step)}>Back</Button>
                  <Button disabled={!canContinueStep2} onClick={() => setStep(3 as Step)}>Continue</Button>
                </div>
              </Card>
            )}

            {step === 3 && (
              <Card className="p-6 space-y-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium">References</p>
                  <p className="text-xs text-muted-foreground">Optionally provide a reference who can verify your farm.</p>
                </div>
                <div>
                  <Label>Reference Name</Label>
                  <Input value={referenceName} onChange={(e) => setReferenceName(e.target.value)} placeholder="Agricultural officer or fellow farmer" />
                </div>
                <div>
                  <Label>Reference Contact</Label>
                  <Input value={referenceContact} onChange={(e) => setReferenceContact(e.target.value)} placeholder="Email or phone" />
                </div>
                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setStep(2 as Step)}>Back</Button>
                  <Button disabled={!canContinueStep3} onClick={() => setStep(4 as Step)}>Continue</Button>
                </div>
              </Card>
            )}

            {step === 4 && (
              <Card className="p-6 space-y-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Verify Contact</p>
                  <p className="text-xs text-muted-foreground">We'll send codes to confirm your email and phone.</p>
                </div>
                <div>
                  <Label>Phone Number</Label>
                  <div className="flex gap-2">
                    <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="e.g., +1 555 555 1234" />
                    <Button type="button" onClick={sendSmsCode} disabled={!phone || smsSent}>{smsSent ? "Sent" : "Send SMS"}</Button>
                  </div>
                </div>
                <div>
                  <Label>Email Code</Label>
                  <div className="flex gap-2">
                    <Input value={emailCode} onChange={(e) => setEmailCode(e.target.value)} placeholder="4-6 digit code" />
                    <Button type="button" onClick={sendEmailCode} disabled={emailSent}>{emailSent ? "Sent" : "Send"}</Button>
                  </div>
                </div>
                <div>
                  <Label>SMS Code</Label>
                  <Input value={phoneCode} onChange={(e) => setPhoneCode(e.target.value)} placeholder="4-6 digit code" />
                </div>
                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setStep(3 as Step)}>Back</Button>
                  <Button onClick={completeOnboarding} disabled={!canFinishStep4 || submitting}>{submitting ? "Finishing..." : "Finish & Go to Dashboard"}</Button>
                </div>
              </Card>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}


