"use client";

import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TBlogSchema, blogSchema } from "@/types/postTypes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { SurveyFormClipboard } from "@/lib/PlainClipboard";
import { Quill } from "react-quill";

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => (
    <div className="h-[300px] max-w-[900px] bg-gray-800 animate-pulse rounded-md"></div>
  ),
});

Quill.register("modules/clipboard", SurveyFormClipboard, true);

const page: React.FC = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<TBlogSchema>({
    resolver: zodResolver(blogSchema),
  });

  const onSubmit = (data: TBlogSchema) => {
    handleCreateBlog(data);
  };

  async function handleCreateBlog(data: {
    title: string;
    body: string;
    description: string;
  }) {
    setIsSubmitting(true);
    try {
      const response = await axios.post("/api/blogs/create", data);
      if (response?.status === 201) {
        alert("Blog Created Successfully");
      }
      router.refresh();
      reset();
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  const toolbarOptions = [
    ["bold", "italic", "underline"],
    ["code-block"],
    [{ header: 1 }, { header: 2 }],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ size: ["small", false, "large", "huge"] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["link"],
  ];

  const module = {
    toolbar: toolbarOptions,
    clipboard: {
      matchVisual: true,
    },
  };

  return (
    <Container>
      <div className="mt-10 max-w-[900px] mx-auto flex flex-col gap-4 items-center">
        <h1 className="font-bold tracking-wider text-xl">Create Blog</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-3 w-full"
        >
          <Input
            {...register("title")}
            type="text"
            placeholder="Title..."
            className="border-zinc-500 text-lg"
          />
          {errors?.title ? (
            <span className="text-red-500 text-sm">{`${errors?.title.message}`}</span>
          ) : null}
          <Input
            {...register("description")}
            type="text"
            placeholder="Description..."
            className="border-zinc-500 text-lg"
          />

          {errors?.description ? (
            <span className="text-red-500 text-sm">{`${errors?.description.message}`}</span>
          ) : null}

          <div className="relative h-[300px]">
            <Controller
              name="body"
              control={control}
              render={({ field }) => (
                <ReactQuill modules={module} theme="snow" {...field} />
              )}
            />
          </div>
          {errors?.body ? (
            <span className="text-red-500 text-sm">{`${errors?.body.message}`}</span>
          ) : null}
          <Button
            disabled={isSubmitting}
            variant="default"
            size="lg"
            className="font-bold tracking-wider text-[1rem]"
          >
            {isSubmitting ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              "Create Post"
            )}
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default page;
