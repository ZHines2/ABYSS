// Generic Interactive Fiction Game Engine
// Supports multiple adventures through the Adventure Registry

class InteractiveFictionEngine {
  constructor() {
    this.currentAdventure = null;
    this.gameState = {
      time: 0,
      room: null,
      inv: [],
      clues: new Set(),
      flags: {},
      discoveredVerbs: new Set(["LOOK","MOVE","HELP","INVENTORY"]),
      commandHistory: [],
      historyIndex: -1
    };
    
    // Core verb definitions
    this.coreVerbs = [
      {name:"LOOK", core:true, fn:(args)=>this.look()},
      {name:"MOVE", core:true, fn:(args)=>this.move(args[0])},
      {name:"HELP", core:true, fn:(args)=>this.help()},
      {name:"INVENTORY", core:true, fn:(args)=>this.printInv()},
      {name:"EXAMINE", unlock:true, fn:(args)=>this.onItem(args, "examine")},
      {name:"TAKE", unlock:true, fn:(args)=>this.take(args)},
      {name:"DROP", unlock:true, fn:(args)=>this.drop(args)},
      {name:"LIGHT", unlock:true, fn:(args)=>this.onItem(args, "light")},
      {name:"SIT", unlock:true, fn:(args)=>this.onItem(args, "sit")},
      {name:"ALIGN", unlock:true, fn:(args)=>this.onItem(args, "align")},
      {name:"SAVE", unlock:true, fn:(args)=>this.saveGame()},
      {name:"LOAD", unlock:true, fn:(args)=>this.loadGame()}
    ];
    
    this.synonyms = {
      n:"north", s:"south", e:"east", w:"west",
      go:"move", walk:"move", run:"move",
      inspect:"examine", read:"examine",
      grab:"take", pick:"take"
    };
  }
  
  // Load and start an adventure
  async startAdventure(adventureId) {
    try {
      this.currentAdventure = await ADVENTURE_REGISTRY.loadAdventure(adventureId);
      ADVENTURE_REGISTRY.validateAdventure(this.currentAdventure);
      
      // Initialize game state from adventure
      this.resetGameState();
      this.initializeUI();
      this.showWelcomeMessage();
      this.look();
      this.renderUI();
      
      return true;
    } catch (error) {
      console.error('Failed to start adventure:', error);
      this.say(`❌ Failed to load adventure: ${error.message}`);
      return false;
    }
  }
  
  // Reset game state to adventure defaults
  resetGameState() {
    if (!this.currentAdventure) return;
    
    this.gameState = {
      time: this.currentAdventure.startingTime || 6*60,
      room: this.currentAdventure.startingRoom,
      inv: [...(this.currentAdventure.startingInventory || [])],
      clues: new Set(),
      flags: {...(this.currentAdventure.startingFlags || {})},
      discoveredVerbs: new Set(["LOOK","MOVE","HELP","INVENTORY"]),
      commandHistory: [],
      historyIndex: -1
    };
    
    // Clone items but preserve scripts (functions)
    this.items = {};
    for(const [id, item] of Object.entries(this.currentAdventure.items)) {
      this.items[id] = {
        ...item,
        state: item.state ? {...item.state} : undefined,
        scripts: item.scripts // Keep original scripts with functions
      };
    }
  }
  
  // Initialize UI elements
  initializeUI() {
    this.out = document.getElementById('term');
    this.cmd = document.getElementById('cmd');
    if (this.cmd) {
      this.cmd.focus();
      this.cmd.addEventListener('keydown', e => { 
        if(e.key==='Enter'){ this.exec(this.cmd.value); }
        else if(e.key==='ArrowUp') { this.historyUp(e); }
        else if(e.key==='ArrowDown') { this.historyDown(e); }
      });
    }
    
    const doBtn = document.getElementById('doBtn');
    if (doBtn) {
      doBtn.onclick = () => this.exec(this.cmd.value);
    }
    
    // Update page title
    if (this.currentAdventure && this.currentAdventure.title) {
      document.title = this.currentAdventure.title;
      const h1 = document.querySelector('h1');
      if (h1) h1.textContent = this.currentAdventure.title;
    }
  }
  
