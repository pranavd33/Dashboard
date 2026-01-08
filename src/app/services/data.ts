import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  // The static database
  private dbData: any = {
    'Loan': { 
      headers: ['ID', 'Name', 'Loan Type', 'Amount', 'Status', 'Date'], 
      rows: [
        ['L001', 'Rahul Patil', 'Home Loan', '₹ 25,00,000', 'Active', '12 Jan'], 
        ['L002', 'Amit Shah', 'Personal', '₹ 1,50,000', 'Pending', '15 Feb'], 
        ['L003', 'Sneha Gupta', 'Gold Loan', '₹ 50,000', 'Active', '10 Mar'], 
        ['L004', 'Vijay Kumar', 'Agri Loan', '₹ 5,00,000', 'Overdue', '05 Apr']
      ] 
    },
    'Saving': { 
      headers: ['Acc No', 'Name', 'Type', 'Balance', 'Branch', 'Last Txn'], 
      rows: [
        ['S101', 'Rahul Patil', 'Savings', '₹ 12,500', 'Malkapur', 'Credit'], 
        ['S102', 'Priya Singh', 'Current', '₹ 1,45,000', 'Pune', 'Debit'], 
        ['S103', 'Omkar Rane', 'Salary', '₹ 8,200', 'Malkapur', 'Credit']
      ] 
    },
    'Investment': { 
      headers: ['Inv ID', 'Investor', 'Plan', 'Amount', 'ROI', 'Maturity'], 
      rows: [
        ['I501', 'Rahul Patil', 'FD', '₹ 1,00,000', '7.5%', '2026'], 
        ['I502', 'Amit Shah', 'RD', '₹ 5,000/pm', '6.8%', '2027'], 
        ['I503', 'Sneha Gupta', 'Mutual Fund', '₹ 25,000', '12.4%', 'Open']
      ] 
    }
  };

  getData(type: string) {
    return this.dbData[type];
  }
}