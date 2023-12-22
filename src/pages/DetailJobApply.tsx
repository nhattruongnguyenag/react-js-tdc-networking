import React, { useEffect, useState } from 'react'
import { SERVER_ADDRESS } from '../constants/SystemConstant'
import axios from 'axios'
import { Document, Page, pdfjs } from 'react-pdf'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp, faDownload } from '@fortawesome/free-solid-svg-icons'
import { useNavigate, useParams } from 'react-router-dom'
import { getIdFromSlug } from '../utils/CommonUtls'
import Header from '../components/common/Header'
import { useTranslation } from 'react-multi-lang'

export default function DetailJobApply() {
    const [sourcePDF, setSource] = useState('')
    const [numPages, setNumPages] = useState(0)
    const [showGoToTop, setShowGoToTop] = useState(false)
    const [url, setUrl] = useState('')
    const navigate = useNavigate()
    const { slug } = useParams()
    const cvId = getIdFromSlug(slug ?? '')
    const t = useTranslation()

    console.log('cvId: ', cvId)
    useEffect(() => {
        axios.get(`${SERVER_ADDRESS}api/job/${cvId}`).then((response) => {
            setUrl(response.data.data.cvUrl)
            setSource(`${SERVER_ADDRESS}api/files/${response.data.data.cvUrl}`)
        })
    }, [])

    useEffect(() => {
        const handleScroll = () => {
            setShowGoToTop(window.scrollY >= 300)
        }
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    return (
        <>
        <Header />
        <div className='main-content theme-dark-bg' style={{backgroundColor: '#e6e6e6'}}>
            <div className='middle-sidebar-left'>
                <div className='middle'>
                    <div className='pdf-container'>
                        {
                            <Document file={sourcePDF} onLoadSuccess={({ numPages }) => setNumPages(numPages)}>
                                {Array.apply(null, Array(numPages))
                                    .map((x, i) => i + 1)
                                    .map((page) => (
                                        <Page pageNumber={page} />
                                    ))}
                            </Document>
                        }
                        {showGoToTop && (
                            <button
                                style={{
                                    position: 'fixed',
                                    right: 100,
                                    bottom: 40,
                                    width: 70,
                                    height: 70,
                                    borderRadius: 50,
                                    backgroundColor: '#fff',
                                    borderWidth: 2,
                                    borderColor: 'grey'
                                }}
                                onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}
                            >
                                <p style={{ fontSize: 20, paddingTop: 15 }}>
                                    <FontAwesomeIcon icon={faArrowUp} color='grey' />
                                </p>
                            </button>
                        )}
                        <button
                            style={{
                                position: 'fixed',
                                left: 100,
                                top: 120,
                                height: 40,
                                borderRadius: 20,
                                backgroundColor: '#fff',
                                borderWidth: 2,
                                paddingLeft: 30,
                                paddingRight: 30,
                                borderColor: 'green'
                            }}
                            onClick={() => navigate(-1)}
                        >
                            <p style={{ fontSize: 20 }}>{t("Setting.back")}</p>
                        </button>
                        <button
                            style={{
                                position: 'fixed',
                                right: 90,
                                top: 120,
                                height: 70,
                                width: 70,
                                borderRadius: 50,
                                backgroundColor: '#fff',
                                borderWidth: 2,
                                borderColor: '#19005F'
                            }}
                        >
                            <a href={`${SERVER_ADDRESS}api/files/${url}`} style={{ fontSize: 25 }}><FontAwesomeIcon icon={faDownload} color='grey' />
                            </a>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        </>
        
    )
}
