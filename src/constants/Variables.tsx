import { SERVER_ADDRESS } from "./SystemConstant"

export const LIKE_ACTION = 0
export const COMMENT_ACTION = 1
export const SHOW_LIST_USER_REACTED = 2
export const GO_TO_PROFILE_ACTIONS = 0
export const NUMBER_MAX_CHARACTER = 1024
export const NUMBER_MIN_CHARACTER = 0
export const GO_TO_MENU_ACTIONS = 1
export const TYPE_NORMAL_POST = 'thong-thuong'
export const TYPE_RECRUITMENT_POST = 'tuyen-dung'
export const TYPE_SURVEY_POST = 'khao-sat'
export const TYPE_NORMAL_POST_TEXT = 'Thông thường';
export const TYPE_RECRUITMENT_POST_TEXT = 'Tuyển dụng';
export const TYPE_SURVEY_POST_TXT = 'Khảo sát';
export const CALL_ACTION = 0;
export const FOLLOW_ACTION = 1;
export const MESSENGER_ACTION = 2;
export const MENU_CLICK_ACTION = 3;
export const CHANGE_INFO_USER_CLICK_ACTION = 4;
export const AVATAR_CLICK = 5;
export const BACKGROUND_CLICK = 6;
export const AVATAR_CLICK_UPLOAD = 7;
export const BACKGROUND_CLICK_UPLOAD = 8;
export const SEE_BACKGROUND = 0;
export const SEE_AVATAR = 1;
export const CLICK_CAMERA_AVATAR_EVENT = 2;
export const CLICK_CAMERA_BACKGROUND_EVENT = 3;
export const CLICK_SAVE_POST_EVENT = 0;
export const CLICK_DELETE_POST_EVENT = 1;
export const CLICK_SEE_RESULT_POST_EVENT = 2;
export const CLICK_SEE_LIST_CV_POST_EVENT = 3;
export const CLICK_UN_SAVE_POST_EVENT = 4;
export const CLICK_UPDATE_POST_EVENT = 5;
export const STATUS_CREATED = 201;
export const STATUS_DELETED = 200;
export const FacultyOfElectricalEngineering = "Khoa điện - Điện tử";
export const FacultyOfInformationTechnology = "Khoa Công Nghệ Thông Tin";
export const FacultyOfAutomationTechnology = "Khoa Công Nghệ Tự Động";
export const FacultyOfMechanicalEngineeringAndManufacturing = "Khoa Cơ Khí Chế Tạo Máy";
export const AutomobileEngineeringDepartment = "Khoa Cơ Khí Ô Tô";
export const FacultyOfFinanceAndAccounting = "Khoa Tài Chính - Kế Toán";
export const FacultyOfBusinessAdministration = "Khoa Quản Trị Kinh Doanh";
export const FacultyOfTourism = "Khoa Du Lịch";
export const DepartmentOfEnglish = "Khoa Tiếng Anh";
export const DepartmentOfKoreanLanguage = "Khoa Tiếng Hàn";
export const JapaneseLanguageDepartment = "Khoa Bộ Môn Tiếng Nhật"
export const NUMBER_POST_ACTIVE = 1
export const NUMBER_POST_UN_ACTIVE = 0
export const NUMBER_POST_HAD_SAVE = 1
export const NUMBER_POST_UN_SAVE = 0
export const BUSINESS_GROUP = 2
export const TDC_GROUP = 1
export const bigLoading = (<svg aria-hidden="true" className="w-14 h-14 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
</svg>)
export const smallLoading = (<svg aria-hidden="true" className="w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
</svg>)