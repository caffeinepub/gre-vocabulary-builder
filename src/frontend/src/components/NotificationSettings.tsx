import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Bell, BellOff } from 'lucide-react';
import { toast } from 'sonner';

export default function NotificationSettings() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [notificationTime, setNotificationTime] = useState('09:00');
  const [permission, setPermission] = useState<NotificationPermission>('default');

  useEffect(() => {
    // Load settings from localStorage
    const enabled = localStorage.getItem('notificationsEnabled') === 'true';
    const time = localStorage.getItem('notificationTime') || '09:00';
    setNotificationsEnabled(enabled);
    setNotificationTime(time);

    // Check current permission
    if ('Notification' in window) {
      setPermission(Notification.permission);
    }
  }, []);

  const requestPermission = async () => {
    if (!('Notification' in window)) {
      toast.error('Notifications are not supported in this browser');
      return;
    }

    try {
      const result = await Notification.requestPermission();
      setPermission(result);

      if (result === 'granted') {
        toast.success('Notifications enabled successfully!');
        setNotificationsEnabled(true);
        localStorage.setItem('notificationsEnabled', 'true');
      } else {
        toast.error('Notification permission denied');
        setNotificationsEnabled(false);
        localStorage.setItem('notificationsEnabled', 'false');
      }
    } catch (error) {
      toast.error('Failed to request notification permission');
    }
  };

  const handleToggle = async (checked: boolean) => {
    if (checked && permission !== 'granted') {
      await requestPermission();
    } else {
      setNotificationsEnabled(checked);
      localStorage.setItem('notificationsEnabled', checked.toString());
      toast.success(checked ? 'Notifications enabled' : 'Notifications disabled');
    }
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = e.target.value;
    setNotificationTime(time);
    localStorage.setItem('notificationTime', time);
    toast.success('Notification time updated');
  };

  const testNotification = () => {
    if (permission === 'granted') {
      new Notification('GRE Vocab Builder', {
        body: "Time to study! Let's build your vocabulary today.",
        icon: '/assets/generated/brain-icon.dim_128x128.png'
      });
      toast.success('Test notification sent!');
    } else {
      toast.error('Please enable notifications first');
    }
  };

  return (
    <Card className="border-burgundy/20 bg-white">
      <CardHeader>
        <div className="flex items-center gap-3">
          {notificationsEnabled ? (
            <Bell className="h-6 w-6 text-burgundy" />
          ) : (
            <BellOff className="h-6 w-6 text-foreground/40" />
          )}
          <CardTitle className="font-serif text-2xl text-burgundy">Daily Study Reminders</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Enable/Disable Toggle */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <Label htmlFor="notifications-toggle" className="text-base font-medium">
              Enable Notifications
            </Label>
            <p className="text-sm text-foreground/60">Receive daily reminders to study vocabulary</p>
          </div>
          <Switch
            id="notifications-toggle"
            checked={notificationsEnabled}
            onCheckedChange={handleToggle}
            className="data-[state=checked]:bg-burgundy"
          />
        </div>

        {/* Time Picker */}
        {notificationsEnabled && (
          <div className="space-y-3 pt-4 border-t border-burgundy/20">
            <Label htmlFor="notification-time" className="text-base font-medium">
              Reminder Time
            </Label>
            <Input
              id="notification-time"
              type="time"
              value={notificationTime}
              onChange={handleTimeChange}
              className="border-burgundy/30"
            />
            <p className="text-sm text-foreground/60">
              You'll receive a notification at {notificationTime} every day to remind you to study.
            </p>
          </div>
        )}

        {/* Test Notification Button */}
        {notificationsEnabled && (
          <Button
            onClick={testNotification}
            variant="outline"
            className="w-full border-burgundy/30 hover:bg-burgundy/5"
          >
            Send Test Notification
          </Button>
        )}

        {/* Permission Status */}
        {permission === 'denied' && (
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
            <p className="text-sm text-destructive">
              Notifications are blocked. Please enable them in your browser settings to receive study reminders.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
