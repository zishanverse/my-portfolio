"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
    Brain, 
    Play, 
    Terminal as TerminalIcon, 
    Code, 
    Gamepad2, 
    CheckCircle2, 
    Sparkles, 
    ChevronRight, 
    RefreshCw, 
    User, 
    Cpu, 
    AlertCircle
} from "lucide-react";

interface Agent {
    id: string;
    name: string;
    role: string;
    backstory: string;
    task: string;
    color: string;
    borderColor: string;
    icon: React.ReactNode;
}

interface SimulatedLog {
    agentId: string;
    agentName: string;
    text: string;
    timestamp: string;
    type: "info" | "success" | "code" | "error";
}

const AGENTS: Agent[] = [
    {
        id: "designer",
        name: "Creative Game Designer",
        role: "Systems Designer & Creative Director",
        backstory: "A veteran designer specializing in retro game dynamics and gameplay balancing. Crafts mechanics, controls, scoring formulas, and player goals.",
        task: "Formulate game rules, score mechanisms, speed curves, win/loss criteria, and visual layouts based on the prompt.",
        color: "bg-indigo-500/10 text-indigo-400",
        borderColor: "border-indigo-500/30",
        icon: <Sparkles className="w-5 h-5" />
    },
    {
        id: "developer",
        name: "Senior Python Developer",
        role: "Pygame Implementation Architect",
        backstory: "An expert in low-overhead graphics programming, Python game loop management, state engines, and keyboard/mouse event mapping.",
        task: "Convert game specs into an object-oriented Python Pygame script, implementing Player, Enemy, Bullet, and Particle entities.",
        color: "bg-purple-500/10 text-purple-400",
        borderColor: "border-purple-500/30",
        icon: <Code className="w-5 h-5" />
    },
    {
        id: "qa",
        name: "QA Review Engineer",
        role: "Code Auditor & System Tester",
        backstory: "Meticulous reviewer specializing in collision performance, bounds checking, variable lifetimes, and Python syntax compliance.",
        task: "Simulate game execution, perform logic/collision audits, patch frame-rate dependencies, and finalize Pygame file structure.",
        color: "bg-emerald-500/10 text-emerald-400",
        borderColor: "border-emerald-500/30",
        icon: <CheckCircle2 className="w-5 h-5" />
    }
];

const PRESETS = [
    { id: "space-invaders", name: "Space Invaders", prompt: "Build an arcade-style vertical space shooter with alien waves and shields" },
    { id: "brick-breaker", name: "Brick Breaker", prompt: "Create a Breakout-like game with bouncing balls and colorful blocks" },
    { id: "snake", name: "Retro Snake", prompt: "Design a classic grid-based snake game with growing speed and apple pickups" }
];

