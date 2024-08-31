import { IconBadge } from "@/components/icon-badge";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { CircleDollarSign, File, LayoutDashboard, ListChecks } from "lucide-react";
import { redirect } from "next/navigation";
import { TitleForm } from "./_component/TitleForm";
import { DescriptionForm } from "./_component/DescriptionForm";
import { ImageUploadForm } from "./_component/ImageUploadForm";
import { CategoryForm } from "./_component/CategoryForm";
import { ChaptersForm } from "./_component/ChapterForm";
import { PriceForm } from "./_component/PriceForm";
import { AttachmentForm } from "./_component/AttachmentForm";


const SingleCoursePage = async ({ params }: { params: { courseId: string } }) => {

    const { userId } = auth();

    if (!userId) {
        redirect('/');
    }

    const course = await db.course.findUnique({
        where: {
            id: params.courseId,
        },
        include: {
            chapters: {
                orderBy: {
                    position: 'asc',
                },
            },
            attachments: {
                orderBy: {
                    createdAt: 'desc',
                },
            }
        },
    });

    if (!course) {
        redirect('/');
    }

    let RequiredField = [
        course.title,
        course.description,
        course.imageUrl,
        course.price,
        course.categoryId,
        course.chapters.some((chapter) => chapter.isPublished),
    ]

    let TotalField = RequiredField.length;
    let CompletedField = RequiredField.filter(Boolean).length;

    let Progress = `(${CompletedField}/${TotalField})`;


    const categories = await db.category.findMany({
        orderBy: {
            name: 'asc',
        },
    });

    return (
        <div className="p-6">
            <div className="flex justify-between items-center">
                <div className="flex flex-col gap-y-2">
                    <h1 className="text-2xl font-medium">
                        Course Setup
                    </h1>
                    <p className="text-slate-700 text-sm">
                        Complete all fields {Progress}
                    </p>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
                <div>
                    <div className="flex items-center gap-x-2">
                        <IconBadge icon={LayoutDashboard} />
                        <h2 className="text-xl">
                            Customize your course
                        </h2>
                    </div>
                    <TitleForm
                        initialData={course}
                        courseId={course.id}
                    />
                    <DescriptionForm
                        initialData={course}
                        courseId={course.id}
                    />
                    <ImageUploadForm
                        initialData={course}
                        courseId={course.id}
                    />
                    <CategoryForm
                        initialData={course}
                        courseId={course.id}
                        options={categories.map((category) => ({
                            label: category.name,
                            value: category.id,
                        }))}
                    />
                </div>
                <div className="space-y-6">
                    <div>
                        <div className="flex items-center gap-x-2">
                            <IconBadge icon={ListChecks} />
                            <h2 className="text-xl">
                                Course chapters
                            </h2>
                        </div>
                        <ChaptersForm
                            initialData={course}
                            courseId={course.id}
                        />
                    </div>
                    <div>
                        <div className="flex items-center gap-x-2">
                            <IconBadge icon={CircleDollarSign} />
                            <h2 className="text-xl">
                                Sell your course
                            </h2>
                        </div>
                        <PriceForm
                            initialData={course}
                            courseId={course.id}
                        />
                    </div>
                    <div>
                        <div className="flex items-center gap-x-2">
                            <IconBadge icon={File} />
                            <h2 className="text-xl">
                                Resources & Attachments
                            </h2>
                        </div>
                        <AttachmentForm
                            initialData={course}
                            courseId={course.id}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleCoursePage;
