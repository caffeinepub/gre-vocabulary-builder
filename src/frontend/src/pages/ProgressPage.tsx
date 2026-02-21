import ProgressDashboard from '../components/ProgressDashboard';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function ProgressPage() {
  return (
    <div className="container py-8 md:py-12">
      <div className="max-w-4xl mx-auto">
        <Card className="border-burgundy/20 bg-white mb-8">
          <CardHeader className="text-center">
            <CardTitle className="font-serif text-3xl text-burgundy">Your Progress</CardTitle>
            <CardDescription className="text-base">
              Track your learning journey and see how far you've come
            </CardDescription>
          </CardHeader>
        </Card>

        <ProgressDashboard />
      </div>
    </div>
  );
}
