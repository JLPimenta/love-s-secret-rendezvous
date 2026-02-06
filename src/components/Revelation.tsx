import { useState } from "react";
import { Heart, MapPin, Calendar, Clock } from "lucide-react";
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
      <Card className="w-full max-w-lg shadow-romantic border-romantic-blush/50 animate-scale-in bg-card/80 backdrop-blur-sm">
        <CardHeader className="text-center space-y-4 pb-2">
          <div className="flex justify-center">
            <div className="p-4 rounded-full bg-romantic-blush animate-pulse-glow">
              <Heart className="w-10 h-10 text-primary fill-primary" />
            </div>
          </div>
          <div className="space-y-2">
            <h1 className="font-display text-3xl md:text-4xl font-semibold text-foreground">
              Parabéns, você conseguiu! ❤️
            </h1>
            <p className="font-body text-xl text-muted-foreground">
              Agora, te convido a relembrar essa data :3
            </p>
          </div>
        </CardHeader>

        <CardContent className="pt-4 space-y-6">
          {/* Venue Information */}
          <div className="space-y-4 p-4 bg-romantic-cream rounded-lg">
            <div className="text-center space-y-1">
              <h2 className="font-display text-2xl font-semibold text-primary">
                {VENUE.name}
              </h2>
              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span className="font-body">{VENUE.address}</span>
              </div>
              <p className="font-body text-sm text-muted-foreground">{VENUE.city}</p>
            </div>

            <div className="flex justify-center gap-6">
              <div className="flex items-center gap-2 text-foreground">
                <Calendar className="w-5 h-5 text-primary" />
                <span className="font-body font-medium">{DATE}</span>
              </div>
              <div className="flex items-center gap-2 text-foreground">
                <Clock className="w-5 h-5 text-primary" />
                <span className="font-body font-medium">{TIME}</span>
              </div>
            </div>
          </div>

          {/* Google Maps Embed */}
          <div className="rounded-lg overflow-hidden border border-romantic-blush/50">
            <iframe
              src={VENUE.mapsEmbed}
              width="100%"
              height="200"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localização do encontro"
            />
          </div>

          {/* Decision Section */}
          <div className="space-y-4 pt-2">
            <p className="font-body text-lg text-center text-foreground">
              Caso você também esteja como eu, morrendo de saudades, confirme abaixo:
            </p>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => handleDecision("declined")}
                disabled={decision !== null || isLoading}
                className="flex-1 h-12 text-lg font-body border-romantic-blush hover:bg-romantic-blush/50 disabled:opacity-50"
              >
                Declinar
              </Button>
              <Button
                onClick={() => handleDecision("confirmed")}
                disabled={decision !== null || isLoading}
                className="flex-1 h-12 text-lg font-body bg-primary hover:bg-primary/90 shadow-romantic disabled:opacity-50"
              >
                {isLoading ? "Enviando..." : "Confirmar"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Confirmation Modal */}
      <Dialog open={showConfirmModal} onOpenChange={setShowConfirmModal}>
        <DialogContent className="bg-card border-romantic-blush/50">
          <DialogHeader className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="p-4 rounded-full bg-romantic-blush">
                <Heart className="w-8 h-8 text-primary fill-primary" />
              </div>
            </div>
            <DialogTitle className="font-display text-2xl text-foreground">
              Que alegria!
            </DialogTitle>
            <DialogDescription className="font-body text-lg text-muted-foreground">
              Aguardo você ansiosamente. ❤️
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      {/* Decline Alert */}
      <AlertDialog open={showDeclineModal} onOpenChange={setShowDeclineModal}>
        <AlertDialogContent className="bg-card border-romantic-blush/50">
          <AlertDialogHeader className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="p-4 rounded-full bg-muted">
                <Heart className="w-8 h-8 text-muted-foreground" />
              </div>
            </div>
            <AlertDialogTitle className="font-display text-2xl text-foreground">
              :(
            </AlertDialogTitle>
            <AlertDialogDescription className="font-body text-lg text-muted-foreground">
              Valeu a tentativa. Eu ainda te amo muito!
            </AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default Revelation;
