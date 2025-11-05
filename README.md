# VKR Glossary — Thesis Project

Thesis topic: "Study of SSR, SSG and CSR rendering methods in web frameworks"

This repository contains initial Stage 1 artifacts:
- Project plan and timeline (PROJECT_PLAN.md)
- Seed glossary data (backend/data.json) with terms, definitions, sources, and a small semantic graph
- .gitignore and instructions to initialize the repository

Purpose of Stage 1:
- Create the repository, define the plan, and prepare seed data so Stage 2 (API implementation) can proceed quickly.

Suggested repository name: CheikhEbeoumar/vkr-glossary

Quick start (local)
1. Create project directory and initialize git:
   - mkdir vkr-glossary && cd vkr-glossary
   - git init
2. Copy the files from this message into the repository (README.md, PROJECT_PLAN.md, backend/data.json, .gitignore)
3. Commit:
   - git add .
   - git commit -m "Stage 1: initial project plan and seed glossary data"
4. Create remote repo and push (using GitHub CLI if available):
   - gh repo create CheikhEbeoumar/vkr-glossary --public --source=. --remote=origin --push
   or create repo on github.com and push:
   - git remote add origin https://github.com/<your-username>/vkr-glossary.git
   - git push -u origin main

Next steps (Stage 2): implement REST API to serve /api/terms and /api/graph, add a small backend server and Dockerfile. Tell me if you want me to create and push the repo now, or implement the backend next.