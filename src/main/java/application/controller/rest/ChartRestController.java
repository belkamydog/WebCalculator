package application.controller.rest;

import Chart.Chart;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ChartRestController {
    private String infixExpression;

    @PostMapping("/chart")
    public void getChartExpression(@RequestParam("infixExpression") String infixExpression) {
        this.infixExpression = infixExpression;
    }

    @GetMapping("/chart")
    public Chart getChart() {
        Chart chart = new Chart(-10000, 10000, infixExpression, 0.5);
        try {
            chart.calculateChart();
        } catch (Exception ex) {
            System.err.println(ex.getMessage());
        }
        return chart;
    }
}
