export const ROOM_SCENES = [
  {
    id: 'loft-brick',
    name: 'Industrial Dark Brick',
    category: 'Urban Living',
    bgStyle: {
      backgroundColor: '#121318',
      backgroundImage: `
        radial-gradient(rgba(255,255,255,0.03) 1px, transparent 0),
        linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.85) 100%),
        repeating-linear-gradient(0deg, #181a22, #181a22 24px, #0e0f14 24px, #0e0f14 26px),
        repeating-linear-gradient(90deg, transparent, transparent 50px, #0e0f14 50px, #0e0f14 52px)
      `,
      backgroundSize: '100% 100%, 100% 100%, 100% 26px, 52px 100%',
    },
    lightingMultiplier: 1.1,
    wallDescription: 'Textured charcoal brick wall with subtle mortar relief'
  },
  {
    id: 'matte-slate',
    name: 'Matte Luxury Charcoal',
    category: 'Minimal Luxury',
    bgStyle: {
      backgroundColor: '#0c0e14',
      backgroundImage: `
        radial-gradient(circle at 50% 30%, rgba(30, 41, 59, 0.4) 0%, transparent 70%),
        linear-gradient(to bottom, #090a0f, #050608)
      `,
    },
    lightingMultiplier: 1.3,
    wallDescription: 'Sleek acoustic matte concrete with velvet dark backdrop'
  },
  {
    id: 'foliage-green',
    name: 'Lush Botanical Foliage',
    category: 'Events & Weddings',
    bgStyle: {
      backgroundColor: '#0a140f',
      backgroundImage: `
        radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.08) 0%, transparent 60%),
        radial-gradient(rgba(34, 197, 94, 0.05) 15%, transparent 16%),
        radial-gradient(rgba(20, 83, 45, 0.3) 15%, transparent 16%),
        linear-gradient(to bottom, #040d07 0%, #030805 100%)
      `,
      backgroundSize: '100% 100%, 40px 40px, 60px 60px, 100% 100%',
    },
    lightingMultiplier: 1.2,
    wallDescription: 'Greenery grass wall ideal for wedding & cafe photos'
  },
  {
    id: 'cozy-bedroom',
    name: 'Cozy Bedroom & Bedhead',
    category: 'Home Decor',
    bgStyle: {
      backgroundColor: '#10111a',
      backgroundImage: `
        radial-gradient(circle at 50% 70%, rgba(244, 114, 182, 0.06) 0%, transparent 50%),
        linear-gradient(to bottom, rgba(13, 15, 23, 0.9) 0%, rgba(8, 9, 14, 0.95) 100%)
      `,
    },
    lightingMultiplier: 1.0,
    wallDescription: 'Warm intimate bedroom wall over neutral headboard'
  },
  {
    id: 'wood-slats',
    name: 'Warm Slatted Walnut',
    category: 'Modern Cafe',
    bgStyle: {
      backgroundColor: '#15100c',
      backgroundImage: `
        repeating-linear-gradient(90deg, #1c140e, #1c140e 32px, #0a0705 32px, #0a0705 38px),
        linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.8))
      `,
    },
    lightingMultiplier: 1.15,
    wallDescription: 'Architectural vertical wooden acoustic panel slats'
  },
  {
    id: 'cyber-battlestation',
    name: 'Cyber Battlestation & Studio',
    category: 'Gaming Setup',
    bgStyle: {
      backgroundColor: '#070913',
      backgroundImage: `
        linear-gradient(135deg, rgba(0, 240, 255, 0.05) 0%, transparent 40%),
        linear-gradient(225deg, rgba(168, 85, 247, 0.05) 0%, transparent 40%),
        radial-gradient(circle at 50% 100%, rgba(14, 165, 233, 0.15), transparent 60%),
        linear-gradient(to bottom, #06070d, #020305)
      `,
    },
    lightingMultiplier: 1.4,
    wallDescription: 'Stealth gaming setup wall with ambient rim lights'
  }
];
