// Adventure Registry System
// Manages multiple interactive fiction adventures

const ADVENTURE_REGISTRY = {
  // Registry of available adventures
  adventures: [
    {
      id: 'whispering-forest',
      title: 'The Whispering Forest',
      author: 'ZHines2',
      description: 'A mystery in the forest based on a poem. Awaken in a sunlit cabin and unravel the mystery of the puzzle box through nature\'s clues.',
      file: 'adventures/abyss.js',
      featured: true
    }
    // Future adventures can be added here
  ],

  // Legacy aliases for backward compatibility
  aliases: {
    'abyss': 'whispering-forest'
  },
  
  // Current loaded adventure
  currentAdventure: null,
  
  // Get list of all adventures
  getAdventures() {
    return this.adventures;
  },
  
  // Get featured adventures
  getFeaturedAdventures() {
    return this.adventures.filter(adv => adv.featured);
  },
  
  // Load an adventure by ID
  async loadAdventure(adventureId) {
    // Check for legacy aliases
    const resolvedId = this.aliases[adventureId] || adventureId;
    
    const adventure = this.adventures.find(adv => adv.id === resolvedId);
    if (!adventure) {
      throw new Error(`Adventure '${adventureId}' not found`);
    }
    
    try {
      // Load the adventure script
      if (typeof require !== 'undefined') {
        // Node.js environment
        this.currentAdventure = require(`../${adventure.file}`);
      } else {
        // Browser environment - script should already be loaded
        if ((adventure.id === 'whispering-forest' || adventureId === 'abyss') && window.ABYSS_ADVENTURE) {
          this.currentAdventure = window.ABYSS_ADVENTURE;
        } else {
          throw new Error(`Adventure script not loaded: ${adventure.file}`);
        }
      }
      
      return this.currentAdventure;
    } catch (error) {
      throw new Error(`Failed to load adventure '${adventureId}': ${error.message}`);
    }
  },
  
  // Get currently loaded adventure
  getCurrentAdventure() {
    return this.currentAdventure;
  },
  
  // Register a new adventure
  registerAdventure(adventure) {
    if (this.adventures.find(adv => adv.id === adventure.id)) {
      throw new Error(`Adventure '${adventure.id}' already registered`);
    }
    this.adventures.push(adventure);
  },
  
  // Validate adventure structure
  validateAdventure(adventure) {
    const required = ['title', 'rooms', 'items', 'startingRoom'];
    for (const field of required) {
      if (!adventure[field]) {
        throw new Error(`Adventure missing required field: ${field}`);
      }
    }
    
    // Validate starting room exists
    if (!adventure.rooms[adventure.startingRoom]) {
      throw new Error(`Starting room '${adventure.startingRoom}' not found in rooms`);
    }
    
    return true;
  }
};

// Export for use in different environments
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ADVENTURE_REGISTRY;
} else if (typeof window !== 'undefined') {
  window.ADVENTURE_REGISTRY = ADVENTURE_REGISTRY;
}