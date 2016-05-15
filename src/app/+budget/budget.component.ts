import { Component, OnInit } from '@angular/core';

import { AccountService } from '../account/account.service';
import { Account } from '../account/account';
import { BudgetService } from '../budget/budget.service';
import { BadgeListComponent } from '../badge-list/badge-list.component';
import { GuideService } from '../guide/guide.service';
import { FinanceHealthIndicatorService } from '../finance-health-indicator/finance-health-indicator.service';

@Component({
  moduleId: module.id,
  selector: 'app-budget',
  templateUrl: 'budget.component.html',
  styleUrls: ['budget.component.css'],
  directives: [BadgeListComponent]
})
export class BudgetComponent implements OnInit {

  constructor(private accountService: AccountService, private budgetService: BudgetService, private guideService: GuideService, private financeHealthIndicatorService: FinanceHealthIndicatorService) {}
  model: any = {};
  accounts: Account[];
  editBudget: boolean = false;
  budgetBreakup: any = {};
  ngOnInit() {
  	this.budgetService.getBudget().then(budget => this.model.budget = budget);
  	this.accountService.getExpenseAccount().then(expenseAccount => {
  		this.accountService.getChildrenAccounts(expenseAccount).then(childrenAccounts => {
  			this.accounts = childrenAccounts;
  		})
  	});
  }
  edit(){
  	this.accounts.forEach(account => {
  		this.budgetBreakup[account.name] = account.budget;
  	});
  	this.editBudget = true;
  }
  updateBudget(){
  	this.accounts.forEach(account => {
  		account.budget = this.budgetBreakup[account.name];
  	});
  	this.budgetService.setBudget(this.model.budget).then(() => {
  		this.guideService.trigger();
  		this.financeHealthIndicatorService.updateFinanceHealthIndicator();
  		this.editBudget = false;
  	});
  	
  }

  cancel(){
  	this.budgetService.getBudget().then(budget => this.model.budget = budget);
  	this.editBudget = false;
  }
}
