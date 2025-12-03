"use client";

import { useRouter } from "next/navigation";
import { Quiz } from "../components/Quiz";

export default function QuizPage() {
  const router = useRouter();

  const handleQuizComplete = (answers: any) => {
    localStorage.setItem("quizAnswers", JSON.stringify(answers));
    router.push("/diagnostico");
  };

  return <Quiz onComplete={handleQuizComplete} />;
}