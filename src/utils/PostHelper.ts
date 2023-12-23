import { TYPE_NORMAL_POST, TYPE_RECRUITMENT_POST, TYPE_SURVEY_POST } from "../constants/Variables";
import { PostSearchRequest } from "../types/request/PostSearchRequest";
import { RecruitmentPostResponseModel } from "../types/response/RecruitmentPostResponseModel";
import { SurveyPostResponseModel } from "../types/response/SurveyPostResponseModel";
import { TextImagePostResponseModel } from "../types/response/TextImagePostResponseModel";

export function buildPostSearchRequest(postSearchRequest: PostSearchRequest) {
  let key: keyof PostSearchRequest
  let params: String[] = []

  for (key in postSearchRequest) {
    if (Boolean(postSearchRequest[key]) !== undefined && String(postSearchRequest[key]).trim().length > 0) {
      params.push(`${key}=${postSearchRequest[key]}`)
    }
  }

  console.log(params.join('&'))
  return params.join('&')
}

export function isRecruitmentPost(post?: any): post is RecruitmentPostResponseModel {
    return post !== undefined && post instanceof Object && post !== null && post.type === TYPE_RECRUITMENT_POST
}

export function isSurveyPost(post?: any): post is SurveyPostResponseModel {
    return post !== undefined && post instanceof Object && post !== null && post.type === TYPE_SURVEY_POST
}

export function isTextImagePost(post?: any): post is TextImagePostResponseModel {
    return post !== undefined && post instanceof Object && post !== null && post.type === TYPE_NORMAL_POST
}