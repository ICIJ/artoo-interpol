bookmarks/artoo-interpol-wanted.bookmark.js: node_modules bookmark.js
	node_modules/.bin/gulp

node_modules: package.json
	npm install

clean:
	rm -rf build

.PHONY: clean
