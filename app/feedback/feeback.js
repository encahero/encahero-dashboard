"use client";

import { useRef, useState } from "react";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Dữ liệu sample đúng với backend của bạn
const SAMPLE = [
  {
    id: 1,
    text: "Hello",
    user_id: 1,
    user: {
      id: 1,
      email: "danhtuan3103@gmail.com",
      username: "danhtuan31036157",
      avatar:
        "https://lh3.googleusercontent.com/a/ACg8ocJ4Lrcf93FQDDUb6BWWJJUPApujonlU_6l1s2N0mYd5XaDGzTIo=s96-c",
      firstName: "Tuấn",
      lastName: "Danh",
    },
    images: [
      "1760624821121-67d0r3foke8-image_0.jpg",
      "1760624821134-2cu0sc2dnzl-image_1.jpg",
    ],
    createdAt: "2025-10-16T14:27:01.141Z",
  },

  {
    id: 2,
    text: "Hello Abc",
    user_id: 1,
    user: {
      id: 1,
      email: "danhtuan3103@gmail.com",
      username: "danhtuan31036157",
      avatar:
        "https://lh3.googleusercontent.com/a/ACg8ocJ4Lrcf93FQDDUb6BWWJJUPApujonlU_6l1s2N0mYd5XaDGzTIo=s96-c",
      firstName: "Tuấn",
      lastName: "Danh",
    },
    images: [
      "1760624821121-67d0r3foke8-image_0.jpg",
      "1760624821134-2cu0sc2dnzl-image_1.jpg",
    ],
    createdAt: "2025-10-16T14:27:01.141Z",
  },
  {
    id: 15,
    text: "Hello",
    user_id: 1,
    user: {
      id: 1,
      email: "danhtuan3103@gmail.com",
      username: "danhtuan31036157",
      avatar:
        "https://lh3.googleusercontent.com/a/ACg8ocJ4Lrcf93FQDDUb6BWWJJUPApujonlU_6l1s2N0mYd5XaDGzTIo=s96-c",
      firstName: "Tuấn",
      lastName: "Danh",
    },
    images: [
      "1760624821121-67d0r3foke8-image_0.jpg",
      "1760624821134-2cu0sc2dnzl-image_1.jpg",
    ],
    createdAt: "2025-10-16T14:27:01.141Z",
  },
];

export default function Feedback() {
  const [feedbacks, setFeedbacks] = useState(SAMPLE || []);
  const [previewImage, setPreviewImage] = useState(null);

  return (
    <div className="p-12">
      <h1 className="text-3xl font-bold mb-4">Feedbacks</h1>

      <ScrollArea className="h-[85vh]">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-4 pb-10 justify-center">
          {feedbacks.map((fb) => (
            <Card
              key={fb.id}
              className="bg-[var(--sidebar)] text-[var(--sidebar-foreground)] shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
            >
              <CardHeader className="flex items-center space-x-2">
                <Avatar>
                  <AvatarImage src={getImageUrl(fb.user.avatar, "avatar")} />
                </Avatar>
                <div>
                  <CardTitle className="text-sm font-semibold">
                    {getNameOfUser(fb.user)}
                  </CardTitle>
                  <CardDescription className="text-xs text-gray-500">
                    {fb.user.email}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-2">{fb.text}</p>

                {fb.images && fb.images.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {fb.images.map((img, i) => (
                      <img
                        key={i}
                        src={getImageUrl(img)}
                        alt={`feedback-${fb.id}-${i}`}
                        onClick={() => setPreviewImage(getImageUrl(img))}
                        className="w-24 h-24 object-cover rounded-md hover:scale-105 transition-transform duration-200"
                      />
                    ))}
                  </div>
                )}

                <p className="mt-2 text-xs text-gray-400">
                  {formatDistanceToNow(new Date(fb.createdAt), {
                    addSuffix: true,
                  })}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>

      {/* Dialog preview */}
      <Dialog open={!!previewImage} onOpenChange={() => setPreviewImage(null)}>
        <DialogContent className="max-w-3xl p-4 bg-white dark:bg-gray-800">
          <DialogHeader>
            <DialogTitle className="text-center">Image Preview</DialogTitle>
          </DialogHeader>
          {previewImage && (
            <img
              src={previewImage}
              alt="Preview"
              className="w-full h-auto object-contain rounded-md"
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
