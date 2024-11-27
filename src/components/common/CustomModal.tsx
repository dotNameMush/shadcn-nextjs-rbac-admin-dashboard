"use client";

import React, { Suspense } from "react";

import { useModal } from "@/hooks/use-modal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { ScrollArea } from "../ui/scroll-area";
import Loading from "../ui/loading";

interface CustomModalProps {
  title: string;
  subTitle?: string;
  children: React.ReactNode;
  scrollShadow?: boolean;
  defaultOpen?: boolean;
}

const CustomModal: React.FC<CustomModalProps> = ({
  children,
  defaultOpen,
  subTitle,
  title,
  scrollShadow = true,
}) => {
  const { isOpen, setClose } = useModal();

  return (
    <Dialog open={isOpen || defaultOpen} onOpenChange={setClose}>
      <DialogContent className="max-w-xl bg-card">
        <ScrollArea className="md:max-h-[700px]">
          <div className="flex flex-col gap-4">
            <DialogHeader className="text-left">
              <DialogTitle className="text-2xl font-bold">{title}</DialogTitle>
              <DialogDescription>{subTitle}</DialogDescription>
            </DialogHeader>
            <Suspense fallback={<Loading />}>{children}</Suspense>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default CustomModal;
