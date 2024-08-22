// app/page.tsx
import BackupForm from './components/BackupForm';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-4">MongoDB Backup Automation</h1>
        <BackupForm />
      </div>
    </div>
  );
};

export default HomePage;
