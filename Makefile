## Tasks

test: tcBuild

preRelease: build
	PRERELEASE=true tc-builder run

docs: FORCE
	cd src; ../node_modules/.bin/typedoc --out ../docs main --target es6 --ignoreCompilerErrors --mode modules --module commonjs --hideGenerator --excludePrivate --name 'travis-builder $(VERSION)'

serveDocs:
	cd docs; python -m SimpleHTTPServer 8000

travis: build
	ts-node ./scripts/builder.ts

## Dependencies

build: FORCE
	tc-builder compile

clean:
	rm -rf build

info:
	node --version
	npm --version
	tsc --version
	typedoc --version

FORCE:
