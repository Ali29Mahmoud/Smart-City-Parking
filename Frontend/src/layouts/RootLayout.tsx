import React from 'react';

export function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Your header/navigation here */}
      <main className="profile-scroll min-h-[calc(100vh-64px)]">
        {children}
      </main>
    </div>
  );
} 