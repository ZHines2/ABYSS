// ABYSS Adventure
// Based on the poem by ZHines2
// "the rustling of leaves..."

const ABYSS_ADVENTURE = {
  title: "The Whispering Forest",
  subtitle: "A mystery in the forest",
  author: "ZHines2",
  description: "Awaken in a sunlit cabin and unravel the mystery of the puzzle box through nature's clues.",
  
  // Starting conditions
  startingRoom: "cabin",
  startingTime: 6*60, // 6:00 AM
  startingFlags: { light: false },
  startingInventory: [],
  
  // World definition
  rooms: {
    cabin: {
      name:"Cabin",
      desc:{
        morning:"A sunlit cabin of carved wood and elder draperies. On a low table rests a puzzle box.",
        day:"Warm beams paint the draperies. The table waits with the puzzle box.",
        evening:"Candlelight would turn grooves to relief, if only it were lit. The puzzle box sits patient."
      },
      exits:{ east:"threshold" },
      items:["puzzleBox","candlestick","matches"],
      nouns:["room","table","draperies"]
    },
    threshold: {
      name:"Threshold",
      desc:{
        morning:"Daylight pours across the doorway, inviting the woods.",
        day:"The door yawns bright toward the forest path.",
        evening:"Late light grazes the step; air cools."
      },
      exits:{ west:"cabin", east:"forest" },
      items:[],
      nouns:["door","doorway"]
    },
    forest: {
      name:"Forest Edge",
      desc:{
        morning:"Leaves stir; the path smells of green and bark. The river glints eastward.",
        day:"Birdsong beads the air; shade dapples the ground.",
        evening:"Shadows lengthen; wild calls braid with wind."
      },
      exits:{ west:"threshold", east:"river" },
      items:[],
      nouns:["trees","leaves","wind","path"]
    },
    river: {
      name:"Riverbank",
      desc:{
        morning:"A bright ribbon mirrors the canopy—glittering, awake. A log bench faces the sun.",
        day:"Waves lap a steady hush; light dances. A bench invites rest.",
        evening:"Reflections soften; the current wears velvet. The bench waits."
      },
      exits:{ west:"forest" },
      items:["bench"],
      nouns:["water","river"]
    }
  },
  
  items: {
    puzzleBox:{
      name:"puzzle box", nouns:["box","puzzle","puzzle box"],
      desc:"A cube with labyrinthine engravings; pictographs hide between grooves.",
      take:false,
      state:{hint:false},
      scripts:{
        examine:(g)=>{
          g.note("The grooves suggest an order—perhaps drawn from nature.");
          g.unlockVerb("EXAMINE");
          return "Under certain light, faint glyphs seem to shift.";
        },
        align:(g)=>{
          if(!g.flags.light) return "In this dimness, the engravings refuse to resolve.";
          g.items.puzzleBox.state.hint=true; g.unlockVerb("ALIGN");
          g.clue("Hint: grooves favor leaf → river → wind.");
          g.tryWin();
          return "In candlelight, channels align—an order suggests itself.";
        }
      }
    },
    candlestick:{
      name:"brass candlestick", nouns:["candle","candlestick","brass candlestick"],
      desc:"A well-weighted candlestick. Its wick awaits a spark.",
      take:false,
      scripts:{
        examine:(g)=>"The brass would carry a warm glow.",
        light:(g)=>{
          if(!g.has("matches")) return "🔥 You need something to light it with.";
          if(g.flags.light) return "🕯️ The candle already burns with a steady glow.";
          g.flags.light=true; g.unlockVerb("LIGHT"); g.note("✨ Warm light spills outward.");
          
          // Play lighting sound effect
          try {
            const audio = document.getElementById('lightSound');
            if(audio) { audio.currentTime = 0; audio.volume = 0.3; audio.play().catch(()=>{}); }
          } catch(e) {}
          
          return "🕯️ You touch flame to wick; the room leans into relief.";
        }
      }
    },
    matches:{
      name:"box of matches", nouns:["matches","match"],
      desc:"A small box of matches. Smells of resin.",
      take:true,
      scripts:{
        take:(g)=>{ g.unlockVerb("LIGHT"); return "You pocket the matches."; },
        light:(g)=>{ g.flags.light=true; return "A small flame blooms and gutters."; }
      }
    },
    bench:{
      name:"log bench", nouns:["bench","log bench"],
      desc:"Smoothed by time, facing the sun and river.",
      take:false,
      scripts:{
        sit:(g)=>{ g.advance(30); return "🪑 You sit. The world settles; the river keeps time."; },
        examine:(g)=>"🌳 A simple wooden bench, weathered smooth by countless seasons. It faces east toward the flowing water."
      }
    }
  },
  
  // Victory condition
  victory: { 
    clues:["Glyph:Leaf","Glyph:River","Glyph:Wind","Hint: grooves favor leaf → river → wind."],
    message:"The engravings slide; the box unfurls—inside, a hush becomes a door." 
  },
  
  // Custom game logic for this adventure
  customLook: function(game) {
    // ambient clues by area/time
    if(game.room==='forest'){ 
      game.clue("Glyph:Leaf"); 
      if(game.phase()!=='morning') game.clue("Glyph:Wind"); 
    }
    if(game.room==='river'){ 
      game.clue("Glyph:River"); 
    }
  },
  
  // Welcome message for this adventure
  welcomeMessage: function() {
    return [
      "🌟 Welcome to The Whispering Forest! 🌟",
      "🌅 Awakening. A sunlit cabin. Carved wood. Elder draperies.",
      "💡 Try commands like: LOOK · MOVE EAST · EXAMINE BOX · TAKE MATCHES · LIGHT CANDLE",
      "💡 Use arrow keys ↑↓ to recall previous commands, or click verb/noun buttons!",
      "💡 Type HELP anytime for detailed instructions. Good luck! ✨"
    ];
  }
};

// Export for use in the main engine
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ABYSS_ADVENTURE;
} else if (typeof window !== 'undefined') {
  window.ABYSS_ADVENTURE = ABYSS_ADVENTURE;
}