# PRD: Tower Defense Game

## 1. Overview
The Tower Defense Game is a single-player, wave-based strategy game where players place defensive towers to stop enemies from reaching the end of a path. The game focuses on strategic planning, resource management, and progressive difficulty scaling.

---

## 2. Objectives
- Provide an engaging and replayable tower defense experience.
- Allow players to experiment with different strategies by offering diverse tower types and upgrade paths.
- Ensure progressive challenge through enemy variety and scaling difficulty.

---

## 3. Target Audience
- Casual gamers looking for quick but strategic gameplay.
- Fans of RTS (real-time strategy) and defense-based games.
- Platforms: Desktop (Web/PC), expandable to Mobile.

---

## 4. User Personas & Stories

### Primary Personas

**1. Casual Strategy Gamer (Alex)**
- Age: 25-40
- Experience: Plays mobile games during commute/breaks
- Goals: Quick, engaging entertainment that doesn't require long commitment
- Pain Points: Complex games with steep learning curves
- User Story: "As a casual gamer, I want to quickly understand the game mechanics so I can start having fun within the first 2 minutes of play."

**2. Strategy Enthusiast (Morgan)**
- Age: 20-35
- Experience: Loves RTS games, optimization, and deep strategy
- Goals: Master complex systems, achieve perfect scores, compete on leaderboards
- Pain Points: Games that lack depth or replayability
- User Story: "As a strategy enthusiast, I want multiple viable strategies and upgrade paths so I can experiment and optimize my approach."

**3. Nostalgic Gamer (Jamie)**
- Age: 30-45
- Experience: Played classic tower defense games, seeks familiar but improved experiences
- Goals: Relive childhood gaming memories with modern polish
- Pain Points: Games that are too different from classics or lack charm
- User Story: "As a nostalgic gamer, I want familiar tower defense mechanics with modern visual polish and quality-of-life improvements."

### Key User Stories
- "As a new player, I want a tutorial that teaches me the basics without overwhelming me."
- "As a returning player, I want to quickly resume where I left off."
- "As a completionist, I want clear progression goals and achievements to unlock."
- "As a mobile user, I want touch controls that feel natural and responsive."

---

## 5. Competitive Analysis

### Direct Competitors
**1. Kingdom Rush Series**
- Strengths: Excellent art style, balanced difficulty, hero units
- Weaknesses: Premium pricing, limited free content
- Differentiation: We'll offer more tower variety and free-to-play accessibility

**2. Bloons TD Series**
- Strengths: Unique theme, extensive tower upgrades, active community
- Weaknesses: Can become repetitive, steep difficulty spikes
- Differentiation: We'll focus on smoother difficulty progression and varied enemy types

**3. Element4l Tower Defense**
- Strengths: Elemental combination mechanics, strategic depth
- Weaknesses: Complex for casual players, niche appeal
- Differentiation: We'll balance complexity with accessibility

### Market Positioning
- **Value Proposition**: "Strategic depth meets accessible gameplay - the tower defense game that grows with you"
- **Unique Selling Points**: 
  - 10 distinct tower types with meaningful upgrade choices
  - Smooth difficulty scaling for all skill levels
  - Both campaign and endless modes for different play styles

---

## 6. Monetization Strategy

### Revenue Model: Freemium
**Core Game**: Free with full campaign (31 waves)
**Premium Content**:
- Cosmetic tower skins ($1.99-$4.99)
- Additional maps/campaigns ($2.99-$7.99)
- Quality of life features (fast forward, auto-upgrade) ($1.99)

### Optional Monetization
**Non-Pay-to-Win Approach**:
- All gameplay-affecting content earned through play
- Cosmetics and convenience features only for purchase
- No time-gating or energy systems

### Target Revenue
- **Year 1**: $50K through cosmetics and map packs
- **Conversion Rate Target**: 5-8% of players make at least one purchase
- **Average Revenue Per User (ARPU)**: $2-4

---

## 7. Core Gameplay
### Player Actions
- Place towers along predefined paths or grids.
- Upgrade or sell existing towers.
- Manage in-game currency earned from defeating enemies.
- Trigger special abilities (e.g., airstrike, freeze).

### Enemy Waves
- Enemies spawn in waves with increasing difficulty.
- Types:
  - **Basic** (slow, weak)
  - **Fast** (quick, low HP)
  - **Tank** (slow, high HP)
  - **Flying** (requires special anti-air towers)
  - **Stealth** (can only be targeted by special towers)
  - **Swarm** (many weak enemies at once)
  - **Bosses** (unique abilities, very high HP)

---

