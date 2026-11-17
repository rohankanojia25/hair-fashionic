import { type ReactNode, useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'motion/react'

interface SectionRevealProps {
  children: ReactNode
  className?: string
  stagger?: number
  delay?: number
}

export const SectionReveal = ({
  children,
  className = '',
  stagger = 0.08,
  delay = 0,
}: SectionRevealProps) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: shouldReduceMotion ? 0 : stagger,
            delayChildren: delay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export const RevealItem = ({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) => {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      variants={{
        hidden: {
          opacity: 0,
          y: shouldReduceMotion ? 0 : 24,
        },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
