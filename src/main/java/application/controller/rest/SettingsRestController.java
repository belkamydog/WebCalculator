package application.controller.rest;

import application.model.SaveLogs.SaveLogs;
import application.model.Settings.Settings;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class SettingsRestController {
    private Settings styleSettings = new Settings("black", "lightgrey", "black", "white");
    @Autowired
    private SaveLogs saveLogs;

    @PostMapping("/settings/save")
    public void saveSettings(Settings styleSettings) {
        this.styleSettings = styleSettings;
        System.err.println(styleSettings.getBackgroundColor());
    }
    @GetMapping("/settings/get")
    public Settings getSettings() {
        return styleSettings;
    }

    @PostMapping("/settings/rotation")
        public void rotationSettings(@RequestParam ("rotation") String rotation) {
            System.err.println(rotation);
            SaveLogs.Rotation rot;
            if (rotation.equals(SaveLogs.Rotation.hour.name())) rot = SaveLogs.Rotation.hour;
            else if (rotation.equals(SaveLogs.Rotation.day.name())) rot = SaveLogs.Rotation.day;
            else rot = SaveLogs.Rotation.month;
            saveLogs.setRotation(rot);
        }
}
