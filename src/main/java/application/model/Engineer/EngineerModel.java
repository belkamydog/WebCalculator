package application.model.Engineer;

import Engineer.EngineerCalculator;
import Engineer.PolskayaCalculator.PolskayaCalculator;
import lombok.Getter;
import org.jetbrains.annotations.NotNull;

@Getter
public class EngineerModel {
    private final String result;
    private final boolean status;
    private final String infixExpression;

    public EngineerModel(String inputData, @NotNull String mode, double xVal) {
        EngineerCalculator engineer;
        if (mode.equals(PolskayaCalculator.degreeOrRadian.deg.name())){
            engineer = new EngineerCalculator(inputData, PolskayaCalculator.degreeOrRadian.deg, xVal);
        }
        else {
            engineer = new EngineerCalculator(inputData, PolskayaCalculator.degreeOrRadian.rad, xVal);
        }
        engineer.calculate();
        result = engineer.getResultString();
        status = engineer.isValid();
        this.infixExpression = inputData;
    }
}
