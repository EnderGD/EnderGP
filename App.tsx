
import React from 'react';
import Header from './components/Header';
import IntroSection from './components/IntroSection';
import WorkSection from './components/WorkSection';
import PricingSection from './components/PricingSection';
import ContactSection from './components/ContactSection';
import { useFirebaseAuth } from './hooks/useFirebaseAuth';
import { getAnalytics } from "firebase/analytics";
import { app, isFirebaseConfigured } from './services/firebase';

// Initialize Firebase Analytics only if configured
if (isFirebaseConfigured) {
  getAnalytics(app);
}

const FirebaseWarning = () => (
    <div className="bg-red-600 text-white p-4 text-center font-semibold fixed top-0 left-0 right-0 z-[100] shadow-lg">
        <p>Firebase is not configured! Please add your Firebase project configuration in <strong>services/firebase.ts</strong> to enable login and portfolio features.</p>
    </div>
);

function App() {
  const { user, isAdmin, login, logout } = useFirebaseAuth();

  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      {!isFirebaseConfigured && <FirebaseWarning />}
      <Header isAdmin={isAdmin} login={login} logout={logout} />
      <main className="container mx-auto px-4 md:px-8">
        <IntroSection />
        <WorkSection isAdmin={isAdmin} />
        <PricingSection />
        <ContactSection />
      </main>
      <footer className="text-center py-8 text-sm text-gray-500 border-t border-blue-900/20 mt-20">
        <p>&copy; {new Date().getFullYear()} Ender. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
