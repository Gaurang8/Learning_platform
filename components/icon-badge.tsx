import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"

const backgroundVariants = cva(
    "flex items-center justify-center rounded-full",
    {
        variants: {
            variant: {
                default: "bg-sky-100",
                success: "bg-emerald-100",

            },
            size: {
                default: "p-2",
                sm: "p-1",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)

const iconVariants = cva(
    "",
    {
        variants: {
            variant: {
                default: "text-sky-700",
                success: "text-emerald-700",
            },
            size: {
                default: "h-8 w-8",
                sm: "h-4 w-4",
            },
        },
        defaultVariants: {
            size: "default",
            variant: "default",
        },

    })


type backgroundVariantsProps = VariantProps<typeof backgroundVariants>;
type iconVariantsProps = VariantProps<typeof iconVariants>;

interface IconBadgeProps extends backgroundVariantsProps, iconVariantsProps {
    icon: LucideIcon;
}


export const IconBadge = ({
    variant,
    size,
    icon: Icon,
}: IconBadgeProps) => {
    return (
        <div className={cn(backgroundVariants({ variant, size }))}>
            <Icon className={cn(iconVariants({ variant, size }))} />
        </div>
    )
}
