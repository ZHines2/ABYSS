# ABYSS — Living Pixel Biome 2D

A 2D living pixel biome simulation where each pixel is a living organism that can grow, reproduce, mutate, and die. Built from scratch to create an actually working pixel ecosystem.

## Overview

ABYSS is now a living pixel biome where every pixel behaves like a living organism. Each biome type (water, grass, trees, rock) has unique life behaviors that create organic, emergent ecosystems. The focus is on making pixels that actually "live" rather than complex 3D rendering.

## Features

### Living Pixel Ecosystem
- **Individual Pixel Life**: Each pixel is a living organism with age, energy, and behaviors
- **Biome Behaviors**: Water flows and spreads, grass grows slowly, trees live longer, rocks are stable
- **Reproduction & Evolution**: Pixels can reproduce and mutate into different biome types
- **Natural Death & Aging**: Pixels age and die naturally, creating organic population cycles
- **Real-time Simulation**: Watch the ecosystem evolve in real-time with live statistics

### Interactive Life Controls
- **Life Speed**: Control how fast time passes in the biome
- **Growth Rate**: Adjust how quickly organisms reproduce
- **Death Rate**: Control natural mortality rates
- **Mutation Rate**: Set how often evolution occurs between biome types
- **Reset & Randomization**: Generate new biomes with different starting conditions

### Pixel Art Aesthetic
- **2D Canvas Rendering**: Crisp pixel-perfect display with pixelated scaling
- **Biome Color Coding**: Blue water, green grass, brown trees, gray rocks
- **Age Visualization**: Pixels darken with age showing the passage of time

## Biome Types

### 🔵 Water - Flows and Spreads
*"Fluid pixels that seek empty spaces and expand their territory"*
- Lifespan: 50-80 generations
- Behavior: Flows into empty neighboring spaces
- Reproduction: Spreads rapidly when conditions allow

### 🟢 Grass - Grows and Spreads Slowly
*"Steady growth with occasional evolution into trees"*
- Lifespan: 80-120 generations  
- Behavior: Moderate reproduction rate
- Evolution: Small chance to mutate into trees

### 🟤 Trees - Grow Tall, Live Longer
*"Long-lived organisms that spawn grass around them"*
- Lifespan: 150-250 generations
- Behavior: Slow reproduction, often creates grass
- Stability: Lives longest, provides ecosystem foundation

### ⚪ Rock - Stable, Changes Slowly
*"Nearly permanent structures that slowly grow or erode"*
- Lifespan: 300-500 generations
- Behavior: Very slow growth/erosion
- Role: Provides stable foundation for ecosystem

## Technical Implementation

### Canvas 2D Rendering
- **Pixel-perfect Display**: Each organism is a single pixel with crisp rendering
- **Real-time Animation**: 60 FPS updates with configurable simulation speed
- **Color Coding**: Distinct colors for each biome type with age-based darkening
- **Scalable Display**: Low-resolution simulation scaled up for visibility

### Living Organism System
- **Individual Life Cycles**: Each pixel tracks age, energy, reproduction status
- **Biome-specific Behaviors**: Custom update logic for each organism type
- **Neighbor Detection**: Organisms can sense and interact with surrounding pixels
- **Energy Management**: Reproduction costs energy, death occurs when energy depletes

### Population Dynamics
- **Real-time Statistics**: Live tracking of population, generation, and diversity
- **Emergent Behaviors**: Complex ecosystem patterns emerge from simple rules
- **Parameter Control**: Adjustable rates for growth, death, mutation, and time speed
- **Ecosystem Balance**: Natural cycles of growth, competition, and stability

## Getting Started

1. Open `index.html` in a modern web browser (no special requirements needed)
2. Watch the living pixel biome evolve in real-time
3. Adjust life parameters with the sliders to see different behaviors
4. Use Reset Biome to start fresh or Random Seed for new starting patterns
5. Experiment with different growth/death/mutation rates to create unique ecosystems

## File Structure
```
/
├── index.html              # Living pixel biome simulation
├── living-pixels-2d.html   # Same implementation (backup)
├── index_backup.html       # Original 3D implementation backup
├── LICENSE                 # License file
└── README.md              # This file
```

## Browser Requirements

- Modern browser with HTML5 Canvas support (any recent browser works)
- No external dependencies or special graphics requirements
- Works on desktop and mobile devices

## Development Notes

The simulation uses pure HTML5 Canvas with no external libraries, implementing:
- Custom pixel-based life simulation with age, energy, and behavior systems
- Real-time ecosystem dynamics with reproduction, mutation, and death
- Interactive parameter controls for experimenting with different life conditions
- Efficient 2D rendering optimized for smooth real-time animation

## Future Enhancements

- Sound effects for birth, death, and ecosystem changes
- More complex biome interactions and symbiotic relationships  
- Save/load ecosystem states for sharing interesting patterns
- Additional biome types with unique behaviors
- Touch controls for mobile devices
- Time-lapse recording of ecosystem evolution

## Credits

- **Concept**: ZHines2's vision inspired by t3ssel8r's pixel art
- **Implementation**: Complete rewrite focusing on actual living pixel behaviors
- **Philosophy**: "Make something that works" - prioritizing functional life simulation over complex graphics

## License

See LICENSE file for details.