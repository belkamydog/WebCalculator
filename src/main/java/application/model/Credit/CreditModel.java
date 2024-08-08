package application.model.Credit;

import Credit.Credit;
import lombok.Getter;
import org.jetbrains.annotations.NotNull;

import java.time.LocalDate;

@Getter
public class CreditModel {
    private final Credit credit;
    public CreditModel(@NotNull String paymentType, double loanAmount, Double interestRate, Integer loanTerm, String loanTermType, String loanDate) {
        Credit.creditPaymentType pType;
        Credit.creditTermType tType;
        if (paymentType.equals(Credit.creditPaymentType.annuity.name())) pType = Credit.creditPaymentType.annuity;
        else pType = Credit.creditPaymentType.differently;
        if (loanTermType.equals(Credit.creditTermType.month.name())) tType = Credit.creditTermType.month;
        else tType = Credit.creditTermType.year;
        credit = new Credit(pType, loanAmount, interestRate, loanTerm, tType, LocalDate.parse(loanDate));
    }
    public void calculate(){
        credit.calculate();
    }
}
