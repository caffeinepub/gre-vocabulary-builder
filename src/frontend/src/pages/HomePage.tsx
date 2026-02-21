import { Link } from '@tanstack/react-router';
import { BookOpen, Brain, BarChart3, ArrowRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  const features = [
    {
      icon: BookOpen,
      title: 'Flashcards',
      description: 'Study vocabulary words with interactive flashcards. Flip to reveal definitions and examples.',
      path: '/flashcards',
      color: 'text-burgundy'
    },
    {
      icon: Brain,
      title: 'Practice Tests',
      description: 'Test your knowledge with multiple-choice quizzes. Get immediate feedback on your answers.',
      path: '/practice-test',
      color: 'text-forest-green'
    },
    {
      icon: BarChart3,
      title: 'Track Progress',
      description: 'Monitor your learning journey with detailed statistics and performance metrics.',
      path: '/progress',
      color: 'text-burgundy'
    }
  ];

  return (
    <div className="container py-8 md:py-12">
      {/* Hero Section */}
      <div
        className="relative rounded-2xl overflow-hidden mb-12 bg-cover bg-center"
        style={{ backgroundImage: 'url(/assets/generated/hero-background.dim_1200x600.png)' }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-burgundy/90 to-burgundy/70" />
        <div className="relative px-8 py-16 md:py-24 text-center text-white">
          <h1 className="font-serif text-4xl md:text-6xl font-bold mb-4">Master GRE Vocabulary</h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-95">
            Build your vocabulary with 3000+ GRE words. Study with flashcards, take practice tests, and track your
            progress.
          </p>
          <Link to="/flashcards">
            <Button size="lg" className="bg-white text-burgundy hover:bg-cream font-semibold">
              Start Learning
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <Link key={feature.path} to={feature.path}>
              <Card className="h-full transition-all hover:shadow-lg hover:-translate-y-1 cursor-pointer border-burgundy/20 bg-white">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg bg-burgundy/10 flex items-center justify-center mb-4`}>
                    <Icon className={`h-6 w-6 ${feature.color}`} />
                  </div>
                  <CardTitle className="font-serif text-2xl text-burgundy">{feature.title}</CardTitle>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="ghost" className="text-burgundy hover:text-burgundy/80 p-0">
                    Get Started <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* Stats Section */}
      <div className="bg-white rounded-2xl border border-burgundy/20 p-8 text-center">
        <h2 className="font-serif text-3xl font-bold text-burgundy mb-6">Why Choose GRE Vocab Builder?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="text-4xl font-bold text-forest-green mb-2">3000+</div>
            <div className="text-foreground/70">GRE Words</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-forest-green mb-2">100%</div>
            <div className="text-foreground/70">Offline Access</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-forest-green mb-2">Smart</div>
            <div className="text-foreground/70">Progress Tracking</div>
          </div>
        </div>
      </div>
    </div>
  );
}
