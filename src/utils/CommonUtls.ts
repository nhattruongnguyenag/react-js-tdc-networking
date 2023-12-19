import { isNumber } from 'util'
import { SELECTED_CONVERSATION, SURVEY_POST_REQUEST, USER_LOGIN_KEY } from '../constants/KeyValue'
import { Conversation } from '../types/Conversation'
import { SurveyConductRequest } from '../types/request/SurveyConductRequest'
import { SurveyPostRequest } from '../types/request/SurveyPostRequest'
import { User } from '../types/User'

export function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function getUserLogin(): User | null {
  const json = sessionStorage.getItem(USER_LOGIN_KEY)
  if (json) {
    return JSON.parse(json ?? '') as User
  }
  return null
}

export function getSelectedConversation(): Conversation | null {
  const json = sessionStorage.getItem(SELECTED_CONVERSATION)
  if (json) {
    return JSON.parse(json ?? '') as Conversation
  }
  return null
}

export function setSurveyPostRequestToSesstionStorage(surveyPost: SurveyPostRequest) {
  sessionStorage.setItem(SURVEY_POST_REQUEST, JSON.stringify(surveyPost))
}

export function getSurveyPostRequest(): SurveyPostRequest | null {
  const json = sessionStorage.getItem(SURVEY_POST_REQUEST)
  if (json) {
    return JSON.parse(json ?? '') as SurveyPostRequest
  }
  return null
}

export function slugify(str: string){
	const a = 'àáäâãåăæąçćčđďèéěėëêęğǵḧìíïîįłḿǹńňñòóöôœøṕŕřßşśšșťțùúüûǘůűūųẃẍÿýźžż·/_,:;'
	const b = 'aaaaaaaaacccddeeeeeeegghiiiiilmnnnnooooooprrsssssttuuuuuuuuuwxyyzzz------'
	const p = new RegExp(a.split('').join('|'), 'g')
	return str.toString().toLowerCase()
	.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a')
	.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e')
	.replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i')
	.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o')
	.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u')
	.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y')
	.replace(/đ/gi, 'd')
	.replace(/\s+/g, '-') 
	.replace(p, c => b.charAt(a.indexOf(c)))
	.replace(/&/g, '-and-')
	.replace(/[^\w\-]+/g, '')
	.replace(/\-\-+/g, '-')
	.replace(/^-+/, '')
	.replace(/-+$/, '')
}

export function getIdFromSlug(slug: string): number | null {
  const postId = slug.substring(slug.lastIndexOf('-') + 1)
  if (!isNaN(+postId)) {
    return parseInt(postId)
  }
  return null
}

export function getIdFromMultiSlug(slug: string): number | null {
  const postId = slug.substring(slug.lastIndexOf('-') + 1)
  if (!isNaN(+postId)) {
    return parseInt(postId)
  }
  return null
}

export function getTokenFromSlug(slug: string): string | null {
  const string = slug;
  if (string != '') {
    return string
  }
  return null
}
