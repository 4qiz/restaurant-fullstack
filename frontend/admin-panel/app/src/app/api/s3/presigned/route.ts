import { createPresignedUrlToUpload } from "@/shared/lib/minio/helpers-server";
import { PresignedUrlProp, ShortFileProp } from "@/shared/lib/minio/types";
import { prisma } from "@/shared/lib/prisma-client";
import { nanoid } from "nanoid";
import { NextResponse } from "next/server";

const bucketName = process.env.MINIO_BUCKET_NAME!;
const expiry = 60 * 60; // 1 hour

export async function POST(req: Request) {
  try {
    // get the files from the request body
    const body = await req.json();
    const files = body as ShortFileProp[];
    console.log({ files });

    if (!files?.length) {
      return new NextResponse("No files to upload", { status: 400 });
    }

    const presignedUrls = [] as PresignedUrlProp[];

    if (files?.length) {
      // use Promise.all to get all the presigned urls in parallel
      await Promise.all(
        // loop through the files
        files.map(async (file) => {
          const fileName = nanoid(12);

          // get presigned url using s3 sdk
          const url = await createPresignedUrlToUpload({
            bucketName,
            fileName,
            expiry,
          });

          // add presigned url to the list
          presignedUrls.push({
            fileNameInBucket: fileName,
            originalFileName: file.originalFileName,
            fileSize: file.fileSize,
            url,
          });
        })
      );
    }

    const publicUrls = presignedUrls.map((presignedUrl) => {
      const publicUrl = `http${process.env.MINIO_SSL === "true" ? "s" : ""}://${
        process.env.MINIO_ENDPOINT
      }:${process.env.MINIO_PORT}/${process.env.MINIO_BUCKET_NAME}/${
        presignedUrl.fileNameInBucket
      }`;
      return { ...presignedUrl, publicUrl };
    });

    // Get the file name in bucket from the database
    await prisma.file.createMany({
      // eslint-disable-next-line
      data: publicUrls.map((presignedUrl: any) => ({
        bucket: bucketName,
        fileName: presignedUrl.fileNameInBucket,
        originalName: presignedUrl.originalFileName,
        size: presignedUrl.fileSize,
        url: presignedUrl.publicUrl,
      })),
    });

    return NextResponse.json(presignedUrls);
  } catch (error) {
    console.error({ error });
    return new NextResponse("Internal error", { status: 500 });
  }
}
