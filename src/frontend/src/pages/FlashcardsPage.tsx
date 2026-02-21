import { useState } from 'react';
import FlashcardViewer from '../components/FlashcardViewer';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function FlashcardsPage() {
  return (
    <div className="container py-8 md:py-12">
      <div className="max-w-4xl mx-auto">
        <Card className="border-burgundy/20 bg-white mb-8">
          <CardHeader className="text-center">
            <CardTitle className="font-serif text-3xl text-burgundy">Flashcard Study Session</CardTitle>
            <CardDescription className="text-base">
              Click on a card to reveal the definition. Navigate through words to build your vocabulary.
            </CardDescription>
          </CardHeader>
        </Card>

        <FlashcardViewer />
      </div>
    </div>
  );
}
