class VEXScoreCalculator {
    constructor() {
        this.scoreHistory = [];  // Store all entered scores
        this.inputs = {
            connectedPins: document.getElementById('connectedPins'),
            connectedBeams: document.getElementById('connectedBeams'),
            twoColorStacks: document.getElementById('twoColorStacks'),
            threeColorStacks: document.getElementById('threeColorStacks'),
            matchingGoals: document.getElementById('matchingGoals'),
            stacksOnStandoff: document.getElementById('stacksOnStandoff'),
            clearedPins: document.getElementById('clearedPins'),
            robotsInContact: document.getElementById('robotsInContact')
        };

        this.scoreDisplay = document.getElementById('totalScore');
        this.scoreBreakdown = document.getElementById('scoreBreakdown');
        this.validationMessage = document.getElementById('validationMessage');
        this.resetBtn = document.getElementById('resetBtn');
        this.shareBtn = document.getElementById('shareBtn');
        this.addToAverageBtn = document.getElementById('addToAverageBtn');
        this.averageDisplay = document.getElementById('averageDisplay');
        this.clearHistoryBtn = document.getElementById('clearHistoryBtn');
        this.shareModal = document.getElementById('shareModal');
        this.shareLink = document.getElementById('shareLink');
        this.copyLinkBtn = document.getElementById('copyLinkBtn');
        this.copyMessage = document.getElementById('copyMessage');

        this.presets = {
            minimal: {
                connectedPins: 5,
                connectedBeams: 1,
                twoColorStacks: 1,
                threeColorStacks: 0,
                matchingGoals: 1, // The 1 stack is in a matching goal
                stacksOnStandoff: 0,
                clearedPins: 8, // Realistic for minimal effort
                robotsInContact: 1
            },
            average: {
                connectedPins: 12,
                connectedBeams: 3,
                twoColorStacks: 2,
                threeColorStacks: 2, // Total 4 stacks
                matchingGoals: 2, // 2 of the 4 stacks in matching goals
                stacksOnStandoff: 1, // 1 of the 4 stacks on standoff
                clearedPins: 18,
                robotsInContact: 2
            },
            competitive: {
                connectedPins: 20,
                connectedBeams: 5,
                twoColorStacks: 3,
                threeColorStacks: 4, // Total 7 stacks
                matchingGoals: 4, // 4 of the 7 stacks in matching goals
                stacksOnStandoff: 2, // 2 of the 7 stacks on standoff (max 3)
                clearedPins: 28,
                robotsInContact: 2
            },
            maximum: {
                connectedPins: 35, // Maximum pins (35 points)
                connectedBeams: 7, // Maximum beams (70 points)
                twoColorStacks: 0, // 0 two-color stacks (0 points)
                threeColorStacks: 9, // 9 three-color stacks (135 points)
                matchingGoals: 9, // 9 of the 9 stacks in matching goals (90 points)
                stacksOnStandoff: 3, // 3 of the 9 stacks on standoff (30 points)
                clearedPins: 35, // Maximum cleared pins (70 points)
                robotsInContact: 2 // Both robots in contact (4 points)
                // Total: 35+70+0+135+90+30+70+4 = 434 points (theoretical max)
            }
        };

        this.init();
    }

