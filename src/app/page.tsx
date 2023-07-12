import getAllCompanies from '@/lib/getAllCompanies'
import Company from '../components/Company'
import { HomeIcon } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from '@/components/ui/Button';
import Example from '@/components/Home';
export default function Home() {
  console.log('herer')
  return (
    <>
      
      <Example />
    </>
  )
}
