package application;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

import java.io.IOException;

@SpringBootApplication
@ComponentScan("application.controller")
@ComponentScan("application.model")
public class Main {
	public static void main(String[] args) throws IOException {
		SpringApplication.run(Main.class, args);
		boolean isWindows = System.getProperty("os.name").toLowerCase().startsWith("windows");
		ProcessBuilder processBuilder = new ProcessBuilder();
		if (isWindows) processBuilder.command("cmd.exe", "/c", "open http://localhost:8080");
		else processBuilder.command("sh", "-c", "open http://localhost:8080");
		processBuilder.start();
	}
}
