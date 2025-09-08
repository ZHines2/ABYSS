# Interactive Fiction Engine

A modular interactive fiction engine that supports multiple text adventure games.

## Overview

This engine has been refactored from a single-adventure system into a modular framework that can host multiple interactive fiction experiences. The current implementation features the ABYSS adventure based on a poem by ZHines2.

## Architecture

### Core Components

1. **Interactive Fiction Engine** (`js/if-engine.js`)
   - Generic game engine that can run any adventure
   - Handles core mechanics: movement, inventory, commands, UI
   - Adventure-agnostic implementation

2. **Adventure Registry** (`js/adventure-registry.js`)
   - Manages multiple adventures
   - Handles adventure loading and validation
   - Extensible for future adventures

3. **Adventure Definitions** (`adventures/`)
   - Individual adventure files containing world data
   - Each adventure is self-contained with rooms, items, scripts
   - Example: `adventures/abyss.js`

### Current Adventures

#### ABYSS: interactive fiction
- **Author**: ZHines2
- **Based on**: Original poem "the rustling of leaves..."
- **Description**: Awaken in a sunlit cabin and unravel the mystery of the puzzle box through nature's clues
- **Features**: Time-based atmosphere, environmental puzzles, poetic narrative

## Adding New Adventures

To add a new adventure to the system:

1. Create a new adventure file in the `adventures/` directory
2. Follow the adventure structure format (see `adventures/abyss.js` as example)
3. Register the adventure in `js/adventure-registry.js`
4. Include the adventure script in `index.html`

### Adventure Structure

```javascript
const YOUR_ADVENTURE = {
  title: "Adventure Title",
  subtitle: "Short description",
  author: "Author Name",
  description: "Longer description for selection screen",
  
  // Starting conditions
  startingRoom: "roomId",
  startingTime: 6*60, // minutes from midnight
  startingFlags: { /* custom flags */ },
  startingInventory: [], // starting items
  
  // World definition
  rooms: {
    roomId: {
      name: "Room Name",
      desc: {
        morning: "Morning description",
        day: "Day description", 
        evening: "Evening description"
      },
      exits: { north: "otherRoomId" },
      items: ["itemId"],
      nouns: ["contextual", "nouns"]
    }
  },
  
  items: {
    itemId: {
      name: "item name",
      nouns: ["synonyms", "for", "item"],
      desc: "Description when examined",
      take: true/false,
      state: { /* custom state */ },
      scripts: {
        examine: (game) => "Response text",
        take: (game) => "Response text",
        // ... other action handlers
      }
    }
  },
  
  // Victory condition
  victory: {
    clues: ["required", "clues", "for", "victory"],
    message: "Victory message"
  },
  
  // Optional custom logic
  customLook: function(game) {
    // Adventure-specific logic during look command
  },
  
  welcomeMessage: function() {
    return [
      "Welcome message line 1",
      "Welcome message line 2"
    ];
  }
};
```

## Features

### Core Engine Features
- **Command System**: Natural language parsing with synonyms
- **Inventory Management**: Take, drop, examine items
- **Movement**: Navigate between rooms with directional commands
- **Time System**: Dynamic descriptions based on time of day
- **Save/Load**: Persistent game state using localStorage
- **Command History**: Arrow key navigation through previous commands
- **Smart Error Handling**: Helpful suggestions for unknown commands
- **Contextual UI**: Interactive verb/noun buttons for quick input

### Adventure-Specific Features
- **Custom Scripts**: Each item can have custom interaction scripts
- **Environmental Clues**: Location and time-based clue discovery
- **Victory Conditions**: Flexible win conditions based on collected clues
- **Sound Effects**: Audio feedback for actions (optional)
- **Custom Logic**: Adventure-specific behavior hooks

## Development

### File Structure
```
/
├── index.html              # Main game interface
├── js/
│   ├── if-engine.js        # Core game engine
│   └── adventure-registry.js # Adventure management
├── adventures/
│   └── abyss.js           # ABYSS adventure definition
└── README.md              # This file
```

### Future Enhancements
- Adventure selection screen
- Adventure marketplace/gallery
- Visual novel support
- Multiplayer adventures
- Adventure creation tools
- Enhanced audio/visual effects

## Credits

- **Engine**: Interactive Fiction Engine v2.0
- **ABYSS Adventure**: Based on original poem by ZHines2
- **Original Implementation**: Single-adventure version with bug fixes and UX enhancements

## License

See LICENSE file for details.