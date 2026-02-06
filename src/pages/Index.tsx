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
      <FloatingHearts />
      
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-romantic-blush/20 via-transparent to-romantic-blush/10 pointer-events-none" />
      
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