  // Show welcome message for current adventure
  showWelcomeMessage() {
    if (!this.currentAdventure) return;
    
    if (this.currentAdventure.welcomeMessage) {
      const messages = this.currentAdventure.welcomeMessage();
      messages.forEach(msg => this.say(msg));
    }
  }
  
  // Game state management
  advance(min=5) { this.gameState.time += min; this.renderUI(); }
  phase() { 
    const m = (this.gameState.time%(24*60)+24*60)%(24*60); 
    if(m<11*60) return 'morning'; 
    if(m<17*60) return 'day'; 
    return 'evening'; 
  }
  clock() { 
    let m = (this.gameState.time%(24*60)+24*60)%(24*60); 
    const h = Math.floor(m/60), mm = m%60; 
    const hh = ((h%12)||12).toString().padStart(2,'0'); 
    return `${hh}:${mm.toString().padStart(2,'0')} ${h<12?'AM':'PM'}`; 
  }
  
  // Adventure-specific accessors
  get time() { return this.gameState.time; }
  set time(val) { this.gameState.time = val; }
  get room() { return this.gameState.room; }
  set room(val) { this.gameState.room = val; }
  get inv() { return this.gameState.inv; }
  set inv(val) { this.gameState.inv = val; }
  get clues() { return this.gameState.clues; }
  set clues(val) { this.gameState.clues = val; }
  get flags() { return this.gameState.flags; }
  set flags(val) { this.gameState.flags = val; }
  get discoveredVerbs() { return this.gameState.discoveredVerbs; }
  
  roomObj() { return this.currentAdventure?.rooms[this.gameState.room]; }
  where() { const r = this.roomObj(); return r ? r.name : 'Unknown'; }
  has(id) { return this.gameState.inv.includes(id); }
  
  // Core game actions
  look() {
    if (!this.currentAdventure) return;
    
    const r = this.roomObj(); 
    if (!r) return;
    
    const ph = this.phase();
    const desc = r.desc[ph] || r.desc.day; 
    this.say(desc);
    
    // Call adventure-specific look logic if available
    if (this.currentAdventure.customLook) {
      this.currentAdventure.customLook(this);
    }
    
    this.advance(2);
    this.unlockNounBasics();
  }
  
  move(dir) {
    dir = (dir||'').toLowerCase();
    if(['n','s','e','w'].includes(dir)) dir={n:'north',s:'south',e:'east',w:'west'}[dir];
    const r = this.roomObj();
    if (!r) return;
    
    const next = r.exits[dir];
    if(!next){ this.say(`🚫 You can't go ${dir} from here.`); this.advance(1); return; }
    this.gameState.room = next; 
    this.say(`🚶 You go ${dir}.`); 
    this.look(); 
    this.renderUI();
  }
  
  onItem(args, action) {
    const noun = this.nounMatches(args[0]);
    if(!noun){ this.say(`🔍 You don't see "${args[0]}" here.`); this.advance(1); return; }
    const it = this.items[noun];
    const sc = it.scripts?.[action];
    if(sc){ const res = sc(this); if(res) this.say(res); this.advance(3); this.renderUI(); return; }
    this.say(`🤷 Nothing interesting happens with the ${it.name}.`); this.advance(1);
  }
  
  take(args) {
    const id = this.nounMatches(args[0]); 
    if(!id){ this.say("🤔 Take what?"); return; }
    const it = this.items[id]; 
    if(!this.currentAdventure.items[id].take){ this.say("🚫 It won't come with you."); return; }
    if(this.gameState.inv.includes(id)){ this.say("✅ You already have it."); return; }
    
    // remove from room
    const items = this.roomObj().items; 
    const ix = items.indexOf(id); 
    if(ix>=0) items.splice(ix,1);
    this.gameState.inv.push(id); 
    this.unlockVerb("TAKE"); 
    this.unlockVerb("DROP"); 
    this.say(`✋ Taken: ${it.name}.`); 
    
    // Play take sound effect
    try {
      const audio = document.getElementById('takeSound');
      if(audio) { audio.currentTime = 0; audio.volume = 0.2; audio.play().catch(()=>{}); }
    } catch(e) {}
    
    this.advance(1); 
    this.renderUI();
  }
  
