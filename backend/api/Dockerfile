FROM python:3.8.20-slim

RUN mkdir /app

WORKDIR /app

COPY ../requirement.txt requirements.txt

RUN pip install -r requirements.txt

COPY recommendation_objects/ recommendation_objects/
COPY agents/ agents/
COPY agent_controller.py agent_controller.py
COPY main.py main.py
COPY .env /app/.env
# Testing Dockerfile # TO REMOVE AFTER TESTING
COPY test_input.json test_input.json


ENTRYPOINT [ "python", "main.py"]