Note app using spring boot and angular.

Build requirements
- java compiler
- maven
- angular


Build the .jar with ```mvn clean install``` from the root directory. The produced .jar is located in notonserver/target

The client and backend can be ran seperately for development convenience.
- backend: run ```mvn spring-boot:run``` from notonserver/
- frontend: run ```ng serve``` from notonclient/


