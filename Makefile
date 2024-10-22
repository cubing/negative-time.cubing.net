all: deploy open

.PHONY: deploy
deploy:
	rsync -avz \
		--exclude .DS_Store \
		--exclude .git \
		--exclude admin \
		./src/static \
		towns.dreamhost.com:~/negative-time.cubing.net/
	@echo "\nDone deploying. Go to https://negative-time.cubing.net/\n"

.PHONY: open
open:
	open "https://negative-time.cubing.net/"

.PHONY: dev
dev:
	bun run script/process-responses.ts

.PHONY: setup
setup:
	bun install

.PHONY: clean
clean:
	rm -rf .cache parcel-cache dist
