package application.model.Settings;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Component;

@Getter
@Setter
@AllArgsConstructor
public class Settings {
    private String backgroundColor;
    private String displayColor;
    private String textColor;
    private String btnColor;
}
