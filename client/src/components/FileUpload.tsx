"use client";
import { Inbox } from "lucide-react";
import React from "react";
import { useDropzone } from "react-dropzone";
import { useToast } from "@/components/ui/use-toast";
import { uploadToS3 } from "@/lib/s3";
import { getErrorMessage } from "@/lib/utils";
import { ToastAction } from "@/components/ui/toast";

const FileUpload = () => {
  const { toast } = useToast();
  const { getRootProps, getInputProps } = useDropzone({
    accept: { "application/pdf": [".pdf"] },
    maxFiles: 1,
    onDrop: async (acceptedFiles) => {
      console.log(acceptedFiles);
      const file = acceptedFiles[0];
      if (file.size > 10 * 1024 * 1024) {
        // bigger than 10MB
        toast({
          variant: "destructive",
          title: "Oops! File is too big.",
          description: "Please upload a file smaller than 10MB",
        });
        return;
      }

      try {
        const data = await uploadToS3(file);
        if (!data) {
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: "The file you uploaded contains no data.",
            action: <ToastAction altText="Try again">Try again</ToastAction>,
          });
        } else {
          toast({
            variant: "default",
            title: "Successfully uploaded file:",
            description: `${data.file_name}`,
          });
        }
      } catch (error: unknown) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: getErrorMessage(error),
        });
      }
    },
  });
  return (
    <div className="p-2 bg-muted rounded-xl">
      <div
        {...getRootProps({
          className:
            "border-dashed border-2 rounded-xl cursor-pointer bg-muted py-8 flex justify-center items-center flex-col",
        })}
      >
        <input {...getInputProps()} />
        <>
          <Inbox className="w-10 h-10 text-primary" />
          <p className="mt-2 text-sm text-muted-foreground">Drop DPF Here</p>
        </>
      </div>
    </div>
  );
};

export default FileUpload;