  drop(args) {
    const id = this.nounMatches(args[0]); 
    if(!id || !this.gameState.inv.includes(id)){ this.say("You aren't holding that."); return; }
    this.gameState.inv = this.gameState.inv.filter(x=>x!==id); 
    this.roomObj().items.push(id); 
    this.say(`Dropped: ${this.items[id].name}.`); 
    this.advance(1); 
    this.renderUI();
  }
  
  // Helper methods
  unlockVerb(v) { this.gameState.discoveredVerbs.add(v.toUpperCase()); this.renderUI(); }
  clue(text) { 
    if(!this.gameState.clues.has(text)){ 
      this.gameState.clues.add(text); 
      this.note(`Clue noted: ${text}`); 
      this.renderUI(); 
    } 
  }
  
  nounMatches(token) { 
    token = token?.toLowerCase(); 
    if(!token) return null;
    
    // check room items first (prefer room context over inventory)
    const r = this.roomObj();
    if (r) {
      for(const id of r.items){ 
        const it = this.items[id]; 
        if(it && it.nouns.some(n=>n===token)) return id; 
      }
    }
    
    // then check inventory items
    for(const id of this.gameState.inv){ 
      const it = this.items[id]; 
      if(it.nouns.some(n=>n===token)) return id; 
    }
    return null;
  }
  
  tryWin() {
    if (!this.currentAdventure.victory) return;
    
    const needs = this.currentAdventure.victory.clues; 
    const ok = needs.every(c => this.gameState.clues.has(c));
    if(ok){ 
      this.note("🎉 " + this.currentAdventure.victory.message + " 🎉"); 
      this.note("Congratulations! You have solved the mystery!");
      
      // Play a victory sound effect if available
      try { 
        const audio = new Audio('data:audio/wav;base64,UklGRvIGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YVgFAAA=');
        audio.volume = 0.3;
        audio.play();
      } catch(e) {}
    }
  }
  
  help() { 
    this.say("🎮 Interactive Fiction Help 🎮"); 
    this.say("Available commands:"); 
    this.say("• LOOK - Examine your surroundings"); 
    this.say("• MOVE <direction> - Go north/south/east/west"); 
    this.say("• EXAMINE <object> - Look at something closely"); 
    this.say("• TAKE <object> - Pick up an item"); 
    this.say("• LIGHT <object> - Use matches to light something"); 
    this.say("• ALIGN <object> - Arrange or adjust something"); 
    this.say("• INVENTORY - Check what you're carrying"); 
    this.say("• SIT <object> - Rest on something"); 
    this.say("• SAVE - Save your progress"); 
    this.say("• LOAD - Load your saved game"); 
    this.say(""); 
    this.say("💡 Tips:"); 
    this.say("• Click on verb/noun buttons for quick input"); 
    this.say("• Use ↑↓ arrow keys to recall previous commands"); 
    this.say("• Explore all locations to find clues"); 
    this.say("• Pay attention to time - some things change!"); 
    // Check for puzzle box by item presence instead of title
    if (this.currentAdventure.items && this.currentAdventure.items.puzzleBox) {
      this.say("• The puzzle box holds the key to victory..."); 
    }
  }
  
  printInv() { 
    if(this.gameState.inv.length===0){ 
      this.say("🎒 You carry nothing."); 
    } else { 
      this.say("🎒 You carry: "+this.gameState.inv.map(id=>this.items[id].name).join(', ')); 
    } 
  }
  
  // Save/Load functionality
  saveGame() {
    try {
      const saveData = {
        adventureId: ADVENTURE_REGISTRY.adventures.find(adv => adv.title === this.currentAdventure.title)?.id || 'abyss',
        gameState: {
          time: this.gameState.time,
          room: this.gameState.room,
          inv: this.gameState.inv,
          clues: Array.from(this.gameState.clues),
          flags: this.gameState.flags,
          discoveredVerbs: Array.from(this.gameState.discoveredVerbs)
        }
      };
      localStorage.setItem('if-engine-save', JSON.stringify(saveData));
      this.note("💾 Game saved successfully!");
    } catch(e) {
      this.say("❌ Failed to save game: " + e.message);
    }
  }
  
