## Running via docker
Run in terminal:

```
 docker-compose up
```
If you want to stop, press the keyboard shortcut first **Ctrl+C**, then enter in the terminal:
```
 docker-compose down
```
Rebuild images & start containers:
```
 docker compose up --build 
```
Сonnected services:

- PostgreSQL
- pgAdmin
- Express

After starting the app on port (4000 as default) you can open in your browser OpenAPI documentation
by typing http://localhost:4000/doc/.