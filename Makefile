.PHONY: check
check: lint

all: deploy open

.PHONY: deploy
deploy: setup
	bun x @cubing/deploy

.PHONY: open
open:
	open "https://negative-time.cubing.net/"

.PHONY: dev-process-responses
dev-process-responses: setup
	bun run script/process-responses.ts

.PHONY: dev-serve
dev-serve: setup
	bun x serve src/static

.PHONY: setup
setup:
	bun install --frozen-lockfile

RM_RF = bun -e 'process.argv.slice(1).map(p => process.getBuiltinModule("node:fs").rmSync(p, {recursive: true, force: true, maxRetries: 5}))' --

.PHONY: clean
clean:
	${RM_RF} ./.cache ./parcel-cache ./dist

.PHONY: reset
reset: clean
	${RM_RF} ./node_modules/

.PHONY: lint
lint: lint-biome lint-typescript

.PHONY: lint-biome
lint-biome: setup
	bun x -- bun-dx --package @biomejs/biome biome -- check

.PHONY: lint-typescript
lint-typescript: setup
	bun x -- bun-dx --package typescript tsc -- --project ./tsconfig.json

.PHONY: format
format: setup
	npx @biomejs/biome format --write ./src ./script

.PHONY: generate-scrambles
generate-scrambles: setup
	bun run "script/generate-scrambles.ts"
