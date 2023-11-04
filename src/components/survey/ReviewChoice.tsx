import { ONE_CHOICE_QUESTION } from "../../pages/CreateSurveyPostPage";
import { useAppSelector } from "../../redux/Hook";
import { ChoiceProps } from "./EditChoice";

export default function ReviewChoice(props: ChoiceProps) {
    const { surveyPostRequest } = useAppSelector((state) => state.TDCSocialNetworkReducer)
    return (
        <div className="flex items-center mt-3">
            {
                props.type && props.type === ONE_CHOICE_QUESTION ?
                    <input id="default-radio-1" type="radio" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    :
                    <input id="default-checkbox" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
            }
            <label className="ml-2 text-sm text-gray-900 dark:text-gray-300 pr-3 text-justify">
                {surveyPostRequest.questions[props.questionIndex ?? -1].choices[props.choiceIndex ?? -1]}
            </label>
        </div>
    )
}
