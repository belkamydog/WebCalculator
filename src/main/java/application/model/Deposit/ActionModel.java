package application.model.Deposit;


import java.time.LocalDate;

public class ActionModel extends Deposit.AuxilaryTokens.BalanceAction{

    public ActionModel(LocalDate date, long amount, String type) {
        super(date, amount, type);
    }
}
