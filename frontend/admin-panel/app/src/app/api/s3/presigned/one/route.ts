import { createPresignedUrlToUpload } from "@/shared/lib/minio/helpers-server";
import { PresignedUrlProp, ShortFileProp } from "@/shared/lib/minio/types";
import { prisma } from "@/shared/lib/prisma-client";
import { nanoid } from "nanoid";
import { NextResponse } from "next/server";

const bucketName = process.env.MINIO_BUCKET_NAME!;
const expiry = 60 * 60; // 1 hour

export type PresignedUrlResponse = PresignedUrlProp & { publicUrl: string };

export async function POST(req: Request) {
  try {
    // get the file from the request body
    const body = await req.json();
    const file = body as ShortFileProp;
    console.log({ file });

    if (!file) {
      return new NextResponse("No file to upload", { status: 400 });
    }

    const fileName = nanoid(12);

    // get presigned url using s3 sdk
    const url = await createPresignedUrlToUpload({
      bucketName,
      fileName,
      expiry,
    });

    const presignedUrl = {
      fileNameInBucket: fileName,
      originalFileName: file.originalFileName,
      fileSize: file.fileSize,
      url,
    };

    const publicUrl = `http${process.env.MINIO_SSL === "true" ? "s" : ""}://${
      process.env.MINIO_ENDPOINT
    }:${process.env.MINIO_PORT}/${process.env.MINIO_BUCKET_NAME}/${
      presignedUrl.fileNameInBucket
    }`;

    // Save file details in the database
    await prisma.file.create({
      data: {
        bucket: bucketName,
        fileName: presignedUrl.fileNameInBucket,
        originalName: presignedUrl.originalFileName,
        size: presignedUrl.fileSize,
        url: publicUrl,
      },
    });

    return NextResponse.json({
      ...presignedUrl,
      publicUrl,
    } as PresignedUrlResponse);
  } catch (error) {
    console.error({ error });
    return new NextResponse("Internal error", { status: 500 });
  }
}
