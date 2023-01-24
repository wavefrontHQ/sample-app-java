```
VMware has ended active development of this project, this repository will no longer be updated
```
# sample-app-java
This is a sample java application called beachshirts which makes cool shirts for beach. 
Beachshirts is built with a microservices architecture composed of dropwizard and gRPC frameworks.

### Running Application locally
- Build the application by running `mvn clean install` from the root directory of the project.
- Now run all the services using below commands from root directory of the project. 
```
java -jar ./shopping/target/shopping-0.9.0-SNAPSHOT.jar server ./shopping/app.yaml
java -jar ./styling/target/styling-0.9.0-SNAPSHOT.jar server ./styling/app.yaml
java -jar ./printing/target/printing-0.9.0-SNAPSHOT.jar ./printing/app.yaml
java -jar ./packaging/target/packaging-0.9.0-SNAPSHOT.jar ./packaging/app.yaml
java -jar ./delivery/target/delivery-0.9.0-SNAPSHOT.jar  --spring.config.location=./delivery/src/main/resources/application.yml 
```
- Now view the shopping menus using HTTP GET request: `http://localhost:50050/api/shop/menu`
- Order shirts using HTTP POST request: 
```
http://localhost:50050/api/shop/order
Payload: {"styleName" : "testStyle1","quantity" : 5}
```
- Optionally you can run a load generation script included in the project to generate requests 
using the below command from the root directory of the project.
```
java -jar ./loadgen/target/loadgen-0.9.0-SNAPSHOT.jar localhost 50050 2 
```
