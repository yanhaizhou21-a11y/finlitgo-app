import React from 'react';
import StaggeredMenu from './StaggeredMenu';

const HamburgerMenu = ({ navLinks }) => {
  // Konversi format navLinks dari Navbar ke format StaggeredMenu
  const menuItems = navLinks.map((link) => ({
    label: link.name,
    ariaLabel: `Go to ${link.name}`,
    link: link.href,
  }));

  const socialItems = [
    { label: 'Instagram', link: 'https://instagram.com' },
    { label: 'Twitter', link: 'https://twitter.com' },
    { label: 'LinkedIn', link: 'https://linkedin.com' },
  ];

  return (
    <div className="md:hidden">
      <StaggeredMenu
        isFixed={true}
        position="right"
        items={menuItems}
        socialItems={socialItems}
        displaySocials={true}
        displayItemNumbering={true}
        menuButtonColor="#ffffff"
        openMenuButtonColor="#1a1a1a"
        changeMenuColorOnOpen={true}
        colors={['#B19EEF', '#5227FF']}
        accentColor="#1a1a1a"
        onMenuOpen={() => console.log('Menu opened')}
        onMenuClose={() => console.log('Menu closed')}
      />
    </div>
  );
};

export default HamburgerMenu;
