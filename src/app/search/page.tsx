"use client";

import BlogDetails from "@/components/BlogDetails";
import Container from "@/components/Container";
import { Blog } from "@/types/postTypes";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type SearchResults = {
  message: String;
  filteredBlogs: Blog[];
};

const page = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  const search = query?.toLocaleLowerCase();

  const [searchResults, setSearchResults] = useState<SearchResults>();

  useEffect(() => {
    const getSearchResults = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/blogs/search?query=${search}`
        );
        if (response.status === 200) {
          setSearchResults(response.data);
        }
      } catch (error) {
        alert(error);
      }
    };
    getSearchResults();
  }, [query]);

  return (
    <div className="mx-auto mt-4 max-w-5xl px-6">
      <Container>
        <div className="flex flex-col gap-7">
          <h1 className="font-semibold text-xl tracking-wide">
            Search Results for <span className="text-red-500">"{query}"</span>
          </h1>
          <section className="flex flex-col gap-4 mb-10">
            {searchResults?.filteredBlogs.map((blog) => (
              <BlogDetails blog={blog} key={blog._id} />
            ))}
          </section>
        </div>
      </Container>
    </div>
  );
};

export default page;
