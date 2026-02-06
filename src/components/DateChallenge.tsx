import { useState } from "react";
import { HelpCircle, Heart } from "lucide-react";
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
    <Card className="w-full max-w-md shadow-romantic border-romantic-blush/50 animate-scale-in bg-card/80 backdrop-blur-sm">
      <CardHeader className="text-center space-y-4 pb-2">
        <div className="flex justify-center">
          <div className="p-4 rounded-full bg-romantic-blush">
            <Heart className="w-8 h-8 text-primary fill-primary" />
          </div>
        </div>
        <div className="space-y-2 relative">
          <div className="flex items-center justify-center gap-2">
            <h1 className="font-display text-2xl md:text-3xl font-semibold text-foreground">
              Qual o dia que nos tornamos um só?
            </h1>
            <Tooltip>
              <TooltipTrigger asChild>
                <button type="button" className="text-muted-foreground hover:text-primary transition-colors">
                  <HelpCircle className="w-5 h-5" />
                </button>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs text-center font-body">
                <p>O dia da entrega dos anéis, olhe seu Instagram</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <p className="font-body text-lg text-muted-foreground">
            Digite a data especial...
          </p>
        </div>
      </CardHeader>

      <CardContent className="pt-4">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex gap-3 justify-center">
            <div className="space-y-1 text-center">
              <label className="font-body text-sm text-muted-foreground">Dia</label>
              <Input
                type="number"
                placeholder="DD"
                value={day}
                onChange={(e) => setDay(e.target.value)}
                className="w-20 text-center font-body text-lg h-12 border-romantic-blush focus:border-primary focus:ring-primary"
                min="1"
                max="31"
              />
            </div>
            <div className="space-y-1 text-center">
              <label className="font-body text-sm text-muted-foreground">Mês</label>
              <Input
                type="number"
                placeholder="MM"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                className="w-20 text-center font-body text-lg h-12 border-romantic-blush focus:border-primary focus:ring-primary"
                min="1"
                max="12"
              />
            </div>
            <div className="space-y-1 text-center">
              <label className="font-body text-sm text-muted-foreground">Ano</label>
              <Input
                type="number"
                placeholder="AAAA"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-24 text-center font-body text-lg h-12 border-romantic-blush focus:border-primary focus:ring-primary"
                min="2000"
                max="2030"
              />
            </div>
          </div>

          {error && (
            <p className="text-sm text-destructive text-center font-body animate-fade-in">
              {error}
            </p>
          )}

          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={handleClear}
              className="flex-1 h-12 text-lg font-body border-romantic-blush hover:bg-romantic-blush/50"
            >
              Limpar
            </Button>
            <Button
              type="submit"
              className="flex-1 h-12 text-lg font-body bg-primary hover:bg-primary/90 shadow-romantic"
            >
              Confirmar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default DateChallenge;
