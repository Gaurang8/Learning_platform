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
import { Pencil } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
    description: z.string().min(1, {
        message: "Description is required",
    }),
});

interface DescriptionFormProps {
    initialData: Course;
    courseId: string;
}

export const DescriptionForm = ({
    initialData,
    courseId,
}: DescriptionFormProps) => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            description : initialData?.description || ""
        },
    });

    const [isEditing, setIsEditing] = useState(false);

    const toggleEditing = () => setIsEditing((prev) => !prev);

    const router = useRouter();

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        try {

            await axios.patch(`/api/courses/${courseId}`, data);
            toast.success("Title updated successfully");
            toggleEditing();
            router.refresh();
        }
        catch (error) {
            toast.error("Failed to update title");
        }
    };

    return (
        <div className="mt-6 p-4 bg-slate-100 rounded-md ">
            <div className="font-medium flex items-center justify-between">
                Description Form
                <Button variant={"ghost"} onClick={toggleEditing}>
                    {isEditing ? (
                        <>Cancel</>
                    ) : (
                        <>
                            <Pencil className="h-4 w-4 mr-2" />
                            Edit Description
                        </>
                    )}
                </Button>
            </div>
            {
                !isEditing && (
                    <p className={cn(
                        "text-sm mt-2",
                        !initialData.description && "text-slate-500 italic"
                    )}>
                        {initialData.description || "No description"}
                    </p>
                )
            }
            {
                isEditing && (
                    <Form {...form} >
                        <form onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-4 mt-4">
                            <FormField
                                name="description"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                           <Textarea
                                            disabled={isSubmitting}
                                            placeholder="e.g. This course is about..."
                                            {...field}
                                        />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex items-center gap-x-2">
                                <Button
                                    type="submit"
                                    disabled={!isValid || isSubmitting}
                                >
                                    Save
                                </Button>
                            </div>
                        </form>
                    </Form>
                )
            }
        </div>
    );
};
