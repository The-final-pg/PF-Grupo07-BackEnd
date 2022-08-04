import { IntegerDataType } from "sequelize/types"


export interface ClientType {
    name:String,
    user_mail:String,
    born_date:String,
    password:String,
    rating:Integer,
    notification:Array[String],
    idClient:String
}

export interface WorkerType {
    id:String,
    name:String,
    user_mail:String,
    born_date:Date,
    password:String,
    rating:Integer,
    tags:Array[String],
    skills:Array[String],
    premium:Boolean,
    photo:String,
}

export interface ReviewType {
    idReview:String,
    valoration:Integer, 
    review_description:String, 
}

export interface OfferType {
    idOffer: integer,
    title: SString,
    remuneration: Array[Integer],
    offer_description: String,
    post_duration_time: Date,
    work_duration_time: Date,
    photo: String,
    tags: Array[String],
    state: String
}

export interface PortfolioType {
    idPortfolio: String,
    title: String,
    photo: String,
    portfolio_description: String
}

export interface ProposalType {
    idProposal: String,
    remuneration: Integer,
    proposal_description: String,
    worked_time: String,
    state:String,
}
