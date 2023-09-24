import axios from "axios";
import Container from "./Container";
import { Blogs } from "@/types/postTypes";
import BlogDetails from "./BlogDetails";

export default async function Blogs() {
  const response = await axios.get("http://localhost:3000/api/blogs/readall");
  const AllBlogs: Blogs = response.data;
  if (AllBlogs.blogs.length === 0) {
    return (
      <h1 className="mt-10 text-center text-2xl font-bold tracking-wider">
        No Blogs available :(
      </h1>
    );
  }

  return (
    <Container>
      <div className="flex flex-col gap-7">
        <h1 className="text-2xl font-extrabold underline underline-offset-4">
          All Blogs :
        </h1>
        <section className="flex flex-col gap-4 mb-10">
          {AllBlogs.blogs.map((blog) => {
            return <BlogDetails blog={blog} key={blog._id} />;
          })}
        </section>
      </div>
    </Container>
  );
}
