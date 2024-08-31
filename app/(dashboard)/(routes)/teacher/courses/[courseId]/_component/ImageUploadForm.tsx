"use client";

import { Course } from "@prisma/client";
import { useState } from "react";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ImageIcon, Pencil, PlusCircle } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { FileUpload } from "@/components/FileUpload";

const formSchema = z.object({
    imageUrl: z.string().min(1, {
        message: "Image is required",
    }),
});

interface ImageUploadFormProps {
    initialData: Course;
    courseId: string;
}

export const ImageUploadForm = ({
    initialData,
    courseId,
}: ImageUploadFormProps) => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            imageUrl: initialData?.imageUrl || ""
        },
    });

    const [isEditing, setIsEditing] = useState(false);

    const toggleEditing = () => setIsEditing((prev) => !prev);

    const router = useRouter();

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        try {

            await axios.patch(`/api/courses/${courseId}`, data);
            toast.success("Image updated successfully");
            toggleEditing();
            router.refresh();
        }
        catch (error) {
            toast.error("Failed to update Image");
        }
    };

    return (
        <div className="mt-6 p-4 bg-slate-100 rounded-md ">
            <div className="font-medium flex items-center justify-between">
                Course Image
                <Button variant={"ghost"} onClick={toggleEditing}>
                    {
                        isEditing && (
                            <>
                                cancel
                            </>
                        )
                    }
                    {
                        !isEditing && !initialData?.imageUrl && (
                            <>
                                <PlusCircle className="h-4 w-4 mr-2" />
                                Add Image
                            </>
                        )
                    }
                    {
                        !isEditing && initialData?.imageUrl && (
                            <>
                                <Pencil className="h-4 w-4 mr-2" />
                                Edit Image
                            </>
                        )
                    }
                </Button>
            </div>
            {
                !isEditing && (
                    !initialData?.imageUrl ? (
                        <div className="flex justify-center items-center h-60 rounded-md bg-slate-200">
                            <ImageIcon className="h-10 w-10 text-slate-500" />
                        </div>
                    )
                        : (
                            <div className="relative aspect-video mt-2">
                                <Image
                                    alt="upload"
                                    fill
                                    className="object-cover rounded-md"
                                    src={initialData.imageUrl}
                                />
                            </div>
                        )
                )
            }
            {
                isEditing && (
                    <div>
                        <FileUpload
                            endpoint="courseImage"
                            onChange={(url) => {
                                if (url) {
                                    onSubmit({ imageUrl: url });
                                }
                            }}
                        />
                        <div className="text-xs text-muted-foreground mt-4">
                            16:9 aspect ratio recommended
                        </div>
                    </div>
                )
            }
        </div>
    );
};
