import { ReactNode } from "react"

export function Sentence({
  children,
  highlighted,
  className = null,
}: {
  children: ReactNode
  highlighted: boolean | null
  className?: string | null
}) {
  return (
    <span
      className={`${className} ${highlighted && "text-accent saturate-200"}`}
    >
      {children}
    </span>
  )
}
