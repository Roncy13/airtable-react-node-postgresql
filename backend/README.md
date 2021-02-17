# INSTRUCTIONS

## Steps to Run the App

1. copy .env-sample and make it .env, change all properties applied on your machine
2. npm install
3. create database air-table in your postgres
4. npm run typeorm migration:run
5. npm run dev

## Files To check

1. The Queue worker is in the src/utilities/queue.ts
2. The api is in the src/api/csv/csv.actions.ts
