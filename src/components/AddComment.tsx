"use client";

import { useState } from "react";
import AvatarDemo from "./header/Avatar";
import { useSession } from "next-auth/react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { formatDate } from "@/hooks/useFormatDate";
import { useRouter } from "next/navigation";
import { Loader2, MessageCircle } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { Blog } from "@/types/postTypes";
import { useUserDetails } from "@/hooks/blogs/use-blog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNewComment, createNewReply } from "./queries/queries";

export default function AddComment({
  blogId,
  blogDetails,
}: {
  blogId: string;
  blogDetails: Blog | null;
}) {
  const router = useRouter();
  const session = useSession();
  const queryClient = useQueryClient();

  const [comment, setComment] = useState<string>("");
  const [textareas, setTextareas] = useState<string[]>([]);
  const [replies, setReplies] = useState<{ [key: string]: string }>({});

  // for fetching user Details like email , name etc using logged in user's email
  const { data } = useUserDetails(session?.data?.user?.email || "");

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setComment(e.target.value);
  };

  // mutation function for creating new comment in blog
  const { mutate: CreateNewComment, isLoading: SubmittingComment } =
    useMutation({
      mutationFn: createNewComment,
      onSuccess: () => {
        queryClient.invalidateQueries(["blogDetails"]);
      },
      onSettled() {
        setComment("");
      },
      onError: () => alert("Something went wrong try again later"),
    });

  const submitComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (session?.status === "unauthenticated") {
      router.push("/sign-in");
    }
    const commentData = { blogId, comment };
    CreateNewComment(commentData);
  };

  // function which is using custom hook for formating blog creation date
  function formatDatee(val: string) {
    const formattedDate = formatDate(val || "");
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

  // mutation function for posting reply on comment

  const { mutate: CreateNewReplyMutation, isLoading: ReplyLoading } =
    useMutation({
      mutationFn: createNewReply,
      onSuccess: () => {
        queryClient.invalidateQueries(["blogDetails"]);
      },
      onSettled: (data) => {
        const filteredTextareas = textareas.filter(
          (textarea) => textarea !== data?.replyData?.commentId
        );
        setTextareas(filteredTextareas);
        handleDismissReply(data?.replyData?.commentId);
      },
    });

  function handleReplyFormSubmit(blogId: string, commentId: string) {
    handleReplySubmit(blogId, commentId);
  }

  function handleReplySubmit(blogId: string, commentId: string) {
    if (session?.status === "authenticated") {
      const replyData = { blogId, commentId, reply: replies[commentId] };
      CreateNewReplyMutation(replyData);
    } else {
      router.push("/sign-in");
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
        <form onSubmit={submitComment} className="flex gap-3 items-center">
          <AvatarDemo
            image={session?.data?.user?.image || ""}
            id={data?.userData?._id || ""}
          />
          <Input
            value={comment}
            onChange={handleCommentChange}
            placeholder="Add an Comment..."
            className="max-w-[350px] border-zinc-500"
          />
          <Button type="submit" className="font-bold tracking-wide text-lg">
            {SubmittingComment ? (
              <div className="flex items-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                <p>Submitting</p>
              </div>
            ) : (
              "Submit"
            )}
          </Button>
        </form>
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
                      className="w-[50%] border-gray-400 bg-white text-black dark:text-white dark:bg-black"
                      placeholder="Reply..."
                    />
                    <div className="flex gap-4">
                      <Button
                        onClick={() =>
                          handleReplyFormSubmit(blogDetails?._id, comment?._id)
                        }
                        type="submit"
                      >
                        {ReplyLoading ? (
                          <div className="flex items-center gap-3">
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <p>Submitting</p>
                          </div>
                        ) : (
                          "Submit"
                        )}
                      </Button>
                      <Button
                        type="button"
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
                  <div
                    key={reply?._id}
                    className="mt-5 ml-4 flex flex-col gap-0 border-[2px] rounded-lg py-3 pl-5"
                  >
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
