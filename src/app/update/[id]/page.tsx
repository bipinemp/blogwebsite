"use client";

import { BlogDetail } from "@/types/postTypes";
import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => (
    <div className="h-[300px] max-w-[900px] bg-gray-800 animate-pulse rounded-md"></div>
  ),
});

const page = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const router = useRouter();

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [body, setBody] = useState<string>("");

  useEffect(() => {
    const getBlogDetails = async (id: string) => {
      const response = await axios.get<BlogDetail>(
        `http://localhost:3000/api/blogs/details/${id}`
      );
      if (response?.status === 200) {
        setTitle(response?.data?.blog?.title);
        setDescription(response?.data?.blog?.description);
        setBody(response?.data?.blog?.body || "");
      }
    };
    getBlogDetails(id);
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        `http://localhost:3000/api/blogs/edit/${id}`,
        { title, body }
      );
      if (response.status === 200) {
        alert("Blog Updated Successfully");
        router.push(`/details/${id}`);
      }
    } catch (error: any) {
      alert(error);
    }
  };

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
      <div className="max-w-[900px]  mx-auto mt-10 flex flex-col gap-5">
        <h1 className="text-xl font-bold tracking-widest underline underline-offset-8">
          Update Blog ::
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full">
          <Input
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            type="text"
            placeholder="Title..."
            className="border-zinc-500 text-lg"
          />

          <Input
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            type="text"
            placeholder="Description..."
            className="border-zinc-500 text-lg"
          />

          <div className="relative h-[300px]">
            <ReactQuill
              modules={module}
              theme="snow"
              value={body}
              onChange={setBody}
            />
          </div>

          <Button
            variant="default"
            size="lg"
            className="font-bold tracking-wider text-[1rem]"
          >
            Update Blog
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default page;
