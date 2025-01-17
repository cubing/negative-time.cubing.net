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
	bun install --no-save

.PHONY: clean
clean:
	rm -rf .cache parcel-cache dist

.PHONY: lint
lint: setup
	npx @biomejs/biome check ./src ./script

.PHONY: format
format: setup
	npx @biomejs/biome format --write ./src ./script

.PHONY: generate-scrambles
generate-scrambles: setup
	bun run "script/generate-scrambles.ts"
