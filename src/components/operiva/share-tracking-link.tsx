"use client";

import { useState } from "react";
import { Copy, MessageCircle, Share2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getPortalHref } from "@/lib/portal-routes";

export function ShareTrackingLink({ serviceId }: { serviceId: string }) {
  const [open, setOpen] = useState(false);
  const url =
    typeof window !== "undefined"
      ? `${window.location.origin}${getPortalHref(serviceId)}`
      : getPortalHref(serviceId);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Link copiado!");
    } catch {
      toast.message("Link de acompanhamento", { description: url });
    }
  };

  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
    `Acompanhe seu serviço na Operiva: ${url}`
  )}`;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 border-[#1F2937] text-[#9CA3AF] hover:text-[#F9FAFB]"
        >
          <Share2 className="size-4" />
          Compartilhar acompanhamento
        </Button>
      </DialogTrigger>
      <DialogContent className="border-[#1F2937] bg-[#111827]">
        <DialogHeader>
          <DialogTitle>Compartilhar acompanhamento</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-muted-foreground break-all">{url}</p>
        <div className="flex flex-wrap gap-2">
          <Button onClick={copyLink} className="gap-2 bg-[#3B82F6]">
            <Copy className="size-4" />
            Copiar link
          </Button>
          <Button variant="outline" className="gap-2 border-[#10B981]/40" asChild>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="size-4 text-[#10B981]" />
              WhatsApp
            </a>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
