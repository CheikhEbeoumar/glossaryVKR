# Project Plan — Glossary + Semantic Graph (VKR)

Thesis topic: "Study of SSR, SSG and CSR rendering methods in web frameworks"

Stage 1 (15.09.2025) — Completed items for this stage
- Create repository skeleton
- Seed glossary data (terms + definitions + relationships + source links)
- Prepare initial README and project plan

Deliverable: repository with README, PROJECT_PLAN.md and backend/data.json

Overall stages (for context)
1) Briefing and planning — 15.09.2025
   - Safety briefing; finalize timeline & plan.

2) Create glossary + Web API — 16.09.2025 – 16.10.2025
   - Implement REST API endpoints:
     - GET /api/terms
     - GET /api/terms/:id
     - GET /api/graph
   - Containerize the API (Dockerfile)

3) Create semantic graph (MindMap) + frontend — 17.10.2025 – 02.12.2025
   - Frontend: card view for glossary, semantic graph visualization
   - Demonstrate SSR / SSG / CSR rendering strategies (Next.js recommended)

4) Combined Docker image for whole app — 03.12.2025 – 21.01.2026
   - Multi-stage Dockerfile to build frontend and backend into a single image
   - Justify container format and compare local alternatives

5) Documentation & final report — 22.01.2026 – 28.01.2026
   - Deployment instructions and final PDF report with screenshots and conclusions

Stage 1 tasks (detailed)
- Task A: Create repository skeleton and add files
- Task B: Prepare seed glossary JSON with terms, relationships, and source links
- Task C: Draft initial README and plan (this file)
- Deliverable: commit with above files and instructions to push repo

Acceptance criteria for Stage 1
- Repo contains README.md, PROJECT_PLAN.md
- Seed data exists at backend/data.json and is loadable by a simple server
- Commit history shows the Stage 1 commit

Approach and tech choices (short)
- Backend: Node.js + Express (simple and easy to containerize)
- Frontend: Next.js (allows SSR/SSG/CSR demos)
- Persistence: stage 2 will use a JSON file or lowdb / SQLite for simplicity during development