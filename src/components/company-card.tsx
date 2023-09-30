"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { toast } from "sonner"

import { cn } from "@/lib/utils"
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
import { useRouter } from "next/navigation"
import axios from "axios"
// import { addToCartAction } from "@/app/_actions/cart"

interface CompanyCardProps extends React.HTMLAttributes<HTMLDivElement> {
  company: Company
  isAddedToCart?: boolean
  onSwitch?: () => Promise<void>,
  hasResume: boolean
}

export function CompanyCard({
  company,
  isAddedToCart = false,
  hasResume,
  onSwitch,
  className,
  ...props
}: CompanyCardProps) {
  const [isPending, startTransition] = React.useTransition()

  const { push } = useRouter();
    async function createChat(companyId: number) {
        const response = await axios.post('/api/create-chat', {companyId})
        if(response.status == 200) {
            const chatId = response.data.chat_id
            push(`/chat/${companyId}`)
        }
        
      }

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
          </CardDescription>
        </CardContent>
      </Link>
      <CardFooter className="p-4">
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
            {hasResume  ? (
            <Button
              aria-label="Add to cart"
              size="sm"
              className="h-8 w-full rounded-sm"
              onClick={() => createChat(company.id)}
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
            ) : (
              <></>
            )}
          </div>
        
      </CardFooter>
    </Card>
  )
}
