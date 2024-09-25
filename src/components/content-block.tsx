import { cn } from "@/lib/utils"

type Props = {
  children : React.ReactNode,
  className?: string
}

export default function ContentBlock({children, className}: Props) {
  return (
    <div className={cn(`bg-[#F7F8FA] shadow-sm rounded-md overflow-hidden h-full w-full ${className}`)}>{children}</div>
  )
}
