package application.controller.rest;

import application.model.Settings.Settings;
import org.springframework.web.bind.annotation.*;

@RestController
public class SettingsRestController {
    private Settings styleSettings = new Settings("black", "lightgrey", "black", "white");

    @PostMapping("/settings/save")
    public void saveSettings(Settings styleSettings) {
        this.styleSettings = styleSettings;
        System.err.println(styleSettings.getBackgroundColor());
    }
    @GetMapping("/settings/get")
    public Settings getSettings() {
        return styleSettings;
    }
}
