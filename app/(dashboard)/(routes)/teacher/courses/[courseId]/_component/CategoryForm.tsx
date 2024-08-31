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
import { Combobox } from "@/components/ui/Combobox";

const formSchema = z.object({
    categoryId: z.string().min(1),
});

interface CategoryFormProps {
    initialData: Course;
    courseId: string;
    options: { label: string, value: string }[];
}

export const CategoryForm = ({
    initialData,
    courseId,
    options
}: CategoryFormProps) => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            categoryId: initialData?.categoryId || ""
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

    const selectedOption = options.find((option) => option.value === initialData.categoryId);

    return (
        <div className="mt-6 p-4 bg-slate-100 rounded-md ">
            <div className="font-medium flex items-center justify-between">
                Category Form
                <Button variant={"ghost"} onClick={toggleEditing}>
                    {isEditing ? (
                        <>Cancel</>
                    ) : (
                        <>
                            <Pencil className="h-4 w-4 mr-2" />
                            Edit Category
                        </>
                    )}
                </Button>
            </div>
            {
                !isEditing && (
                    <p className={cn(
                        "text-sm mt-2",
                        !initialData.categoryId && "text-slate-500 italic"
                    )}>
                        {selectedOption?.label || "No Cateogry"}
                    </p>
                )
            }
            {
                isEditing && (
                    <Form {...form} >
                        <form onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-4 mt-4">
                            <FormField
                                name="categoryId"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Combobox
                                                options={options}
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
