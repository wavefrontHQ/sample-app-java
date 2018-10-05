# sample-app-java
This is a sample java application called beachshirts which makes cool shirts for beach. Beachshirts is built with a microservices architecture composed of 
dropwizard and gRPC services.

###Running Application locally
- Build the application by running `mvn clean install` from the root directory of the project.
- Now run all the services using below commands from root directory of the project. 
```
java -jar ./shopping/target/shopping-1.0-SNAPSHOT.jar server ./shopping/app.yaml
java -jar ./styling/target/styling-1.0-SNAPSHOT.jar server ./styling/app.yaml
java -jar ./printing/target/printing-1.0-SNAPSHOT.jar ./printing/app.yaml
java -jar ./packaging/target/packaging-1.0-SNAPSHOT.jar ./packaging/app.yaml
```
- Now view the shopping menus using HTTP GET request: `http://localhost:50050/shop/menu`
- Order shirts using HTTP POST request: 
```
http://localhost:50050/shop/order
Payload: {"styleName" : "testStyle1","quantity" : 5}
```
