"use client";
import { Inbox } from "lucide-react";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useToast } from "@/components/ui/use-toast";
import { uploadToS3 } from "@/lib/s3";
import { getErrorMessage } from "@/lib/utils";
import { ToastAction } from "@/components/ui/toast";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Loader2 } from "lucide-react";

const FileUpload = () => {
  const [uploading, setUploading] = useState<boolean>(false);
  const { mutate, isLoading } = useMutation({
    mutationFn: async ({
      file_key,
      file_name,
    }: {
      file_key: string;
      file_name: string;
    }) => {
      const response = await axios.post("/api/create-chat", {
        file_key,
        file_name,
      });
      return response.data;
    },
  });
  const { toast } = useToast();
  const { getRootProps, getInputProps } = useDropzone({
    accept: { "application/pdf": [".pdf"] },
    maxFiles: 1,
    onDrop: async (acceptedFiles) => {
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
        setUploading(true);
        const data = await uploadToS3(file);
        if (!data?.file_key || !data.file_name) {
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: "The file you uploaded contains no data.",
            action: <ToastAction altText="Try again">Try again</ToastAction>,
          });
          return;
        }
        mutate(data, {
          onSuccess: (data) => {
            console.log("DATA:", data);

            toast({
              variant: "default",
              title: `${data.message}`,
              description: `Elysium is ready to analyse your document!`,
            });
          },
          onError: (error) => {
            toast({
              variant: "destructive",
              title: "Uh oh! Error creating chat.",
              description: getErrorMessage(error),
            });
          },
        });
        toast({
          variant: "default",
          title: "Successfully uploaded file:",
          description: `${data.file_name}`,
        });
        return;
      } catch (error: unknown) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: getErrorMessage(error),
        });
      } finally {
        setUploading(false);
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
        {uploading || isLoading ? (
          <>
            <Loader2 className="animate-spin h-10 w-10 text-primary" />
            <p className="mt-2 text-sm text-muted-foreground">
              Consuming your document...
            </p>
          </>
        ) : (
          <>
            <Inbox className="w-10 h-10 text-primary" />
            <p className="mt-2 text-sm text-muted-foreground">Drop DPF Here</p>
          </>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
