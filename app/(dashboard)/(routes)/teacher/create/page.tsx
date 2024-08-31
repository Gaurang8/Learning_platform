"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
    title: z.string().min(1, { message: "Title is required" }),
});

const CourseCreatePage = () => {

    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
        },
    });

    const { isSubmitting, isValid } = form.formState;

    const handleSubmit = async (value: z.infer<typeof formSchema>) => {
        try {
            const response = await axios.post("/api/courses", value);
            router.push(`/teacher/courses/${response.data.id}`);
            toast.success("Course created successfully");
        }
        catch (error) {
            toast.error("Something went wrong");
        }
    };

    return (
        <div className="mx-auto h-full max-w-5xl p-6 flex md:items-center md:justify-center ">
            <div>
                <h1 className="text-2xl">Name your course</h1>
                <p className="text-slate-600 text-sm">
                    Give your course a name !! don't worry you can change it later.
                </p>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Course Title</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={isSubmitting}
                                            placeholder="e.g. 'Introduction to JavaScript'"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Your course title should be descriptive and easy to
                                        understand
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex items-center gap-x-2">
                            <Link href="/">
                                <Button type="button" variant="ghost">
                                    Cancel
                                </Button>
                            </Link>
                            <Button
                                disabled={!isValid || isSubmitting}
                                type="submit"
                            >
                                Submit
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default CourseCreatePage;
