# ABYSS — Pixel Biome 2D + Little Wanderer

A beautiful 2D pixel biome diorama with a controllable little wanderer character. Experience dynamic environments with day/night cycles, wind effects, and multiple biome themes in a charming pixel art world.

## Overview

ABYSS is now a 2D diorama featuring procedurally generated biomes with a little wanderer character you can control. Explore different themed worlds, watch day turn to night, and enjoy the peaceful pixel art aesthetic with environmental animations and atmospheric effects.

## Features

### Little Wanderer Character
- **WASD/Arrow Key Controls**: Move your little wanderer around the biome
- **Collision Detection**: Character can't walk through water - explore dry land only
- **Auto Wander Mode**: Let the character explore on their own
- **Smooth Movement**: Responsive controls with adjustable speed
- **Visual Feedback**: Character has a subtle shadow and gentle bobbing animation

### Dynamic Biome Generation
- **Procedural Terrain**: Noise-based height maps create realistic landscapes
- **Multiple Biome Types**: Water, grass, trees, and rock formations
- **Adjustable Parameters**: Control water levels, rock height, and tree density
- **World Size Options**: Generate worlds from 40x40 to 160x160 tiles
- **Instant Regeneration**: Create new worlds with the click of a button

### Atmospheric Effects
- **Day/Night Cycle**: Watch the world transition from day to night with dynamic lighting
- **Wind Animations**: Grass sways and trees rustle in the breeze
- **Water Ripples**: Animated water surfaces with sparkle effects
- **Hard Shadows**: 1-pixel shadows cast by trees and rocks for depth
- **Altitude Shading**: Higher elevations receive different lighting
- **Contour Lines**: Optional topographical lines show elevation changes

### Multiple Themes
- **🌲 Forest**: Classic greens with blue water and gray stone
- **🍂 Autumn**: Warm oranges and browns for fall foliage
- **🏜️ Desert**: Sandy yellows and earth tones
- **🐸 Swamp**: Dark greens and murky waters
- **🌙 Nocturne**: Cool blues and purples for nighttime scenes

### Interactive Controls
- **Real-time Parameters**: Adjust world generation settings on the fly
- **Lighting Options**: Control shadow strength and day/night speed
- **Wind Effects**: Adjust wind speed to see more or less movement
- **Export Functionality**: Save your favorite biomes as PNG images
- **Keyboard Shortcuts**: R to regenerate, P to pause

## Controls

- **WASD** or **Arrow Keys** - Move the little wanderer
- **R** - Regenerate the world
- **P** - Pause/unpause time
- **Mouse** - Adjust sliders and settings in real-time

## Technical Features

### Noise-Based Generation
- **Value Noise**: Smooth, natural-looking terrain using mulberry32 random generation
- **Multi-layered Generation**: Separate noise layers for height, moisture, and lighting
- **Biome Logic**: Intelligent placement of water, grass, trees, and rocks based on elevation and moisture

### Real-time Animation System
- **60 FPS Rendering**: Smooth animations for all environmental effects
- **Efficient Updates**: Static terrain cached separately from animated elements
- **Time-based Animation**: Consistent movement regardless of frame rate
- **Optimized Rendering**: Pixel-perfect scaling with crisp edges

### Advanced Lighting
- **Dynamic Day/Night**: Sinusoidal lighting cycle affects all terrain
- **Altitude Lighting**: Higher elevations receive modified illumination
- **Quantized Shading**: Stepped lighting levels create pixel art aesthetic
- **Theme-based Tinting**: Night overlay uses theme-specific sky colors

## Getting Started

1. Open `index.html` in any modern web browser
2. Use WASD or arrow keys to move your little wanderer
3. Try different biome themes from the dropdown menu
4. Adjust world parameters to create your perfect landscape
5. Enable auto wander to watch the character explore on their own
6. Export your favorite scenes as PNG images

## File Structure
```
./
├── index.html              # Pixel Biome 2D + Little Wanderer
├── index_backup.html       # Previous living pixel implementation backup
├── LICENSE                 # License file
└── README.md              # This file
```

## Browser Requirements

- Modern browser with HTML5 Canvas support
- JavaScript enabled
- No external dependencies required
- Works on desktop and mobile devices (touch controls coming soon)

## Development Notes

The implementation uses pure HTML5 Canvas with no external libraries:
- Custom noise generation for realistic terrain
- Efficient tile-based rendering system
- Real-time parameter adjustment without regeneration lag
- Self-testing system ensures core functionality works correctly
- Responsive design that adapts to different screen sizes

## Future Enhancements

- Touch controls for mobile devices
- Sound effects for footsteps and environmental ambience
- Weather effects like rain and snow
- More biome themes and seasonal variations
- Collectible items scattered throughout the world
- Day/night wildlife that appears at different times

## Credits

- **Concept**: Inspired by peaceful exploration games and pixel art dioramas
- **Implementation**: Pure HTML5/Canvas with focus on performance and aesthetics
- **Design Philosophy**: Simple, beautiful, and immediately engaging

## License

See LICENSE file for details.