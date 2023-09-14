import Balance from "react-wrap-balancer"

import { Shell } from "@/components/shells/shell"
import { Combobox } from "@/components/combobox"

export default async function IndexPage() {
  // await insertFAQsFromFiles()
  // const faq = await insertStatsFromFiles()
  return (
    <Shell as="div" className="gap-12">
      <section
        id="hero"
        aria-labelledby="hero-heading"
        className="mx-auto flex w-full max-w-[64rem] flex-col items-center justify-center gap-4 pb-8 pt-6 text-center md:pb-12 md:pt-10 lg:py-32"
      >
        <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-6xl lg:leading-[1.1]">
          A Website
        </h1>
        <Balance className="max-w-[46rem] text-lg text-muted-foreground sm:text-xl">
          Enter the company name
        </Balance>
        <div className="space-x-4">
          <Combobox />
        </div>
      </section>
      
    </Shell>
  )
}
