import type { ReactNode } from 'react'

export type HistoryItem = string | { text: string; className?: string } | ReactNode
