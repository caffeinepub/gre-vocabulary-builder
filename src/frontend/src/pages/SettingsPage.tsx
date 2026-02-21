import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import NotificationSettings from '../components/NotificationSettings';

export default function SettingsPage() {
  return (
    <div className="container py-8 md:py-12">
      <div className="max-w-2xl mx-auto">
        <Card className="border-burgundy/20 bg-white mb-8">
          <CardHeader className="text-center">
            <CardTitle className="font-serif text-3xl text-burgundy">Settings</CardTitle>
            <CardDescription className="text-base">Customize your learning experience</CardDescription>
          </CardHeader>
        </Card>

        <NotificationSettings />
      </div>
    </div>
  );
}
