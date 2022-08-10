import { IntegerDataType } from "sequelize/types";

export interface ClientType {
  name: String;
  user_mail: String;
  born_date: String;
  password: string;
  rating: Integer;
  notification: Array[String];
  idClient: String;
}

export interface WorkerType {
  id: String;
  name: String;
  user_mail: String;
  born_date: Date;
  password: string;
  rating: Integer;
  profession: Array[String];
  skills: Array[String];
  premium: Boolean;
  photo: String;
}

export interface ReviewType {
  idReview: String;
  valoration: Integer;
  review_description: String;
}

export interface OfferType {
  idOffer: integer;
  title: String;
  max_remuneration: Integer;
  max_remuneration: Integer;
  offer_description: String;
  post_duration_time: Date;
  work_duration_time: String;
  photo: String;
  profession: Array[String];
  state: String;
}

export interface PortfolioType {
  title: String;
  photo: Text;
  portfolio_description: Text;
}

export interface ProposalType {
  idProposal: String;
  remuneration: Integer;
  proposal_description: String;
  worked_time: String;
  state: String;
}

export interface ReviewType {
  valoration: Number;
  review_description: String;
}
