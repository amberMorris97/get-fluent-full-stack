# Get Fluent: Agent Setup Note

## Build
docker build -t agent-sandbox:get-fluent-full-stack .

## Run
docker run -it --rm `
  -v "${PWD}:/workspace" `
  -v claude-auth:/claude-auth `
  agent-sandbox:get-fluent-full-stack

- Mounted path: get-fluent-full-stack -> /workspace
- Network mode: bridge (Docker default; outbound internet allowed, no ports published)

## Smoke test
Command/prompt: Summarize the repo structure and write the summary to /workspace/agent-summary.md

Output:
Ran 2 shell commands 
Write(agent-summary.md)
    Wrote 73 lines to agent-summary.md

## Security decisions
Used --rm flag so the container's filesystem is discarded on exit; only the mounted project folder and Claude login volume persist.
Mounted C:\Users\amber\Desktop\launchcode\unit-2-final-project\get-fluent-full-stack -> /workspace.
Named claude-auth volume to persist login 
Added necessary JDK, Maven, and npm dependencies 
Created .dockerignore so there are no secrets in the image and credentials are supplied at runtime