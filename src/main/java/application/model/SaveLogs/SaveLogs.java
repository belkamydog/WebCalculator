package application.model.SaveLogs;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Component;

import java.io.File;
import java.io.FileWriter;
import java.time.LocalDateTime;
import java.util.Objects;

@Component
@NoArgsConstructor
@Getter
@Setter
public class SaveLogs {
    public enum Rotation{
        hour,
        day,
        month
    }

    public enum Status{
        CRITICAL,
        INFO
    }

    private Rotation rotation = Rotation.hour;

    public void writeLog(Status Status, String message){
        try {
            File theDir = new File("./logs");
            if (!theDir.exists()){
                theDir.mkdirs();
            }
            RotationData rotationData = new RotationData();
            checkLogFiles(rotationData);
            if (rotationData.isNeedNewRotation()){
                LocalDateTime now = LocalDateTime.now();
                String filename = "./logs/logs_"+now.toString()+".txt";
                FileWriter fileWriter = new FileWriter(filename, false);
                fileWriter.write("log "+ LocalDateTime.now().toString() + " " + message + "\n");
                fileWriter.close();
            }
            else{
                String filename = rotationData.getLastFileName();
                FileWriter fileWriter = new FileWriter("./logs/" + filename, true);
                fileWriter.write("log "+ LocalDateTime.now().toString() + " " + message + "\n");
                fileWriter.close();
            }
        }
        catch (Exception e) {
            System.err.println(e.getMessage());
        }
    }

    private void checkLogFiles(RotationData rotationData){
        boolean result = false;
        String filename = "";
        File f = new File("./logs/");
        for (File file : Objects.requireNonNull(f.listFiles())) {
            result = checkRotation(file.getName());
            filename = file.getName();
            if (result) break;
        }
        rotationData.setNeedNewRotation(!result);
        rotationData.setLastFileName(filename);
        System.err.println(result);
    }

    private boolean checkRotation(String fileName){
        boolean result = false;
        LocalDateTime now = LocalDateTime.now();
        String fileTime = fileName.split("_")[1].split("\\.")[0];
        LocalDateTime fileLocalDateTime = LocalDateTime.parse(fileTime);
        if (rotation == Rotation.hour) fileLocalDateTime = fileLocalDateTime.plusHours(1);
        else if (rotation == Rotation.day) fileLocalDateTime = fileLocalDateTime.plusDays(1);
        else if (rotation == Rotation.month) fileLocalDateTime = fileLocalDateTime.plusMonths(1);
        System.err.println(fileLocalDateTime+"!");
        if (fileLocalDateTime.isAfter(now)) {
            result = true;
        }
        return result;
    }

    private void deleteLogs(){
        File file = new File("./logs/");
        for (File f : Objects.requireNonNull(file.listFiles())) {
            f.delete();
        }
    }

    @Setter
    @Getter
    private static class RotationData {
        boolean needNewRotation;
        String lastFileName;
    }
}
