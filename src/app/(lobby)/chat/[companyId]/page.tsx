import ChatComponent from "@/components/chat-component";
import ChatSideBar from "@/components/chat-side-bar";
import PDFViewer from "@/components/pdf-viewer";
import { db } from "@/db";
import { chats, companies } from "@/db/schema";
import { getAuthSession } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  params: {
    companyId: string;
  };
};

const page = async ({ params: { companyId } }: Props) => {
  const session = await getAuthSession();
  if (!session) {
    return redirect("/sign-in");
  }
  const _chats = await db
    .select()
    .from(chats)
    .where(eq(chats.user_id, session.user.id))
    .innerJoin(companies, eq(companies.id, chats.company_id));
  if (!_chats) return redirect("/");
  if (!_chats.find((chat) => chat.chats.company_id === parseInt(companyId))) {
    return redirect("/");
  }
  const currentChat = _chats.find((chat) => chat.chats.company_id === parseInt(companyId));
  return (
    <div className="flex max-h-screen overflow-scroll">
      <div className="flex w-full max-h-screen overflow-scroll">
        {/* Chat Sidebar */}

        <div className="flex-[2] max-w-xs">
          <ChatSideBar chats={_chats} companyId={parseInt(companyId)} />
        </div>
        {/* PDF Viewer */}
        <div className="max-h-screen p-4 overflow-scroll flex-[4]">
          <PDFViewer pdf_url={currentChat?.chats.pdfUrl || ""} />
        </div>
        {/* Chat component */}
        <div className="flex-[4] border-1-4 border-1-slate-200">
          <ChatComponent chatId={currentChat?.chats.id!} />
        </div>
      </div>
    </div>
  );
};

export default page;
