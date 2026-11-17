import { useState, useEffect, useMemo } from 'react'
import {
  X,
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Clock,
  User,
  Calendar,
  Sparkles,
  MessageCircle,
  AlertCircle,
} from 'lucide-react'
import { useBooking } from '../context/BookingContext'
import { SERVICE_CATEGORIES, SALON_INFO } from '../data/salonData'

// Flatten all available services with duration & price
interface FlatService {
  id: string
  name: string
  category: string
  duration: string
  estMinutes: number
  price: string
}

const ALL_SERVICES: FlatService[] = SERVICE_CATEGORIES.flatMap((cat) =>
  cat.items.map((item) => {
    let est = 40
    if (item.duration.includes('20')) est = 25
    else if (item.duration.includes('30-45')) est = 40
    else if (item.duration.includes('45-60')) est = 50
    else if (item.duration.includes('90-120')) est = 100
    else if (item.duration.includes('120-150')) est = 135
    else if (item.duration.includes('150-180')) est = 160
    return {
      id: item.id,
      name: item.name,
      category: cat.name,
      duration: item.duration,
      estMinutes: est,
      price: item.price,
    }
  })
)

const STYLISTS = [
  {
    id: 'rahees',
    name: 'Rahees',
    role: 'Master Stylist (Client Favorite)',
    badge: 'Popular',
  },
  {
    id: 'any',
    name: 'Any Stylist',
    role: 'First available trained stylist',
    badge: 'Fastest Slot',
  },
  {
    id: 'sameer',
    name: 'Sameer [PLACEHOLDER]',
    role: 'Master Grooming & Fade Specialist',
    badge: null,
  },
  {
    id: 'imran',
    name: 'Imran [PLACEHOLDER]',
    role: 'Colour & Chemical Specialist',
    badge: null,
  },
]

const TIME_SLOTS = [
  '10:00 AM',
  '10:30 AM',
  '11:00 AM',
  '11:30 AM',
  '12:00 PM',
  '12:30 PM',
  '01:00 PM',
  '01:30 PM',
  '02:00 PM',
  '02:30 PM',
  '03:00 PM',
  '03:30 PM',
  '04:00 PM',
  '04:30 PM',
  '05:00 PM',
  '05:30 PM',
  '06:00 PM',
  '06:30 PM',
  '07:00 PM',
  '07:30 PM',
]

