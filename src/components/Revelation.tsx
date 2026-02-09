import { useState } from "react";
import { Heart, MapPin, Calendar, Clock, Sparkles, PartyPopper, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface RevelationProps {
  userEmail: string;
}

// Placeholder para o local - editar quando definido
const VENUE = {
  name: "Expresso Sushi | Jardins",
  address: "Rua SE 9, Alameda Jardim, Sala 2 - Plano Diretor Sul",
  city: "Palmas, Tocantins",
  mapsUrl: "https://maps.google.com/?q=-10.19032,-48.32510",
  mapsEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1348.837920178706!2d-48.32592321217423!3d-10.190367316025082!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9324cb5a12a011ff%3A0xfd32fe2798b998f9!2sExpresso%20Sushi%20%7C%20Jardins!5e0!3m2!1spt-BR!2sbr!4v1770648020524!5m2!1spt-BR!2sbr"
};

const DATE = "14 de fevereiro de 2026";
const TIME = "19h";

const Revelation = ({ userEmail }: RevelationProps) => {
  const [decision, setDecision] = useState<"confirmed" | "declined" | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showDeclineModal, setShowDeclineModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleDecision = async (choice: "confirmed" | "declined") => {
    setIsLoading(true);
    
    try {
      const { error } = await supabase.functions.invoke("send-notification", {
        body: {
          userEmail,
          decision: choice,
          venue: VENUE,
          date: DATE,
          time: TIME,
        },
      });

      if (error) {
        console.error("Error sending notification:", error);
        toast({
          title: "Aviso",
          description: "Não foi possível enviar o email, mas sua decisão foi registrada.",
          variant: "destructive",
        });
      }
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setIsLoading(false);
      setDecision(choice);
      
      if (choice === "confirmed") {
        setShowConfirmModal(true);
      } else {
        setShowDeclineModal(true);
      }
    }
  };

  return (
    <>
      <Card className="w-full max-w-lg glass border-gradient shadow-glow animate-scale-in">
        <CardHeader className="text-center space-y-6 pb-4">
          {/* Celebration header */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/40 rounded-full blur-2xl animate-pulse" />
              <div className="relative p-6 rounded-full bg-gradient-romantic shadow-romantic animate-pulse-glow">
                <Heart className="w-12 h-12 text-primary-foreground fill-primary-foreground" />
              </div>
              <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-accent animate-pulse" />
              <Sparkles className="absolute -bottom-2 -left-2 w-5 h-5 text-accent animate-pulse" style={{ animationDelay: '0.3s' }} />
              <PartyPopper className="absolute top-0 -left-4 w-5 h-5 text-accent animate-bounce" />
              <PartyPopper className="absolute top-0 -right-4 w-5 h-5 text-accent animate-bounce" style={{ animationDelay: '0.2s', transform: 'scaleX(-1)' }} />
            </div>
          </div>

          {/* Ornate divider */}
          <div className="divider-ornate text-accent">
            <Sparkles className="w-4 h-4" />
          </div>

          <div className="space-y-3">
            <h1 className="font-display text-3xl md:text-4xl font-semibold text-gradient-gold">
              Parabéns, você conseguiu! ❤️
            </h1>
            <p className="font-body text-xl text-romantic-cream/80">
              Agora, te convido a relembrar essa data ^-^
            </p>
          </div>
        </CardHeader>

        <CardContent className="pt-4 space-y-6">
          {/* Venue Information */}
          <div className="space-y-4 p-5 rounded-xl bg-muted/30 border border-border/50 backdrop-blur-sm">
            <div className="text-center space-y-2">
              <h2 className="font-display text-2xl font-semibold text-gradient-rose">
                {VENUE.name}
              </h2>
              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="font-body">{VENUE.address}</span>
              </div>
              <p className="font-body text-sm text-muted-foreground">{VENUE.city}</p>
            </div>

            <div className="divider-ornate text-accent/50 py-2">
              <Heart className="w-3 h-3 fill-current" />
            </div>

            <div className="flex justify-center gap-8">
              <div className="flex items-center gap-2 text-foreground">
                <Calendar className="w-5 h-5 text-accent" />
                <span className="font-body font-medium">{DATE}</span>
              </div>
              <div className="flex items-center gap-2 text-foreground">
                <Clock className="w-5 h-5 text-accent" />
                <span className="font-body font-medium">{TIME}</span>
              </div>
            </div>
          </div>

          {/* Google Maps Embed */}
          <div className="rounded-xl overflow-hidden border border-border/50 shadow-soft">
            <iframe
              src={VENUE.mapsEmbed}
              width="100%"
              height="180"
              style={{ border: 0, filter: 'grayscale(20%) contrast(1.1)' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localização do encontro"
            />
          </div>

          {/* Decision Section */}
          <div className="space-y-5 pt-2">
            <p className="font-body text-lg text-center text-romantic-cream/90">
              Caso você também esteja como eu, morrendo de saudades, confirme abaixo:
            </p>

            <div className="flex gap-4">
              <Button
                variant="outline"
                onClick={() => handleDecision("declined")}
                disabled={decision !== null || isLoading}
                className="flex-1 h-14 text-lg font-body border-border/50 bg-muted/30 hover:bg-destructive/20 hover:border-destructive/50 hover:text-destructive disabled:opacity-50 transition-all duration-300"
              >
                Declinar
              </Button>
              <Button
                onClick={() => handleDecision("confirmed")}
                disabled={decision !== null || isLoading}
                className="flex-1 h-14 text-lg font-body bg-gradient-romantic hover:opacity-90 shadow-romantic disabled:opacity-50 transition-all duration-300 hover:shadow-glow"
              >
                <Heart className="w-5 h-5 mr-2 fill-current" />
                {isLoading ? "Enviando..." : "Confirmar"}
              </Button>
            </div>
          </div>

          {/* Bottom decorative element */}
          <div className="flex justify-center gap-2 opacity-40 pt-2">
            <Heart className="w-3 h-3 text-primary fill-primary" />
            <Heart className="w-4 h-4 text-primary fill-primary" />
            <Heart className="w-3 h-3 text-primary fill-primary" />
          </div>
        </CardContent>
      </Card>

      {/* Confirmation Modal - Using Radix directly with high z-index */}
        <DialogPrimitive.Root open={showConfirmModal} onOpenChange={setShowConfirmModal}>
            <DialogPrimitive.Portal>
                <DialogPrimitive.Overlay className="fixed inset-0 z-[100] bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
                <DialogPrimitive.Content
                    className={cn(
                        "fixed inset-0 z-[101] flex items-center justify-center p-6",
                        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
                    )}
                >
                    <div
                        className={cn(
                            "relative grid w-full max-w-md gap-4 p-6 shadow-lg duration-200",
                            "glass border-gradient rounded-lg",
                            "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]"
                        )}
                    >
                        <div className="text-center space-y-6">
                            <div className="flex justify-center">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-primary/30 rounded-full blur-xl" />
                                    <div className="relative p-5 rounded-full bg-gradient-romantic shadow-romantic animate-pulse-glow">
                                        <Heart className="w-10 h-10 text-primary-foreground fill-primary-foreground" />
                                    </div>
                                    <PartyPopper className="absolute -top-2 -right-2 w-6 h-6 text-accent animate-bounce" />
                                    <Sparkles className="absolute -bottom-1 -left-2 w-5 h-5 text-accent animate-pulse" />
                                </div>
                            </div>
                            <DialogPrimitive.Title className="font-display text-3xl text-gradient-gold">
                                Que alegria!
                            </DialogPrimitive.Title>
                            <DialogPrimitive.Description className="font-body text-xl text-romantic-cream/80">
                                Aguardo você ansiosamente. ❤️
                            </DialogPrimitive.Description>
                            <DialogPrimitive.Description className="font-body text-l text-romantic-cream/80">
                                Olhe o seu email! Chegou algo por lá (talvez esteja no spam) 😳
                            </DialogPrimitive.Description>
                        </div>
                        <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                            <X className="h-4 w-4" />
                            <span className="sr-only">Fechar</span>
                        </DialogPrimitive.Close>
                    </div>
                </DialogPrimitive.Content>
            </DialogPrimitive.Portal>
        </DialogPrimitive.Root>

      {/* Decline Alert */}
      <AlertDialog open={showDeclineModal} onOpenChange={setShowDeclineModal}>
        <AlertDialogContent className="glass border-border/50 max-w-md z-[101]">
          <AlertDialogHeader className="text-center space-y-6">
            <div className="flex justify-center">
              <div className="p-5 rounded-full bg-muted/50 border border-border/50">
                <Heart className="w-10 h-10 text-muted-foreground" />
              </div>
            </div>
            <AlertDialogTitle className="font-display text-3xl text-foreground">
              :(
            </AlertDialogTitle>
            <AlertDialogDescription className="font-body text-xl text-muted-foreground">
              Valeu a tentativa. Eu ainda te amo muito!
            </AlertDialogDescription>
              <AlertDialogDescription className="font-body text-l text-muted-foreground">
                  (E você ainda tem meu voucher de beijinhos)
              </AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default Revelation;
