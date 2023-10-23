import React from "react";

export const BlogLoadingChild = () => {
  return (
    <div className="h-[220px] animate-pulse z-20 cursor-pointer border-[2px] border-gray-700 rounded-lg p-4 flex flex-col gap-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <p className="w-[50px] h-[50px] rounded-full bg-gray-700"></p>

          <div className="bg-gray-700 w-[150px] h-[30px] rounded-lg"></div>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <h1 className="bg-gray-700 w-[95%] h-[35px] rounded-lg"></h1>
        <p className="bg-gray-700 w-[75%] h-[20px] rounded-lg"></p>
      </div>
    </div>
  );
};

export const UserProfileLoading = () => {
  return (
    <div className="h-[210px] flex mt-10 flex-col gap-4 items-center border-[2px] p-3 rounded-lg">
      <div className="w-[100px] h-[100px] bg-gray-700 animate-pulse rounded-full"></div>
      <h1 className="w-[170px] h-[25px] bg-gray-700 animate-pulse rounded-md"></h1>
      <h1 className="w-[130px] h-[25px] bg-gray-700 animate-pulse rounded-md"></h1>
    </div>
  );
};

function BlogLoading() {
  return (
    <div className="flex flex-col gap-7">
      <BlogLoadingChild />
      <BlogLoadingChild />
      <BlogLoadingChild />
      <BlogLoadingChild />
      <BlogLoadingChild />
      <BlogLoadingChild />
      <BlogLoadingChild />
      <BlogLoadingChild />
      <BlogLoadingChild />
      <BlogLoadingChild />
    </div>
  );
}

export default BlogLoading;
