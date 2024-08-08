package application.model.SaveLogs;

import lombok.Getter;

import java.io.FileWriter;
import java.io.IOException;
import java.time.LocalDateTime;

@Getter
public class SaveLogs {
    public enum Status{
        CRITICAL,
        INFO
    }
    private final LocalDateTime logDateTime = LocalDateTime.now();

    private final String message;

    public SaveLogs(Status Status, String message) throws IOException {
        this.message = message;
        try {
            FileWriter fileWriter = new FileWriter("log.txt", true);
            fileWriter.write("log "+ logDateTime + " " + message + "\n");
            fileWriter.close();
        }
        catch (Exception e) {
            System.err.println(e.getMessage());;
        }
    }

    private void createLog(){

    }
}
