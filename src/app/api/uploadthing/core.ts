import { getAuthSession } from "@/lib/auth";
import { createUploadthing, type FileRouter } from "uploadthing/next";
 
const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    .middleware(async ({ req }) => {
        const session = await getAuthSession();
        const { user_id } = session?.user;
        if(!session) throw new Error('Not authorized');
        return {userId: user_id};
    })
    .onUploadComplete(async ({ metadata, file }) => {
     
    }),
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;