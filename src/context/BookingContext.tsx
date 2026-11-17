import { createContext, useContext, useState, type ReactNode } from 'react'

export interface BookingOptions {
  serviceName?: string
  stylistName?: string
}

interface BookingContextType {
  isOpen: boolean
  openBooking: (options?: BookingOptions) => void
  closeBooking: () => void
  selectedService: string | undefined
  selectedStylist: string | undefined
}

const BookingContext = createContext<BookingContextType | undefined>(undefined)

export function BookingProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedService, setSelectedService] = useState<string | undefined>(undefined)
  const [selectedStylist, setSelectedStylist] = useState<string | undefined>(undefined)

  const openBooking = (options?: BookingOptions) => {
    setSelectedService(options?.serviceName)
    setSelectedStylist(options?.stylistName)
    setIsOpen(true)
  }

  const closeBooking = () => {
    setIsOpen(false)
  }

  return (
    <BookingContext.Provider
      value={{
        isOpen,
        openBooking,
        closeBooking,
        selectedService,
        selectedStylist,
      }}
    >
      {children}
    </BookingContext.Provider>
  )
}

export function useBooking() {
  const context = useContext(BookingContext)
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider')
  }
  return context
}
