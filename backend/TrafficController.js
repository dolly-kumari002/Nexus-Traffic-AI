class TrafficController {
  constructor(io) {
    this.io = io;
    // Four directions
    this.lanes = {
      north: { vehicleCount: 0, currentLight: 'red', emergency: false },
      south: { vehicleCount: 0, currentLight: 'red', emergency: false },
      east: { vehicleCount: 0, currentLight: 'red', emergency: false },
      west: { vehicleCount: 0, currentLight: 'red', emergency: false }
    };
    
    this.activeLane = 'north'; 
    this.lanes[this.activeLane].currentLight = 'green';
    this.cycleTimer = null;
    
    // Timings in ms
    this.maxGreenTime = 20000; 
    this.minGreenTime = 5000;  
    this.yellowTime = 3000;    
    
    this.startCycle();
  }

  updateLane(lane, count, emergency) {
    if (this.lanes[lane]) {
      this.lanes[lane].vehicleCount = count;
      
      if (emergency && !this.lanes[lane].emergency) {
        this.lanes[lane].emergency = true;
        this.triggerEmergencyCorridor(lane);
      } else if (!emergency && this.lanes[lane].emergency) {
        this.lanes[lane].emergency = false;
      }

      this.broadcastState();
    }
  }

  triggerEmergencyCorridor(lane) {
    console.log(`🚨 EMERGENCY DETECTED at ${lane} lane! Triggering Green Corridor.`);
    this.io.emit('alert', { 
      type: 'emergency', 
      title: '🚨 Emergency Override',
      message: `Emergency vehicle detected at ${lane} lane. Creating green corridor.`,
      timestamp: new Date().toISOString()
    });
    
    if (this.cycleTimer) clearTimeout(this.cycleTimer);
    
    // Switch other lights to red, target lane to green
    this.setAllRedExcept(lane);
    
    // Hold green for an extended period for the emergency vehicle to pass
    this.cycleTimer = setTimeout(() => {
        this.lanes[lane].emergency = false;
        this.io.emit('alert', { 
          type: 'info', 
          title: '✅ Normalizing',
          message: `Emergency corridor closed for ${lane} lane. Resuming normal flow.`,
          timestamp: new Date().toISOString()
        });
        this.startCycle();
    }, 20000); // 20s override
  }

  setAllRedExcept(greenLane) {
    for (let l in this.lanes) {
      if (l === greenLane) {
        this.lanes[l].currentLight = 'green';
        this.activeLane = greenLane;
      } else {
        this.lanes[l].currentLight = 'red';
      }
    }
    this.broadcastState();
  }

  startCycle() {
    if (this.cycleTimer) clearTimeout(this.cycleTimer);
    this.runLightCycle();
  }

  async runLightCycle() {
    if (Object.values(this.lanes).some(l => l.emergency)) return;
    
    const currentLane = this.activeLane;
    const nextLane = this.getNextLane(currentLane);

    // AI-driven Smart Duration Calculation
    const count = this.lanes[nextLane].vehicleCount;
    let dynamicGreenTime = Math.max(this.minGreenTime, Math.min(count * 2000, this.maxGreenTime));
    
    // Provide a small baseline if there are cars but not many
    if (count === 0) dynamicGreenTime = this.minGreenTime;

    // Transition
    this.lanes[currentLane].currentLight = 'yellow';
    this.broadcastState();

    await this.delay(this.yellowTime);

    this.lanes[currentLane].currentLight = 'red';
    this.lanes[nextLane].currentLight = 'green';
    this.activeLane = nextLane;
    this.broadcastState();

    this.cycleTimer = setTimeout(() => {
      this.runLightCycle();
    }, dynamicGreenTime);
  }

  getNextLane(current) {
    const sequence = ['north', 'east', 'south', 'west'];
    const idx = sequence.indexOf(current);
    return sequence[(idx + 1) % sequence.length];
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  getState() {
    return Object.keys(this.lanes).map(lane => ({
      lane,
      ...this.lanes[lane]
    }));
  }

  broadcastState() {
    this.io.emit('traffic_state', Object.keys(this.lanes).map(lane => ({
      lane,
      ...this.lanes[lane]
    })));
  }
}

module.exports = TrafficController;
