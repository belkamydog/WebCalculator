package application.controller.rest;

import Deposit.AuxilaryTokens.BalanceAction;
import application.model.Deposit.ActionModel;
import application.model.Deposit.DepositModel;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

@RestController
public class DebitRestController {
    private DepositModel depositModel;
    private  final ArrayList<BalanceAction> push;
    private  final ArrayList<BalanceAction> pop;

    public DebitRestController(){
        push = new ArrayList<>();
        pop = new ArrayList<>();
    }

    @PostMapping("/debit/clear")
    public void clearDebit(){
        push.clear();
        pop.clear();
    }

    @PostMapping("/debit/addWithdrawalTable")
    public void getPopAmount(ActionModel action){
        pop.add(action);
    }

    @PostMapping("/debit/addReplenishmentTable")
    public void getPushAmount(ActionModel action){
        push.add(action);
    }

    @PostMapping("/debit")
    public void setDebitData(DepositModel depositModel){
        this.depositModel = depositModel;
    }

    @GetMapping("/debit/calculate")
        public DepositModel getDebitData(){
            depositModel.setPopMoney(pop);
            depositModel.setPushMoney(push);
            depositModel.calculate();
            return depositModel;
        }
}
