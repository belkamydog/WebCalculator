package application.configuration;

import application.model.SaveLogs.SaveLogs;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.IOException;

@Configuration
public class AppConfiguration {
    @Bean
    public SaveLogs saveLogs() throws IOException {
        return new SaveLogs();
    }
}
