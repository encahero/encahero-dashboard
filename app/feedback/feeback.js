"use client";

import { useEffect, useRef, useState } from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatDistanceToNow } from "date-fns";
import getImageUrl from "@/utils/get-image-url";
import getNameOfUser from "@/utils/get-name-of-user";

import { feedbackService } from "@/services";
import { useQuery } from "@tanstack/react-query";
import PreviewImage from "@/components/preview-image";

const FeedBackItem = ({ user, text, images, createdAt, onClickImage }) => {
  return (
    <Card className="bg-[var(--sidebar)] text-[var(--sidebar-foreground)] shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <CardHeader className="flex items-center space-x-2">
        <Avatar>
          <AvatarImage src={getImageUrl(user.avatar, "avatar")} />
        </Avatar>
        <div>
          <CardTitle className="text-sm font-semibold">
            {getNameOfUser(user)}
          </CardTitle>
          <CardDescription className="text-xs text-gray-500">
            {user.email}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <p className="mb-2">{text}</p>

        {images && images.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {images.map((img, i) => (
              <img
                key={i}
                src={getImageUrl(img)}
                alt={`feedback-${i}`}
                onClick={() => onClickImage(getImageUrl(img))}
                className="w-24 h-24 object-cover rounded-md hover:scale-105 transition-transform duration-200"
              />
            ))}
          </div>
        )}

        <p className="mt-2 text-xs text-gray-400">
          {formatDistanceToNow(new Date(createdAt), {
            addSuffix: true,
          })}
        </p>
      </CardContent>
    </Card>
  );
};

export default function Feedback() {
  const [previewImage, setPreviewImage] = useState(null);

  const {
    data: feedbacks = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["feedbacks"],
    queryFn: () => feedbackService.getAllFeedBack(),
  });

  return (
    <div className="p-12">
      <h1 className="text-3xl font-bold mb-4">Feedbacks</h1>

      <ScrollArea className="h-[85vh]">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-4 pb-10 justify-center">
          {feedbacks.map((fb) => (
            <FeedBackItem
              key={fb.id}
              user={fb?.user}
              text={fb.text}
              images={fb.images}
              createdAt={fb.createdAt}
              onClickImage={(img) => setPreviewImage(img)}
            />
          ))}
        </div>
      </ScrollArea>

      {/* Dialog preview */}
      <PreviewImage img={previewImage} onClose={() => setPreviewImage(null)} />
    </div>
  );
}
