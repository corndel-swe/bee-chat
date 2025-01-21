# Set up Beechat

This is how to setup the Bee chat repo with Javalin using Intellij.

## Create Server module

1. Delete server folder
2. Go to File -> New -> New Module
    - Select Generators -> Maven Archetype
        - Name = server
        - Archetype = org.apache.maven.archetypes:maven-archetype-archetype
    - Create

## Add Javalin Deps to pom.xml

Add the following dependencies to the pom.

```xml
 <dependencies>
    <dependency>
      <groupId>io.javalin</groupId>
      <artifactId>javalin-bundle</artifactId>
      <version>6.4.0</version>
    </dependency>
    <dependency>
      <groupId>com.j2html</groupId>
      <artifactId>j2html</artifactId>
      <version>1.6.0</version>
    </dependency>
  </dependencies>
  <build>
    <plugins>
      <plugin>
        <groupId>org.apache.maven.plugins</groupId>
        <artifactId>maven-compiler-plugin</artifactId>
        <configuration>
          <source>9</source>
          <target>9</target>
        </configuration>
      </plugin>
    </plugins>
  </build>
```

## Create Javalin WS Server

1. Inside src/main create a java folder
2. Create a workshop.Main class and set up the Server

```java
import io.javalin.Javalin;

import java.time.Duration;

public class workshop.Main {

    public static void main(String[] args) {

        Javalin app = Javalin.create(javalinConfig -> {
            // Modifying the WebSocketServletFactory to set the socket timeout to 120 seconds
            javalinConfig.jetty.modifyWebSocketServletFactory(jettyWebSocketServletFactory ->
                    jettyWebSocketServletFactory.setIdleTimeout(Duration.ofSeconds(120))
            );
        });

        app.ws("/", wsConfig -> {

            wsConfig.onConnect((connectContext) -> {
                System.out.println("Connected: " + connectContext.sessionId());
            });

            wsConfig.onMessage((messageContext) -> {
                System.out.println("workshop.Message: " + messageContext.sessionId());
            });

            wsConfig.onClose((closeContext) -> {
                System.out.println("Closed: " + closeContext.sessionId());
            });

            wsConfig.onError((errorContext) -> {
                System.out.println("Error: " + errorContext.sessionId());
            });

        });

        app.start(5001);
    }

}
```

Once the application is running go into client right click on `index.html` and select Open in -> Browser -> Default