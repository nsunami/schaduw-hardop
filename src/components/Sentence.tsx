import { ReactNode, useEffect, useRef } from "react"

export function Sentence({
  children,
  highlighted,
  className = "",
}: {
  children: ReactNode
  highlighted: boolean | null
  className?: string | null
}) {
  const sentenceRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (highlighted) {
      sentenceRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      })
    }
  }, [highlighted])

  return (
    <span
      ref={sentenceRef}
      className={`${className} ${highlighted && "text-accent saturate-200"}`}
    >
      {children}
    </span>
  )
}
