import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trophy, RotateCcw, Home } from 'lucide-react';
import { Link } from '@tanstack/react-router';

interface TestResultsProps {
  score: number;
  totalQuestions: number;
  onRetake: () => void;
}

export default function TestResults({ score, totalQuestions, onRetake }: TestResultsProps) {
  const percentage = Math.round((score / totalQuestions) * 100);

  const getPerformanceMessage = () => {
    if (percentage >= 90) return { message: 'Outstanding!', color: 'text-forest-green' };
    if (percentage >= 75) return { message: 'Great Job!', color: 'text-forest-green' };
    if (percentage >= 60) return { message: 'Good Effort!', color: 'text-burgundy' };
    return { message: 'Keep Practicing!', color: 'text-foreground' };
  };

  const performance = getPerformanceMessage();

  return (
    <Card className="border-burgundy/20 bg-white">
      <CardHeader className="text-center pb-4">
        <div className="flex justify-center mb-4">
          <div className="w-20 h-20 rounded-full bg-burgundy/10 flex items-center justify-center">
            <Trophy className="h-10 w-10 text-burgundy" />
          </div>
        </div>
        <CardTitle className="font-serif text-3xl text-burgundy mb-2">Test Complete!</CardTitle>
        <p className={`text-2xl font-bold ${performance.color}`}>{performance.message}</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Score Display */}
        <div className="bg-burgundy/5 rounded-xl p-8 text-center">
          <div className="text-6xl font-bold text-burgundy mb-2">
            {score}/{totalQuestions}
          </div>
          <div className="text-xl text-foreground/70">
            {percentage}% Correct
          </div>
        </div>

        {/* Performance Breakdown */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-forest-green/10 rounded-lg p-4 text-center border border-forest-green/20">
            <div className="text-3xl font-bold text-forest-green mb-1">{score}</div>
            <div className="text-sm text-foreground/70">Correct</div>
          </div>
          <div className="bg-destructive/10 rounded-lg p-4 text-center border border-destructive/20">
            <div className="text-3xl font-bold text-destructive mb-1">{totalQuestions - score}</div>
            <div className="text-sm text-foreground/70">Incorrect</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-4">
          <Button
            onClick={onRetake}
            size="lg"
            className="w-full bg-burgundy hover:bg-burgundy/90 text-white font-semibold"
          >
            <RotateCcw className="mr-2 h-5 w-5" />
            Take Another Test
          </Button>
          <Link to="/">
            <Button variant="outline" size="lg" className="w-full border-burgundy/30 hover:bg-burgundy/5">
              <Home className="mr-2 h-5 w-5" />
              Back to Home
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