    init() {
        Object.values(this.inputs).forEach(input => {
            input.addEventListener('input', () => {
                this.validateInput(input);
                this.validateStackLogic(); // Always validate all rules
                this.calculateScore();
            });
        });

        this.resetBtn.addEventListener('click', () => this.resetAll());
        this.shareBtn.addEventListener('click', () => this.shareScore());
        this.addToAverageBtn.addEventListener('click', () => this.addToAverage());
        this.clearHistoryBtn.addEventListener('click', () => this.clearHistory());
        this.copyLinkBtn.addEventListener('click', () => this.copyShareLink());

        document.querySelector('.close').addEventListener('click', () => {
            this.shareModal.style.display = 'none';
        });

        window.addEventListener('click', (event) => {
            if (event.target === this.shareModal) {
                this.shareModal.style.display = 'none';
            }
        });

        document.querySelectorAll('.preset-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const presetName = btn.dataset.preset;
                this.loadPreset(presetName);
            });
        });

        document.getElementById('helpLink').addEventListener('click', (e) => {
            e.preventDefault();
            this.showHelp();
        });

        document.getElementById('aboutLink').addEventListener('click', (e) => {
            e.preventDefault();
            this.showAbout();
        });

        this.loadFromURL();
        this.calculateScore();
    }

    validateInput(input) {
        const value = parseInt(input.value) || 0;
        const min = parseInt(input.min);
        const max = parseInt(input.max);

        if (value < min) {
            input.value = min;
        } else if (value > max) {
            input.value = max;
        }
    }

    validateStackLogic() {
        // Display helpful warnings without preventing input
        const twoColor = parseInt(this.inputs.twoColorStacks.value) || 0;
        const threeColor = parseInt(this.inputs.threeColorStacks.value) || 0;
        const totalStacks = twoColor + threeColor;
        
        const matchingGoals = parseInt(this.inputs.matchingGoals.value) || 0;
        const stacksOnStandoff = parseInt(this.inputs.stacksOnStandoff.value) || 0;
        const connectedPins = parseInt(this.inputs.connectedPins.value) || 0;
        const connectedBeams = parseInt(this.inputs.connectedBeams.value) || 0;
        const clearedPins = parseInt(this.inputs.clearedPins.value) || 0;

        let warnings = [];

        // Common sense validation logic
        // Maximum practical stacks is 8-9 based on game elements
        if (totalStacks > 9) {
            warnings.push('Note: Maximum 9 stacks possible with available game elements');
        }

        // Matching goals can't exceed total stacks (common sense)
        if (matchingGoals > totalStacks && totalStacks > 0) {
            warnings.push('Logic: Matching goal bonuses can only apply to existing stacks');
        }

        // Maximum matching goals is 9
        if (matchingGoals > 9) {
            warnings.push('Error: Maximum 9 matching goal positions available');
        }

        // Standoff goals limited to 3 positions
        if (stacksOnStandoff > 3) {
            warnings.push('Reminder: Only 3 standoff goal positions available on field');
        }

        if (stacksOnStandoff > totalStacks && totalStacks > 0) {
            warnings.push('Logic: Standoff bonuses can only apply to existing stacks');
        }

        // A stack can only be in one location
        if (matchingGoals + stacksOnStandoff > totalStacks && totalStacks > 0) {
            warnings.push('Logic: Each stack can only be in one scoring position');
        }

        // Can't connect more pins than cleared
        if (connectedPins > clearedPins && clearedPins > 0 && connectedPins > 0) {
            warnings.push('Logic: Connected pins must come from cleared pins');
        }

        // Beams need pins to connect
        if (connectedBeams > 0 && connectedPins === 0) {
            warnings.push('Logic: Beams require connected pins to score');
        }

        // Maximum beams check
        if (connectedBeams > 7) {
            warnings.push('Note: Maximum 7 beams can be connected on field');
        }

        // Minimum pins needed for beams (roughly 3-5 pins per beam)
        if (connectedBeams > 0 && connectedPins < connectedBeams * 3) {
            warnings.push('Tip: Each beam typically needs 3-5 pins to connect properly');
        }

        // Display the most relevant warning
        if (warnings.length > 0) {
            this.validationMessage.textContent = warnings[0];
            this.validationMessage.className = 'validation-message info';
        } else if (totalStacks > 0 || connectedPins > 0 || clearedPins > 0) {
            // Show positive feedback when configuration makes sense
            this.validationMessage.textContent = 'Configuration looks good!';
            this.validationMessage.className = 'validation-message success';
        } else {
            this.validationMessage.className = 'validation-message';
            this.validationMessage.textContent = '';
        }
    }

    calculateScore() {
        const scores = {
            connectedPins: (parseInt(this.inputs.connectedPins.value) || 0) * 1,
            connectedBeams: (parseInt(this.inputs.connectedBeams.value) || 0) * 10,
            twoColorStacks: (parseInt(this.inputs.twoColorStacks.value) || 0) * 5,
            threeColorStacks: (parseInt(this.inputs.threeColorStacks.value) || 0) * 15,
            matchingGoals: (parseInt(this.inputs.matchingGoals.value) || 0) * 10,
            stacksOnStandoff: (parseInt(this.inputs.stacksOnStandoff.value) || 0) * 10,
            clearedPins: (parseInt(this.inputs.clearedPins.value) || 0) * 2,
            robotsInContact: (parseInt(this.inputs.robotsInContact.value) || 0) * 2
        };

        const totalScore = Object.values(scores).reduce((sum, score) => sum + score, 0);

        this.scoreDisplay.textContent = totalScore;
        this.scoreDisplay.style.animation = 'none';
        setTimeout(() => {
            this.scoreDisplay.style.animation = 'scoreUpdate 0.3s ease-in-out';
        }, 10);

        // Check for illegal score (above 434)
        const scoreLabel = document.querySelector('.score-label');
        if (totalScore > 434) {
            scoreLabel.innerHTML = 'Points<br><span style="color: red; font-weight: bold; font-size: 1.2em;">⚠️ ILLEGAL SCORE</span>';
            this.scoreDisplay.style.color = 'red';
        } else {
            scoreLabel.textContent = 'Points';
            this.scoreDisplay.style.color = '';
        }

        this.updateBreakdown(scores);
        this.updateURL();
    }

    updateBreakdown(scores) {
        const breakdownItems = [
            { label: 'Connected Pins', value: scores.connectedPins, count: this.inputs.connectedPins.value },
            { label: 'Connected Beams', value: scores.connectedBeams, count: this.inputs.connectedBeams.value },
            { label: '2-Color Stack Bonus', value: scores.twoColorStacks, count: this.inputs.twoColorStacks.value },
            { label: '3-Color Stack Bonus', value: scores.threeColorStacks, count: this.inputs.threeColorStacks.value },
            { label: 'Matching Goal Bonus', value: scores.matchingGoals, count: this.inputs.matchingGoals.value },
            { label: 'Stacks on Standoff Goal', value: scores.stacksOnStandoff, count: this.inputs.stacksOnStandoff.value },
            { label: 'Cleared Starting Pins', value: scores.clearedPins, count: this.inputs.clearedPins.value },
            { label: 'Robots in Contact with Objects', value: scores.robotsInContact, count: this.inputs.robotsInContact.value }
        ];

        this.scoreBreakdown.innerHTML = breakdownItems
            .map(item => `
                <div class="breakdown-item ${item.value === 0 ? 'zero' : ''}">
                    <span class="breakdown-label">${item.label} (${item.count})</span>
                    <span class="breakdown-value">${item.value} pts</span>
                </div>
            `)
            .join('');
    }

    resetAll() {
        Object.values(this.inputs).forEach(input => {
            input.value = 0;
        });
        this.calculateScore();
        this.validationMessage.className = 'validation-message';
        this.validationMessage.textContent = '';
    }

    addToAverage() {
        const currentScore = parseInt(this.scoreDisplay.textContent) || 0;
        
        // Check if score is illegal (above 434)
        if (currentScore > 434) {
            this.addToAverageBtn.textContent = 'Illegal Score!';
            this.addToAverageBtn.style.background = 'var(--danger-color)';
            this.addToAverageBtn.style.color = 'white';
            
            setTimeout(() => {
                this.addToAverageBtn.textContent = 'Add to Average';
                this.addToAverageBtn.style.background = '';
                this.addToAverageBtn.style.color = '';
            }, 2000);
            return;
        }
        
        // Check for logical issues
        const validationIssues = this.checkLogicalIssues();
        if (validationIssues.length > 0) {
            this.addToAverageBtn.textContent = 'Illogical Score!';
            this.addToAverageBtn.style.background = 'var(--warning-color)';
            this.addToAverageBtn.style.color = 'black';
            
            setTimeout(() => {
                this.addToAverageBtn.textContent = 'Add to Average';
                this.addToAverageBtn.style.background = '';
                this.addToAverageBtn.style.color = '';
            }, 2000);
            return;
        }
        
        // Score is valid, add it
        this.scoreHistory.push(currentScore);
        this.updateAverageDisplay();
        
        // Show confirmation
        this.addToAverageBtn.textContent = 'Added!';
        this.addToAverageBtn.style.background = 'var(--success-color)';
        this.addToAverageBtn.style.color = 'white';
        
        setTimeout(() => {
            this.addToAverageBtn.textContent = 'Add to Average';
            this.addToAverageBtn.style.background = '';
            this.addToAverageBtn.style.color = '';
        }, 1500);
    }
    
    updateAverageDisplay() {
        if (this.scoreHistory.length > 0) {
            const average = Math.round(this.scoreHistory.reduce((a, b) => a + b, 0) / this.scoreHistory.length);
            this.averageDisplay.textContent = `${average} pts (${this.scoreHistory.length} scores)`;
        } else {
            this.averageDisplay.textContent = '';
        }
    }
    
    clearHistory() {
        this.scoreHistory = [];
        this.updateAverageDisplay();
        
        // Show confirmation
        this.clearHistoryBtn.textContent = 'Cleared!';
        setTimeout(() => {
            this.clearHistoryBtn.textContent = 'Clear History';
        }, 1500);
    }
    
    checkLogicalIssues() {
        const issues = [];
        
        const twoColor = parseInt(this.inputs.twoColorStacks.value) || 0;
        const threeColor = parseInt(this.inputs.threeColorStacks.value) || 0;
        const totalStacks = twoColor + threeColor;
        
        const matchingGoals = parseInt(this.inputs.matchingGoals.value) || 0;
        const stacksOnStandoff = parseInt(this.inputs.stacksOnStandoff.value) || 0;
        const connectedPins = parseInt(this.inputs.connectedPins.value) || 0;
        const connectedBeams = parseInt(this.inputs.connectedBeams.value) || 0;
        const clearedPins = parseInt(this.inputs.clearedPins.value) || 0;
        
        // Critical logical errors that make the score invalid
        
        // Can't have more matching goals than stacks
        if (matchingGoals > totalStacks && totalStacks > 0) {
            issues.push('More matching goals than total stacks');
        }
        
        // Can't have more standoff stacks than total stacks
        if (stacksOnStandoff > totalStacks && totalStacks > 0) {
            issues.push('More standoff stacks than total stacks');
        }
        
        // Each stack can only be in one location
        if (matchingGoals + stacksOnStandoff > totalStacks && totalStacks > 0) {
            issues.push('Stack location count exceeds total stacks');
        }
        
        // Can't connect more pins than cleared
        if (connectedPins > clearedPins && clearedPins > 0 && connectedPins > 0) {
            issues.push('Connected pins exceed cleared pins');
        }
        
        // Beams need pins to connect (at least 3 pins per beam)
        if (connectedBeams > 0 && connectedPins < connectedBeams * 3) {
            issues.push('Insufficient pins for beam connections');
        }
        
        // Maximum practical stacks is 9
        if (totalStacks > 9) {
            issues.push('Too many stacks (max 9 possible)');
        }
        
        // Maximum matching goals is 9
        if (matchingGoals > 9) {
            issues.push('Too many matching goals (max 9)');
        }
        
        // Maximum standoff goals is 3
        if (stacksOnStandoff > 3) {
            issues.push('Too many standoff stacks (max 3)');
        }
        
        // Maximum beams is 7
        if (connectedBeams > 7) {
            issues.push('Too many beams (max 7)');
        }
        
        return issues;
    }

    loadPreset(presetName) {
        if (presetName === 'average') {
            // If we have stored scores, use their average
            if (this.scoreHistory.length > 0) {
                const avgScore = Math.round(this.scoreHistory.reduce((a, b) => a + b, 0) / this.scoreHistory.length);
                // Distribute the average score proportionally across inputs based on their max values
                const totalMaxPoints = 35 + 70 + 0 + 135 + 90 + 30 + 70 + 4; // 434 max possible
                
                Object.keys(this.inputs).forEach(key => {
                    const input = this.inputs[key];
                    const maxValue = parseInt(input.max);
                    let pointsPerUnit = 1;
                    
                    // Determine points per unit for each input type
                    switch(key) {
                        case 'connectedPins': pointsPerUnit = 1; break;
                        case 'connectedBeams': pointsPerUnit = 10; break;
                        case 'twoColorStacks': pointsPerUnit = 5; break;
                        case 'threeColorStacks': pointsPerUnit = 15; break;
                        case 'matchingGoals': pointsPerUnit = 10; break;
                        case 'stacksOnStandoff': pointsPerUnit = 10; break;
                        case 'clearedPins': pointsPerUnit = 2; break;
                        case 'robotsInContact': pointsPerUnit = 2; break;
                    }
                    
                    const maxPoints = maxValue * pointsPerUnit;
                    const proportion = maxPoints / totalMaxPoints;
                    const targetPoints = avgScore * proportion;
                    const targetValue = Math.round(targetPoints / pointsPerUnit);
                    
                    input.value = Math.min(targetValue, maxValue);
                });
            } else {
                // No scores stored, set all to 0
                Object.keys(this.inputs).forEach(key => {
                    this.inputs[key].value = 0;
                });
            }
            
            this.calculateScore();
        } else {
            const preset = this.presets[presetName];
            if (preset) {
                Object.keys(preset).forEach(key => {
                    if (this.inputs[key]) {
                        this.inputs[key].value = preset[key];
                    }
                });
                this.calculateScore();
            }
        }
    }

    updateURL() {
        const params = new URLSearchParams();
        Object.keys(this.inputs).forEach(key => {
            const value = parseInt(this.inputs[key].value) || 0;
            if (value > 0) {
                params.set(key, value);
            }
        });
        
        const newURL = window.location.pathname + (params.toString() ? '?' + params.toString() : '');
        window.history.replaceState({}, '', newURL);
    }

    loadFromURL() {
        const params = new URLSearchParams(window.location.search);
        let hasParams = false;
        
        params.forEach((value, key) => {
            if (this.inputs[key]) {
                this.inputs[key].value = parseInt(value) || 0;
                hasParams = true;
            }
        });
        
        if (hasParams) {
            this.validateStackLogic();
        }
    }

    shareScore() {
        const url = window.location.href;
        this.shareLink.value = url;
        this.shareModal.style.display = 'block';
        this.copyMessage.style.display = 'none';
    }

    copyShareLink() {
        this.shareLink.select();
        this.shareLink.setSelectionRange(0, 99999);
        
        navigator.clipboard.writeText(this.shareLink.value)
            .then(() => {
                this.copyMessage.textContent = 'Link copied to clipboard!';
                this.copyMessage.className = 'copy-message success';
                setTimeout(() => {
                    this.copyMessage.style.display = 'none';
                }, 3000);
            })
            .catch(() => {
                document.execCommand('copy');
                this.copyMessage.textContent = 'Link copied to clipboard!';
                this.copyMessage.className = 'copy-message success';
                setTimeout(() => {
                    this.copyMessage.style.display = 'none';
                }, 3000);
            });
    }

    showHelp() {
        alert(`VEX IQ Mix & Match Score Calculator - Help

How to use:
1. Enter the number of each scoring element achieved
2. The calculator automatically validates inputs and calculates scores
3. Use presets for quick scoring scenarios
4. Share your score using the Share button

Scoring Values:
• Connected Pins: 1 point each
• Connected Beams: 10 points each
• 2-Color Stacks: 5 point bonus
• 3-Color Stacks: 15 point bonus
• Matching Goal Bonus: 10 points each
• Stacks on Standoff Goal: 10 points each
• Cleared Starting Pins: 2 points each
• Robots in Contact with Scoring Objects: 2 points each`);
    }

    showAbout() {
        alert(`VEX IQ Mix & Match Score Calculator
Version 1.0 - 2024-2025 Season

This calculator helps teams, coaches, and referees quickly compute match scores for VEX IQ Mix & Match competitions.

Features:
• Real-time score calculation
• Input validation
• Preset scoring scenarios
• Shareable score links
• Mobile-friendly design

This tool is not affiliated with VEX Robotics.
For official rules, visit the VEX Robotics website.`);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new VEXScoreCalculator();
});