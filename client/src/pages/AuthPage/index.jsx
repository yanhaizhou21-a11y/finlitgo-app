import React from 'react';
import LiquidChrome from '../../components/Background/LiquidChrome';
import HeroSection from '../../components/Hero/HeroSection';
import AuthContainer from '../../components/Auth/AuthContainer';

const AuthPage = () => {
  return (
    <div className="relative min-h-screen">
      <LiquidChrome 
        baseColor={[0.43, 0.16, 0.85]} 
        interactive={true} 
      />
      <HeroSection>
        <AuthContainer />
      </HeroSection>
    </div>
  );
};

export default AuthPage;
