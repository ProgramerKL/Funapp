// Cloud Animation Web Worker
class CloudAnimationController {
  constructor() {
    this.clouds = [];
    this.isRunning = false;
    this.animationId = null;
    this.lastTime = 0;
    this.isPowerupActive = false;
    this.screenWidth = 1200; // Default screen width, will be updated from main thread
    
    // Default cloud settings
    this.defaultSpeeds = {
      cloud1: 25000, // 25s in milliseconds
      cloud2: 30000, // 30s
      cloud3: 35000, // 35s  
      cloud4: 28000, // 28s
      cloud5: 40000, // 40s
      cloud6: 45000, // 45s
      cloud7: 50000, // 50s
      cloud8: 38000, // 38s
      cloud9: 42000, // 42s
      cloud10: 48000 // 48s
    };
    
    this.powerupSpeed = 5000; // 5s during powerup
  }
  
  initializeClouds(cloudConfigs) {
    this.clouds = cloudConfigs.map((config, index) => ({
      id: `cloud${index + 1}`,
      position: config.initialPosition || (-100 - (index * 50)), // Stagger initial positions
      speed: this.defaultSpeeds[`cloud${index + 1}`],
      width: config.width || 100,
      ...config
    }));
    
    // Send initial positions immediately
    const initialPositions = this.clouds.map(cloud => ({
      id: cloud.id,
      position: cloud.position,
      transform: `translateX(${cloud.position}px)`
    }));
    
    self.postMessage({
      type: 'cloudUpdate',
      clouds: initialPositions
    });
  }
  
  updateCloudPositions(deltaTime) {
    return this.clouds.map(cloud => {
      const currentSpeed = this.isPowerupActive ? this.powerupSpeed : cloud.speed;
      const totalDistance = this.screenWidth + cloud.width + 200;
      const pixelsPerMs = totalDistance / currentSpeed;
      
      cloud.position += pixelsPerMs * deltaTime;
      
      // Reset position when cloud moves off screen
      if (cloud.position > this.screenWidth + cloud.width) {
        cloud.position = -cloud.width;
      }
      
      return {
        id: cloud.id,
        position: cloud.position,
        transform: `translateX(${cloud.position}px)`
      };
    });
  }
  
  animate(currentTime) {
    if (!this.isRunning) return;
    
    const deltaTime = currentTime - this.lastTime;
    this.lastTime = currentTime;
    
    if (deltaTime > 0) {
      const cloudUpdates = this.updateCloudPositions(deltaTime);
      
      // Send updates to main thread
      self.postMessage({
        type: 'cloudUpdate',
        clouds: cloudUpdates
      });
    }
    
    // Continue animation loop - reduced to 30fps for better performance
    this.animationId = setTimeout(() => {
      this.animate(performance.now());
    }, 33); // ~30fps
  }
  
  start() {
    if (this.isRunning) return;
    
    this.isRunning = true;
    this.lastTime = performance.now();
    this.animate(this.lastTime);
    
    self.postMessage({
      type: 'status',
      message: 'Cloud animations started'
    });
  }
  
  stop() {
    this.isRunning = false;
    if (this.animationId) {
      clearTimeout(this.animationId);
      this.animationId = null;
    }
    
    self.postMessage({
      type: 'status', 
      message: 'Cloud animations stopped'
    });
  }
  
  setPowerupMode(active) {
    this.isPowerupActive = active;
    
    self.postMessage({
      type: 'status',
      message: `Powerup mode: ${active ? 'activated' : 'deactivated'}`
    });
  }
}

// Initialize controller
const cloudController = new CloudAnimationController();

// Handle messages from main thread
self.onmessage = function(e) {
  const { type, data } = e.data;
  
  switch (type) {
    case 'init':
      cloudController.initializeClouds(data.clouds);
      break;
      
    case 'start':
      cloudController.start();
      break;
      
    case 'stop':
      cloudController.stop();
      break;
      
    case 'setPowerup':
      cloudController.setPowerupMode(data.active);
      break;
      
    case 'updateScreenSize':
      cloudController.screenWidth = data.width;
      break;
      
    default:
      self.postMessage({
        type: 'error',
        message: `Unknown message type: ${type}`
      });
  }
};

// Send ready signal to main thread
self.postMessage({
  type: 'ready',
  message: 'Cloud worker initialized and ready'
});