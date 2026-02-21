import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BookOpen, Target, TrendingUp, Award } from 'lucide-react';
import { useUserProgress } from '../hooks/useUserProgress';
import { Skeleton } from '@/components/ui/skeleton';

export default function ProgressDashboard() {
  const { data: stats, isLoading } = useUserProgress();

  if (isLoading) {
    return (
      <div className="grid md:grid-cols-2 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-48 rounded-2xl" />
        ))}
      </div>
    );
  }

  if (!stats) {
    return (
      <Card className="border-burgundy/20 bg-white p-8 text-center">
        <p className="text-foreground/70">No progress data available yet. Start studying to see your stats!</p>
      </Card>
    );
  }

  const accuracyRate = stats.totalAttempts > 0 ? (Number(stats.correctAnswers) / Number(stats.totalAttempts)) * 100 : 0;
  const totalWords = 3000; // Total GRE words available
  const progressPercentage = (Number(stats.wordsLearned) / totalWords) * 100;

  const statCards = [
    {
      icon: BookOpen,
      title: 'Words Learned',
      value: stats.wordsLearned.toString(),
      subtitle: `Out of ${totalWords} total words`,
      color: 'text-burgundy',
      bgColor: 'bg-burgundy/10'
    },
    {
      icon: Target,
      title: 'Accuracy Rate',
      value: `${Math.round(accuracyRate)}%`,
      subtitle: `${stats.correctAnswers.toString()} correct out of ${stats.totalAttempts.toString()}`,
      color: 'text-forest-green',
      bgColor: 'bg-forest-green/10'
    },
    {
      icon: TrendingUp,
      title: 'Total Attempts',
      value: stats.totalAttempts.toString(),
      subtitle: 'Practice questions answered',
      color: 'text-burgundy',
      bgColor: 'bg-burgundy/10'
    },
    {
      icon: Award,
      title: 'Correct Answers',
      value: stats.correctAnswers.toString(),
      subtitle: 'Questions answered correctly',
      color: 'text-forest-green',
      bgColor: 'bg-forest-green/10'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Overall Progress */}
      <Card className="border-burgundy/20 bg-white">
        <CardHeader>
          <div className="flex items-center gap-3 mb-4">
            <img src="/assets/generated/brain-icon.dim_128x128.png" alt="Progress" className="w-12 h-12" />
            <CardTitle className="font-serif text-2xl text-burgundy">Overall Progress</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-foreground/70">
              <span>Vocabulary Mastery</span>
              <span>{Math.round(progressPercentage)}%</span>
            </div>
            <Progress value={progressPercentage} className="h-3" />
          </div>
          <p className="text-sm text-foreground/60">
            You've learned {stats.wordsLearned.toString()} words. Keep going to master all {totalWords} GRE vocabulary
            words!
          </p>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="border-burgundy/20 bg-white">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-lg ${stat.bgColor} flex items-center justify-center shrink-0`}>
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-foreground/60 mb-1">{stat.title}</p>
                    <p className={`text-3xl font-bold ${stat.color} mb-1`}>{stat.value}</p>
                    <p className="text-sm text-foreground/50">{stat.subtitle}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Motivational Message */}
      {accuracyRate >= 80 && (
        <Card className="border-forest-green/30 bg-forest-green/5">
          <CardContent className="py-6">
            <div className="flex items-center gap-3">
              <Award className="h-8 w-8 text-forest-green" />
              <div>
                <p className="font-semibold text-forest-green">Excellent Performance!</p>
                <p className="text-sm text-foreground/70">
                  You're maintaining an accuracy rate above 80%. Keep up the great work!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
