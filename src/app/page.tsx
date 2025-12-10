"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { WelcomeScreen } from "./components/WelcomeScreen";
import { Quiz } from "./components/Quiz";

export type UserProfile = {
  // Dados pessoais
  name: string;
  age: string;
  birthDate: string;
  
  // Saúde e hábitos
  healthConditions: string[];
  currentHabits: string[];
  sleepQuality: string;
  stressLevel: string;
  
  // Motivação e objetivos
  fitnessGoal: string;
  personalGoal: string;
  mainInsecurities: string[];
  
  // Conquista futura
  futureAchievement: string;
  
  // Dados originais (mantidos para compatibilidade)
  routine: string;
  activityLevel: string;
  physicalPain: string[];
  emotionalPain: string[];
  goals: string[];
  availableTime: string;
};

export default function Home() {
  const router = useRouter();
  const [showWelcome, setShowWelcome] = useState(true);
  const [hasCompletedQuiz, setHasCompletedQuiz] = useState(false);

  const handleQuizComplete = (profile: UserProfile) => {
    setHasCompletedQuiz(true);
    // Redireciona para o dashboard após completar o quiz
    router.push("/dashboard");
  };

  if (showWelcome) {
    return <WelcomeScreen onStart={() => setShowWelcome(false)} />;
  }

  if (!hasCompletedQuiz) {
    return <Quiz onComplete={handleQuizComplete} />;
  }

  // Este return nunca será alcançado pois redirecionamos para /dashboard
  return null;
}
