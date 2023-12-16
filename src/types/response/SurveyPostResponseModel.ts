import { Question } from "../Question";
import { PostResponseModel } from "./PostResponseModel";

export interface SurveyPostResponseModel extends PostResponseModel {
    title: string
    description: string
    questions: Question[]
}