function getNext14Days() {
  const list = []
  const today = new Date()
  for (let i = 0; i < 14; i++) {
    const d = new Date(today)
    d.setDate(today.getDate() + i)
    const dayName =
      i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : d.toLocaleDateString('en-US', { weekday: 'short' })
    const dateNum = d.getDate()
    const monthName = d.toLocaleDateString('en-US', { month: 'short' })
    const fullDateStr = d.toLocaleDateString('en-US', {
      weekday: 'long',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
    list.push({
      id: d.toISOString().split('T')[0],
      dayName,
      dateNum,
      monthName,
      fullDateStr,
    })
  }
  return list
}

export const BookingModal = () => {
  const { isOpen, closeBooking, selectedService, selectedStylist } = useBooking()

  // Steps: 1: Service(s), 2: Stylist, 3: Date & Time, 4: Name & Phone, 5: Confirmation
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1)

  // Booking Form State
  const [selectedServiceIds, setSelectedServiceIds] = useState<string[]>([])
  const [stylist, setStylist] = useState<string>('Rahees')
  const [selectedDateId, setSelectedDateId] = useState<string>('')
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('11:00 AM')
  const [name, setName] = useState<string>('')
  const [phone, setPhone] = useState<string>('')
  const [phoneError, setPhoneError] = useState<string>('')
  const [nameError, setNameError] = useState<string>('')

  const next14Days = useMemo(() => getNext14Days(), [])

  // Sync initial selection when modal opens
  useEffect(() => {
    if (isOpen) {
      setStep(1)
      setPhoneError('')
      setNameError('')

      // Initialize date to today
      if (next14Days.length > 0) {
        setSelectedDateId(next14Days[0].id)
      }

      // Check if a service name was passed
      if (selectedService) {
        const found = ALL_SERVICES.find(
          (s) =>
            s.name.toLowerCase().includes(selectedService.toLowerCase()) ||
            selectedService.toLowerCase().includes(s.name.toLowerCase())
        )
        if (found) {
          setSelectedServiceIds([found.id])
        } else {
          // Default to first service (Haircut) if not matched
          setSelectedServiceIds([ALL_SERVICES[0].id])
        }
      } else if (selectedServiceIds.length === 0) {
        setSelectedServiceIds([ALL_SERVICES[0].id])
      }

      // Check if a stylist was passed
      if (selectedStylist) {
        setStylist(selectedStylist)
      } else {
        setStylist('Rahees')
      }
    }
  }, [isOpen, selectedService, selectedStylist, next14Days])

  if (!isOpen) return null

  // Calculate totals
  const selectedServices = ALL_SERVICES.filter((s) => selectedServiceIds.includes(s.id))
  const totalMinutes = selectedServices.reduce((acc, curr) => acc + curr.estMinutes, 0)

  const selectedDateObj = next14Days.find((d) => d.id === selectedDateId) || next14Days[0]

  // Toggle service selection
  const toggleService = (id: string) => {
    if (selectedServiceIds.includes(id)) {
      if (selectedServiceIds.length > 1) {
        setSelectedServiceIds(selectedServiceIds.filter((item) => item !== id))
      }
    } else {
      setSelectedServiceIds([...selectedServiceIds, id])
    }
  }

  // Validate phone number for India (+91)
  const validatePhone = (val: string) => {
    const digits = val.replace(/\D/g, '')
    let core = digits
    if (digits.length === 12 && digits.startsWith('91')) {
      core = digits.slice(2)
    } else if (digits.length === 11 && digits.startsWith('0')) {
      core = digits.slice(1)
    }

    if (!core) {
      return { isValid: false, message: 'Mobile number is required' }
    }
    if (core.length !== 10 || !/^[6-9]\d{9}$/.test(core)) {
      return { isValid: false, message: 'Please enter a valid 10-digit Indian phone number (starting 6-9)' }
    }
    return { isValid: true, message: '', cleaned: core }
  }

  // Handle final submission to WhatsApp
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    let hasError = false
    if (!name.trim()) {
      setNameError('Please enter your name')
      hasError = true
    } else {
      setNameError('')
    }

    const phoneCheck = validatePhone(phone)
    if (!phoneCheck.isValid) {
      setPhoneError(phoneCheck.message)
      hasError = true
    } else {
      setPhoneError('')
    }

    if (hasError) return

    // Clean Indian phone string
    const formattedPhone = `+91 ${phoneCheck.cleaned}`

    // Construct WhatsApp message
    const serviceNames = selectedServices.map((s) => s.name).join(', ')
    const whatsappMessage = `Hi Hair Fashionic, I'd like to request an appointment:

• Service(s): ${serviceNames}
• Stylist: ${stylist}
• Date: ${selectedDateObj.fullDateStr}
• Time: ${selectedTimeSlot}
• Name: ${name.trim()}
• Phone: ${formattedPhone}

Please confirm if this slot is available.`

    const waUrl = `https://wa.me/${SALON_INFO.rawPhone}?text=${encodeURIComponent(whatsappMessage)}`

    // Open WhatsApp
    window.open(waUrl, '_blank')

    // Transition to confirmation screen
    setStep(5)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#0F0F10]/80 backdrop-blur-sm transition-opacity"
        onClick={closeBooking}
      />

      {/* Sheet / Modal Container */}
      <div className="relative z-10 w-full sm:max-w-xl bg-white rounded-t-3xl sm:rounded-2xl max-h-[92dvh] sm:max-h-[85vh] flex flex-col shadow-2xl border-t sm:border border-[#0F0F10]/15 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
        {/* Mobile Drag Indicator Handle */}
        <div className="sm:hidden pt-3 pb-1 flex justify-center bg-white cursor-grab">
          <div className="w-12 h-1.5 rounded-full bg-[#0F0F10]/20" />
        </div>

        {/* Modal Header */}
        <div className="px-5 py-4 border-b border-[#0F0F10]/10 flex items-center justify-between bg-[#FAF8F5]">
          <div className="flex items-center gap-3">
            {step > 1 && step < 5 && (
              <button
                type="button"
                onClick={() => setStep((prev) => (prev - 1) as any)}
                className="p-1.5 -ml-1 rounded-lg text-[#1E1E1E] hover:bg-[#0F0F10]/10 min-h-[44px] min-w-[44px] inline-flex items-center justify-center transition-colors"
                aria-label="Go to previous step"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif text-lg font-bold text-[#0F0F10]">
                  {step === 5 ? 'Request Received' : 'Book Appointment'}
                </span>
                {step < 5 && (
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#0F0F10] text-[#C9A227]">
                    Step {step} of 4
                  </span>
                )}
              </div>
              <p className="text-xs text-[#666666]">
                {step === 1 && 'Select one or more services'}
                {step === 2 && 'Select your preferred stylist'}
                {step === 3 && 'Pick a date and 30-min slot'}
                {step === 4 && 'Your contact details for confirmation'}
                {step === 5 && 'Confirmation details'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={closeBooking}
            className="p-2 min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded-lg text-[#666666] hover:text-[#0F0F10] hover:bg-[#0F0F10]/5 transition-colors"
            aria-label="Close booking modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body - Scrollable */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5 text-[#1E1E1E]">
          {/* STEP 1: CHOOSE SERVICE(S) */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#C9A227]/30 flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-[#666666] uppercase tracking-wider block">
                    Selected ({selectedServices.length})
                  </span>
                  <div className="flex items-center gap-2 text-sm font-bold text-[#0F0F10] mt-0.5">
                    <Clock className="w-4 h-4 text-[#C9A227]" />
                    <span>Est. Time: ~{totalMinutes} mins</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs text-[#666666] block">Est. Price</span>
                  <span className="text-sm font-bold text-[#0F0F10]">from Rs [PRICE]</span>
                  <span className="text-[10px] text-amber-800 bg-amber-100 px-1 py-0.2 rounded font-mono ml-1">
                    [PLACEHOLDER]
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#666666] block">
                  Select Services (Tap to toggle)
                </label>
                <div className="space-y-2 max-h-[45vh] overflow-y-auto pr-1">
                  {ALL_SERVICES.map((srv) => {
                    const isSelected = selectedServiceIds.includes(srv.id)
                    return (
                      <div
                        key={srv.id}
                        onClick={() => toggleService(srv.id)}
                        className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 min-h-[48px] ${
                          isSelected
                            ? 'bg-[#FAF8F5] border-[#C9A227] shadow-sm'
                            : 'bg-white border-[#0F0F10]/10 hover:border-[#0F0F10]/30'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 border ${
                              isSelected
                                ? 'bg-[#0F0F10] border-[#0F0F10] text-[#C9A227]'
                                : 'border-[#0F0F10]/20 bg-white'
                            }`}
                          >
                            {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </div>
                          <div>
                            <p className="font-semibold text-sm text-[#0F0F10] leading-snug">
                              {srv.name}
                            </p>
                            <div className="flex items-center gap-2 text-xs text-[#666666] mt-0.5">
                              <span>{srv.category}</span>
                              <span>•</span>
                              <span>{srv.duration}</span>
                            </div>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <span className="text-xs font-medium text-[#0F0F10]">
                            {srv.price}
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: CHOOSE STYLIST */}
          {step === 2 && (
            <div className="space-y-4">
              <label className="text-xs font-bold uppercase tracking-wider text-[#666666] block">
                Choose Stylist
              </label>

              <div className="space-y-3">
                {STYLISTS.map((st) => {
                  const isSelected = stylist === st.name || (st.id === 'rahees' && stylist === 'Rahees')
                  return (
                    <div
                      key={st.id}
                      onClick={() => setStylist(st.name)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between min-h-[52px] ${
                        isSelected
                          ? 'bg-[#FAF8F5] border-[#C9A227] shadow-sm ring-1 ring-[#C9A227]'
                          : 'bg-white border-[#0F0F10]/10 hover:border-[#0F0F10]/30'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center border shrink-0 ${
                            isSelected
                              ? 'border-[#C9A227] bg-[#0F0F10]'
                              : 'border-[#0F0F10]/30 bg-white'
                          }`}
                        >
                          {isSelected && <div className="w-2 h-2 rounded-full bg-[#C9A227]" />}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-serif font-bold text-base text-[#0F0F10]">
                              {st.name}
                            </h4>
                            {st.badge && (
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#0F0F10] text-[#C9A227]">
                                {st.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-[#666666] mt-0.5">{st.role}</p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <span>
                  Rahees is our most requested stylist in Krishna Nagar. Selecting "Any Stylist" gets you the fastest immediate confirmation.
                </span>
              </div>
            </div>
          )}

          {/* STEP 3: PICK DATE (NEXT 14 DAYS) & 30-MIN SLOT (UP TO 7:30 PM) */}
          {step === 3 && (
            <div className="space-y-5">
              {/* Date selection horizontal scroll */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#666666] block mb-2">
                  Select Date (Next 14 Days)
                </label>
                <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                  {next14Days.map((d) => {
                    const isSelected = selectedDateId === d.id
                    return (
                      <button
                        key={d.id}
                        type="button"
                        onClick={() => setSelectedDateId(d.id)}
                        className={`flex flex-col items-center justify-center min-w-[70px] py-2.5 px-3 rounded-xl border text-center transition-all min-h-[64px] cursor-pointer shrink-0 ${
                          isSelected
                            ? 'bg-[#0F0F10] text-white border-[#0F0F10] shadow-sm'
                            : 'bg-[#FAF8F5] text-[#1E1E1E] border-[#0F0F10]/10 hover:border-[#0F0F10]/30'
                        }`}
                      >
                        <span
                          className={`text-[11px] font-medium uppercase ${
                            isSelected ? 'text-[#C9A227]' : 'text-[#666666]'
                          }`}
                        >
                          {d.dayName}
                        </span>
                        <span className="text-lg font-bold leading-tight font-serif">
                          {d.dateNum}
                        </span>
                        <span className="text-[10px] opacity-80">{d.monthName}</span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Time slot grid up to 7:30 PM (Closing 8:00 PM) */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#666666]">
                    Select 30-Min Time Slot
                  </label>
                  <span className="text-[11px] text-[#666666]">Closing 8:00 PM</span>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-[36vh] overflow-y-auto pr-1">
                  {TIME_SLOTS.map((slot) => {
                    const isSelected = selectedTimeSlot === slot
                    return (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedTimeSlot(slot)}
                        className={`py-2.5 px-2 rounded-xl text-xs font-semibold border transition-all min-h-[44px] cursor-pointer flex items-center justify-center ${
                          isSelected
                            ? 'bg-[#0F0F10] text-[#C9A227] border-[#0F0F10] shadow-sm ring-1 ring-[#C9A227]'
                            : 'bg-white text-[#1E1E1E] border-[#0F0F10]/10 hover:border-[#0F0F10]/30'
                        }`}
                      >
                        {slot}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Summary of Date/Time */}
              <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#0F0F10]/10 flex items-center gap-2 text-xs text-[#1E1E1E]">
                <Calendar className="w-4 h-4 text-[#C9A227] shrink-0" />
                <span>
                  <strong>Selected:</strong> {selectedDateObj.fullDateStr} at {selectedTimeSlot}
                </span>
              </div>
            </div>
          )}

          {/* STEP 4: NAME + PHONE (+91 CHECK) */}
          {step === 4 && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#666666] block mb-1">
                  Your Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#666666] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value)
                      if (nameError) setNameError('')
                    }}
                    placeholder="e.g. Rahul Sharma"
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border bg-white text-sm text-[#1E1E1E] focus:outline-none focus:ring-2 focus:ring-[#C9A227] min-h-[44px] ${
                      nameError ? 'border-red-500' : 'border-[#0F0F10]/15'
                    }`}
                  />
                </div>
                {nameError && (
                  <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{nameError}</span>
                  </p>
                )}
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#666666] block mb-1">
                  Phone Number (+91 Mobile)
                </label>
                <div className="relative flex">
                  <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-[#0F0F10]/15 bg-[#FAF8F5] text-xs font-bold text-[#0F0F10]">
                    +91
                  </span>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value)
                      if (phoneError) setPhoneError('')
                    }}
                    placeholder="98765 43210"
                    maxLength={14}
                    className={`flex-1 px-3 py-3 rounded-r-xl border bg-white text-sm text-[#1E1E1E] focus:outline-none focus:ring-2 focus:ring-[#C9A227] min-h-[44px] ${
                      phoneError ? 'border-red-500' : 'border-[#0F0F10]/15'
                    }`}
                  />
                </div>
                {phoneError ? (
                  <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{phoneError}</span>
                  </p>
                ) : (
                  <p className="text-[11px] text-[#666666] mt-1">
                    Enter 10-digit Indian mobile number. We will confirm via WhatsApp.
                  </p>
                )}
              </div>

              {/* Order Recap */}
              <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#0F0F10]/10 text-xs space-y-1.5">
                <div className="font-bold text-[#0F0F10] pb-1 border-b border-[#0F0F10]/8">
                  Booking Summary
                </div>
                <div className="flex justify-between">
                  <span className="text-[#666666]">Service(s):</span>
                  <span className="font-semibold text-right max-w-[200px] truncate text-[#0F0F10]">
                    {selectedServices.map((s) => s.name).join(', ')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#666666]">Stylist:</span>
                  <span className="font-semibold text-[#0F0F10]">{stylist}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#666666]">When:</span>
                  <span className="font-semibold text-[#0F0F10]">
                    {selectedDateObj.dayName}, {selectedTimeSlot}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#666666]">Total Time:</span>
                  <span className="font-semibold text-[#0F0F10]">~{totalMinutes} mins</span>
                </div>
              </div>
            </form>
          )}

          {/* STEP 5: SUCCESS / REQUEST SENT */}
          {step === 5 && (
            <div className="text-center py-4 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-1">
                <h3 className="font-serif text-2xl font-bold text-[#0F0F10]">
                  Request sent, we'll confirm on WhatsApp
                </h3>
                <p className="text-sm text-[#666666] max-w-sm mx-auto">
                  Thank you, <strong>{name}</strong>! Your appointment request has been forwarded to Hair Fashionic in Lal Quarter Market.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#C9A227]/30 text-left text-xs space-y-2 max-w-md mx-auto">
                <div className="flex justify-between">
                  <span className="text-[#666666]">Service:</span>
                  <span className="font-bold text-[#0F0F10]">{selectedServices.map((s) => s.name).join(', ')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#666666]">Stylist:</span>
                  <span className="font-bold text-[#0F0F10]">{stylist}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#666666]">Date & Time:</span>
                  <span className="font-bold text-[#0F0F10]">{selectedDateObj.fullDateStr} at {selectedTimeSlot}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#666666]">Phone:</span>
                  <span className="font-bold text-[#0F0F10]">{phone}</span>
                </div>
                <div className="pt-2 border-t border-[#0F0F10]/10 flex items-center justify-between text-[#C9A227] font-semibold">
                  <span>Lal Quarter, Krishna Nagar</span>
                  <span>+91 85870 41387</span>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
                <button
                  type="button"
                  onClick={closeBooking}
                  className="w-full py-3.5 px-6 rounded-xl bg-[#0F0F10] text-white hover:bg-[#252528] font-bold text-sm min-h-[44px] transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer / Sticky Actions (Steps 1 to 4) */}
        {step < 5 && (
          <div className="p-4 border-t border-[#0F0F10]/10 bg-white">
            {step === 1 && (
              <button
                type="button"
                onClick={() => setStep(2)}
                disabled={selectedServiceIds.length === 0}
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 min-h-[48px] rounded-xl bg-[#0F0F10] text-[#C9A227] hover:bg-[#252528] font-bold text-base transition-colors shadow-sm disabled:opacity-50 cursor-pointer"
              >
                <span>Continue to Stylist</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            )}

            {step === 2 && (
              <button
                type="button"
                onClick={() => setStep(3)}
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 min-h-[48px] rounded-xl bg-[#0F0F10] text-[#C9A227] hover:bg-[#252528] font-bold text-base transition-colors shadow-sm cursor-pointer"
              >
                <span>Continue to Date & Time</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            )}

            {step === 3 && (
              <button
                type="button"
                onClick={() => setStep(4)}
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 min-h-[48px] rounded-xl bg-[#0F0F10] text-[#C9A227] hover:bg-[#252528] font-bold text-base transition-colors shadow-sm cursor-pointer"
              >
                <span>Continue to Details</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            )}

            {step === 4 && (
              <button
                type="button"
                onClick={handleSubmit}
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 min-h-[48px] rounded-xl bg-[#C9A227] text-[#0F0F10] hover:bg-[#b8911f] font-bold text-base transition-transform active:scale-[0.98] shadow-md cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>Confirm on WhatsApp (+91 85870 41387)</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
