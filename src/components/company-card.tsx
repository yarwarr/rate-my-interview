"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { toast } from "sonner"

import { cn, formatPrice } from "@/lib/utils"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Button, buttonVariants } from "@/components/ui/Button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Icons } from "@/components/Icons"
// import { addToCartAction } from "@/app/_actions/cart"

interface CompanyCardProps extends React.HTMLAttributes<HTMLDivElement> {
  company: Company
  variant?: "default" | "switchable"
  isAddedToCart?: boolean
  onSwitch?: () => Promise<void>
}

export function CompanyCard({
  company,
  variant = "default",
  isAddedToCart = false,
  onSwitch,
  className,
  ...props
}: CompanyCardProps) {
  const [isPending, startTransition] = React.useTransition()

  return (
    <Card
      className={cn("h-full overflow-hidden rounded-sm", className)}
      {...props}
    >
      <Link
        aria-label={`View ${company.name} details`}
        href={`/company/${company.id}`}
      >
        <CardHeader className="border-b p-0">
          <AspectRatio ratio={4 / 3}>
          {company?.logo ? (
              <img
                src={
                  company.logo
                }
                alt=""
                referrerPolicy="no-referrer"
                // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="w-80"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                loading="lazy"
              />
            ) : (
              <div
                aria-label="Placeholder"
                role="img"
                aria-roledescription="placeholder"
                className="flex h-full w-full items-center justify-center bg-secondary"
              >
                <Icons.placeholder
                  className="h-9 w-9 text-muted-foreground"
                  aria-hidden="true"
                />
              </div>
            )}
            
          </AspectRatio>
        </CardHeader>
      </Link>
      <Link
        aria-label={`View ${company.name} details`}
        href={`/company/${company.id}`}
      >
        <CardContent className="grid gap-2.5 p-4">
          <CardTitle className="line-clamp-1">{company.name}</CardTitle>
          <CardDescription className="line-clamp-2">
            {formatPrice(company.rating)}
          </CardDescription>
        </CardContent>
      </Link>
      <CardFooter className="p-4">
        {variant === "default" ? (
          <div className="flex w-full flex-col items-center gap-2 sm:flex-row sm:justify-between">
            <Link
              aria-label="Preview Comnpany Page"
              href={`/company/${company.id}`}
              className={buttonVariants({
                variant: "outline",
                size: "sm",
                className: "h-8 w-full rounded-sm",
              })}
            >
              View Interviews
            </Link>
            <Button
              aria-label="Add to cart"
              size="sm"
              className="h-8 w-full rounded-sm"
              onClick={() => {
                startTransition(async () => {
                  try {
                    toast.success("Added to cart.")
                  } catch (error) {
                    error instanceof Error
                      ? toast.error(error.message)
                      : toast.error("Something went wrong, please try again.")
                  }
                })
              }}
              disabled={isPending}
            >
              {isPending && (
                <Icons.spinner
                  className="mr-2 h-4 w-4 animate-spin"
                  aria-hidden="true"
                />
              )}
              Ask Chatgpt
            </Button>
          </div>
        ) : (
          <Button
            aria-label={isAddedToCart ? "Remove from cart" : "Add to cart"}
            size="sm"
            className="h-8 w-full rounded-sm"
            onClick={() => {
              startTransition(async () => {
                await onSwitch?.()
              })
            }}
            disabled={isPending}
          >
            {isPending ? (
              <Icons.spinner
                className="mr-2 h-4 w-4 animate-spin"
                aria-hidden="true"
              />
            ) : isAddedToCart ? (
              <Icons.check className="mr-2 h-4 w-4" aria-hidden="true" />
            ) : (
              <Icons.add className="mr-2 h-4 w-4" aria-hidden="true" />
            )}
            {isAddedToCart ? "Added" : "Add to cart"}
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
