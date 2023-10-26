"use client";

import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TBlogSchema, blogSchema } from "@/types/postTypes";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { SurveyFormClipboard } from "@/lib/PlainClipboard";
import { Quill } from "react-quill";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNewBlog } from "@/components/queries/queries";

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => (
    <div className="h-[300px] max-w-[900px] bg-gray-800 animate-pulse rounded-md"></div>
  ),
});

Quill.register("modules/clipboard", SurveyFormClipboard, true);

const Page: React.FC = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<TBlogSchema>({
    resolver: zodResolver(blogSchema),
  });

  // mutation function for creating blog...
  const { mutate: CreateBlog, isLoading: CreatingBlog } = useMutation({
    mutationFn: createNewBlog,
    onSuccess: () => {
      queryClient.invalidateQueries(["blogs"]);
      alert("Blog Created Successfully");
      reset();
    },
    onSettled(data) {
      router.push(`/details/${data?.blog._id}`);
    },
    onError: () => alert("Something went wrong try again"),
  });

  const onSubmit = (data: TBlogSchema) => {
    handleCreateBlog(data);
  };

  async function handleCreateBlog(data: {
    title: string;
    body: string;
    description: string;
  }) {
    CreateBlog(data);
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

  const modulee = {
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
                <ReactQuill
                  modules={modulee}
                  theme="snow"
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
          </div>
          {errors?.body ? (
            <span className="text-red-500 text-sm">{`${errors?.body.message}`}</span>
          ) : null}
          <Button
            disabled={CreatingBlog}
            variant="default"
            size="lg"
            className="font-bold tracking-wider text-[1rem]"
          >
            {CreatingBlog ? (
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

export default Page;
