import { DiplomaFormData } from "@/features/diplomas/schemas/diploma.schema";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/shared/components/ui/field";
import { Progress } from "@/shared/components/ui/progress";
import UploadedImage from "@/shared/components/global/uploaded-image";
import useUploadImage from "@/shared/hooks/use-upload-image";
import { ImageSchema, imageSchema } from "@/shared/schemas/image.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { CloudUpload, FileImage } from "lucide-react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Controller, useForm, useFormContext, useWatch } from "react-hook-form";

export default function ImageField() {
  const {
    mutate: uploadImage,
    uploadingProgress,
    isPending,
  } = useUploadImage();

  const diplomaForm = useFormContext<DiplomaFormData>();

  const imageValue = useWatch({
    control: diplomaForm.control,
    name: "image",
  });

  const form = useForm<ImageSchema>({
    resolver: zodResolver(imageSchema),
    mode: "onChange",
  });

  const [isDragging, setIsDragging] = useState(false);
  const [, setPreviewUrl] = useState<string | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(
    imageValue || null,
  );
  const [fileName, setFileName] = useState<string>("");
  const [fileSize, setFileSize] = useState<string>("");
  const [isDeleting, setIsDeleting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const previousImageValue = useRef(imageValue);

  console.log("imageValue", imageValue?.split("/").pop());

  useLayoutEffect(() => {
    if (imageValue !== previousImageValue.current) {
      setTimeout(() => setUploadedImageUrl(imageValue), 0);
      previousImageValue.current = imageValue;
    }
  }, [imageValue]);

  useEffect(() => {
    const unsubscribe = form.subscribe({
      formState: {
        values: true,
        isValid: true,
      },
      name: "image",
      callback: ({ values, isValid }) => {
        if (isValid && values.image && !isDeleting) {
          uploadImage(values, {
            onSuccess: (data) => {
              diplomaForm.setValue("image", data?.url);
              setUploadedImageUrl(data?.url || null);
              setPreviewUrl(null);
            },
            onError: (error) => {
              form.setError("image", { message: error.message });
            },
          });
        }
      },
    });
    return () => unsubscribe();
  }, [form, uploadImage, diplomaForm, isDeleting]);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      const file = files[0];
      form.setValue("image", file);
      form.trigger("image");
      createPreview(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      const file = files[0];
      form.setValue("image", file);
      form.trigger("image");
      createPreview(file);
    }
  };

  const createPreview = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
      setFileName(file.name);
      setFileSize(formatFileSize(file.size));
    };
    reader.readAsDataURL(file);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 MB";
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(2)} MB`;
  };

  const handleDownload = () => {
    if (uploadedImageUrl) {
      window.open(uploadedImageUrl, "_blank");
    }
  };

  const handleDelete = () => {
    setIsDeleting(true);
    setUploadedImageUrl(null);
    setPreviewUrl(null);
    setFileName("");
    setFileSize("");
    form.reset();
    form.clearErrors("image");
    diplomaForm.setValue("image", "");
    setTimeout(() => setIsDeleting(false), 0);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <FieldGroup>
      <Controller
        name="image"
        control={form.control}
        render={({ fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="image">Image</FieldLabel>
            {uploadedImageUrl ? (
              <UploadedImage
                src={uploadedImageUrl}
                fileName={fileName || imageValue?.split("/").pop() || ""}
                fileSize={fileSize}
                onDownload={handleDownload}
                onDelete={handleDelete}
              />
            ) : (
              <div
                className={`relative flex items-center border p-6 text-center cursor-pointer transition-colors ${
                  isDragging ? "border-primary bg-primary/5" : "border-gray-200"
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={handleClick}
              >
                <FileImage
                  className="w-10 h-10 text-gray-200"
                  strokeWidth={1}
                />
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileSelect}
                  aria-label="Upload image"
                  title="Upload image file"
                />
                <div className="flex items-center justify-center gap-2 w-full text-gray-600 text-sm cursor-pointer ">
                  <div className="text-gray-600 flex items-center gap-1">
                    <CloudUpload
                      className="w-5 h-5 text-gray-600"
                      strokeWidth={1.5}
                    />
                    Drop an image here or{" "}
                    <button
                      type="button"
                      className="text-primary"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleClick();
                      }}
                    >
                      select from your computer
                    </button>
                  </div>
                </div>
              </div>
            )}
            {isPending && <Progress value={uploadingProgress} max={100} />}

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </FieldGroup>
  );
}
