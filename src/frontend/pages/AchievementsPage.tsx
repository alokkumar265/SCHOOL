import DashboardLayout from '@/frontend/components/layout/DashboardLayout';

const AchievementsPage = () => (
  <DashboardLayout>
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Achievements</h1>
      <p className="text-muted-foreground mb-6">Your achievements and awards will be displayed here.</p>
      <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500">
        No achievements yet.
      </div>
    </div>
  </DashboardLayout>
);

export default AchievementsPage; 