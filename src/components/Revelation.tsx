import { useState } from "react";
import { Heart, MapPin, Calendar, Clock, Sparkles, PartyPopper } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
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
  name: "Restaurante a definir",
  address: "Endereço a definir",
  city: "Cidade, Estado",
  mapsUrl: "https://maps.google.com/?q=-23.5505,-46.6333",
  mapsEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.1976509!2d-46.6355!3d-23.5505!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDMzJzAxLjgiUyA0NsKwMzgnMDcuOCJX!5e0!3m2!1spt-BR!2sbr!4v1234567890"
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
              Agora, te convido a relembrar essa data :3
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

      {/* Confirmation Modal */}
      <Dialog open={showConfirmModal} onOpenChange={setShowConfirmModal}>
        <DialogContent className="glass border-gradient max-w-md">
          <DialogHeader className="text-center space-y-6">
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
            <DialogTitle className="font-display text-3xl text-gradient-gold">
              Que alegria!
            </DialogTitle>
            <DialogDescription className="font-body text-xl text-romantic-cream/80">
              Aguardo você ansiosamente. ❤️
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      {/* Decline Alert */}
      <AlertDialog open={showDeclineModal} onOpenChange={setShowDeclineModal}>
        <AlertDialogContent className="glass border-border/50 max-w-md">
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
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default Revelation;
