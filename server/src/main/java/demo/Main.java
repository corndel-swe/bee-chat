package demo;

import io.javalin.Javalin;

import java.time.Duration;
import java.util.Map;

public class Main {

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
                connectContext.send(Map.of("content", "Hello " + connectContext.sessionId() + " from the server."));
            });

            wsConfig.onMessage((messageContext) -> {
                System.out.println("Message: " + messageContext.sessionId());
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
