"use client";

import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TBlogSchema, blogSchema } from "@/types/postTypes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2 } from "lucide-react";

const page: React.FC = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TBlogSchema>({
    resolver: zodResolver(blogSchema),
  });

  const onSubmit = (data: TBlogSchema) => {
    handleCreateBlog(data);
  };

  async function handleCreateBlog(data: { title: string; body: string }) {
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

  return (
    <Container>
      <div className="mt-10 max-w-[400px] mx-auto flex flex-col gap-4 items-center">
        <h1 className="font-bold tracking-wider text-xl">Create Blog</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-3 w-full"
        >
          <Input
            {...register("title")}
            type="text"
            placeholder="Title..."
            className="border-zinc-500"
          />
          {errors?.title ? (
            <span className="text-red-500 text-sm">{`${errors?.title.message}`}</span>
          ) : null}
          <Textarea
            {...register("body")}
            placeholder="Write the content here..."
            className="border-zinc-500"
          />
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
