# Product Requirements Document (PRD)

**Project:** VEX IQ Mix & Match Score Calculator  
**Version:** 1.0  
**Date:** 2025-09-01  
**Owner:** Team Robotics Calculator Division

---

## 1. Executive Summary

A web-based scoring calculator for VEX IQ Mix & Match competitions that enables teams, coaches, and referees to quickly compute and validate match scores. The tool provides real-time calculations, strategy exploration, and feasibility analysis to help teams optimize their competition performance.

---

## 2. Problem Statement

VEX IQ teams currently lack a quick, reliable digital tool to:
- Calculate complex scoring combinations during strategy sessions
- Validate referee scoring during competitions
- Explore theoretical maximum scores vs. realistic achievements
- Share scoring scenarios with team members and coaches

---

## 3. Objectives & Goals

### Primary Goals
- Enable real-time score calculation with instant visual feedback
- Differentiate between theoretical maximums and practically achievable scores
- Provide mobile-first design for use at competition venues

### Success Criteria
- 95% calculation accuracy compared to manual scoring
- Sub-100ms response time for score updates
- 80% user satisfaction rating from beta testers
- 500+ unique users within first competition season

---

## 4. Target Users

### Primary Users
- **VEX IQ Competitors** (ages 8-14): Need simple, visual interface
- **Coaches/Mentors**: Require detailed scoring breakdowns for teaching
- **Referees**: Need quick validation tool for scoring disputes

### Secondary Users
- **Event Organizers**: Score verification and display
- **Parents/Spectators**: Understanding scoring during matches

---

## 5. Feature Requirements

### Core Features (MVP)

| Feature | Description | Priority |
|---------|-------------|----------|
| Score Input Fields | Numeric inputs for all scoring elements | P0 |
| Live Calculation | Instant score updates as values change | P0 |
| Score Breakdown | Detailed point source explanation | P0 |
| Reset Function | Clear all inputs to start fresh | P0 |
| Mobile Responsive | Works on phones, tablets, desktop | P0 |

### Scoring Components
- **Connected Pins**: 1 point each
- **Connected Beams**: 10 points each
- **2-Color Stacks**: 5 point bonus
- **3-Color Stacks**: 15 point bonus
- **Stacks in Matching Goals/Connected to Beam**: 10 point bonus
- **Stacks on Standoff Goal**: 10 point bonus
- **Cleared Starting Pins**: 2 points each
- **Robots Touching 2+ Objects**: 2 points each

### Advanced Features (Phase 2)

| Feature | Description | Priority |
|---------|-------------|----------|
| Preset Scenarios | Quick-load common configurations | P1 |
| Save/Share URLs | Shareable links to specific scores | P1 |
| History Tracking | Store previous calculations | P2 |
| Comparison Mode | Compare multiple scoring scenarios | P2 |
| Export Function | PDF/CSV export of scores | P3 |

---

## 6. Technical Requirements

### Frontend
- **Framework**: HTML5, CSS3, JavaScript (vanilla or React)
- **Styling**: Responsive CSS Grid/Flexbox
- **Browser Support**: Chrome, Safari, Firefox, Edge (latest 2 versions)

### Performance
- Page load time: < 2 seconds
- Score calculation: < 100ms
- Mobile data usage: < 500KB initial load

### Accessibility
- WCAG 2.1 Level AA compliance
- Keyboard navigation support
- Screen reader compatibility
- High contrast mode option

---

## 7. User Interface Requirements

### Design Principles
- **Clarity**: Large, readable fonts and clear labels
- **Simplicity**: Minimal clicks to achieve goals
- **Feedback**: Visual confirmation of inputs and calculations
- **Error Prevention**: Input validation and constraints

### Layout Components
1. **Header**: Title, version, reset button
2. **Input Section**: Organized grid of scoring fields
3. **Score Display**: Prominent total with breakdown
4. **Action Buttons**: Calculate, Reset, Share, Save

---

## 8. Validation & Constraints

### Input Validation
- All inputs must be non-negative integers
- Physical limits enforced:
  - Max 35 pins available
  - Max 7 beams available
  - Max 12 possible stacks
  - Max 2 robots for contact points

### Error Handling
- Clear error messages for invalid inputs
- Automatic correction suggestions
- Prevent impossible combinations

---

## 9. Development Timeline

### Phase 1: MVP (Weeks 1-4)
- Week 1: UI design and mockups
- Week 2: Core calculation engine
- Week 3: Frontend implementation
- Week 4: Testing and bug fixes

### Phase 2: Enhanced Features (Weeks 5-8)
- Week 5-6: Preset scenarios and sharing
- Week 7: Performance optimization
- Week 8: Beta testing with teams

### Phase 3: Launch (Week 9)
- Final testing and deployment
- Documentation and training materials
- Marketing to VEX IQ community

---

## 10. Success Metrics

### Quantitative Metrics
- **Adoption**: 500+ unique users in Season 1
- **Accuracy**: 99.9% calculation correctness
- **Performance**: 95% of calculations < 100ms
- **Engagement**: Average 5+ calculations per session

### Qualitative Metrics
- User satisfaction score ≥ 4.0/5.0
- Positive feedback from 3+ regional competitions
- Feature requests indicating active usage

---

## 11. Risks & Mitigation

| Risk | Impact | Likelihood | Mitigation Strategy |
|------|--------|------------|-------------------|
| Rule changes mid-season | High | Medium | Version control, quick update process |
| User trust in calculations | High | Low | Extensive testing, official validation |
| Complex UI overwhelming users | Medium | Medium | User testing, iterative design |
| Mobile performance issues | Medium | Low | Progressive web app approach |

---

## 12. Future Considerations

### Potential Enhancements
- Integration with VEX tournament software
- Team performance tracking over season
- AI-powered strategy suggestions
- Multiplayer collaboration features
- Offline mode for venues with poor connectivity

### Scalability
- Cloud hosting for high-traffic events
- API development for third-party integration
- Multi-language support for international teams

---

## 13. Deliverables

### Development Deliverables
1. Functional web application (deployed URL)
2. Source code repository with documentation
3. Test suite with 90%+ coverage
4. User manual and quick-start guide

### Documentation
1. Technical documentation for maintainers
2. API documentation (if applicable)
3. Troubleshooting guide
4. Video tutorials for users

---

## 14. Approval & Sign-off

| Role | Name | Date | Signature |
|------|------|------|-----------|
| Product Owner | TBD | | |
| Technical Lead | TBD | | |
| UX Designer | TBD | | |
| QA Lead | TBD | | |

---

## Appendices

### A. Glossary
- **VEX IQ**: Educational robotics platform for elementary and middle school
- **Mix & Match**: 2024-2025 VEX IQ game challenge
- **Standoff Goal**: Elevated scoring position in the game

### B. References
- [VEX IQ Game Manual](https://www.vexrobotics.com/iq/competition/viqc-current-game)
- [Scoring Guidelines Official Documentation]
- [VEX Forum Community Feedback]

### C. Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2025-09-01 | Initial | First complete draft |