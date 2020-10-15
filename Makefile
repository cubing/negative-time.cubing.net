all: deploy open

.PHONY: deploy
deploy:
	rsync -avz \
		--exclude .DS_Store \
		--exclude .git \
		--exclude admin \
		./ \
		towns.dreamhost.com:~/negative-time.cubing.net/
	@echo "\nDone deploying. Go to https://negative-time.cubing.net/\n"

.PHONY: open
open:
	open "https://negative-time.cubing.net/"
