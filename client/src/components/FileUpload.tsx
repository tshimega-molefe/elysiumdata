"use client";
import { Inbox } from "lucide-react";
import React from "react";
import { useDropzone } from "react-dropzone";
import { useToast } from "@/components/ui/use-toast";

const FileUpload = () => {
  const { toast } = useToast();
  const { getRootProps, getInputProps } = useDropzone({
    accept: { "application/pdf": [".pdf"] },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      console.log(acceptedFiles);
      const file = acceptedFiles[0];
      if (file.size > 10 * 1024 * 1024) {
        // bigger than 10MB
        toast({
          variant: "destructive",
          title: "Uh oh! File too big",
          description: "Please upload a file smaller than 10MB",
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
