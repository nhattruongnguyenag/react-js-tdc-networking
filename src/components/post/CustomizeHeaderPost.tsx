import React, { useMemo } from 'react'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { COLOR_BTN_BLUE } from '../../constants/Color'
import { CLICK_SAVE_POST_EVENT, CLICK_DELETE_POST_EVENT, CLICK_SEE_LIST_CV_POST_EVENT, CLICK_SEE_RESULT_POST_EVENT, GO_TO_PROFILE_ACTIONS, TYPE_RECRUITMENT_POST, TYPE_SURVEY_POST, CLICK_UN_SAVE_POST_EVENT, CLICK_UPDATE_POST_EVENT, NUMBER_POST_UN_ACTIVE, NUMBER_POST_HAD_SAVE, NUMBER_POST_UN_SAVE } from '../../constants/Variables'
import DefaultAvatar from '../common/DefaultAvatar'
import { TYPE_POST_STUDENT } from '../../constants/StringVietnamese'
import { useAppSelector } from '../../redux/Hook'
import PostOptionsMenu from '../menu/PostOptionsMenu'
import { MenuOptionItem } from '../../types/MenuOptionItem'
import { useTranslation } from 'react-multi-lang'
import { IMAGE_URL } from '../../constants/Path'

export interface HeaderPostPropsType {
  t: ReturnType<typeof useTranslation>,
  userId: number,
  name: string,
  avatar: string,
  typeAuthor: string | null,
  available: boolean | null,
  timeCreatePost: string,
  type: string | null,
  role: string,
  isSave: number,
  active: number,
  handleClickMenuOption: (flag: number) => void,
  handleClickIntoAvatarAndNameAndMenuEvent: (flag: number) => void,
}

const CustomizeHeaderPost = (props: HeaderPostPropsType) => {
  const { userLogin } = useAppSelector((state) => state.TDCSocialNetworkReducer);
  const menuOptions = useMemo<MenuOptionItem[]>(() => {
    const options: MenuOptionItem[] = [
      {
        type: CLICK_SAVE_POST_EVENT,
        name: props.t("MenuOption.menuOptionSaveArticle"),
        visible: props.isSave === NUMBER_POST_UN_SAVE && userLogin?.id !== props.userId
      },
      {
        type: CLICK_UN_SAVE_POST_EVENT,
        name: props.t("MenuOption.menuOptionUnSaveArticle"),
        visible: props.isSave === NUMBER_POST_HAD_SAVE
      }
    ];

    if (userLogin?.id === props.userId) {
      options.push({
        type: CLICK_UPDATE_POST_EVENT,
        name: props.t("MenuOption.menuOptionUpdateArticle"),
        visible: props.active === NUMBER_POST_UN_ACTIVE
      });
    }

    if (userLogin?.id === props.userId && props.type === TYPE_RECRUITMENT_POST) {
      options.push({
        type: CLICK_SEE_LIST_CV_POST_EVENT,
        name: props.t("MenuOption.menuOptionViewResumeList"),
        visible: true
      });
    }

    if (userLogin?.id === props.userId && props.type === TYPE_SURVEY_POST) {
      options.push({
        type: CLICK_SEE_RESULT_POST_EVENT,
        name: props.t("MenuOption.menuOptionViewSurveyResults"),
        visible: true
      });
    }

    if (userLogin?.id === props.userId) {
      options.push({
        type: CLICK_DELETE_POST_EVENT,
        name: props.t("MenuOption.menuOptionDeleteArticle"),
        visible: true
      });
    }

    return options;
  }, [props.isSave, props.userId, props.type, props.t, props.active]);

  return (
    <div className='card-body d-flex w-100 m-0 p-0'>
      <div className='avatar-wrapper-header'>
        <button onClick={() => props.handleClickIntoAvatarAndNameAndMenuEvent(GO_TO_PROFILE_ACTIONS)}>
          {Boolean(props.avatar) ? (
            <img
              src={IMAGE_URL + props.avatar}
              alt='avatar'
              className='avatar-user-header-post shadow-sm'
            />
          ) : (
            <DefaultAvatar name={props.name} size={45} styleBootstrap={undefined} />
          )}
        </button>
      </div>
      <div className='text-header-name-wrapper'>
        <h4
          onClick={() => props.handleClickIntoAvatarAndNameAndMenuEvent(GO_TO_PROFILE_ACTIONS)}
          className='cursor-pointer fw-700 text-grey-900 font-xssss mt-1'
        >
          {' '}
          {props.name}{' '}
          {props.role !== TYPE_POST_STUDENT && (
            <span className='showTypePost'>
              <FontAwesomeIcon icon={faCheckCircle} size='lg' color={COLOR_BTN_BLUE} />
            </span>
          )}
          {props.role !== TYPE_POST_STUDENT && (
            <span className='typeAuthorShow bg-greylight'>{props.typeAuthor}</span>
          )}
          <span className='d-block font-xssss fw-500 lh-3 text-grey-500 mt-1'>{props.timeCreatePost}</span>
        </h4>
      </div>
      <PostOptionsMenu key="postOptionsMenu" menuOptions={menuOptions} handleClickMenuOption={props.handleClickMenuOption} />
    </div>
  );
};

export default CustomizeHeaderPost
