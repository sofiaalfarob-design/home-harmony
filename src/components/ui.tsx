import * as AccordionPrimitive from "@radix-ui/react-accordion";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio";
import type { ImgHTMLAttributes, ReactNode } from "react";
import { useState } from "react";

export function ImageWithFallback({
  src,
  alt,
  fallbackSrc,
  className,
  ...props
}: {
  src: string;
  alt: string;
  fallbackSrc?: string;
  className?: string;
} & React.ImgHTMLAttributes<HTMLImageElement>) {
  const [failed, setFailed] = useState(false);
  const imageSrc = failed || !src ? fallbackSrc ?? "" : src;

  return (
    <img
      src={imageSrc}
      alt={alt}
      className={className}
      onError={() => setFailed(true)}
      {...props}
    />
  );
}

export const Accordion = AccordionPrimitive.Root;
export const AccordionItem = AccordionPrimitive.Item;
export const AccordionTrigger = AccordionPrimitive.Trigger;
export const AccordionContent = AccordionPrimitive.Content;

export const AlertDialog = AlertDialogPrimitive.Root;
export const AlertDialogTrigger = AlertDialogPrimitive.Trigger;
export const AlertDialogPortal = AlertDialogPrimitive.Portal;
export const AlertDialogOverlay = AlertDialogPrimitive.Overlay;
export const AlertDialogContent = AlertDialogPrimitive.Content;
export const AlertDialogTitle = AlertDialogPrimitive.Title;
export const AlertDialogDescription = AlertDialogPrimitive.Description;
export const AlertDialogAction = AlertDialogPrimitive.Action;
export const AlertDialogCancel = AlertDialogPrimitive.Cancel;

export function Avatar({
  name,
  src,
  className,
}: {
  name: string;
  src?: string;
  className?: string;
}) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");

  return (
    <AvatarPrimitive.Root className={`inline-flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-slate-200 text-sm font-semibold text-slate-800 ${className ?? ""}`}>
      {src ? (
        <AvatarPrimitive.Image src={src} alt={name} className="h-full w-full object-cover" />
      ) : (
        <AvatarPrimitive.Fallback delayMs={600}>{initials}</AvatarPrimitive.Fallback>
      )}
    </AvatarPrimitive.Root>
  );
}

export function Badge({
  children,
  variant = "default",
}: {
  children: ReactNode;
  variant?: "default" | "frequency" | "priority" | "status";
}) {
  const base = "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold";
  const variants: Record<string, string> = {
    default: "bg-slate-100 text-slate-700",
    frequency: "bg-[#E1F0FF] text-[#2950A3]",
    priority: "bg-[#FFF3D3] text-[#9A6A00]",
    status: "bg-[#D8E280] text-[#382F52]",
  };
  return <span className={`${base} ${variants[variant]}`}>{children}</span>;
}

export const AspectRatio = AspectRatioPrimitive.Root;

export function DialogOverlay({ className }: { className?: string }) {
  return <AlertDialogOverlay className={`fixed inset-0 z-20 bg-slate-950/20 backdrop-blur-sm ${className ?? ""}`} />;
}

export function DialogContent({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <AlertDialogContent
      className={`fixed left-1/2 top-1/2 z-30 w-[95vw] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-[20px] border border-white/70 bg-white/95 p-6 shadow-2xl shadow-slate-900/10 ${className ?? ""}`}
    >
      {children}
    </AlertDialogContent>
  );
}
