"use client";

import { useIsMobile } from "../hooks/use-mobile";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/shared/ui/drawer";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog";

export const ResponsiveModal = ({
  children,
  isOpen,
  onOpenChange,
  className,
  title,
}: {
  children: React.ReactNode;
  isOpen: boolean;
  title: string;
  className?: string;
  onOpenChange: (isOpen: boolean) => void;
}) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={onOpenChange}>
        <DrawerContent className={className}>
          <DrawerHeader>
            <DrawerTitle>{title}</DrawerTitle>
          </DrawerHeader>
          <div className="p-3 ">{children}</div>
        </DrawerContent>
      </Drawer>
    );
  }
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className={className}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};
