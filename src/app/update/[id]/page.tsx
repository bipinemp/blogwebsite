"use client";

import { BlogDetailsType } from "@/app/details/[id]/page";
import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

const page = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const router = useRouter();

  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");

  useEffect(() => {
    const getBlogDetails = async (id: string) => {
      const response = await axios.get<BlogDetailsType>(
        `http://localhost:3000/api/blogs/details/${id}`
      );
      if (response?.status === 200) {
        setTitle(response?.data?.blog?.title);
        setBody(response?.data?.blog?.body);
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
  return (
    <Container>
      <div className="max-w-[400px] mx-auto mt-10 flex flex-col gap-5">
        <h1 className="text-xl font-bold tracking-widest underline underline-offset-8">
          Update Blog ::
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full">
          <Input
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            type="text"
            placeholder="Title..."
            className="border-zinc-500"
          />

          <Textarea
            onChange={(e) => setBody(e.target.value)}
            value={body}
            placeholder="Write the content here..."
            className="border-zinc-500"
          />

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
