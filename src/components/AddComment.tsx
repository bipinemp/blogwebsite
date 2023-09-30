"use client";

import { useEffect, useState } from "react";
import AvatarDemo from "./header/Avatar";
import { useSession } from "next-auth/react";
import axios from "axios";
import { ProfileResponse } from "./BlogDetails";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { BlogDetail } from "@/app/details/[id]/page";
import { useFormatDate } from "@/hooks/useFormatDate";

export default function AddComment({
  blogId,
  blogDetails,
}: {
  blogId: string;
  blogDetails: BlogDetail | null | undefined;
}) {
  const session = useSession();
  const [userId, setUserId] = useState<string>("");
  const [comment, setComment] = useState<string>("");

  useEffect(() => {
    if (session?.status === "authenticated") {
      const getProfile = async () => {
        const response = await axios.get<ProfileResponse>(
          `http://localhost:3000/api/profile/email/${session?.data.user?.email}`
        );
        if (response.status === 200) {
          const id = response?.data?.userData[0]?._id;
          if (id) {
            setUserId(id);
          }
        }
      };
      getProfile();
    }
  }, [session]);

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setComment(e.target.value);
  };

  const submitComment = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/blogs/comment/${blogId}`,
        { comment }
      );
      if (response?.status === 201) {
        alert("Comment Successfull");
      }
    } catch (error) {
      alert(error);
      console.log(error);
    } finally {
      setComment("");
    }
  };

  function formatDatee(val: string) {
    const formattedDate = useFormatDate(blogDetails?.createdAt || "");
    return formattedDate;
  }

  return (
    <div className="mt-14 flex flex-col gap-10">
      <div>
        <h1 className="font-bold text-xl tracking-wider underline underline-offset-[11px]">
          Comments ({blogDetails?.comments.length})
        </h1>
      </div>
      <div className="flex gap-3 items-center">
        <AvatarDemo image={session?.data?.user?.image} id={userId} />
        <Input
          value={comment}
          onChange={handleCommentChange}
          placeholder="Add an Comment..."
          className="max-w-[350px] border-zinc-500"
        />
        <Button
          onClick={submitComment}
          className="font-bold tracking-wide text-lg"
        >
          Submit
        </Button>
      </div>
      <div className="flex flex-col gap-3 mt-5 mb-10">
        {blogDetails?.comments?.map((comment) => (
          <div
            key={comment?._id}
            className="flex flex-col gap-0 border-[2px] rounded-lg py-3 pl-5"
          >
            <div className="flex gap-3 items-center">
              <AvatarDemo
                image={comment?.user?.image || ""}
                id={comment?.user?._id || ""}
              />
              <div className="flex flex-col">
                <p className="text-[0.85rem] font-semibold tracking-wide">
                  {comment?.user.name}
                </p>
                <p className="text-[0.7rem] italic">
                  {formatDatee(comment?.createdAt)}
                </p>
              </div>
            </div>
            <div className="pl-4 pt-3 text-lg opacity-80ml-[1.2rem]">
              <p>&nbsp;{comment.comment}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
