package application.controller.rest;

import application.model.Engineer.EngineerModel;
import application.model.Expression.Expression;
import application.model.SaveLogs.SaveLogs;
import application.repository.ExpressionRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
public class EngineerRestController {
    private EngineerModel engineerModel;
    private final ExpressionRepository expressionRepository;

    public EngineerRestController(ExpressionRepository expressionRepository) {
        this.expressionRepository = expressionRepository;
    }

    @GetMapping("/calculate")
    public EngineerModel getAnswer() {
        return engineerModel;
    }

    @PostMapping("/engineer")
    public void getExpression(EngineerModel engineerModel) throws IOException {
        try {
            this.engineerModel = engineerModel;
            SaveLogs saveLogs = new SaveLogs(SaveLogs.Status.INFO, engineerModel.getInfixExpression() + " " + engineerModel.getResult() + " " + engineerModel.isStatus());
        } catch (Exception ex) {
            SaveLogs saveLogs = new SaveLogs(SaveLogs.Status.CRITICAL, engineerModel.getInfixExpression() + " " + engineerModel.getResult() + " " + engineerModel.isStatus());
            System.err.println(ex.getMessage());
        }
    }

    @PostMapping("/engineer/save")
    public void saveExpression(@RequestParam ("expression") String expression) throws IOException {
        if (!expression.isEmpty()) {
            System.err.println(expression);
            System.err.println("test");
            Expression exp = new Expression();
            exp.setExpression(expression);
            expressionRepository.save(exp);
        }
    }

    @GetMapping("/engineer/show")
    public Iterable<Expression> showExpression() throws IOException {
        Iterable <Expression> expressionList = expressionRepository.findAll();
        return expressionList;
    }
}
