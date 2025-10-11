"use client";

import { useIsMobile } from "@/shared/hooks/use-mobile";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "../../ui/drawer";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";

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
  onOpenChange: () => void;
}) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Drawer
        open={isOpen}
        onClose={() => {
          onOpenChange();
        }}
      >
        <DrawerContent className={className}>
          <DrawerHeader>
            <DrawerTitle>{title}</DrawerTitle>
          </DrawerHeader>
          {children}
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
