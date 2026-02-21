import { useState } from 'react';
import PracticeTest from '../components/PracticeTest';
import TestResults from '../components/TestResults';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function PracticeTestPage() {
  const [testStarted, setTestStarted] = useState(false);
  const [testCompleted, setTestCompleted] = useState(false);
  const [numQuestions, setNumQuestions] = useState(10);
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);

  const handleStartTest = () => {
    setTestStarted(true);
    setTestCompleted(false);
    setScore(0);
    setTotalQuestions(numQuestions);
  };

  const handleTestComplete = (finalScore: number, total: number) => {
    setScore(finalScore);
    setTotalQuestions(total);
    setTestCompleted(true);
  };

  const handleRetake = () => {
    setTestStarted(false);
    setTestCompleted(false);
    setScore(0);
  };

  if (testCompleted) {
    return (
      <div className="container py-8 md:py-12">
        <div className="max-w-3xl mx-auto">
          <TestResults score={score} totalQuestions={totalQuestions} onRetake={handleRetake} />
        </div>
      </div>
    );
  }

  if (testStarted) {
    return (
      <div className="container py-8 md:py-12">
        <div className="max-w-3xl mx-auto">
          <PracticeTest numQuestions={numQuestions} onComplete={handleTestComplete} />
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8 md:py-12">
      <div className="max-w-2xl mx-auto">
        <Card className="border-burgundy/20 bg-white">
          <CardHeader className="text-center">
            <CardTitle className="font-serif text-3xl text-burgundy">Practice Test</CardTitle>
            <CardDescription className="text-base">
              Test your vocabulary knowledge with multiple-choice questions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="num-questions" className="text-base">
                Number of Questions
              </Label>
              <Select value={numQuestions.toString()} onValueChange={(val) => setNumQuestions(parseInt(val))}>
                <SelectTrigger id="num-questions" className="border-burgundy/30">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5 Questions</SelectItem>
                  <SelectItem value="10">10 Questions</SelectItem>
                  <SelectItem value="15">15 Questions</SelectItem>
                  <SelectItem value="20">20 Questions</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              onClick={handleStartTest}
              size="lg"
              className="w-full bg-burgundy hover:bg-burgundy/90 text-white font-semibold"
            >
              Start Test
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
