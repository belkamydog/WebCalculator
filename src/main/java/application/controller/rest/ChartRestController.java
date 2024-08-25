package application.controller.rest;

import Chart.Chart;
import application.model.Chart.ChartModel;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ChartRestController {
    private ChartModel chart;

    @PostMapping("/chart")
    public void getChartExpression(ChartModel chartModel) {
        this.chart= chartModel;
    }

    @GetMapping("/chart")
    public Chart getChart() {
        try {
            chart.calculateChart();
        } catch (Exception ex) {
            System.err.println(ex.getMessage());
        }
        return chart;
    }
}
