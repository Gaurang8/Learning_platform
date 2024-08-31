import { auth } from "@clerk/nextjs";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();



export const ourFileRouter = {
  courseImage: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  }).middleware(() => {
    const { userId } = auth();
    if (!userId) {
      throw new Error("Unauthorized");
    }
    return {
      userId,
    };
  })
    .onUploadComplete(() => {

    }),
  courseAttachment: f(["text", "image", "video", "pdf"]).onUploadComplete(
    () => { }
  ),

  chapterVideo: f({
    video: {
      maxFileSize: "256MB",
      maxFileCount: 1,
    },
  }).onUploadComplete(() => { }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
