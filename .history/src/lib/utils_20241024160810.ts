
Build Error

Next.js (15.0.1) (Turbopack)
Failed to compile

./src/components/ui/button.tsx:5:1
Module not found: Can't resolve '@/lib/utils'
  3 | import { cva, type VariantProps } from "class-variance-authority"
  4 |
> 5 | import { cn } from "@/lib/utils"
    | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  6 |
  7 | const buttonVariants = cva(
  8 |   "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",

Import map: aliased to relative "./src/lib/utils" inside of [project]/

https://nextjs.org/docs/messages/module-not-found
This error occurred during the build process and can only be dismissed by fixing the error.