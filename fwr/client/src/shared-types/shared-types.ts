import { ObjectId } from "mongodb";

export type IdType = string;

export interface Indentifiable {
    _id?: IdType
}