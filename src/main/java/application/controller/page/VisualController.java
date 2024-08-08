package application.controller.page;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping
public class VisualController {
    @GetMapping("/")
    public String mainPage() {return "main-page";}

    @GetMapping("/engineer")
    public  String engineerPage() {
        return "engineer";
    }

    @GetMapping("/credit")
    public  String creditPage() {return "credit";}

    @GetMapping("/debit")
    public  String debitPage() {return "deposit";}

    @GetMapping("/settings")
    public  String instructionPage() {return "settings";}

}
