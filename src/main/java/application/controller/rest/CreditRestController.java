package application.controller.rest;

import application.model.Credit.CreditModel;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;

@RestController
public class CreditRestController {
    private CreditModel credit;

    @GetMapping("/credit/calculate")
    public CreditModel answer(){
        return credit;
    }

    @PostMapping("/credit")
    public void getData(CreditModel credit) throws ParseException {
        this.credit = credit;
        this.credit.calculate();
    }
}