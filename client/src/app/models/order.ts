import {FoodQuant} from './foodQuant';

export class Order{
	_id		: string
  mail_id		: string;
  total_cost : number;
  foods		: FoodQuant[];
  orderDate : Date;
};