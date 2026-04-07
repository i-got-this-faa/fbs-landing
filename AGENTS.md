## general guidelines:

- use bun for the package manager
- when installing new packages, use bun add instead of manually editing the package.json file
- dont build the project locally or create dev environment.
- dont mix logic with ui components, keep them separate
- avoid as any at all costs, try to infer types from functions as much as possible
- use tailwindcss for styling whenever possible, only resort to custom css if needed
- run bun run lint to check for linting errors, bun run format, and bun run check to check for errors after making changes.
- dont write monolithic files, break them down into smaller, reusable pieces
- use components for UI

## Before You Start Coding

### Ask Yourself:

1. **Does this already exist?**
   - Search the codebase for similar functionality
   - Check the utility folders listed in "Core Principles"

2. **Can I extend something existing?**
   - Maybe a utility just needs one more function
   - Maybe a component just needs one more prop

3. **Where should this live?**
   - Is it reusable? → Put in `utils/` or `pkg/`
   - Is it specific to one feature? → Keep it local
   - Is it a constant? → Put in config

4. **Am I duplicating anything?**
   - If you're copying code, stop and extract it
   - If you're defining the same type twice, use the existing one

5. **Is this function doing too much?**
   - Can you describe it in one sentence without "and"?
   - If not, break it down
