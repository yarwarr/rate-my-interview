import { type Metadata } from "next"
import { companies } from "@/db/schema"
// import { env } from "@/env.mjs"

import { Header } from "@/components/header"
import { Companies } from "@/components/companies"
import { Shell } from "@/components/shells/shell"
import { getCompaniesAction } from "../_actions/company"
// import { getProductsAction } from "@/app/_actions/product"
// import { getStoresAction } from "@/app/_actions/store"

// Running out of edge function execution units on vercel free plan
// export const runtime = "edge"

export const metadata: Metadata = {
//   metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Companies",
  description: "View Companies here",
}

interface CompaniesPageProps {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

export default async function CompaniesPage({
  searchParams,
}: CompaniesPageProps) {
  const {
    page,
    per_page,
    sort,
    categories,
    subcategories,
    price_range,
    store_ids,
    store_page,
  } = searchParams

  // Products transaction
  const limit = typeof per_page === "string" ? parseInt(per_page) : 20
  const offset = typeof page === "string" ? (parseInt(page) - 1) * limit : 0

  const companiesTransaction = await getCompaniesAction({
    limit,
    offset,
    sort: typeof sort === "string" ? sort : null,
    
  })

  const pageCount = Math.ceil(companiesTransaction.total / limit)

  // Stores transaction
  const storesLimit = 25
  const storesOffset =
    typeof store_page === "string"
      ? (parseInt(store_page) - 1) * storesLimit
      : 0


  return (
    <Shell>
      <Header
        title="Companies"
        description="View Companies here"
        size="sm"
      />
      <Companies
        companies={companiesTransaction.items}
        pageCount={pageCount}
      />
    </Shell>
  )
}
