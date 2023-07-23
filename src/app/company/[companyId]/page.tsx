import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { db } from "@/db"
import { companies} from "@/db/schema"
import { and, desc, eq, not } from "drizzle-orm"

import { cn, formatPrice } from "@/lib/utils"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Separator } from "@/components/ui/separator"
import { Mdx } from "@/components/mdx/mdx-components"
import { Shell } from "@/components/shells/shell"

import { MdxPager } from "@/components/pagers/mdx-pager"
import { Icons } from "@/components/Icons"
import { buttonVariants } from "@/components/ui/Button"
import { Header } from "@/components/header"
import { Star } from "lucide-react"
export const metadata: Metadata = {
//   metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Company",
  description: "Product description",
}

interface ProductPageProps {
  params: {
    companyId: string
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const companyId = Number(params.companyId)

  const company = await db.query.companies.findFirst({
    where: eq(companies.id, companyId),
  })

  if (!company) {
    notFound()
  }

  return (
    <Shell>
        <div className="flex items-center space-x-1 text-sm capitalize text-muted-foreground">
        <div className="flex flex-col gap-8 md:flex-row md:gap-16">
        <img className="w-40 h-40" src={company.logo} referrerPolicy="no-referrer"/>
        <h1 className="mt-2 inline-block text-4xl font-bold leading-tight lg:text-5xl">
        
          {company.name}
        </h1>
        <div className="mt-4 flex space-x-4">
            {company.description}
        </div>
        {/* <Header
        title={company.name}
        description={company.description}
        size="sm"
      /> */}
      </div>
      </div>
      {/* <Separator className="" /> */}
      <div className="lg:text-5xl flex">
        <Star colorProfile="orange" />
        {company.rating}
        
        
      </div>
    </Shell>
  )
}
