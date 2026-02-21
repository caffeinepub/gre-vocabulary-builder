import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';
import { useGetPracticeQuestion } from '../hooks/useQueries';
import { Skeleton } from '@/components/ui/skeleton';

export default function FlashcardViewer() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const { data: question, isLoading, refetch } = useGetPracticeQuestion();

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    setIsFlipped(false);
    setQuestionIndex((prev) => prev + 1);
    refetch();
  };

  const handlePrevious = () => {
    if (questionIndex > 0) {
      setIsFlipped(false);
      setQuestionIndex((prev) => prev - 1);
      refetch();
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-96 w-full rounded-2xl" />
        <div className="flex justify-center gap-4">
          <Skeleton className="h-12 w-32" />
          <Skeleton className="h-12 w-32" />
        </div>
      </div>
    );
  }

  if (!question) {
    return (
      <Card className="border-burgundy/20 bg-white p-8 text-center">
        <p className="text-foreground/70">No vocabulary words available. Please check back later.</p>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Flashcard */}
      <div
        className="relative h-96 cursor-pointer perspective-1000"
        onClick={handleFlip}
        style={{ perspective: '1000px' }}
      >
        <div
          className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
          style={{
            transformStyle: 'preserve-3d',
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
          }}
        >
          {/* Front of card */}
          <Card
            className="absolute inset-0 backface-hidden border-2 border-burgundy/30 bg-white shadow-xl"
            style={{ backfaceVisibility: 'hidden' }}
          >
            <CardContent className="flex flex-col items-center justify-center h-full p-8">
              <div className="text-center">
                <p className="text-sm text-foreground/60 mb-4 uppercase tracking-wide">Word</p>
                <h2 className="font-serif text-5xl md:text-6xl font-bold text-burgundy mb-6">
                  {question.questionWord}
                </h2>
                <p className="text-foreground/50 italic">Click to reveal definition</p>
              </div>
            </CardContent>
          </Card>

          {/* Back of card */}
          <Card
            className="absolute inset-0 backface-hidden border-2 border-forest-green/30 bg-white shadow-xl"
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          >
            <CardContent className="flex flex-col justify-center h-full p-8">
              <div className="space-y-6">
                <div>
                  <p className="text-sm text-foreground/60 mb-2 uppercase tracking-wide">Definition</p>
                  <p className="text-xl md:text-2xl text-foreground leading-relaxed">
                    {question.options[Number(question.correctAnswerIndex)]}
                  </p>
                </div>
                <div className="pt-4 border-t border-burgundy/20">
                  <p className="text-sm text-foreground/50 italic">Click to flip back</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-center gap-4">
        <Button
          onClick={handlePrevious}
          disabled={questionIndex === 0}
          variant="outline"
          size="lg"
          className="border-burgundy/30 hover:bg-burgundy/10"
        >
          <ChevronLeft className="mr-2 h-5 w-5" />
          Previous
        </Button>

        <Button
          onClick={() => {
            setIsFlipped(false);
            refetch();
          }}
          variant="outline"
          size="icon"
          className="border-burgundy/30 hover:bg-burgundy/10"
        >
          <RotateCcw className="h-5 w-5" />
        </Button>

        <Button
          onClick={handleNext}
          variant="default"
          size="lg"
          className="bg-burgundy hover:bg-burgundy/90 text-white"
        >
          Next
          <ChevronRight className="ml-2 h-5 w-5" />
        </Button>
      </div>

      {/* Card Counter */}
      <div className="text-center text-sm text-foreground/60">
        Card #{questionIndex + 1}
      </div>
    </div>
  );
}
