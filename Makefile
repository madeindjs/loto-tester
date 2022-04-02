db-init:
	rm db.sqlite3
	sqlite3 db.sqlite3 < migrations/01-init.sql

db-migrate: db-init
	node migrations/02-insert.js