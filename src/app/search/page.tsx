"use client";

import BlogDetails from "@/components/BlogDetails";
import { BlogLoadingChild } from "@/components/BlogLoading";
import Container from "@/components/Container";
import { useSearchBlogs } from "@/hooks/blogs/use-blog";
import { useQueryState } from "next-usequerystate";

const Page = () => {
  const [searchQ] = useQueryState("query");

  const { data, isLoading } = useSearchBlogs(searchQ || "");

  return (
    <div className="mx-auto mt-4 max-w-5xl px-6">
      <Container>
        <div className="flex flex-col gap-7">
          <h1 className="font-semibold text-xl tracking-wide">
            Search Results for{" "}
            <span className="text-red-500">&quot;{searchQ}&quot;</span>
          </h1>

          {isLoading ? <BlogLoadingChild /> : null}

          <section className="flex flex-col gap-4 mb-10">
            {data?.filteredBlogs.map((blog) => (
              <BlogDetails blog={blog} key={blog._id} />
            ))}
          </section>
        </div>
      </Container>
    </div>
  );
};

export default Page;
