package application.controller.rest;

import Chart.Chart;
import application.model.Engineer.EngineerModel;
import application.model.SaveLogs.SaveLogs;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;


@RestController
public class EngineerRestController {
    private EngineerModel engineerModel;
    private String infixExpression;

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

    @PostMapping("/chart")
    public void getChartExpression(@RequestParam("infixExpression") String infixExpression) {
        this.infixExpression = infixExpression;
    }

    @GetMapping("/chart")
    public Chart getChart() {
        Chart chart = new Chart(-10, 10, infixExpression);
        try {
            chart.calculateChart();
        } catch (Exception ex) {
            System.err.println(ex.getMessage());
        }
        return chart;
    }
}