## 5. Towers
### Types
1. **Arrow Tower** – Fast attack, low damage.  
   - Upgrades: Rapid Fire / Sniper  

2. **Cannon Tower** – Splash damage, slower attack.  
   - Upgrades: Mortar / Cluster Bombs  

3. **Magic Tower** – High damage, ignores armor.  
   - Upgrades: Fire Mage / Ice Mage  

4. **Air Tower** – Specialized in anti-air attacks.  
   - Upgrades: Flak Tower / Homing Missiles  

5. **Support Tower** – Buffs nearby towers (damage, speed).  
   - Upgrades: Attack Aura / Range Aura  

6. **Tesla Tower** – Shoots chaining lightning at multiple enemies.  
   - Upgrades: Chain Lightning / Overload  

7. **Poison Tower** – Applies damage-over-time effect to enemies.  
   - Upgrades: Toxic Cloud / Venom Spray  

8. **Frost Tower** – Slows down enemies within range.  
   - Upgrades: Freeze Blast / Ice Storm  

9. **Catapult Tower** – Long-range area attack with high splash damage.  
   - Upgrades: Boulder Strike / Fireball Payload  

10. **Laser Tower** (late-game) – Continuous beam with very high DPS.  
    - Upgrades: Piercing Beam / Wide Beam  

---

## 6. Resources & Economy
- **Gold**: Earned by defeating enemies, used for building/upgrading towers.
- **Lives**: Player loses one life for each enemy that reaches the base.
- **Special Currency (optional)**: Earned through achievements for unlocking permanent upgrades.

---

## 7. Progression
### Campaign Waves (Example)
- **Wave 1–3**: Basic enemies only.  
- **Wave 4–6**: Mix of Basic + Fast.  
- **Wave 7–10**: Introduce Tanks.  
- **Wave 11–15**: Flying units appear.  
- **Wave 16–20**: Stealth + Swarm enemies.  
- **Wave 21**: Mini-Boss.  
- **Wave 22–30**: Mixed waves with high difficulty.  
- **Wave 31**: Final Boss battle.  

### Endless Mode
- After campaign, endless mode ramps enemy HP and speed infinitely.  
- Enemies scale exponentially every 5 waves.  
- Bosses appear every 10 waves.  

---

## 8. User Interface
- Top bar: Lives, gold, current wave.
- Bottom bar: Tower selection & upgrades.
- Side panel: Tower stats when selected.
- Pause menu: Restart, settings, quit.

---

## 9. Visual & Audio Style
- **Theme**: Fantasy-medieval (castles, forests, magic).
- **Art Style**: 2D cartoony but polished.
- **Sound Effects**: Tower attacks, enemy deaths, wave alerts.
- **Music**: Orchestral fantasy background loops.

---

## 10. Technical Requirements

### Development Platform
- **Engine**: Unity 2022.3 LTS (Long Term Support)
- **Language**: C# with Unity scripting API
- **Version Control**: Git with Unity-specific .gitignore
- **IDE**: Visual Studio 2022 or Rider

### Performance Specifications
- **Target Frame Rate**: 60 FPS on mid-range hardware (GTX 1060 / RX 580)
- **Minimum Frame Rate**: 30 FPS on low-end hardware (GTX 750 Ti / RX 560)
- **Unit Capacity**: Handle 200+ simultaneous units without frame drops
- **Memory Usage**: Maximum 2GB RAM usage
- **Loading Times**: Level load under 3 seconds, game start under 10 seconds

### Platform Support
**Primary Platforms**:
- **PC (Windows 10/11)**: DirectX 11/12 support
- **Web (WebGL)**: Modern browsers (Chrome 90+, Firefox 88+, Safari 14+)

**Future Platforms**:
- **Mobile (iOS/Android)**: iOS 12+ / Android API 21+
- **Mac/Linux**: Unity cross-platform support

### System Requirements
**Minimum**:
- CPU: Intel Core i3-6100 / AMD FX-6300
- GPU: DirectX 11 compatible
- RAM: 4GB
- Storage: 1GB available space

**Recommended**:
- CPU: Intel Core i5-8400 / AMD Ryzen 5 2600
- GPU: GTX 1060 / RX 580
- RAM: 8GB
- Storage: 2GB available space (SSD recommended)

### Data & Save System
- **Auto-save**: Progress saved after each wave completion
- **Cloud Save**: Optional Unity Cloud Build integration
- **Local Storage**: PlayerPrefs for settings, JSON for save data
- **Data Format**: Serialized game state with version compatibility

### Accessibility Features
- **Visual**: 
  - Colorblind-friendly color schemes
  - Adjustable UI scaling (100%-150%)
  - High contrast mode option
