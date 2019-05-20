Note app using spring boot and angular.

Build requirements
- java compiler
- maven


Build the server with ```mvn clean install``` from the root directory.
The produced .jar is located in ```notonserver/target```.
Once built, the server contains the static files produced from the client, so it can run everything.
The client can be built seperately with ```mvn clean install``` from ```/noteclient```, and ran seperately with ```ng serve``` from ```/noteclient```, allowing the use of auto-refreshing on file changes in the client code..

- server: run ```mvn spring-boot:run``` from notonserver/ (localhost:8080)
- client: run ```ng serve``` from notonclient/ (localhost:4200)


