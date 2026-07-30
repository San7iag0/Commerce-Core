# -----------------------------
# Application
# -----------------------------

dev:
	npm run start:dev

build:
	npm run build

start:
	npm run start

lint:
	npm run lint

test:
	npm test

# -----------------------------
# Docker
# -----------------------------

up:
	docker compose up -d

down:
	docker compose down

restart:
	docker compose down
	docker compose up -d

logs:
	docker compose logs -f

ps:
	docker compose ps

# -----------------------------
# Prisma
# -----------------------------

generate:
	npx prisma generate

migrate:
	npx prisma migrate dev

deploy:
	npx prisma migrate deploy

studio:
	npx prisma studio

reset-db:
	npx prisma migrate reset

# -----------------------------
# Utilities
# -----------------------------

format:
	npx prettier --write .

clean:
	rm -rf dist