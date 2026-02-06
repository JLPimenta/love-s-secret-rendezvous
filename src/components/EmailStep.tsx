import { useState } from "react";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface EmailStepProps {
  onSubmit: (email: string) => void;
}

const EmailStep = ({ onSubmit }: EmailStepProps) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setError("Por favor, insira seu e-mail");
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Por favor, insira um e-mail válido");
      return;
    }

    setError("");
    onSubmit(email);
  };

  return (
    <Card className="w-full max-w-md shadow-romantic border-romantic-blush/50 animate-scale-in bg-card/80 backdrop-blur-sm">
      <CardHeader className="text-center space-y-4 pb-2">
        <div className="flex justify-center">
          <div className="p-4 rounded-full bg-romantic-blush">
            <Heart className="w-8 h-8 text-primary fill-primary" />
          </div>
        </div>
        <div className="space-y-2">
          <h1 className="font-display text-3xl font-semibold text-foreground">
            Olá, meu amor...
          </h1>
          <p className="font-body text-lg text-muted-foreground">
            Tenho uma surpresa especial para você
          </p>
        </div>
      </CardHeader>
      
      <CardContent className="pt-4">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Input
              type="email"
              placeholder="Seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="text-center font-body text-lg h-12 border-romantic-blush focus:border-primary focus:ring-primary"
            />
            {error && (
              <p className="text-sm text-destructive text-center font-body">
                {error}
              </p>
            )}
          </div>
          
          <Button
            type="submit"
            className="w-full h-12 text-lg font-body bg-primary hover:bg-primary/90 shadow-romantic"
          >
            Confirmar
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default EmailStep;
