// Adventure Template
// Copy this file and customize for your new adventure

const NEW_ADVENTURE_TEMPLATE = {
  title: "New Adventure Title",
  subtitle: "Short tagline",
  author: "Your Name",
  description: "A compelling description of your adventure that will appear in the adventure selection screen.",
  
  // Starting conditions
  startingRoom: "start", // ID of the starting room
  startingTime: 6*60,    // 6:00 AM in minutes from midnight
  startingFlags: {},     // Custom game flags
  startingInventory: [], // Items player starts with
  
  // World definition - rooms where the adventure takes place
  rooms: {
    start: {
      name: "Starting Location",
      desc: {
        morning: "Description for morning time (before 11 AM)",
        day: "Description for daytime (11 AM - 5 PM)",
        evening: "Description for evening (after 5 PM)"
      },
      exits: { 
        north: "northRoom",
        east: "eastRoom"
        // Available directions: north, south, east, west
      },
      items: ["itemInRoom"], // Items present in this room
      nouns: ["contextual", "nouns"] // Nouns player can reference in this room
    },
    
    northRoom: {
      name: "North Room",
      desc: {
        morning: "Morning description",
        day: "Day description",
        evening: "Evening description"
      },
      exits: { south: "start" },
      items: [],
      nouns: []
    }
    
    // Add more rooms as needed...
  },
  
  // Items that can be interacted with
  items: {
    itemInRoom: {
      name: "example item",
      nouns: ["item", "example", "thing"], // All ways player can refer to this item
      desc: "This is what the player sees when examining the item.",
      take: true, // Can the player pick this up?
      state: {    // Custom state tracking for this item
        used: false,
        activated: false
      },
      scripts: {
        // Define what happens when player interacts with this item
        examine: (game) => {
          // Custom logic here
          game.note("You notice something interesting!");
          return "A detailed description of the item.";
        },
        
        take: (game) => {
          // Called when player takes the item
          game.unlockVerb("USE"); // Unlock new verbs
          return "You pick up the item.";
        },
        
        use: (game) => {
          if (game.items.itemInRoom.state.used) {
            return "You already used this.";
          }
          game.items.itemInRoom.state.used = true;
          game.clue("Important clue discovered!");
          return "You use the item and something happens!";
        }
        
        // Other possible scripts: light, open, close, push, pull, etc.
      }
    }
    
    // Add more items as needed...
  },
  
  // Victory condition - what the player needs to accomplish
  victory: {
    clues: ["Required clue 1", "Required clue 2"], // All clues needed to win
    message: "Congratulations! You solved the mystery!" // Victory message
  },
  
  // Optional: Custom logic that runs during the LOOK command
  customLook: function(game) {
    // Add location-specific clue discovery
    if (game.room === 'start') {
      game.clue("Starting location clue");
    }
    
    // Time-based clues
    if (game.phase() === 'evening' && game.room === 'northRoom') {
      game.clue("Evening clue in north room");
    }
  },
  
  // Optional: Custom welcome message
  welcomeMessage: function() {
    return [
      "🌟 Welcome to Your Adventure! 🌟",
      "📖 A brief introduction to set the scene...",
      "💡 Try commands like: LOOK, EXAMINE, TAKE, MOVE",
      "💡 Type HELP for more detailed instructions."
    ];
  }
};

// Export for use (update the variable name)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = NEW_ADVENTURE_TEMPLATE;
} else if (typeof window !== 'undefined') {
  window.NEW_ADVENTURE_TEMPLATE = NEW_ADVENTURE_TEMPLATE;
}