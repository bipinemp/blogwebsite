"use client";

import BlogDetails from "@/components/BlogDetails";
import { BlogLoadingChild } from "@/components/BlogLoading";
import Container from "@/components/Container";
import { useSearchBlogs } from "@/hooks/blogs/use-blog";
import { useSearchParams } from "next/navigation";

const Page = () => {
  const searchParams = useSearchParams();
  const q = searchParams.get("search");
  const { data, isLoading } = useSearchBlogs(q || "");

  return (
    <div className="mx-auto mt-4 max-w-5xl px-6">
      <Container>
        <div className="flex flex-col gap-7">
          <h1 className="font-semibold text-xl tracking-wide">
            Search Results for{" "}
            <span className="text-red-500">&quot;{q}&quot;</span>
          </h1>

          {data?.filteredBlogs?.length === 0 ||
          data?.message === "Request failed with status code 400" ? (
            <h1 className="text-red-500 text-center font-bold p-5 border-[2px] border-red-500 rounded-lg bg-red-500/20">
              Not Found :)
            </h1>
          ) : null}

          {isLoading ? <BlogLoadingChild /> : null}

          <section className="flex flex-col gap-4 mb-10">
            {data?.filteredBlogs?.map((blog) => (
              <BlogDetails blog={blog} key={blog._id} />
            ))}
          </section>
        </div>
      </Container>
    </div>
  );
};

export default Page;
