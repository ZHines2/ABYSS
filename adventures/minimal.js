// Minimal Adventure
// Simple 3-room Zork-style game

const MINIMAL_ADVENTURE = {
  title: "Minimal Adventure",
  subtitle: "A simple room exploration",
  author: "ZHines2",
  description: "A minimal text adventure in the style of classic Zork. Navigate through three simple rooms.",
  
  // Starting conditions
  startingRoom: "room1",
  startingTime: 12*60, // 12:00 PM (noon - simple single time)
  startingFlags: {},
  startingInventory: [],
  
  // World definition - 3 simple rooms
  rooms: {
    room1: {
      name: "Room",
      desc: {
        morning: "You are in a simple room. There is a door to the east.",
        day: "You are in a simple room. There is a door to the east.",
        evening: "You are in a simple room. There is a door to the east."
      },
      exits: { east: "room2" },
      items: ["door1"],
      nouns: ["room"]
    },
    
    room2: {
      name: "Room",
      desc: {
        morning: "You are in another room. There is a door to the west and another door to the east.",
        day: "You are in another room. There is a door to the west and another door to the east.",
        evening: "You are in another room. There is a door to the west and another door to the east."
      },
      exits: { west: "room1", east: "room3" },
      items: ["door2"],
      nouns: ["room"]
    },
    
    room3: {
      name: "Room with Table",
      desc: {
        morning: "You are in a room with a table. On the table is a book.",
        day: "You are in a room with a table. On the table is a book.",
        evening: "You are in a room with a table. On the table is a book."
      },
      exits: { west: "room2" },
      items: ["table", "book"],
      nouns: ["room", "table"]
    }
  },
  
  // Simple items
  items: {
    door1: {
      name: "door",
      nouns: ["door"],
      desc: "A simple wooden door leading east.",
      take: false,
      scripts: {
        examine: (game) => "A simple wooden door.",
        open: (game) => {
          game.unlockVerb("OPEN");
          return "The door is already open. You can go east.";
        }
      }
    },
    
    door2: {
      name: "door",
      nouns: ["door"],
      desc: "A simple wooden door leading east.",
      take: false,
      scripts: {
        examine: (game) => "A simple wooden door.",
        open: (game) => {
          game.unlockVerb("OPEN");
          return "The door is already open. You can go east.";
        }
      }
    },
    
    table: {
      name: "table",
      nouns: ["table"],
      desc: "A simple wooden table. There is a book on it.",
      take: false,
      scripts: {
        examine: (game) => "A simple wooden table with a book on it."
      }
    },
    
    book: {
      name: "book",
      nouns: ["book"],
      desc: "An old book with worn pages.",
      take: true,
      scripts: {
        examine: (game) => "An old book. You could try to open it.",
        take: (game) => {
          game.unlockVerb("OPEN");
          return "You pick up the book.";
        },
        open: (game) => {
          game.unlockVerb("OPEN");
          game.note("📖 You have completed the adventure!");
          return "🎉 You open the book and find... the end of this simple adventure! Congratulations!";
        }
      }
    }
  },
  
  // Victory condition - opening the book
  victory: { 
    clues: [], // No clues needed, just open the book
    message: "Congratulations! You've completed the minimal adventure by opening the book!"
  },
  
  // Simple welcome message
  welcomeMessage: function() {
    return [
      "🎮 Welcome to the Minimal Adventure! 🎮",
      "🚪 You find yourself in a simple room. Try exploring!",
      "💡 Commands: LOOK, MOVE EAST, EXAMINE DOOR, TAKE BOOK, OPEN BOOK",
      "💡 Type HELP for more commands."
    ];
  }
};

// Export for use in the main engine
if (typeof module !== 'undefined' && module.exports) {
  module.exports = MINIMAL_ADVENTURE;
} else if (typeof window !== 'undefined') {
  window.MINIMAL_ADVENTURE = MINIMAL_ADVENTURE;
}