- **Audio**: 
  - Subtitle support for all audio cues
  - Audio volume sliders (Master, SFX, Music)
- **Input**: 
  - Keyboard-only navigation support
  - Customizable key bindings
  - Mouse sensitivity adjustment

### Quality Assurance
- **Automated Testing**: Unit tests for core game logic
- **Performance Testing**: Automated frame rate monitoring
- **Platform Testing**: Continuous integration for WebGL builds
- **Compatibility Testing**: Target device testing matrix

---

## 11. Success Metrics & KPIs

### Player Engagement Metrics
- **Average Session Length**: 15-25 minutes (target: 20 minutes)
- **Sessions per User per Week**: 3-5 sessions (target: 4 sessions)
- **Campaign Completion Rate**: 60%+ of players complete the main campaign
- **Endless Mode Engagement**: 30%+ of campaign completers try endless mode

### Retention Metrics
- **Day 1 Retention**: 70%+ of players return the next day
- **Day 7 Retention**: 40%+ of players active after one week
- **Day 30 Retention**: 20%+ of players active after one month
- **Churn Rate**: <10% weekly churn rate after week 2

### Performance Metrics
- **Load Time**: 95% of level loads complete under 3 seconds
- **Crash Rate**: <1% of sessions experience crashes
- **Frame Rate**: 90%+ of gameplay time maintains target FPS
- **User Ratings**: Average 4.0+ stars on distribution platforms

### Business Metrics
- **Conversion Rate**: 5-8% of players make at least one purchase
- **Average Revenue Per User (ARPU)**: $2-4
- **Cost Per Acquisition (CPA)**: <$1.50 per organic user
- **Lifetime Value (LTV)**: $5-10 per paying user

### Quality Metrics
- **Bug Reports**: <5 critical bugs per 1000 players
- **Player Support Tickets**: <2% of players require support
- **Feature Request Volume**: Track most requested features for future updates
- **Community Sentiment**: Monitor social media and review sentiment (target: 80% positive)

---

## 12. Risk Assessment & Mitigation

### Technical Risks
**High Priority:**
- **Performance Issues with Large Unit Counts**
  - Risk: Frame rate drops when 200+ units are active
  - Mitigation: Object pooling, LOD system, performance profiling throughout development
  - Contingency: Reduce maximum unit count to 150 if needed

- **WebGL Compatibility Issues**
  - Risk: Features may not work consistently across browsers
  - Mitigation: Early WebGL prototyping, browser testing matrix
  - Contingency: Limit WebGL feature set, focus on desktop build

**Medium Priority:**
- **Unity Version Compatibility**
  - Risk: Engine updates may break existing features
  - Mitigation: Use LTS version, thorough testing before updates
  - Contingency: Maintain previous Unity version as backup

### Business Risks
**High Priority:**
- **Market Saturation**
  - Risk: Tower defense market is highly competitive
  - Mitigation: Strong differentiation through unique features and polish
  - Contingency: Pivot to niche audience or add unique mechanics

- **Free-to-Play Monetization Failure**
  - Risk: Low conversion rates, insufficient revenue
  - Mitigation: Extensive playtesting of monetization features
  - Contingency: Consider premium pricing model or ads

**Medium Priority:**
- **Scope Creep**
  - Risk: Feature additions delay launch and increase costs
  - Mitigation: Strict MVP definition, change control process
  - Contingency: Cut non-essential features, phase future content

### Development Risks
**High Priority:**
- **Single Developer Dependency**
  - Risk: Key team member unavailability could halt development
  - Mitigation: Code documentation, knowledge sharing, backup planning
  - Contingency: Cross-training, external contractor relationships

- **Timeline Overrun**
  - Risk: Development takes longer than planned
  - Mitigation: Realistic estimations, regular milestone reviews
  - Contingency: Reduce scope, extend timeline, or seek additional resources

### User Experience Risks
**Medium Priority:**
- **Difficulty Balancing Issues**
  - Risk: Game too easy or too difficult for target audience
  - Mitigation: Extensive playtesting with target demographics
  - Contingency: Post-launch balancing patches, difficulty options

- **UI/UX Complexity**
  - Risk: Interface too complex for casual players
  - Mitigation: User testing, iterative design, accessibility review
  - Contingency: Simplified UI mode, enhanced tutorial

---

## 13. Future Features (Stretch Goals)
- Multiplayer Co-op mode (two players defend together).
- Player-vs-Player mode (spawn enemies at opponent’s map).
- Map editor for community-driven content.
- Skins for towers and enemies (cosmetics).

---
