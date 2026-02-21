import { useEffect, useRef } from 'react';
import { useNavigate } from '@tanstack/react-router';

export function useNotifications() {
  const navigate = useNavigate();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const checkAndScheduleNotification = () => {
      const enabled = localStorage.getItem('notificationsEnabled') === 'true';
      const notificationTime = localStorage.getItem('notificationTime') || '09:00';

      if (!enabled || !('Notification' in window) || Notification.permission !== 'granted') {
        return;
      }

      const [hours, minutes] = notificationTime.split(':').map(Number);
      const now = new Date();
      const scheduledTime = new Date();
      scheduledTime.setHours(hours, minutes, 0, 0);

      // If the scheduled time has passed today, schedule for tomorrow
      if (scheduledTime <= now) {
        scheduledTime.setDate(scheduledTime.getDate() + 1);
      }

      const timeUntilNotification = scheduledTime.getTime() - now.getTime();

      // Clear any existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Schedule the notification
      timeoutRef.current = setTimeout(() => {
        const notification = new Notification('GRE Vocab Builder', {
          body: "Time to study! Let's build your vocabulary today.",
          icon: '/assets/generated/brain-icon.dim_128x128.png',
          tag: 'daily-reminder',
          requireInteraction: false
        });

        notification.onclick = () => {
          window.focus();
          navigate({ to: '/flashcards' });
          notification.close();
        };

        // Schedule the next notification for tomorrow
        setTimeout(checkAndScheduleNotification, 1000);
      }, timeUntilNotification);
    };

    checkAndScheduleNotification();

    // Cleanup on unmount
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [navigate]);
}
