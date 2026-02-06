import { useState } from "react";
import FloatingHearts from "@/components/FloatingHearts";
import EmailStep from "@/components/EmailStep";
import DateChallenge from "@/components/DateChallenge";
import Revelation from "@/components/Revelation";

type Step = "email" | "challenge" | "revelation";

const Index = () => {
  const [currentStep, setCurrentStep] = useState<Step>("email");
  const [userEmail, setUserEmail] = useState("");

  const handleEmailSubmit = (email: string) => {
    setUserEmail(email);
    setCurrentStep("challenge");
  };

  const handleChallengeSuccess = () => {
    setCurrentStep("revelation");
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background texture */}
      <div 
        className="fixed inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      
      <FloatingHearts />
      
      {/* Vignette effect */}
      <div 
        className="fixed inset-0 pointer-events-none z-[1]"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, hsl(340 30% 6% / 0.4) 100%)',
        }}
      />
      
      <main className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full flex justify-center animate-fade-in">
          {currentStep === "email" && (
            <EmailStep onSubmit={handleEmailSubmit} />
          )}
          
          {currentStep === "challenge" && (
            <DateChallenge onSuccess={handleChallengeSuccess} />
          )}
          
          {currentStep === "revelation" && (
            <Revelation userEmail={userEmail} />
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
