.PHONY: run 

api:
	python3 Backend/main.py

scraping:
	python3 Backend/scraping/get-data.py