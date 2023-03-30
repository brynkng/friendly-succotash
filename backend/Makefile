init-local: 
	pip install -r requirements.txt
	make run-local

run-local:
	export ENV='local'
	make run

run-production:
	export ENV='PROD'
	make run

run:
	flask run 

tests:
	python -m unittest