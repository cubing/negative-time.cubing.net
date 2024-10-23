all: deploy open

.PHONY: deploy
deploy:
	bun x @cubing/deploy

.PHONY: open
open:
	open "https://negative-time.cubing.net/"

.PHONY: dev-process-responses
dev-process-responses:
	bun run script/process-responses.ts

.PHONY: dev-serve
dev-serve:
	bun x serve src/static

.PHONY: setup
setup:
	bun install

.PHONY: clean
clean:
	rm -rf .cache parcel-cache dist

.PHONY: lint
lint:
	npx @biomejs/biome check ./src ./script

.PHONY: format
format:
	npx @biomejs/biome format --write ./src ./script

.PHONY: generate-scrambles
generate-scrambles:
	bun run "script/generate-scrambles.ts"
