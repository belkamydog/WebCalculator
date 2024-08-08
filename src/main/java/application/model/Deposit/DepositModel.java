package application.model.Deposit;

import Deposit.AuxilaryTokens.BalanceAction;
import Deposit.AuxilaryTokens.TimeToken;
import Deposit.DepositCalculator;
import lombok.Getter;
import lombok.Setter;
import org.jetbrains.annotations.NotNull;

import java.time.LocalDate;
import java.util.ArrayList;

@Getter
@Setter
public class DepositModel  {
    DepositCalculator depositCalculator;
    private double interestCharges;
    private double resultDepositAmount;
    private double tax;
    private double capitalGains;
    private ArrayList<TimeToken> statistic;

    private ArrayList<BalanceAction> pushMoney;
    private ArrayList<BalanceAction> popMoney;

    public DepositModel(long startAmount, int placementPeriod, @NotNull String periodType, double interestRate, double taxRate, boolean capitalisation, String startDate, String paymentType) {
        DepositCalculator.termSelect termPeriod;
        DepositCalculator.termSelect termPayment;
        if (periodType.equals(DepositCalculator.termSelect.day.name())) termPeriod = DepositCalculator.termSelect.day;
        else if (periodType.equals(DepositCalculator.termSelect.month.name())) termPeriod = DepositCalculator.termSelect.month;
        else termPeriod = DepositCalculator.termSelect.year;
        if (paymentType.equals(DepositCalculator.termSelect.day.name())) termPayment = DepositCalculator.termSelect.day;
        else if (paymentType.equals(DepositCalculator.termSelect.month.name())) termPayment = DepositCalculator.termSelect.month;
        else termPayment = DepositCalculator.termSelect.year;
        depositCalculator= new DepositCalculator(startAmount, placementPeriod, termPeriod, interestRate, taxRate, capitalisation, LocalDate.parse(startDate), termPayment);
    }
    public void calculate(){
        depositCalculator.setPushMoney(pushMoney);
        depositCalculator.setPopMoney(popMoney);
        depositCalculator.calculate();
        interestCharges = depositCalculator.getInterestCharges();
        resultDepositAmount = depositCalculator.getResultDepositAmount();
        tax = depositCalculator.getTax();
        capitalGains = depositCalculator.getCapitalGains();
        statistic = depositCalculator.getStatistic();
    }
}
