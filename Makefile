REPORTER = spec
TIMEOUT = 5000

install:
	@npm install

test:
	@NODE_ENV=test ./node_modules/mocha/bin/mocha \
		--reporter $(REPORTER) \
		--timeout $(TIMEOUT)

test-cov:
	@jscoverage src src-cov
	@JSCOV=1 $(MAKE) test REPORTER=html-cov > coverage.html && open coverage.html
	@rm -rf ./src-cov

clean:
	rm -rf src-cov
	rm -f coverage.html

.PHONY: test