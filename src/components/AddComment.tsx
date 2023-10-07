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
import { useRouter } from "next/navigation";
import { MessageCircle } from "lucide-react";
import { Textarea } from "./ui/textarea";

export default function AddComment({
  blogId,
  blogDetails,
}: {
  blogId: string;
  blogDetails: BlogDetail | null | undefined;
}) {
  const router = useRouter();
  const session = useSession();
  const [userId, setUserId] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const [textareas, setTextareas] = useState<string[]>([]);
  const [replies, setReplies] = useState<{ [key: string]: string }>({});

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
    if (session?.status === "unauthenticated") {
      router.push("/sign-in");
    }
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

  function handleReply(commentId: string) {
    setTextareas([...textareas, commentId]);
  }

  function handleDismissReply(commentId: string) {
    setReplies((prevReplies) => {
      const updatedReplies = { ...prevReplies };
      delete updatedReplies[commentId];
      return updatedReplies;
    });

    const filteredTextareas = textareas.filter(
      (textarea) => textarea !== commentId
    );
    setTextareas(filteredTextareas);
  }

  function handleReplyChange(commentId: string, value: string) {
    setReplies({ ...replies, [commentId]: value });
  }

  async function handleReplySubmit(blogId: string, commentId: string) {
    if (session?.status === "unauthenticated") {
      router.push("/sign-in");
    }
    try {
      console.log(blogId, commentId);
      const response = await axios.post(
        `http://localhost:3000/api/blogs/reply?blogId=${blogId}&commentId=${commentId}`,
        { reply: replies[commentId] }
      );
      console.log(response);
      if (response.status === 200) {
        alert("Reply on Comment Successfull");
      }
    } catch (error) {
      alert(error);
      console.log(error);
    } finally {
      const filteredTextareas = textareas.filter(
        (textarea) => textarea !== commentId
      );
      setTextareas(filteredTextareas);
      router.refresh();
    }
  }

  return (
    <div className="mt-14 flex flex-col gap-10">
      <div>
        <h1 className="font-bold text-xl tracking-wider underline underline-offset-[11px]">
          Comments ({blogDetails?.comments.length})
        </h1>
      </div>
      {session.status === "authenticated" ? (
        <div className="flex gap-3 items-center">
          <AvatarDemo
            image={session?.data?.user?.image || ""}
            id={userId || ""}
          />
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
      ) : (
        <div>
          <Button
            onClick={() => router.push("/sign-in")}
            variant="outline"
            className="font-bold font-xl tracking-wide"
          >
            Sign In to Comment
          </Button>
        </div>
      )}
      <div className="flex flex-col gap-10 mt-5 mb-10">
        {blogDetails?.comments?.map((comment) => (
          <div key={comment?._id}>
            <div className="flex flex-col gap-0 border-[2px] rounded-lg py-3 pl-5">
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
            <div>
              <div className="mt-2 pl-5">
                {textareas.includes(comment._id) ? null : (
                  <Button
                    onClick={() => handleReply(comment._id)}
                    variant="secondary"
                    className="flex items-center gap-2"
                  >
                    <MessageCircle className="w-5 h-5" /> reply
                  </Button>
                )}
                {textareas.includes(comment._id) ? (
                  <div className="flex flex-col gap-3">
                    <Textarea
                      value={replies[comment._id]}
                      onChange={(e) =>
                        handleReplyChange(comment._id, e.target.value)
                      }
                      className="w-[50%] bg-black"
                      placeholder="Reply..."
                    />
                    <div className="flex gap-4">
                      <Button
                        onClick={() =>
                          handleReplySubmit(blogDetails?._id, comment?._id)
                        }
                      >
                        Submit
                      </Button>
                      <Button
                        onClick={() => handleDismissReply(comment?._id)}
                        variant="outline"
                      >
                        Dismiss
                      </Button>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
            <div className="border-l-[2px] ml-10">
              {comment.replies &&
                comment.replies.map((reply) => (
                  <div className="mt-5 ml-4 flex flex-col gap-0 border-[2px] rounded-lg py-3 pl-5">
                    <div className="flex gap-3 items-center">
                      <AvatarDemo
                        image={reply?.user?.image || ""}
                        id={reply?.user?._id || ""}
                      />
                      <div className="flex flex-col">
                        <p className="text-[0.85rem] font-semibold tracking-wide">
                          {reply?.user?.name}
                        </p>
                        <p className="text-[0.7rem] italic">
                          {formatDatee(reply?.createdAt)}
                        </p>
                      </div>
                    </div>
                    <div className="pl-4 pt-3 text-lg opacity-80ml-[1.2rem]">
                      <p>&nbsp;{reply.reply}</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
