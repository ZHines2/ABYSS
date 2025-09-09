# ABYSS — 3D Pixel Biome Game

A 3D pixel art exploration game built with WebGL, featuring procedurally generated biomes and a flowchart-based game state system.

## Overview

ABYSS is an atmospheric exploration game where you navigate through pixel-perfect 3D biomes. Each terrain type (water, grass, trees, rock) represents different game states with unique narrative elements and actions. The game features real-time 3D rendering with a retro pixel aesthetic.

## Features

### 3D Pixel Biome Engine
- **Procedural Terrain**: Heightfield generation using value noise
- **Biome System**: Water, grass, forest, and rock environments
- **Dynamic Lighting**: Quantized lighting system for pixel art aesthetics
- **Real-time Parameters**: Adjustable water level, rock height, tree density
- **Pixel Perfect Rendering**: Low-res rendering scaled up for crisp pixels

### Game State System
- **Flowchart Navigation**: Each biome represents a different game state
- **Contextual Actions**: Unique interactions for each environment
- **Progress Tracking**: Player actions tracked across exploration
- **Atmospheric Narrative**: Evocative descriptions for each biome state

### Interactive Controls
- **Mouse Controls**: Drag to orbit camera, wheel to zoom
- **Parameter Adjustment**: Real-time terrain modification via sliders
- **Auto-rotation**: Configurable automatic camera movement
- **Terrain Regeneration**: Generate new biomes with different seeds

## Game States

### 🌊 Depths Unknown (Water)
*"The pixel waters ripple with hidden currents. Ancient data flows beneath the surface..."*
- Actions: Dive Deeper, Surface, Listen to Currents

### 🌾 Fields of Memory (Grasslands)  
*"Endless grasslands stretch before you, each blade a memory pixel storing echoes..."*
- Actions: Gather Memories, Feel the Wind, Lie in the Grass

### 🌲 Grove of Secrets (Forest)
*"Pixel trees tower around you, their geometric branches holding fragments of forgotten code..."*
- Actions: Read the Trees, Follow the Path, Rest Among Roots

### 🗻 Peak of Revelation (Rock)
*"From these rocky heights, you see the pattern of the abyss spread below..."*
- Actions: Survey the Realm, Descend, Seek Higher Ground

## Technical Implementation

### WebGL Rendering
- **Vertex Shaders**: 3D position and biome attribute processing
- **Fragment Shaders**: Posterized lighting and biome-based coloring
- **Mesh Generation**: Quad-based heightfield with normal calculation
- **Buffer Management**: Efficient vertex, normal, and index buffers

### Procedural Generation
- **Value Noise**: Smooth terrain height generation
- **Biome Assignment**: Height and moisture-based biome classification
- **Seed System**: Reproducible terrain with randomizable seeds
- **Real-time Updates**: Dynamic parameter adjustment

## Getting Started

1. Open `index.html` in a modern web browser with WebGL support
2. Use the controls to adjust terrain parameters
3. Drag to orbit the camera and zoom with mouse wheel
4. Click action buttons to explore different game states
5. Generate new biomes with the "New Biome" button

## File Structure
```
/
├── index.html          # Complete game implementation
├── LICENSE             # License file
└── README.md          # This file
```

## Browser Requirements

- Modern browser with WebGL 1.0 support
- Hardware-accelerated graphics recommended
- Mouse for camera controls
- No external dependencies required

## Development Notes

The game uses pure WebGL with no external libraries, implementing:
- Custom matrix math for 3D transformations
- Procedural noise functions for terrain generation
- State management for game progression
- Real-time parameter adjustment system

## Future Enhancements

- Enhanced biome variety and visual effects
- Audio system for atmospheric sound
- More complex game state transitions
- Save/load functionality for exploration progress
- Mobile touch controls

## Credits

- **Concept**: ZHines2's vision of ABYSS as flowchart game states
- **Implementation**: 3D pixel biome foundation with WebGL
- **Art Style**: Pixel-perfect low-res aesthetic with posterized lighting

## License

See LICENSE file for details.