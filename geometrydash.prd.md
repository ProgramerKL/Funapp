# 📄 PRD: Mini Geometry Dash Game

## 1. 🎯 Product Overview

The **Mini Geometry Dash Game** is a simplified, fast-paced, tap-to-jump
platformer inspired by the popular Geometry Dash franchise. Players
control a cube that automatically moves forward and must navigate
through obstacles by timing jumps. The core value proposition: **"A
lightweight, addictive, skill-based arcade game that works in-browser or
as a mobile mini-app."**

------------------------------------------------------------------------

## 2. 🔑 Objectives & Success Metrics

-   **Objectives**
    -   Provide a fun, easy-to-learn but hard-to-master casual game.
    -   Offer replayability through randomized or looping levels.
    -   Create a minimal but polished visual/audio experience.
-   **Success Metrics**
    -   Avg. session length ≥ 2 minutes.
    -   Player retry rate ≥ 70% after game over.
    -   Smooth gameplay performance on desktop + mobile browsers.

------------------------------------------------------------------------

## 3. 🎮 Core Gameplay

-   **Controls**:
    -   **Desktop**: Press **Spacebar** to jump (primary), **Enter** for menu navigation
    -   **Mobile**: Tap anywhere on the screen to jump
    -   **Accessibility**: Full keyboard navigation support
-   **Mechanics**:
    -   Cube auto-runs forward.
    -   Single jump mechanic (tap once for a normal jump).
    -   Gravity pulls the cube down --- player must time jumps to clear
        obstacles.
    -   Hitting an obstacle = instant death → restart level.
-   **Level Structure**:
    -   **MVP**: Single infinite procedural level with increasing difficulty
    -   **Post-MVP**: Multiple fixed 30-45 second stages with unique themes
    -   **Difficulty Curve**: 
        -   Speed: 100% → 150% max (increases 5% every 10 seconds)
        -   Obstacle density: 1 per 3 seconds → 1 per 1.5 seconds max
        -   Difficulty caps at 2 minutes to maintain playability
-   **Scoring**:
    -   **Formula**: Distance traveled × 10 = points (e.g., 50 meters = 500 points)
    -   **Bonus**: +50 points per obstacle cleared successfully
    -   **Display**: High score shown on restart screen and during gameplay

------------------------------------------------------------------------

## 4. 🎨 Visual & Audio

-   **Visual Style**:
    -   Minimalist geometry shapes (squares, triangles, spikes).
    -   Bold neon colors on dark backgrounds.
    -   Smooth parallax background layers for depth.
-   **Audio**:
    -   Upbeat electronic background music.
    -   SFX: jump sound, death sound, score tally on game over.

------------------------------------------------------------------------

## 5. 📱 Platforms

-   **Primary**: Web (HTML5, playable in browser).
-   **Secondary**: Mobile (progressive web app or lightweight mobile
    port).

------------------------------------------------------------------------

## 6. ⚙️ Technical Requirements

-   **Engine/Framework**: Vanilla HTML5/CSS3/JavaScript (maintains architectural consistency)
    -   **Rationale**: Aligns with existing Whack-a-Mole implementation, zero dependencies, smaller bundle size, easier maintenance
-   **Performance**: 
    -   **Desktop**: 60 FPS on Chrome 90+, Firefox 88+, Safari 14+
    -   **Mobile**: 30 FPS minimum on devices with 2GB RAM+
    -   **Fallback**: Reduce particle effects if performance drops below thresholds
-   **Data Storage**: Local storage for high scores (no backend required for MVP)
    -   **Schema**: `localStorage.setItem("geometryDashScores", JSON.stringify([{score, date, attempts}]))`
    -   **Pattern**: Follows existing leaderboard array structure from Whack-a-Mole
    -   **Fallback**: Graceful handling of storage quota exceeded or disabled
-   **Error Handling**: 
    -   Crash recovery with auto-save progress
    -   Audio loading failure fallbacks
    -   Canvas rendering error detection
-   **Accessibility**:
    -   High contrast mode toggle
    -   Screen reader announcements for score changes
    -   Keyboard navigation for all menus
    -   Visual indicators for audio cues
-   **Performance Monitoring**:
    -   FPS counter (hidden by default, accessible via debug mode)
    -   Memory usage tracking with automatic garbage collection
    -   Frame time analysis for performance degradation detection
    -   Auto-reduce particle effects when FPS drops below 30
-   **Asset Management**:
    -   Progressive loading strategy (critical assets first)
    -   No external asset dependencies (procedural generation preferred)
    -   Maximum total size: 500KB (including HTML/CSS/JS)
    -   Lazy loading for non-critical visual effects

------------------------------------------------------------------------

## 7. 🧪 Edge Cases & Constraints

-   Screen resizing (mobile vs. desktop scaling).
-   Pause/unpause on tab switch.
### Desktop Constraints:
-   Screen resizing (mobile vs. desktop scaling)
-   Pause/unpause on tab switch  
-   Window focus/blur event handling

### Mobile-Specific Constraints:
-   Touch event conflicts with browser scrolling
-   Viewport management and orientation changes
-   Battery optimization (reduce animations on low battery)
-   Network connectivity handling for PWA features
-   iOS Safari viewport height issues with address bar

### Gameplay Constraints:
-   Prevent "jump spamming" (only one jump per ground contact)
-   Maximum difficulty caps to maintain playability
-   Frame rate degradation handling (auto-reduce effects)
-   Memory usage limits (< 50MB total)

------------------------------------------------------------------------

## 8. 🚀 Roadmap (MVP Scope)

### MVP Acceptance Criteria:

1.  **Core Gameplay Loop**: 
    -   ✅ Cube auto-runs forward at consistent speed
    -   ✅ Single jump mechanic with gravity physics
    -   ✅ Collision detection with instant death
    -   ✅ Automatic restart functionality

2.  **Obstacle System**: 
    -   ✅ Ground spikes (1x1 unit collision)
    -   ✅ Floating rectangular blocks (variable sizes)
    -   ✅ Procedural obstacle generation with difficulty scaling

3.  **User Interface**: 
    -   ✅ Start screen with play button
    -   ✅ Game over screen showing final score and restart option
    -   ✅ Live score display (distance traveled)
    -   ✅ High score persistence and display

4.  **Audio System**: 
    -   ✅ Background music (procedural Web Audio API synthesis)
    -   ✅ Jump sound effect (Web Audio API generated tone)
    -   ✅ Death/collision sound effect (Web Audio API generated)
    -   ✅ Audio toggle functionality (reuses existing pattern)

5.  **Visual Polish**: 
    -   ✅ Smooth cube movement animations (60fps target)
    -   ✅ Particle effects on death (minimum 5 particles)
    -   ✅ Parallax background scrolling
    -   ✅ Responsive design (320px+ screen width)

------------------------------------------------------------------------

## 9. 🌟 Future Enhancements (Post-MVP)

-   Multiple difficulty modes.
-   Unlockable skins for the cube.
-   Level editor (user-generated challenges).
-   Online leaderboard integration.
-   Beat-synced gameplay (jumping tied to music rhythm).
