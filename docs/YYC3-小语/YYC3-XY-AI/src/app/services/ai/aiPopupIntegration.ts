// Mock AI Popup Integration Service

interface AIEvent {
  type: string;
  description: string;
  confidence: number;
  suggestions: string[];
}

interface GrowthReportOptions {
  reportType: 'daily' | 'weekly' | 'monthly';
  includeAI: boolean;
}

interface GrowthReport {
  title: string;
  date: string;
  summary: string;
  highlights: string[];
}

interface GrowthReminder {
  missing: { id: string; title: string }[];
}

export const growthAI = {
  recordAIEvent: async (event: AIEvent): Promise<void> => {
    console.log('Recording AI event:', event);
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, 500);
    });
  },

  generateGrowthReport: async (options: GrowthReportOptions): Promise<GrowthReport> => {
    console.log('Generating growth report with options:', options);
    return new Promise<GrowthReport>((resolve) => {
      setTimeout(() => {
        resolve({
          title: 'Monthly Growth Report',
          date: new Date().toISOString(),
          summary: 'Great progress this month!',
          highlights: ['Learned 5 new poems', 'Made 2 new friends']
        });
      }, 1500);
    });
  },

  triggerGrowthReminder: async (type: string): Promise<GrowthReminder> => {
    console.log('Triggering growth reminder for:', type);
    return new Promise<GrowthReminder>((resolve) => {
      setTimeout(() => {
        resolve({
          missing: [
            { id: 'm1', title: 'Visit White Horse Temple' }
          ]
        });
      }, 800);
    });
  }
};
