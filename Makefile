install:
	@npm install

test:
	@node ./node_modules/mocha/bin/mocha

.PHONY: test