  loadGame() {
    try {
      const saveData = localStorage.getItem('if-engine-save');
      if(!saveData) {
        this.say("❌ No saved game found.");
        return;
      }
      const data = JSON.parse(saveData);
      
      // Check if we need to switch adventures
      if (data.adventureId && ADVENTURE_REGISTRY.getCurrentAdventure()?.title !== this.currentAdventure?.title) {
        this.say("🔄 Loading different adventure...");
        this.startAdventure(data.adventureId).then(() => {
          this.loadGameState(data.gameState);
        });
        return;
      }
      
      this.loadGameState(data.gameState);
    } catch(e) {
      this.say("❌ Failed to load game: " + e.message);
    }
  }
  
  loadGameState(gameState) {
    this.gameState.time = gameState.time;
    this.gameState.room = gameState.room;
    this.gameState.inv = gameState.inv;
    this.gameState.clues = new Set(gameState.clues);
    this.gameState.flags = gameState.flags;
    this.gameState.discoveredVerbs = new Set(gameState.discoveredVerbs);
    this.note("📁 Game loaded successfully!");
    this.look();
    this.renderUI();
  }
  
  // Command history
  historyUp(e) { 
    e.preventDefault(); 
    if(this.gameState.commandHistory.length > 0) { 
      this.gameState.historyIndex = Math.min(this.gameState.historyIndex + 1, this.gameState.commandHistory.length - 1); 
      this.cmd.value = this.gameState.commandHistory[this.gameState.commandHistory.length - 1 - this.gameState.historyIndex]; 
    } 
  }
  
  historyDown(e) { 
    e.preventDefault(); 
    if(this.gameState.historyIndex >= 0) { 
      this.gameState.historyIndex--; 
      this.cmd.value = this.gameState.historyIndex >= 0 ? this.gameState.commandHistory[this.gameState.commandHistory.length - 1 - this.gameState.historyIndex] : ''; 
    } 
  }
  
  // Command execution
  exec(raw) {
    const line = (raw||'').trim(); 
    if(!line) return;
    this.say(`\n> ${line}`);
    if (this.cmd) this.cmd.value = '';
    
    // Add to command history
    if(this.gameState.commandHistory.length === 0 || this.gameState.commandHistory[this.gameState.commandHistory.length-1] !== line) {
      this.gameState.commandHistory.push(line);
      if(this.gameState.commandHistory.length > 20) this.gameState.commandHistory.shift(); // Keep last 20 commands
    }
    this.gameState.historyIndex = -1;
    
    const tokens = line.split(/\s+/).map(t=>t.toLowerCase());
    // normalize synonyms
    let verb = tokens[0]; 
    verb = this.synonyms[verb]||verb;
    // MOVE special with direction default
    const args = tokens.slice(1);
    if(verb==='move' && args.length===0){ this.say("🧭 Move where? Try: north, south, east, or west"); return; }
    
    // find verb handler
    const v = this.coreVerbs.find(v=>v.name.toLowerCase()===verb);
    if(!v){ 
      // More helpful error messages
      const suggestions = this.coreVerbs.filter(verb => verb.name.toLowerCase().startsWith(tokens[0].charAt(0)));
      if(suggestions.length > 0) {
        this.say(`❓ Unknown command "${tokens[0]}". Did you mean: ${suggestions.map(s=>s.name).join(', ')}?`);
      } else {
        this.say(`❓ Unknown command "${tokens[0]}". Type HELP for available commands.`);
      }
      return; 
    }
    
    // unlock verb when used successfully once (for typed discovery style)
    this.gameState.discoveredVerbs.add(v.name);
    try{ v.fn(args); }catch(e){ this.say("💥 The world shivers—an error escapes."); console.error(e); }
    this.renderUI();
  }
  
