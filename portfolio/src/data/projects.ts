import type { Project } from "../types";

export const PROJECTS: Project[] = [
  {
    id: "1",
    title: "NextGen Web Platform",
    description:
      "A full-stack PHP MVC application covering gaming, deliveries, events, blog, and reclamations. Two UI domains: Frontoffice (users) and Backoffice (admin). Real-time delivery tracking with MapLibre GL and an AI module for reclamation analysis.",
    category: "AI",
    thumbnailUrl: "/nextgen-preview.png",
    liveDemoUrl:
      "https://nextgenweb.infinityfreeapp.com/view/frontoffice/index.php",
    repoUrl: "https://github.com/rayenouerghui/Projet_nextgen",
    detailedContent: `## Overview

A comprehensive modern PHP application organized with an MVC-style architecture and modular features, covering multiple domains in a single platform.

## Key Features

- Dynamic Content & User Authentication
- Games Library & Ownership system
- Real-time Delivery Tracking (MapLibre GL + Leaflet)
- Events & Reservations management
- Blog, Ratings & Reclamations module
- Admin Dashboard (Backoffice)
- AI module for automated reclamation analysis

## Tech Stack

- PHP (45%) — MVC architecture, backend logic
- JavaScript (25%) — Frontend interactivity, maps
- MySQL (15%) — Relational database
- Python (10%) — AI/ML reclamation module
- CSS (5%) — Styling & responsive design`,
    technologies: "PHP,JavaScript,MySQL,Python,CSS,MapLibre GL,MVC",
    languages: [
      { name: "PHP", percentage: 45, color: "#777BB4", icon: "php" },
      { name: "JavaScript", percentage: 25, color: "#F7DF1E", icon: "javascript" },
      { name: "MySQL", percentage: 15, color: "#4479A1", icon: "mysql" },
      { name: "Python", percentage: 10, color: "#3776AB", icon: "python" },
      { name: "CSS", percentage: 5, color: "#1572B6", icon: "css3" },
    ],
    createdAt: "2024-06-01",
  },
  {
    id: "2",
    title: "Wizards of War — 2D Platformer",
    description:
      "A desktop 2D platformer game written in C using SDL 1.2. Features animated sprites, multiple levels, collectibles, collision detection, minigames, score saving, and full audio controls.",
    category: "Open Source",
    thumbnailUrl: "/game-sdl.png",
    liveDemoUrl:
      "https://drive.google.com/file/d/1MIwTbxxGLvfyqpgrifOJV8s3TzfB3AhF/view?usp=sharing",
    repoUrl: "https://github.com/rayenouerghui/Wizards-of-War",
    detailedContent: `## Overview

A desktop 2D platformer game built in C with SDL 1.2, using classic game architecture with a full game loop, sprite animation system, and level management.

## Key Features

- Animated Player Sprites & Movement Physics
- Multiple Level Backgrounds with Loading Animations
- Collectibles & Collision Detection System
- Score Saving & Integrated Minigames
- Menu System with Audio/Music Controls

## Tech Stack

- C (85%) — Core game engine & logic
- Assembly (10%) — Low-level optimizations
- Makefile (5%) — Build system`,
    technologies: "C,SDL 1.2,Assembly,Makefile",
    languages: [
      { name: "C", percentage: 85, color: "#A8B9CC", icon: "c" },
      { name: "Assembly", percentage: 10, color: "#6E4C13", icon: "embeddedc" },
      { name: "Makefile", percentage: 5, color: "#427819", icon: "linux" },
    ],
    createdAt: "2024-04-01",
  },
  {
    id: "3",
    title: "Trotinette Security — Embedded System",
    description:
      "An embedded security system for electric scooters using a PIC microcontroller. Features helmet detection, speed monitoring, anti-theft alarm, and real-time safety controls. Fully simulated in Proteus.",
    category: "Automation",
    thumbnailUrl: "/trotinette-security.png",
    liveDemoUrl: "https://rayenouerghui.github.io/securite-trotinnete/",
    repoUrl: "https://github.com/rayenouerghui/securite-trotinnete",
    detailedContent: `## Overview

An embedded security system for electric scooters using a PIC microcontroller, with complete hardware/software integration simulated in Proteus 8.

## Key Features

- Helmet Detection System (sensor-based)
- Speed Monitoring & Automatic Control
- Anti-Theft Alarm System
- LCD Display Interface for real-time feedback
- Real-time Safety Alerts

## Tech Stack

- C (70%) — PIC microcontroller firmware
- Assembly (20%) — Low-level PIC routines
- HTML (10%) — Project demo page`,
    technologies: "C,Assembly,PIC Microcontroller,Proteus,HTML",
    languages: [
      { name: "C", percentage: 70, color: "#A8B9CC", icon: "c" },
      { name: "Assembly", percentage: 20, color: "#6E4C13", icon: "embeddedc" },
      { name: "HTML", percentage: 10, color: "#E34F26", icon: "html5" },
    ],
    createdAt: "2024-02-01",
  },
];
