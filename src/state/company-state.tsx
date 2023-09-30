import { useQuery } from "@tanstack/react-query"

export const useCompany = (companyId: number) => {
    return useQuery({
        queryKey: ['company', companyId],
        queryFn: async () => {
        console.log('fetching company')
        const res = await fetch(`/api/company?company_id=${companyId}`, { cache: 'no-cache' })
        const company = await res.json()
        return company as Company | undefined
        },
    })
}