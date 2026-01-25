import { useEffect, useState } from "react";
import { FeedbackRealCard } from "./FeedbackRealCard";
import { AIResponseModal } from "./AIResponseModal";
import { Feedback } from "@/data/mockFeedbacks";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

// Interface para o review da API
interface Review {
  author_name: string;
  text: string;
  rating: number;
  time: number;
  relative_time_description: string;
  language: string;
  [key: string]: any;
}

// Interface para os dados da API
interface ApiData {
  name: string;
  address: string;
  rating: number;
  reviews: Review[];
  [key: string]: any;
}

export function FeedbackRealList() {
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [data, setData] = useState<ApiData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:5100/")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Erro ao buscar reviews");
        }
        return res.json();
      })
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Transforma os reviews da API em objetos Feedback
  const apiReviewsAsFeedbacks: Feedback[] = data?.reviews?.map((review, index) => ({
    id: `api-review-${index}`,
    author: review.author_name,
    content: review.text,
    rating: review.rating,
    source: "google" as const,
    sentiment: review.rating >= 4 ? "positive" : review.rating === 3 ? "neutral" : "negative",
    category: "geral",
    responded: false,
    createdAt: new Date(review.time * 1000), // Converte segundos para milissegundos
    updatedAt: new Date(review.time * 1000),
  })) || [];

  // Combina dados da API com mockFeedbacks se necessário
  const allFeedbacks = [...apiReviewsAsFeedbacks];

  const filteredFeedbacks = allFeedbacks.filter((feedback) => {
    const matchesSearch = feedback.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      feedback.author.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === "all") return matchesSearch;
    if (activeTab === "pending") return matchesSearch && !feedback.responded;
    if (activeTab === "positive") return matchesSearch && feedback.sentiment === "positive";
    if (activeTab === "negative") return matchesSearch && feedback.sentiment === "negative";
    return matchesSearch;
  });

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <p className="text-muted-foreground">Carregando reviews...</p>
    </div>
  );
  
  if (error) return (
    <div className="flex items-center justify-center h-64">
      <p className="text-red-500">Erro: {error}</p>
    </div>
  );

  if (!data) return (
    <div className="flex items-center justify-center h-64">
      <p className="text-muted-foreground">Nenhum dado disponível</p>
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full sm:w-auto">
          <TabsList className="bg-secondary/50">
            <TabsTrigger value="all">Todos</TabsTrigger>
            <TabsTrigger value="pending">Pendentes</TabsTrigger>
            <TabsTrigger value="positive">Positivos</TabsTrigger>
            <TabsTrigger value="negative">Negativos</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Buscar feedbacks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-secondary/50 border-border/50"
          />
        </div>
      </div>

      <div className="space-y-3">
        {filteredFeedbacks.map((feedback, index) => (
          <FeedbackRealCard
            key={feedback.id}
            feedback={feedback}
            onGenerateResponse={setSelectedFeedback}
          />
        ))}

        {filteredFeedbacks.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            Nenhum feedback encontrado.
          </div>
        )}
      </div>

      <AIResponseModal
        feedback={selectedFeedback}
        open={!!selectedFeedback}
        onClose={() => setSelectedFeedback(null)}
      />
    </div>
  );
}