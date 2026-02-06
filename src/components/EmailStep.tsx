import { useState } from "react";
import { Heart, Sparkles } from "lucide-react";
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
    <Card className="w-full max-w-md glass border-gradient shadow-glow animate-scale-in">
      <CardHeader className="text-center space-y-6 pb-4">
        {/* Decorative top element */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/30 rounded-full blur-xl" />
            <div className="relative p-5 rounded-full bg-gradient-romantic shadow-romantic">
              <Heart className="w-10 h-10 text-primary-foreground fill-primary-foreground/80" />
            </div>
            <Sparkles className="absolute -top-1 -right-1 w-5 h-5 text-accent animate-pulse" />
            <Sparkles className="absolute -bottom-1 -left-1 w-4 h-4 text-accent animate-pulse" style={{ animationDelay: '0.5s' }} />
          </div>
        </div>

        {/* Ornate divider */}
        <div className="divider-ornate text-accent">
          <Sparkles className="w-4 h-4" />
        </div>

        <div className="space-y-3">
          <h1 className="font-display text-4xl font-semibold text-gradient-rose">
            Olá, meu amor...
          </h1>
          <p className="font-body text-xl text-muted-foreground">
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
              className="text-center font-body text-lg h-14 bg-muted/50 border-border/50 focus:border-primary focus:ring-primary placeholder:text-muted-foreground/50"
            />
            {error && (
              <p className="text-sm text-destructive text-center font-body animate-fade-in">
                {error}
              </p>
            )}
          </div>
          
          <Button
            type="submit"
            className="w-full h-14 text-lg font-body bg-gradient-romantic hover:opacity-90 shadow-romantic transition-all duration-300 hover:shadow-glow"
          >
            <Heart className="w-5 h-5 mr-2 fill-current" />
            Confirmar
          </Button>
        </form>

        {/* Bottom decorative element */}
        <div className="mt-6 flex justify-center gap-2 opacity-40">
          <Heart className="w-3 h-3 text-primary fill-primary" />
          <Heart className="w-4 h-4 text-primary fill-primary" />
          <Heart className="w-3 h-3 text-primary fill-primary" />
        </div>
      </CardContent>
    </Card>
  );
};

export default EmailStep;
