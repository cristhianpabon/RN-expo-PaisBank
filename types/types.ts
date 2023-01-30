import React from "react";

export type cardType = {
  id: number;
  issuer: string;
  name: string;
  expDate: string;
  lastDigits: number;
  balance: number;
  currency: string;
};

export type transactionType = {
  id: number;
  amount: string;
  transactionType: string;
  date: string;
};

export type transactionTypeValues =
  | {
      description: string;
      background: string;
      color: string;
      image: React.ReactNode;
    }
  | undefined;

export type contactType = {
  id: number;
  name: string;
  lastName: string;
  phone: string;
  addedDate: number;
};
