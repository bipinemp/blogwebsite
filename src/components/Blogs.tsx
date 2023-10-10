"use client";

import Container from "./Container";
import { Blogs } from "@/types/postTypes";
import BlogDetails from "./BlogDetails";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { fetchAllBlogs } from "./queries/queries";
import { useEffect, useRef } from "react";
import { useIntersection } from "@mantine/hooks";
import BlogLoading from "./BlogLoading";

export default function Blogs() {
  const lastBlogRef = useRef(null);

  const { ref, entry } = useIntersection({
    root: lastBlogRef.current,
    threshold: 1,
  });

  const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["blogs"],
      queryFn: ({ pageParam = 1 }) => fetchAllBlogs(pageParam),
      getNextPageParam: (_, pages) => {
        return pages.length + 1;
      },
    });

  useEffect(() => {
    if (entry?.isIntersecting) {
      fetchNextPage();
    }
  }, [entry, fetchNextPage]);

  if (isLoading) {
    return <BlogLoading />;
  }

  const BlogsData = data?.pages.map((page) => page);

  const blogs = BlogsData?.flat().map((blog) => blog.blogs);

  if (blogs?.flat().length === 0) {
    return <h1>No Blogs available :)</h1>;
  }

  return (
    <Container>
      <div className="flex flex-col gap-7">
        <h1 className="text-2xl font-extrabold underline underline-offset-4">
          Your Feed
        </h1>
        <section className="flex flex-col gap-4 mb-10">
          {blogs?.flat().map((blog, i) => {
            if (i === blogs?.flat().length - 1) {
              return <div key={blog._id} ref={ref}></div>;
            }
            return <BlogDetails blog={blog} key={blog._id} />;
          })}
          <span className="relative w-full text-center text-xl m-2">
            {isFetchingNextPage ? (
              <div
                className="text-center m-2 inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-gray-300 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status"
              ></div>
            ) : hasNextPage ? (
              <span className="text-red-400">No More Blogs :(</span>
            ) : null}
          </span>
        </section>
      </div>
    </Container>
  );
}
