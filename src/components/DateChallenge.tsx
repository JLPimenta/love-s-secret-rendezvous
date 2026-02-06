import { useState } from "react";
import { HelpCircle, Heart, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface DateChallengeProps {
  onSuccess: () => void;
}

const DateChallenge = ({ onSuccess }: DateChallengeProps) => {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [error, setError] = useState("");

  const handleClear = () => {
    setDay("");
    setMonth("");
    setYear("");
    setError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const dayNum = parseInt(day, 10);
    const monthNum = parseInt(month, 10);
    const yearNum = parseInt(year, 10);

    // Validate: 14/02/2022
    if (dayNum === 14 && monthNum === 2 && yearNum === 2022) {
      setError("");
      onSuccess();
    } else {
      setError("A data está incorreta. Você consegue!");
    }
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
          </div>
        </div>

        {/* Ornate divider */}
        <div className="divider-ornate text-accent">
          <Sparkles className="w-4 h-4" />
        </div>

        <div className="space-y-3">
          <div className="flex items-start justify-center gap-2">
            <h1 className="font-display text-2xl md:text-3xl font-semibold text-gradient-rose">
              Qual o dia que nos tornamos um só?
            </h1>
            <Tooltip>
              <TooltipTrigger asChild>
                <button type="button" className="mt-1 text-accent hover:text-accent/80 transition-colors">
                  <HelpCircle className="w-5 h-5" />
                </button>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs text-center font-body bg-card border-border">
                <p className="text-romantic-cream">O dia da entrega dos anéis, olhe seu Instagram</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <p className="font-body text-xl text-muted-foreground">
            Digite a data especial...
          </p>
        </div>
      </CardHeader>

      <CardContent className="pt-4">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex gap-4 justify-center">
            <div className="space-y-2 text-center">
              <label className="font-body text-sm text-accent">Dia</label>
              <Input
                type="number"
                placeholder="DD"
                value={day}
                onChange={(e) => setDay(e.target.value)}
                className="w-20 text-center font-display text-2xl h-14 bg-muted/50 border-border/50 focus:border-primary focus:ring-primary"
                min="1"
                max="31"
              />
            </div>
            <div className="space-y-2 text-center">
              <label className="font-body text-sm text-accent">Mês</label>
              <Input
                type="number"
                placeholder="MM"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                className="w-20 text-center font-display text-2xl h-14 bg-muted/50 border-border/50 focus:border-primary focus:ring-primary"
                min="1"
                max="12"
              />
            </div>
            <div className="space-y-2 text-center">
              <label className="font-body text-sm text-accent">Ano</label>
              <Input
                type="number"
                placeholder="AAAA"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-24 text-center font-display text-2xl h-14 bg-muted/50 border-border/50 focus:border-primary focus:ring-primary"
                min="2000"
                max="2030"
              />
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/30">
              <p className="text-sm text-destructive text-center font-body animate-fade-in">
                {error}
              </p>
            </div>
          )}

          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={handleClear}
              className="flex-1 h-14 text-lg font-body border-border/50 bg-muted/30 hover:bg-muted/50 hover:border-primary/50"
            >
              Limpar
            </Button>
            <Button
              type="submit"
              className="flex-1 h-14 text-lg font-body bg-gradient-romantic hover:opacity-90 shadow-romantic transition-all duration-300 hover:shadow-glow"
            >
              <Heart className="w-5 h-5 mr-2 fill-current" />
              Confirmar
            </Button>
          </div>
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

export default DateChallenge;
