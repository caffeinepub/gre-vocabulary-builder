import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useGetPracticeQuestion, useSubmitAnswer } from '../hooks/useQueries';
import { CheckCircle2, XCircle } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface PracticeTestProps {
  numQuestions: number;
  onComplete: (score: number, total: number) => void;
}

export default function PracticeTest({ numQuestions, onComplete }: PracticeTestProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const { data: question, isLoading, refetch } = useGetPracticeQuestion();
  const submitAnswerMutation = useSubmitAnswer();

  const handleAnswerSelect = (index: number) => {
    if (showFeedback) return;

    setSelectedAnswer(index);
    const correct = index === Number(question?.correctAnswerIndex);
    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct) {
      setScore((prev) => prev + 1);
    }

    submitAnswerMutation.mutate(correct);
  };

  const handleNext = () => {
    if (currentQuestion + 1 >= numQuestions) {
      onComplete(score, numQuestions);
    } else {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
      setIsCorrect(false);
      refetch();
    }
  };

  const progress = ((currentQuestion + 1) / numQuestions) * 100;

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-48 w-full rounded-2xl" />
        <div className="space-y-3">
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
        </div>
      </div>
    );
  }

  if (!question) {
    return (
      <Card className="border-burgundy/20 bg-white p-8 text-center">
        <p className="text-foreground/70">Unable to load question. Please try again.</p>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-foreground/70">
          <span>
            Question {currentQuestion + 1} of {numQuestions}
          </span>
          <span>
            Score: {score}/{currentQuestion + (showFeedback ? 1 : 0)}
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Question Card */}
      <Card className="border-burgundy/20 bg-white">
        <CardHeader>
          <CardTitle className="font-serif text-2xl text-burgundy text-center">
            What is the definition of "{question.questionWord}"?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {question.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrectAnswer = index === Number(question.correctAnswerIndex);
            const showCorrect = showFeedback && isCorrectAnswer;
            const showIncorrect = showFeedback && isSelected && !isCorrect;

            return (
              <Button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={showFeedback}
                variant="outline"
                className={`w-full h-auto min-h-16 p-4 text-left justify-start border-2 transition-all ${
                  showCorrect
                    ? 'border-forest-green bg-forest-green/10 text-forest-green'
                    : showIncorrect
                      ? 'border-destructive bg-destructive/10 text-destructive'
                      : isSelected
                        ? 'border-burgundy bg-burgundy/10'
                        : 'border-burgundy/30 hover:border-burgundy hover:bg-burgundy/5'
                }`}
              >
                <span className="flex-1 text-base">{option}</span>
                {showCorrect && <CheckCircle2 className="h-5 w-5 ml-2 shrink-0" />}
                {showIncorrect && <XCircle className="h-5 w-5 ml-2 shrink-0" />}
              </Button>
            );
          })}
        </CardContent>
      </Card>

      {/* Feedback and Next Button */}
      {showFeedback && (
        <div className="space-y-4">
          <Card
            className={`border-2 ${
              isCorrect ? 'border-forest-green bg-forest-green/10' : 'border-destructive bg-destructive/10'
            }`}
          >
            <CardContent className="py-4">
              <div className="flex items-center gap-3">
                {isCorrect ? (
                  <>
                    <CheckCircle2 className="h-6 w-6 text-forest-green shrink-0" />
                    <p className="text-forest-green font-semibold">Correct! Well done!</p>
                  </>
                ) : (
                  <>
                    <XCircle className="h-6 w-6 text-destructive shrink-0" />
                    <p className="text-destructive font-semibold">
                      Incorrect. The correct answer is: {question.options[Number(question.correctAnswerIndex)]}
                    </p>
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          <Button
            onClick={handleNext}
            size="lg"
            className="w-full bg-burgundy hover:bg-burgundy/90 text-white font-semibold"
          >
            {currentQuestion + 1 >= numQuestions ? 'View Results' : 'Next Question'}
          </Button>
        </div>
      )}
    </div>
  );
}
