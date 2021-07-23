clean:
	docker container rm gander
	docker image rm gander

up:
	npm run serve