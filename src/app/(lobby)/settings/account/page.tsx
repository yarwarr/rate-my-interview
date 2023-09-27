import type { Metadata } from "next"

import { Header } from "@/components/header"
import { Shell } from "@/components/shells/shell"
import FileUpload from "@/components/file-upload"
import { db } from "@/db"
import { resume } from "@/db/schema"
import { eq } from "drizzle-orm"
import { getAuthSession } from "@/lib/auth"

export const metadata: Metadata = {
  title: "Account",
  description: "Manage your account settings",
}

export default async function AccountPage() {
  const session = await getAuthSession()
  let hasResume = false
  const userResume = await db.select().from(resume).where( eq(resume.user_id, session?.user.id) )
  if(userResume.length > 0) {
    hasResume = true
  }
  return (
    <Shell variant="sidebar">
      <Header
        title="Account"
        description="Manage your account settings."
        size="sm"
      />
      <div className="w-full overflow-hidden rounded-lg">
        <h1>Please upload your resume here</h1>
        {hasResume ? (
  <h1>You have a resume</h1>
) : (
  <div>
    <h1>You do not have a resume</h1>
    <FileUpload />
  </div>
)}
        {/* <FileUpload /> */}
      </div>
    </Shell>
  )
}
