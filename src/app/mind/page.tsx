"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  Trophy,
  Target,
  CheckCircle2,
  Circle,
  Share2,
  Users,
  Star,
  ChefHat,
  Heart,
  Dumbbell,
  Droplet,
  Brain,
  Award,
  ArrowLeft
} from "lucide-react";
import { useRouter } from "next/navigation";

type Achievement = {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  icon: React.ReactNode;
};

export default function MindPage() {
  const router = useRouter();
  const [achievements, setAchievements] = useState<Achievement[]>([
    { id: "1", title: "Primeira Semana", description: "Complete 7 dias consecutivos", completed: true, icon: <Trophy className="w-5 h-5" /> },
    { id: "2", title: "Hidratação Master", description: "Beba 2L de água por 5 dias", completed: true, icon: <Droplet className="w-5 h-5" /> },
    { id: "3", title: "Guerreiro do Treino", description: "Complete 10 treinos", completed: false, icon: <Dumbbell className="w-5 h-5" /> },
    { id: "4", title: "Mente Sã", description: "Medite por 7 dias seguidos", completed: false, icon: <Brain className="w-5 h-5" /> },
    { id: "5", title: "Transformação", description: "30 dias de consistência", completed: false, icon: <Award className="w-5 h-5" /> },
  ]);

  const [dailyGoals] = useState([
    { id: "1", text: "Complete 3 hábitos hoje", completed: false },
    { id: "2", text: "Faça 1 treino", completed: false },
    { id: "3", text: "Registre suas refeições", completed: false },
  ]);

  const [appRating, setAppRating] = useState(0);
  const [appReview, setAppReview] = useState("");

  const toggleAchievement = (id: string) => {
    setAchievements(achievements.map(a => a.id === id ? { ...a, completed: !a.completed } : a));
  };

  const completedAchievements = achievements.filter(a => a.completed).length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F7F9F9] to-white">
      {/* Hero Banner com Foto de Fundo */}
      <div className="relative h-64 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=1200&h=600&fit=crop')" }}>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40"></div>
        <div className="relative z-10 h-full flex flex-col justify-end p-6 max-w-4xl mx-auto">
          <Button
            onClick={() => router.push("/")}
            variant="ghost"
            className="mb-4 text-white hover:bg-white/20 rounded-full self-start"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <h1 className="text-4xl font-bold text-white">Mind & Bem-estar</h1>
          <p className="text-white/90 text-lg mt-2">Conquistas, humor e foco diário</p>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        <div className="space-y-8">
          {/* Objetivos do Dia */}
          <Card className="bg-white border border-[#E8ECEC] p-8 rounded-2xl shadow-lg">
            <h3 className="text-xl font-bold text-[#27AE60] mb-6 flex items-center gap-2">
              <Target className="w-6 h-6" />
              Objetivos de Hoje
            </h3>
            <div className="space-y-3">
              {dailyGoals.map((goal) => (
                <div key={goal.id} className="flex items-center gap-4 p-5 bg-[#F7F9F9] rounded-xl border border-[#E8ECEC]">
                  {goal.completed ? (
                    <CheckCircle2 className="w-6 h-6 text-[#27AE60]" />
                  ) : (
                    <Circle className="w-6 h-6 text-[#7F8C8D]" />
                  )}
                  <span className={`text-base ${goal.completed ? "text-[#1A1A1A]" : "text-[#7F8C8D]"}`}>{goal.text}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Conquistas */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-[#1A1A1A] flex items-center gap-2">
              <Trophy className="w-6 h-6 text-[#27AE60]" />
              Suas Conquistas ({completedAchievements}/{achievements.length})
            </h3>
            <div className="grid gap-4">
              {achievements.map((achievement) => (
                <button
                  key={achievement.id}
                  onClick={() => toggleAchievement(achievement.id)}
                  className={`p-6 rounded-2xl border-2 transition-all text-left shadow-sm hover:shadow-md ${
                    achievement.completed
                      ? "bg-[#27AE60]/10 border-[#27AE60]"
                      : "bg-white border-[#E8ECEC] hover:border-[#27AE60]/50"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-4 rounded-2xl ${achievement.completed ? "bg-[#27AE60]" : "bg-[#F7F9F9]"}`}>
                      {achievement.completed ? (
                        <CheckCircle2 className="w-6 h-6 text-white" />
                      ) : (
                        <div className="text-[#7F8C8D]">{achievement.icon}</div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className={`font-bold text-xl ${achievement.completed ? "text-[#1A1A1A]" : "text-[#7F8C8D]"}`}>
                        {achievement.title}
                      </h4>
                      <p className="text-sm text-[#7F8C8D] mt-1">{achievement.description}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Compartilhar */}
          <Card className="bg-white border border-[#E8ECEC] p-8 rounded-2xl shadow-lg">
            <h3 className="text-xl font-bold text-[#27AE60] mb-4 flex items-center gap-2">
              <Share2 className="w-6 h-6" />
              Compartilhe seu Progresso
            </h3>
            <p className="text-[#7F8C8D] text-base mb-6 leading-relaxed">
              Inspire outras pessoas compartilhando suas conquistas nas redes sociais!
            </p>
            <Button className="w-full bg-[#27AE60] hover:bg-[#229954] text-white font-bold py-7 rounded-full shadow-lg">
              <Share2 className="w-5 h-5 mr-2" />
              Compartilhar no Instagram
            </Button>
          </Card>

          {/* Comunidade */}
          <Card className="bg-white border border-[#E8ECEC] p-8 rounded-2xl shadow-lg">
            <h3 className="text-xl font-bold text-[#27AE60] mb-4 flex items-center gap-2">
              <Users className="w-6 h-6" />
              Comunidade de Especialistas
            </h3>
            <p className="text-[#7F8C8D] text-base mb-6 leading-relaxed">
              Tire suas dúvidas com profissionais qualificados!
            </p>
            <div className="space-y-3">
              <Button className="w-full bg-white hover:bg-[#F7F9F9] text-[#1A1A1A] border-2 border-[#E8ECEC] hover:border-[#27AE60] font-semibold py-6 rounded-2xl justify-start transition-all">
                <ChefHat className="w-5 h-5 mr-3 text-[#27AE60]" />
                Perguntar ao Nutricionista
              </Button>
              <Button className="w-full bg-white hover:bg-[#F7F9F9] text-[#1A1A1A] border-2 border-[#E8ECEC] hover:border-[#27AE60] font-semibold py-6 rounded-2xl justify-start transition-all">
                <Heart className="w-5 h-5 mr-3 text-[#27AE60]" />
                Perguntar ao Médico do Esporte
              </Button>
              <Button className="w-full bg-white hover:bg-[#F7F9F9] text-[#1A1A1A] border-2 border-[#E8ECEC] hover:border-[#27AE60] font-semibold py-6 rounded-2xl justify-start transition-all">
                <Dumbbell className="w-5 h-5 mr-3 text-[#27AE60]" />
                Perguntar ao Personal Trainer
              </Button>
            </div>
          </Card>

          {/* Avaliação do App */}
          <Card className="bg-white border border-[#E8ECEC] p-8 rounded-2xl shadow-lg">
            <h3 className="text-xl font-bold text-[#27AE60] mb-4 flex items-center gap-2">
              <Star className="w-6 h-6" />
              Avalie o AtiveMind
            </h3>
            <p className="text-[#7F8C8D] text-base mb-6 leading-relaxed">
              Sua opinião é muito importante para nós! Como está sendo sua experiência?
            </p>
            
            {/* Rating Stars */}
            <div className="flex gap-2 mb-6 justify-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setAppRating(star)}
                  className="transition-all hover:scale-110"
                >
                  <Star
                    className={`w-10 h-10 ${
                      star <= appRating
                        ? "fill-[#27AE60] text-[#27AE60]"
                        : "text-[#E8ECEC]"
                    }`}
                  />
                </button>
              ))}
            </div>

            {/* Review Text */}
            <Textarea
              placeholder="Conte-nos sobre sua experiência com o AtiveMind..."
              value={appReview}
              onChange={(e) => setAppReview(e.target.value)}
              className="bg-[#F7F9F9] border-[#E8ECEC] text-[#1A1A1A] placeholder:text-[#7F8C8D] mb-4 min-h-[100px] rounded-2xl focus:border-[#27AE60] focus:ring-[#27AE60]"
            />

            <Button className="w-full bg-[#27AE60] hover:bg-[#229954] text-white font-bold py-6 rounded-full shadow-lg">
              Enviar avaliação
            </Button>
          </Card>
        </div>
      </main>
    </div>
  );
}
