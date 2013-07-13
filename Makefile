REPORTER = spec
TIMEOUT = 5000
TEST_UI = tdd
MOCHA_OPTS = 

install:
	@npm install

run-server:
	@node ./src/index.js

test:
	@NODE_ENV=test ./node_modules/mocha/bin/mocha \
		--reporter $(REPORTER) \
		--timeout $(TIMEOUT) \
		--ui $(TEST_UI) \
		--recursive \
		--colors \
		$(MOCHA_OPTS) \
		2> error.txt

test-coverage:
	@URLRAR_COV=1 $(MAKE) test \
		MOCHA_OPTS='--require blanket' \
		REPORTER=html-cov > coverage.html && open coverage.html

clean:
	@if [ -a coverage.html ]; \
	then \
		rm coverage.html; \
	fi

.PHONY: test