  // UI Output
  say(msg) { 
    if (this.out) {
      this.out.innerHTML += `\n${msg}`; 
      this.out.scrollTop = this.out.scrollHeight; 
    }
  }
  
  note(msg) { 
    if (this.out) {
      this.out.innerHTML += `\n<span class="tag ok">${msg}</span>`; 
      this.out.scrollTop = this.out.scrollHeight; 
    }
  }
  
  // UI Management
  visibleNouns() {
    const r = this.roomObj();
    if (!r) return [];
    
    const roomNouns = (r.nouns||[]);
    const itemNouns = r.items.flatMap(id=>this.items[id]?.nouns||[]);
    const invNouns  = this.gameState.inv.flatMap(id=>this.items[id]?.nouns||[]);
    const dirNouns = Object.keys(r.exits); // directions available
    return [...new Set([...roomNouns, ...itemNouns, ...invNouns, ...dirNouns])];
  }
  
  unlockNounBasics() { /* placeholder in case we later gate nouns */ }
  
  renderUI() {
    // where
    const whereEl = document.getElementById('where');
    if (whereEl) {
      whereEl.innerHTML = `${this.where()}<br><span class="tag">Phase: ${this.phase()}</span>`;
    }
    
    // inv
    const invEl = document.getElementById('inv');
    if (invEl) {
      const inv = this.gameState.inv.map(id=>`<span class="tag">${this.items[id].name}</span>`).join(' ');
      invEl.innerHTML = inv||'<span class="mut">—</span>';
    }
    
    // clock
    const clockEl = document.getElementById('clock');
    if (clockEl) {
      clockEl.innerHTML = `<span class="tag">${this.clock()}</span>`;
    }
    
    // clues
    const cluesEl = document.getElementById('clues');
    if (cluesEl) {
      cluesEl.innerHTML = Array.from(this.gameState.clues).map(c=>`<div class="tag ok">${c}</div>`).join('')||'—';
    }
    
    // verb bar
    const verbBar = document.getElementById('verbBar');
    if (verbBar) {
      verbBar.innerHTML = '<span class="label">Verbs (discovered)</span>'+
        Array.from(this.gameState.discoveredVerbs).sort().map(v=>`<button class="chip" data-verb="${v}">${v}</button>`).join('');
    }
    
    // noun bar (context nouns)
    const nouns = this.visibleNouns();
    const nounBar = document.getElementById('nounBar');
    if (nounBar) {
      nounBar.innerHTML = '<span class="label">Nouns (you can currently reference)</span>'+
        nouns.map(n=>{
          const cls = ['north','south','east','west'].includes(n)?'chip dir':'chip';
          return `<button class="${cls}" data-noun="${n}">${n.toUpperCase()}</button>`; 
        }).join('');
    }
    
    // wire chips
    if (verbBar) {
      verbBar.querySelectorAll('button[data-verb]').forEach(b=>{
        b.onclick=()=>{ 
          if (this.cmd) {
            this.cmd.value = (b.dataset.verb+" "+this.cmd.value).trim(); 
            this.cmd.focus(); 
          }
        };
      });
    }
    
    if (nounBar) {
      nounBar.querySelectorAll('button[data-noun]').forEach(b=>{
        b.onclick=()=>{
          const n = b.dataset.noun;
          // if noun is a direction and MOVE is discovered, auto build MOVE command
          if(['north','south','east','west'].includes(n)){
            if(this.gameState.discoveredVerbs.has('MOVE')){ 
              if (this.cmd) this.cmd.value = `MOVE ${n}`; 
              this.exec(this.cmd ? this.cmd.value : `MOVE ${n}`); 
            } else { 
              if (this.cmd) this.cmd.value = `MOVE ${n}`; 
            }
          } else {
            // append to current input
            if (this.cmd) {
              const v = this.cmd.value.trim();
              this.cmd.value = (v? (v+" ") : "") + n;
              this.cmd.focus();
            }
          }
        };
      });
    }
  }
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = InteractiveFictionEngine;
} else if (typeof window !== 'undefined') {
  window.InteractiveFictionEngine = InteractiveFictionEngine;
}