export const AgenticCrew = () => {
    const [selectedGameId, setSelectedGameId] = useState<string>("space-invaders");
    const [prompt, setPrompt] = useState<string>(PRESETS[0].prompt);
    const [isSimulating, setIsSimulating] = useState(false);
    const [simulationStep, setSimulationStep] = useState<number>(-1); // -1 = idle, 0 = designer, 1 = developer, 2 = QA, 3 = complete
    const [logs, setLogs] = useState<SimulatedLog[]>([]);
    const [activeStudioTab, setActiveStudioTab] = useState<"runtime" | "code">("runtime");
    const [simulatedProgress, setSimulatedProgress] = useState(0);

    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const terminalEndRef = useRef<HTMLDivElement | null>(null);

    // Python code preset maps
    const pythonPresets: Record<string, string> = {
        "space-invaders": `import pygame
import random
import sys

# Initialize Pygame
pygame.init()
SCREEN_WIDTH = 800
SCREEN_HEIGHT = 600
screen = pygame.display.set_mode((SCREEN_WIDTH, SCREEN_HEIGHT))
pygame.display.set_caption("Retro Space Invaders - CrewAI Generated")
clock = pygame.time.Clock()

# Color definitions
BLACK = (10, 10, 12)
GREEN = (16, 185, 129)
WHITE = (244, 244, 245)
PURPLE = (168, 85, 247)

class Ship(pygame.sprite.Sprite):
    def __init__(self):
        super().__init__()
        self.image = pygame.Surface((40, 20))
        self.image.fill(GREEN)
        self.rect = self.image.get_rect(midbottom=(400, 560))
        self.speed = 6

    def update(self, keys):
        if keys[pygame.K_LEFT] and self.rect.left > 0:
            self.rect.x -= self.speed
        if keys[pygame.K_RIGHT] and self.rect.right < SCREEN_WIDTH:
            self.rect.x += self.speed

class Alien(pygame.sprite.Sprite):
    def __init__(self, x, y):
        super().__init__()
        self.image = pygame.Surface((30, 20))
        self.image.fill(PURPLE)
        self.rect = self.image.get_rect(topleft=(x, y))
        self.direction = 1

    def update(self):
        self.rect.x += self.direction * 2

class Laser(pygame.sprite.Sprite):
    def __init__(self, x, y):
        super().__init__()
        self.image = pygame.Surface((4, 12))
        self.image.fill(WHITE)
        self.rect = self.image.get_rect(midbottom=(x, y))
        self.speed = -8

    def update(self):
        self.rect.y += self.speed
        if self.rect.bottom < 0:
            self.kill()

# Game execution loop omitted for clarity...
`,
        "brick-breaker": `import pygame
import sys

# Initialize Pygame
pygame.init()
WIDTH, HEIGHT = 800, 600
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Brick Breaker Classic - CrewAI Generated")
clock = pygame.time.Clock()

# Colors
DARK = (15, 15, 20)
BLUE = (59, 130, 246)
YELLOW = (234, 179, 8)
RED = (239, 68, 68)

class Paddle:
    def __init__(self):
        self.width = 120
        self.height = 15
        self.x = (WIDTH - self.width) // 2
        self.y = HEIGHT - 50
        self.speed = 8

    def move(self, direction):
        if direction == "left" and self.x > 0:
            self.x -= self.speed
        if direction == "right" and self.x + self.width < WIDTH:
            self.x += self.speed

    def draw(self):
        pygame.draw.rect(screen, BLUE, (self.x, self.y, self.width, self.height), border_radius=4)

class Ball:
    def __init__(self):
        self.radius = 8
        self.x = WIDTH // 2
        self.y = HEIGHT - 100
        self.dx = 5
        self.dy = -5

    def move(self):
        self.x += self.dx
        self.y += self.dy
        
        # Wall bounce
        if self.x - self.radius <= 0 or self.x + self.radius >= WIDTH:
            self.dx *= -1
        if self.y - self.radius <= 0:
            self.dy *= -1
            
    def draw(self):
        pygame.draw.circle(screen, YELLOW, (int(self.x), int(self.y)), self.radius)

# Game execution loops omitted for clarity...
`,
        "snake": `import pygame
import sys
import random

pygame.init()
SIZE = 20
GRID_WIDTH = 40
GRID_HEIGHT = 30
screen = pygame.display.set_mode((GRID_WIDTH * SIZE, GRID_HEIGHT * SIZE))
pygame.display.set_caption("Neural Retro Snake - CrewAI Generated")
clock = pygame.time.Clock()

AMBER = (245, 158, 11)
GREEN = (16, 185, 129)
DARK = (12, 12, 16)

class Snake:
    def __init__(self):
        self.body = [(20, 15), (19, 15), (18, 15)]
        self.direction = (1, 0)
        self.grow_pending = False

    def move(self):
        head = self.body[0]
        dx, dy = self.direction
        new_head = (head[0] + dx, head[1] + dy)
        
        self.body.insert(0, new_head)
        if not self.grow_pending:
            self.body.pop()
        else:
            self.grow_pending = False

    def change_direction(self, new_dir):
        # Prevent moving 180 degrees backward
        if (new_dir[0] * -1, new_dir[1] * -1) != self.direction:
            self.direction = new_dir

# Game execution loops omitted...
`
    };

    // Preset game engine constants/states for Canvas
    // Let's create an elegant, simple Arcade simulator in client-side HTML5 canvas
    const requestRef = useRef<number | null>(null);

    // State of active simulation game
    const gameEngineState = useRef({
        gameId: "space-invaders",
        score: 0,
        highScore: 0,
        gameOver: false,
        gameWon: false,
        paused: false,
        keys: {} as Record<string, boolean>,
        // Space Invaders state
        ship: { x: 250, w: 40, h: 20 },
        lasers: [] as { x: number; y: number; active: boolean }[],
        aliens: [] as { x: number; y: number; w: number; h: number; alive: boolean; color: string }[],
        alienDir: 1,
        alienSpeed: 1,
        // Brick Breaker state
        paddle: { x: 200, w: 100, h: 12 },
        ball: { x: 250, y: 350, r: 8, dx: 3, dy: -3 },
        bricks: [] as { x: number; y: number; w: number; h: number; color: string; hits: number }[],
        // Snake state
        snake: [] as { x: number; y: number }[],
        snakeDir: { x: 1, y: 0 },
        food: { x: 10, y: 10 },
        snakeTimer: 0,
        snakeSpeed: 8 // updates every X frames
    });

    const selectPreset = (presetId: string, presetPrompt: string) => {
        if (isSimulating) return;
        setSelectedGameId(presetId);
        setPrompt(presetPrompt);
        setSimulationStep(-1);
        setLogs([]);
    };

    const addLog = (agentId: string, text: string, type: "info" | "success" | "code" | "error" = "info") => {
        const agent = AGENTS.find(a => a.id === agentId);
        const newLog: SimulatedLog = {
            agentId,
            agentName: agent ? agent.name : "System",
            text,
            timestamp: new Date().toLocaleTimeString(),
            type
        };
        setLogs(prev => [...prev, newLog]);
    };

    const runSimulation = () => {
        if (isSimulating) return;
        setIsSimulating(true);
        setSimulationStep(0);
        setLogs([]);
        setSimulatedProgress(0);
        
        // Step 0: Creative Game Designer (0 - 3s)
        addLog("designer", `Initiating Crew task: Analyze prompt - "${prompt}"`, "info");
        setTimeout(() => {
            addLog("designer", "Analyzing core retro gaming mechanisms, physics loops, and keymaps.", "info");
        }, 800);

        setTimeout(() => {
            addLog("designer", `Creating design document: 
- Framework: Pygame (Python)
- Physics: 60FPS tick-rate delta movement
- Control Scheme: Keyboard-driven arrow input
- Score curve: Linear step increment (aliens/bricks/apples = +10pts)`, "success");
            
            // Move to Step 1: Senior Developer
            setSimulationStep(1);
            setSimulatedProgress(35);
            addLog("developer", "Acquiring designer specifications. Generating OOP structure in Pygame...", "info");
        }, 2200);

        // Step 1: Senior Developer (2.2 - 4.5s)
        setTimeout(() => {
            addLog("developer", "Initializing pygame sub-system modules and screen surface [800x600 px].", "info");
        }, 3000);
        setTimeout(() => {
            addLog("developer", "Writing Player entity, bounding boxes, and velocity components.", "info");
        }, 3500);
        setTimeout(() => {
            const linesSnippet = pythonPresets[selectedGameId].substring(0, 180) + "\n# ... [generating code buffer] ...";
            addLog("developer", linesSnippet, "code");
            
            // Move to Step 2: QA
            setSimulationStep(2);
            setSimulatedProgress(70);
            addLog("qa", "Developer draft delivered. Starting code coverage compilation audits...", "info");
        }, 4400);

        // Step 2: QA Engineer (4.4 - 6.5s)
        setTimeout(() => {
            addLog("qa", "Performing screen-boundary constraint checks. Rect intersection safety passes.", "info");
        }, 5100);
        setTimeout(() => {
            addLog("qa", "Resolved 1 potential off-screen bullet index memory drift. Optimization locked.", "success");
        }, 5800);
        setTimeout(() => {
            addLog("qa", "Audit Success: Pygame compliance score: 100%. Compilation verified.", "success");
            
            // Complete
            setSimulationStep(3);
            setSimulatedProgress(100);
            setIsSimulating(false);
            setActiveStudioTab("runtime");
            initGameEngine(selectedGameId);
        }, 6500);
    };

    // Scroll terminal to bottom
    useEffect(() => {
        if (terminalEndRef.current) {
            terminalEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [logs]);

    // GAME ENGINE SIMULATIONS ON CANVAS
    const initGameEngine = (gameId: string) => {
        const state = gameEngineState.current;
        state.gameId = gameId;
        state.score = 0;
        state.gameOver = false;
        state.gameWon = false;
        state.paused = false;
        state.lasers = [];
        state.aliens = [];
        state.bricks = [];
        state.snake = [];
        
        if (gameId === "space-invaders") {
            state.ship.x = 230;
            state.alienDir = 1;
            state.alienSpeed = 1.2;
            const cols = 8;
            const rows = 4;
            const colors = ["#818cf8", "#a78bfa", "#c084fc", "#e879f9"];
            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < cols; c++) {
                    state.aliens.push({
                        x: 50 + c * 50,
                        y: 40 + r * 30,
                        w: 30,
                        h: 18,
                        alive: true,
                        color: colors[r % colors.length]
                    });
                }
            }
        } else if (gameId === "brick-breaker") {
            state.paddle.x = 200;
            state.paddle.w = 90;
            state.ball.x = 250;
            state.ball.y = 300;
            state.ball.dx = 3;
            state.ball.dy = -3;
            
            const rows = 5;
            const cols = 8;
            const colors = ["#f87171", "#fb923c", "#facc15", "#4ade80", "#60a5fa"];
            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < cols; c++) {
                    state.bricks.push({
                        x: 15 + c * 58,
                        y: 35 + r * 20,
                        w: 52,
                        h: 15,
                        color: colors[r % colors.length],
                        hits: 1
                    });
                }
            }
        } else if (gameId === "snake") {
            state.snake = [
                { x: 10, y: 12 },
                { x: 9, y: 12 },
                { x: 8, y: 12 }
            ];
            state.snakeDir = { x: 1, y: 0 };
            spawnFood();
            state.snakeSpeed = 8;
            state.snakeTimer = 0;
        }
    };

    const spawnFood = () => {
        const state = gameEngineState.current;
        let valid = false;
        let fx = 0, fy = 0;
        while (!valid) {
            fx = Math.floor(Math.random() * 24) + 1;
            fy = Math.floor(Math.random() * 18) + 1;
            valid = true;
            // check snake collision
            for (const cell of state.snake) {
                if (cell.x === fx && cell.y === fy) valid = false;
            }
        }
        state.food = { x: fx, y: fy };
    };

    // Keyboard handlers
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const state = gameEngineState.current;
            state.keys[e.key] = true;
            
            // Snake controls
            if (state.gameId === "snake") {
                if (e.key === "ArrowUp" && state.snakeDir.y === 0) state.snakeDir = { x: 0, y: -1 };
                if (e.key === "ArrowDown" && state.snakeDir.y === 0) state.snakeDir = { x: 0, y: 1 };
                if (e.key === "ArrowLeft" && state.snakeDir.x === 0) state.snakeDir = { x: -1, y: 0 };
                if (e.key === "ArrowRight" && state.snakeDir.x === 0) state.snakeDir = { x: 1, y: 0 };
            }
            
            // Spacebar shoot in Space Invaders
            if (state.gameId === "space-invaders" && e.key === " ") {
                e.preventDefault();
                if (!state.gameOver && !state.gameWon) {
                    state.lasers.push({
                        x: state.ship.x + state.ship.w / 2,
                        y: 350, // relative to bottom
                        active: true
                    });
                }
            }
        };

        const handleKeyUp = (e: KeyboardEvent) => {
            gameEngineState.current.keys[e.key] = false;
        };

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, []);

    // Main Canvas Render loop
    useEffect(() => {
        if (simulationStep !== 3) return;

        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;

        const updateGame = () => {
            const state = gameEngineState.current;
            if (state.gameOver || state.gameWon || state.paused) return;

            if (state.gameId === "space-invaders") {
                // Move ship
                if (state.keys["ArrowLeft"] && state.ship.x > 0) {
                    state.ship.x -= 4;
                }
                if (state.keys["ArrowRight"] && state.ship.x < canvas.width - state.ship.w) {
                    state.ship.x += 4;
                }

                // Move Lasers
                state.lasers.forEach(laser => {
                    if (laser.active) {
                        laser.y -= 5;
                        if (laser.y < 0) laser.active = false;
                    }
                });

                // Move Aliens
                let hitEdge = false;
                state.aliens.forEach(alien => {
                    if (!alien.alive) return;
                    alien.x += state.alienDir * state.alienSpeed;
                    if (alien.x < 10 || alien.x > canvas.width - alien.w - 10) {
                        hitEdge = true;
                    }
                    // check gameover threshold
                    if (alien.y + alien.h >= 340) {
                        state.gameOver = true;
                    }
                });

                if (hitEdge) {
                    state.alienDir *= -1;
                    state.aliens.forEach(alien => {
                        if (alien.alive) alien.y += 12;
                    });
                }

                // Collision Laser vs Alien
                state.lasers.forEach(laser => {
                    if (!laser.active) return;
                    state.aliens.forEach(alien => {
                        if (!alien.alive) return;
                        if (laser.x >= alien.x && laser.x <= alien.x + alien.w &&
                            laser.y >= alien.y && laser.y <= alien.y + alien.h) {
                            alien.alive = false;
                            laser.active = false;
                            state.score += 10;
                        }
                    });
                });

                // Check Win
                const aliveCount = state.aliens.filter(a => a.alive).length;
                if (aliveCount === 0) {
                    state.gameWon = true;
                    if (state.score > state.highScore) state.highScore = state.score;
                }

            } else if (state.gameId === "brick-breaker") {
                // Move paddle
                if (state.keys["ArrowLeft"] && state.paddle.x > 5) {
                    state.paddle.x -= 6;
                }
                if (state.keys["ArrowRight"] && state.paddle.x < canvas.width - state.paddle.w - 5) {
                    state.paddle.x += 6;
                }

                // Move ball
                state.ball.x += state.ball.dx;
                state.ball.y += state.ball.dy;

                // Wall bounces
                if (state.ball.x - state.ball.r <= 0 || state.ball.x + state.ball.r >= canvas.width) {
                    state.ball.dx *= -1;
                }
                if (state.ball.y - state.ball.r <= 0) {
                    state.ball.dy *= -1;
                }

                // Paddle bounce
                if (state.ball.y + state.ball.r >= 355 && 
                    state.ball.x >= state.paddle.x && 
                    state.ball.x <= state.paddle.x + state.paddle.w) {
                    state.ball.dy = -Math.abs(state.ball.dy);
                    // angle adjust
                    const offset = (state.ball.x - (state.paddle.x + state.paddle.w / 2)) / (state.paddle.w / 2);
                    state.ball.dx = offset * 4;
                }

                // Brick collisions
                state.bricks.forEach(brick => {
                    if (brick.hits <= 0) return;
                    if (state.ball.x + state.ball.r >= brick.x &&
                        state.ball.x - state.ball.r <= brick.x + brick.w &&
                        state.ball.y + state.ball.r >= brick.y &&
                        state.ball.y - state.ball.r <= brick.y + brick.h) {
                        brick.hits = 0;
                        state.ball.dy *= -1;
                        state.score += 10;
                    }
                });

                // Fall off screen
                if (state.ball.y - state.ball.r > canvas.height) {
                    state.gameOver = true;
                    if (state.score > state.highScore) state.highScore = state.score;
                }

                // Win check
                const activeBricks = state.bricks.filter(b => b.hits > 0).length;
                if (activeBricks === 0) {
                    state.gameWon = true;
                    if (state.score > state.highScore) state.highScore = state.score;
                }

            } else if (state.gameId === "snake") {
                state.snakeTimer++;
                if (state.snakeTimer >= state.snakeSpeed) {
                    state.snakeTimer = 0;
                    
                    // calculate next head
                    const head = state.snake[0];
                    const newHead = {
                        x: head.x + state.snakeDir.x,
                        y: head.y + state.snakeDir.y
                    };

                    // wall crash
                    if (newHead.x < 0 || newHead.x >= 25 || newHead.y < 0 || newHead.y >= 20) {
                        state.gameOver = true;
                        if (state.score > state.highScore) state.highScore = state.score;
                        return;
                    }

                    // self crash
                    for (const cell of state.snake) {
                        if (cell.x === newHead.x && cell.y === newHead.y) {
                            state.gameOver = true;
                            if (state.score > state.highScore) state.highScore = state.score;
                            return;
                        }
                    }

                    state.snake.unshift(newHead);

                    // food crash
                    if (newHead.x === state.food.x && newHead.y === state.food.y) {
                        state.score += 10;
                        spawnFood();
                        // speed up slightly
                        if (state.snakeSpeed > 4 && state.score % 40 === 0) {
                            state.snakeSpeed--;
                        }
                    } else {
                        state.snake.pop();
                    }
                }
            }
        };

        const renderGame = () => {
            const state = gameEngineState.current;
            ctx.fillStyle = "#0c0c0e";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw grid bg lines subtly
            ctx.strokeStyle = "rgba(255,255,255,0.02)";
            ctx.lineWidth = 1;
            const gridSize = 20;
            for (let x = 0; x < canvas.width; x += gridSize) {
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, canvas.height);
                ctx.stroke();
            }
            for (let y = 0; y < canvas.height; y += gridSize) {
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(canvas.width, y);
                ctx.stroke();
            }

            if (state.gameId === "space-invaders") {
                // Draw ship (glassy green)
                ctx.fillStyle = "#10b981";
                ctx.beginPath();
                ctx.roundRect(state.ship.x, 350, state.ship.w, state.ship.h, 4);
                ctx.fill();
                
                // Gun details
                ctx.fillStyle = "#34d399";
                ctx.fillRect(state.ship.x + state.ship.w / 2 - 3, 344, 6, 6);

                // Draw lasers
                ctx.fillStyle = "#ffffff";
                state.lasers.forEach(laser => {
                    if (laser.active) {
                        ctx.fillRect(laser.x - 2, laser.y, 4, 12);
                    }
                });

                // Draw aliens
                state.aliens.forEach(alien => {
                    if (alien.alive) {
                        ctx.fillStyle = alien.color;
                        ctx.beginPath();
                        ctx.roundRect(alien.x, alien.y, alien.w, alien.h, 3);
                        ctx.fill();
                        
                        // eye glowing dot
                        ctx.fillStyle = "#fff";
                        ctx.fillRect(alien.x + 6, alien.y + 5, 3, 3);
                        ctx.fillRect(alien.x + alien.w - 9, alien.y + 5, 3, 3);
                    }
                });

                // Ground threshold line
                ctx.strokeStyle = "rgba(239, 68, 68, 0.2)";
                ctx.beginPath();
                ctx.moveTo(0, 340);
                ctx.lineTo(canvas.width, 340);
                ctx.stroke();

            } else if (state.gameId === "brick-breaker") {
                // Draw paddle
                ctx.fillStyle = "#3b82f6";
                ctx.beginPath();
                ctx.roundRect(state.paddle.x, 355, state.paddle.w, state.paddle.h, 4);
                ctx.fill();

                // Draw ball
                ctx.fillStyle = "#fbbf24";
                ctx.beginPath();
                ctx.arc(state.ball.x, state.ball.y, state.ball.r, 0, Math.PI * 2);
                ctx.fill();

                // Draw bricks
                state.bricks.forEach(brick => {
                    if (brick.hits > 0) {
                        ctx.fillStyle = brick.color;
                        ctx.beginPath();
                        ctx.roundRect(brick.x, brick.y, brick.w, brick.h, 2);
                        ctx.fill();
                        
                        // inner gloss border
                        ctx.strokeStyle = "rgba(255,255,255,0.15)";
                        ctx.strokeRect(brick.x + 1, brick.y + 1, brick.w - 2, brick.h - 2);
                    }
                });

            } else if (state.gameId === "snake") {
                const cellSize = 20;

                // Draw food
                ctx.fillStyle = "#ef4444";
                ctx.beginPath();
                ctx.arc(state.food.x * cellSize + cellSize/2, state.food.y * cellSize + cellSize/2, 6, 0, Math.PI * 2);
                ctx.fill();
                
                // Leaf detail
                ctx.fillStyle = "#10b981";
                ctx.fillRect(state.food.x * cellSize + cellSize/2 + 2, state.food.y * cellSize + cellSize/2 - 8, 3, 3);

                // Draw snake
                state.snake.forEach((cell, idx) => {
                    ctx.fillStyle = idx === 0 ? "#10b981" : "#047857";
                    ctx.beginPath();
                    ctx.roundRect(cell.x * cellSize + 1, cell.y * cellSize + 1, cellSize - 2, cellSize - 2, idx === 0 ? 6 : 4);
                    ctx.fill();
                    
                    // Eye details on head
                    if (idx === 0) {
                        ctx.fillStyle = "#ffffff";
                        ctx.fillRect(cell.x * cellSize + 5, cell.y * cellSize + 5, 3, 3);
                        ctx.fillRect(cell.x * cellSize + 12, cell.y * cellSize + 5, 3, 3);
                    }
                });
            }

            // HUD Overlays
            if (state.gameOver) {
                ctx.fillStyle = "rgba(10, 10, 12, 0.85)";
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                
                ctx.fillStyle = "#ef4444";
                ctx.font = "bold 20px monospace";
                ctx.textAlign = "center";
                ctx.fillText("CRITICAL FAILURE (GAME OVER)", canvas.width / 2, canvas.height / 2 - 20);

                ctx.fillStyle = "#888";
                ctx.font = "12px monospace";
                ctx.fillText("Press RESTART in controller deck below", canvas.width / 2, canvas.height / 2 + 10);
            }

            if (state.gameWon) {
                ctx.fillStyle = "rgba(10, 10, 12, 0.85)";
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                
                ctx.fillStyle = "#10b981";
                ctx.font = "bold 22px monospace";
                ctx.textAlign = "center";
                ctx.fillText("MISSION COMPLETE (YOU WIN!)", canvas.width / 2, canvas.height / 2 - 20);

                ctx.fillStyle = "#888";
                ctx.font = "12px monospace";
                ctx.fillText("QA score: 100% | Press RESTART to replay", canvas.width / 2, canvas.height / 2 + 10);
            }
        };

        const tick = () => {
            updateGame();
            renderGame();
            animationFrameId = requestAnimationFrame(tick);
        };

        // start animation loop
        tick();

        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, [simulationStep, selectedGameId]);

    return (
        <div className="flex flex-col gap-8">
            {/* Crew Pipeline Flow Chart */}
            <div className="p-6 rounded-2xl bg-zinc-900/60 border border-white/5 relative overflow-hidden backdrop-blur-md">
                <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                    <Brain className="w-40 h-40 text-purple-400" />
                </div>
                
                <h4 className="text-xs uppercase tracking-widest text-zinc-500 font-bold mb-6">
                    Multi-Agent Crew Orchestration Pipeline
                </h4>

                <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4">
                    {AGENTS.map((agent, idx) => {
                        const isActive = simulationStep === idx;
                        const isDone = simulationStep > idx;
                        
                        return (
                            <React.Fragment key={agent.id}>
                                <div className={`flex-1 w-full p-4 rounded-xl border transition-all duration-500 bg-black/40 ${
                                    isActive ? `${agent.borderColor} bg-white/5 ring-1 ring-purple-500/20 scale-[1.02]` : 
                                    isDone ? "border-emerald-500/20 opacity-80" : "border-white/5 opacity-60"
                                }`}>
                                    <div className="flex items-center gap-3">
                                        <div className={`p-2 rounded-lg ${agent.color}`}>
                                            {isDone ? <CheckCircle2 className="w-5 h-5 text-emerald-400 animate-pulse" /> : agent.icon}
                                        </div>
                                        <div>
                                            <h5 className="text-xs font-extrabold text-foreground tracking-wide">{agent.name}</h5>
                                            <p className="text-[10px] text-zinc-400 uppercase font-mono">{agent.role}</p>
                                        </div>
                                    </div>
                                    <div className="mt-3 text-[11px] text-zinc-400 leading-relaxed font-medium">
                                        <span className="text-zinc-500 font-bold">Task:</span> {agent.task}
                                    </div>
                                    {isActive && (
                                        <div className="mt-3 w-full bg-white/5 h-1 rounded-full overflow-hidden">
                                            <motion.div 
                                                className="bg-purple-500 h-full"
                                                animate={{ width: ["0%", "100%"] }}
                                                transition={{ duration: 2.2, ease: "easeInOut" }}
                                            />
                                        </div>
                                    )}
                                </div>
                                {idx < AGENTS.length - 1 && (
                                    <ChevronRight className={`w-5 h-5 text-zinc-600 hidden md:block shrink-0 ${
                                        simulationStep > idx ? "text-emerald-500/40" : ""
                                    }`} />
                                )}
                            </React.Fragment>
                        );
                    })}
                </div>
            </div>

            {/* Prompt Controller */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Control Panel Card */}
                <div className="lg:col-span-1 p-6 rounded-2xl bg-zinc-900/60 border border-white/5 flex flex-col justify-between backdrop-blur-md gap-6">
                    <div className="space-y-4">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                            Crew prompt settings
                        </h4>
                        
                        {/* Selector presets */}
                        <div className="space-y-2">
                            <label className="text-[10px] text-zinc-500 uppercase tracking-widest font-extrabold">
                                Game Presets
                            </label>
                            <div className="grid grid-cols-1 gap-2">
                                {PRESETS.map(preset => (
                                    <button
                                        key={preset.id}
                                        onClick={() => selectPreset(preset.id, preset.prompt)}
                                        disabled={isSimulating}
                                        className={`px-3 py-2.5 rounded-xl border text-left text-xs font-semibold transition-all flex items-center justify-between ${
                                            selectedGameId === preset.id
                                                ? "bg-purple-500/10 border-purple-500/40 text-purple-200"
                                                : "bg-black/30 border-white/5 hover:border-white/10 text-zinc-400 disabled:opacity-50"
                                        }`}
                                    >
                                        <span>{preset.name}</span>
                                        <ChevronRight className="w-3.5 h-3.5 opacity-65" />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Text Prompt Area */}
                        <div className="space-y-2">
                            <label className="text-[10px] text-zinc-500 uppercase tracking-widest font-extrabold">
                                Prompt for Crew
                            </label>
                            <textarea
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                disabled={isSimulating}
                                rows={3}
                                className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/5 text-xs text-zinc-200 font-medium placeholder-zinc-600 focus:outline-hidden focus:border-purple-500/30 transition-all resize-none disabled:opacity-50"
                            />
                        </div>
                    </div>

                    <button
                        onClick={runSimulation}
                        disabled={isSimulating}
                        className="w-full py-3 px-4 bg-linear-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
                    >
                        {isSimulating ? (
                            <>
                                <RefreshCw className="w-4 h-4 animate-spin" />
                                <span>Running Simulation ({Math.round(simulatedProgress)}%)</span>
                            </>
                        ) : (
                            <>
                                <Play className="w-4 h-4" />
                                <span>Initiate CrewAI Agents</span>
                            </>
                        )}
                    </button>
                </div>

                {/* Simulated Logs Terminal */}
                <div className="lg:col-span-2 p-6 rounded-2xl bg-black/90 border border-white/5 flex flex-col h-[320px] backdrop-blur-md">
                    <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-3">
                        <div className="flex items-center gap-2">
                            <TerminalIcon className="w-4 h-4 text-purple-400" />
                            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                                CrewAI Log Terminal
                            </span>
                        </div>
                        <span className="px-2 py-0.5 rounded bg-zinc-900 text-[10px] font-mono text-zinc-500">
                            model: gemini-2.5-flash
                        </span>
                    </div>

                    <div className="flex-1 overflow-y-auto font-mono text-xs text-zinc-300 space-y-3 pr-2 scrollbar-thin select-text">
                        {logs.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-zinc-500 text-center gap-2">
                                <AlertCircle className="w-6 h-6 text-zinc-600" />
                                <p className="text-[11px] leading-relaxed max-w-xs">
                                    Awaiting execution sequence... Click "Initiate CrewAI Agents" to trigger pipeline output.
                                </p>
                            </div>
                        ) : (
                            logs.map((log, index) => (
                                <div key={index} className="space-y-1">
                                    <div className="flex items-center gap-2 text-[10px] text-zinc-500">
                                        <span>[{log.timestamp}]</span>
                                        <span className="font-bold text-purple-400/80">{log.agentName}</span>
                                    </div>
                                    {log.type === "code" ? (
                                        <pre className="p-3 bg-zinc-900/60 rounded-lg text-emerald-400 border border-white/5 overflow-x-auto text-[11px]">
                                            <code>{log.text}</code>
                                        </pre>
                                    ) : (
                                        <p className={`whitespace-pre-wrap text-[11px] leading-relaxed ${
                                            log.type === "success" ? "text-emerald-400" : "text-zinc-300"
                                        }`}>
                                            {log.text}
                                        </p>
                                    )}
                                </div>
                            ))
                        )}
                        <div ref={terminalEndRef} />
                    </div>
                </div>
            </div>

            {/* Runtime Stage & Python Code Viewer */}
            <AnimatePresence mode="wait">
                {simulationStep === 3 && (
                    <motion.div 
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        className="rounded-2xl border border-white/5 bg-zinc-900/60 backdrop-blur-md overflow-hidden"
                    >
                        {/* Tab header */}
                        <div className="flex items-center justify-between bg-black/40 border-b border-white/5 px-6 py-4">
                            <div className="flex items-center gap-2">
                                <Gamepad2 className="w-5 h-5 text-indigo-400" />
                                <h4 className="text-sm font-extrabold text-foreground uppercase tracking-wide">
                                    CrewAI Output Sandbox
                                </h4>
                            </div>

                            <div className="flex gap-2">
                                <button
                                    onClick={() => setActiveStudioTab("runtime")}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                                        activeStudioTab === "runtime"
                                            ? "bg-indigo-500/15 border border-indigo-500/30 text-indigo-300"
                                            : "bg-transparent border border-transparent text-zinc-500 hover:text-zinc-300"
                                    }`}
                                >
                                    <Gamepad2 className="w-3.5 h-3.5" />
                                    <span>Browser Sandbox</span>
                                </button>
                                <button
                                    onClick={() => setActiveStudioTab("code")}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                                        activeStudioTab === "code"
                                            ? "bg-indigo-500/15 border border-indigo-500/30 text-indigo-300"
                                            : "bg-transparent border border-transparent text-zinc-500 hover:text-zinc-300"
                                    }`}
                                >
                                    <Code className="w-3.5 h-3.5" />
                                    <span>Source Code (Python)</span>
                                </button>
                            </div>
                        </div>

                        {/* Tab Contents */}
                        <div className="p-6">
                            {activeStudioTab === "runtime" ? (
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                    {/* Game Console Stage */}
                                    <div className="lg:col-span-2 flex flex-col items-center justify-center p-4 rounded-xl bg-black border border-white/5 relative">
                                        <canvas
                                            ref={canvasRef}
                                            width={500}
                                            height={375}
                                            className="max-w-full rounded-lg shadow-2xl border border-white/5 aspect-[4/3] bg-zinc-950"
                                        />
                                    </div>

                                    {/* Controller deck */}
                                    <div className="lg:col-span-1 flex flex-col justify-between p-6 rounded-xl bg-black/40 border border-white/5 gap-6">
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between">
                                                <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-extrabold">Active Simulator</span>
                                                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wide">{selectedGameId.replace("-", " ")}</span>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="p-3 bg-zinc-900/60 border border-white/5 rounded-xl text-center">
                                                    <p className="text-[10px] text-zinc-500 uppercase font-bold">SCORE</p>
                                                    <p className="text-lg font-mono font-extrabold text-emerald-400 mt-1">
                                                        {gameEngineState.current.score}
                                                    </p>
                                                </div>
                                                <div className="p-3 bg-zinc-900/60 border border-white/5 rounded-xl text-center">
                                                    <p className="text-[10px] text-zinc-500 uppercase font-bold">HIGH SCORE</p>
                                                    <p className="text-lg font-mono font-extrabold text-indigo-400 mt-1">
                                                        {gameEngineState.current.highScore || 120}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="space-y-2 p-3 bg-zinc-900/30 border border-white/5 rounded-xl text-zinc-400 text-xs">
                                                <p className="font-bold text-zinc-300 uppercase tracking-wider text-[10px]">Controls:</p>
                                                {selectedGameId === "space-invaders" && (
                                                    <p className="font-mono leading-relaxed text-[11px]">
                                                        ← / → : Move ship<br />
                                                        [Spacebar] : Shoot bullet
                                                    </p>
                                                )}
                                                {selectedGameId === "brick-breaker" && (
                                                    <p className="font-mono leading-relaxed text-[11px]">
                                                        ← / → : Move paddle<br />
                                                        [Ball bounces automatically]
                                                    </p>
                                                )}
                                                {selectedGameId === "snake" && (
                                                    <p className="font-mono leading-relaxed text-[11px]">
                                                        Arrows : Steer snake directions
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => initGameEngine(selectedGameId)}
                                            className="w-full py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-white/5 text-xs font-bold uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center gap-1.5"
                                        >
                                            <RefreshCw className="w-3.5 h-3.5" />
                                            <span>Restart Simulation</span>
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="p-4 rounded-xl bg-black border border-white/5 max-h-[400px] overflow-y-auto font-mono text-xs text-zinc-400 select-text pr-2 scrollbar-thin">
                                    <pre className="text-emerald-400">
                                        <code>{pythonPresets[selectedGameId]}</code>
                                    </pre>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
