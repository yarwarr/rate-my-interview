"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

import { cn } from "@/lib/utils"
import { useDebounce } from "@/hooks/use-debounce"
import { Button } from "@/components/ui/Button"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Skeleton } from "@/components/ui/skeleton"
import { Icons } from "@/components/Icons"
// import { filterCompaniesAction } from "@/app/_actions/company"
import filterCompaniesAction from "@/app/_actions/company"
import Image from "next/image"


export function Combobox() {
  const router = useRouter()
  const [isOpen, setIsOpen] = React.useState(false)
  const [query, setQuery] = React.useState("")
  const debouncedQuery = useDebounce(query, 300)
  const [data, setData] = React.useState<
    | {
      companies: Pick<Company, "id" | "name" | "logo" | "companyType">[]

    }[]
    | null
  >(null)

  const [isPending, startTransition] = React.useTransition()

  React.useEffect(() => {
    if (debouncedQuery.length === 0) setData(null)

    if (debouncedQuery.length > 0) {
      startTransition(async () => {
        const data = await filterCompaniesAction(debouncedQuery)
        setData(data)
      })
    }
  }, [debouncedQuery])

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setIsOpen((isOpen) => !isOpen)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  const handleSelect = React.useCallback((callback: () => unknown) => {
    setIsOpen(false)
    callback()
  }, [])

  React.useEffect(() => {
    if (!isOpen) {
      setQuery("")
    }
  }, [isOpen])

  const navigate = (url: string) => {
    router.push(url);
    setTimeout(() => {
      window.location.reload(); // This will reload the page after the delay
    }, 2000);
  };

  return (
    <>
      <Button
        variant="outline"
        className="relative h-9 w-9 p-0 xl:h-10 xl:w-60 xl:justify-start xl:px-3 xl:py-2"
        onClick={() => setIsOpen(true)}
      >
        <Icons.search className="h-4 w-4 xl:mr-2" aria-hidden="true" />
        <span className="hidden xl:inline-flex">Search companies...</span>
        <span className="sr-only">Search companies</span>
        <kbd className="pointer-events-none absolute right-1.5 top-2 hidden h-6 select-none items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 xl:flex">
          <span className="text-xs">Ctrl</span>K
        </kbd>
      </Button>
      <CommandDialog position="default" open={isOpen} onOpenChange={setIsOpen}>
        <CommandInput
          placeholder="Search companies..."
          value={query}
          onValueChange={setQuery}
        />
        <CommandList>
          <CommandEmpty
            className={cn(isPending ? "hidden" : "py-6 text-center text-sm")}
          >
            No companies found.
          </CommandEmpty>
          {isPending ? (
            <div className="space-y-1 overflow-hidden px-1 py-2">
              <Skeleton className="h-4 w-10 rounded" />
              <Skeleton className="h-8 rounded-sm" />
              <Skeleton className="h-8 rounded-sm" />
            </div>
          ) : (
            data?.map((group) => (
              <CommandGroup
                key={1}
                className="capitalize"
              // heading={group.companyType}
              >
                {group.companies.map((company) => (
                  <CommandItem className="cursor-pointer"
                    key={company.id}
                    onSelect={() =>
                      navigate(`/company/${company.id}`)
                    }
                  >

                    {company.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            ))
          )}
        </CommandList>
      </CommandDialog>
    </>
  )
}
