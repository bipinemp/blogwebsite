import Container from "@/components/Container";
import React from "react";

const LoadingChild = () => {
  return (
    <div className="h-[200px] animate-pulse z-20 cursor-pointer border-[2px] border-gray-700 rounded-lg p-4 flex flex-col gap-10">
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

function BlogLoading() {
  return (
    <div className="mx-auto mt-20 max-w-5xl px-6">
      <Container>
        <div className="flex flex-col gap-7">
          <LoadingChild />
          <LoadingChild />
          <LoadingChild />
          <LoadingChild />
          <LoadingChild />
          <LoadingChild />
        </div>
      </Container>
    </div>
  );
}

export default BlogLoading;
