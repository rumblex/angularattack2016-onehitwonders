export class Account{
	name: string;
	parent: Account;
	amount: number;
	constructor(name: string, amount: number,  parent?: Account){
		this.parent = parent;
		this.name = name;
		this.amount = amount;
	}
	addAmount(amount: number){
		this.amount += amount;
		if(this.parent){
			this.parent.addAmount(amount);
		}
	}

	removeAmount(amount: number){
		this.amount -= amount;
		if(this.parent){
			this.parent.removeAmount(amount);
		}
	}
}