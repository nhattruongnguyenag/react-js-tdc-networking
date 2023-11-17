import { Accordion, CustomFlowbiteTheme } from 'flowbite-react'
import React, { useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Header from '../components/common/Header'
import { useAppDispatch } from '../redux/Hook'
import { useGetSurveyResultQuery } from '../redux/Service'
import { SurveyItemResult } from '../types/response/SurveyResult'
import { getIdFromSlug } from '../utils/CommonUtls'
import { MULTI_CHOICE_QUESTION, ONE_CHOICE_QUESTION } from './CreateSurveyPostPage'

export default function SurveyResultPage() {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { slug } = useParams()
    const surveyPostId = getIdFromSlug(slug ?? '') ?? -1

    const { data, isLoading, isFetching } = useGetSurveyResultQuery(surveyPostId, {
        pollingInterval: 1000
    })

    const accordionContent = useCallback(
        (item: SurveyItemResult) => {

            if (item.type === ONE_CHOICE_QUESTION || item.type === MULTI_CHOICE_QUESTION) {
                // if (item.choices.reduce((curr, next) => curr + next.votes, 0) === 0) {
                //   return <List.Item title={SURVEY_RESULT_SCREEN_EMPTY_VOTE} />
                // } else {
                //   return <OptionSurveyResult data={item} />
                // }
                return (
                    <Accordion.Panel>
                        <Accordion.Title className='p-3'>{item.title}</Accordion.Title>
                        <Accordion.Content>
                            <p className="mb-2 text-gray-500 dark:text-gray-400">
                                Flowbite is an open-source library of interactive components built on top of Tailwind CSS including buttons,
                                dropdowns, modals, navbars, and more.
                            </p>
                            <p className="text-gray-500 dark:text-gray-400">
                                Check out this guide to learn how to&nbsp;
                                <a
                                    href="https://flowbite.com/docs/getting-started/introduction/"
                                    className="text-cyan-600 hover:underline dark:text-cyan-500"
                                >
                                    get started&nbsp;
                                </a>
                                and start developing websites even faster with components on top of Tailwind CSS.
                            </p>
                        </Accordion.Content>
                    </Accordion.Panel>
                )
            }
            // return item.answers.length === 0 ?
            //     <List.Item title={SURVEY_RESULT_SCREEN_EMPTY_SHORT_ANSWER} />
            //     :
            //     <Fragment>
            //         <List.Item title={`${item.answers.length} ${SURVEY_RESULT_SCREEN_NUMBER_OF_SHORT_ANSWER}`} />
            //         <FlatList data={item.answers} renderItem={({ item, index }) => <List.Item title={item} />} />
            //     </Fragment>
            return <Accordion.Panel>
                <Accordion.Title className='p-3'>{item.title} </Accordion.Title>
                <Accordion.Content>
                    <p>{item.answers.length} câu trả lời</p>
                    {
                        item.answers.map((answer, index) => <p className="mt-2 text-gray-500 dark:text-gray-400" key={index.toString()}>{answer}</p>)
                    }
                </Accordion.Content>
            </Accordion.Panel>
        },
        [data, isFetching]
    )

    return (
        <>
            <Header />
            <div className='main-content'>
                <div className='middle-wrap'>
                    <div className='card w-100 shadow-xs mb-4 border-0 bg-white p-0'>
                        <div className='card-body w-100 d-flex rounded-3 border-0 bg-current p-4'>
                            <button className='d-inline-block mt-2'
                                onClick={() => navigate(-1)}>
                                <i className='ti-arrow-left font-sm text-white' />
                            </button>
                            <h4 className='font-xs fw-600 mb-0 ms-4 mt-2 text-white'>Kết quả khảo sát</h4>
                        </div>
                        <div className='py-3 px-3'>
                            <Accordion collapseAll>
                                {
                                    data?.data.map((item, index) => accordionContent(item)) ?? <></>
                                }
                            </Accordion>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
