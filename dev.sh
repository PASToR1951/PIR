#!/bin/bash

# Configuration
FRONTEND_DIR="./frontend"
BACKEND_DIR="./backend"
# Ensure Deno is in PATH
export PATH="$HOME/.deno/bin:$PATH"

# Colors for output
BLUE='\033[0;34m'
PINK='\033[0;35m'
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}🚀 Starting DepEd Guihulngan PIR System...${NC}"

# 1. Check PostgreSQL Service
if pg_isready > /dev/null 2>&1; then
    echo -e "${GREEN}✅ PostgreSQL is running.${NC}"
else
    echo -e "${RED}❌ PostgreSQL is not running or not accessible.${NC}"
    echo "Searching for service..."
    sudo systemctl start postgresql 2>/dev/null || echo "Please start your PostgreSQL service manually."
fi

# 2. Start Backend
echo -e "${PINK}📡 Starting Deno Backend (Oak)...${NC}"
cd $BACKEND_DIR
deno run --allow-read --allow-net --allow-env main.ts &
BACKEND_PID=$!
cd ..

# 3. Start Frontend
echo -e "${BLUE}💻 Starting Vite Frontend (React)...${NC}"
cd $FRONTEND_DIR
# Use 'npm run dev' but capture the PID of the actual vite process if possible
# or just the npm command.
npm run dev &
FRONTEND_PID=$!
cd ..

# Cleanup function
cleanup() {
    echo -e "\n${RED}🛑 Stopping services...${NC}"
    # Kill the process groups to ensure children die too
    kill -TERM -$BACKEND_PID 2>/dev/null || kill $BACKEND_PID 2>/dev/null
    kill -TERM -$FRONTEND_PID 2>/dev/null || kill $FRONTEND_PID 2>/dev/null
    echo -e "${GREEN}✅ All services terminated.${NC}"
    exit
}

# Trap SIGINT (Ctrl+C)
trap cleanup SIGINT SIGTERM

echo -e "${GREEN}✨ System handles are active!${NC}"
echo -e "   - ${BLUE}Frontend:${NC} http://localhost:5173"
echo -e "   - ${PINK}Backend: ${NC} http://localhost:8000"
echo -e "${NC}Press ${RED}Ctrl+C${NC} to stop everything safely."

# Keep script running
wait
