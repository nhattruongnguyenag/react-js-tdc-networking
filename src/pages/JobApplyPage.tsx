import React, { useEffect, useState } from 'react'
import Header from '../components/common/Header'
import { FaFileUpload } from 'react-icons/fa'
import { Document, Page, pdfjs } from 'react-pdf';
import axios from 'axios';
import { SERVER_ADDRESS } from '../constants/SystemConstant';
import { error, log } from 'console';
import { useNavigate, useParams } from 'react-router-dom';
import { FileUploadRequest } from '../types/request/FileUploadRequest';
import { useAppSelector } from '../redux/Hook';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPaperPlane, faCancel } from '@fortawesome/free-solid-svg-icons';
import { COLOR_BTN_BLUE, COLOR_WHITE } from '../constants/Color';
import { getIdFromSlug } from '../utils/CommonUtls';
import { toast } from 'react-toastify';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;



export default function JobApplyPage() {
    const { slug } = useParams()
    const postId = getIdFromSlug(slug ?? '')
    const [file, setFile] = useState(null);
    const [numPages, setNumPages] = useState(0);
    const [pageNumber, setPageNumber] = useState(1);
    const [fileName, setFileName] = useState('');
    const { userLogin } = useAppSelector((state) => state.TDCSocialNetworkReducer)
    const navigate = useNavigate()
    const [isAnonymous, setIsAnonymous] = useState(false);
    const [isUploadCV, setIsUpload] = useState(false);

    useEffect(() => {
    }, [fileName, isAnonymous, isUploadCV])

    const onFileChange = (event: any) => {
        const selectedFile = event.target.files[0];
        if (selectedFile && selectedFile.type === 'application/pdf') {
            setFile(selectedFile)
        } else {
            console.log('Vui lòng chọn một tệp PDF.');
        }
        const formData = new FormData();
        formData.append("files", selectedFile ?? null);
        axios({
            method: "post",
            url: `${SERVER_ADDRESS}api/upload/files`,
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => {
            setFileName(res.data.data[0])
            setIsUpload(true);
        })
    };

    const onSuccess = () => {
        if (fileName) {
            
            axios({
                method: "post",
                url: `${SERVER_ADDRESS}api/job/apply`,
                data: {
                    "post_id": postId,
                    "user_id": userLogin?.id ?? 12,
                    "cv_url": fileName
                },
            }).then(res => {
                setIsAnonymous(true);
                // alert("ok")
                navigate(-1)
                toast.success('Ứng tuyển thành công!')
            })
        }
        else {
            toast.error('Ứng tuyển thất bại!')
        }
    }

    return (
        <div>
            <Header />
            <div className='main-content bg-lightblue theme-dark-bg' style={{ height: '100vh' }}>
                <div className='middle-sidebar-bottom'>
                    <div className='middle-sidebar-left'>
                        <div className=''>
                            <div className='position-relative scroll-bar theme-dark-bg pt-0' style={{ height: 845, width: 1000, background: '#A6ACAF' }}>
                                <div className='main' style={{ width: '100%', textAlign: 'center' }}>
                                    {
                                        file == null ? <div style={{ fontWeight: 'bold', marginTop: 400 }}>Hiện chưa có file nào được tải lên</div> :
                                            (file && (
                                                <Document
                                                    file={file}
                                                    onLoadSuccess={({ numPages }) => setNumPages(numPages)}
                                                >
                                                    {Array.apply(null, Array(numPages))
                                                        .map((x, i) => i + 1)
                                                        .map(page => <Page pageNumber={page} />)}
                                                </Document>
                                            ))}
                                    <div style={{ position: 'fixed', bottom: 25, right: '35%', width: 130 }}>
                                        <button className='btn btn-info button_nop' style={{ position: 'fixed', bottom: 27, right: '48%', width: 130 }} onClick={() => navigate('/doanh-nghiep/bai-viet')}><p>Hủy  <FontAwesomeIcon icon={faCancel} size='1x' color={COLOR_WHITE} /></p></button>
                                        <button className='btn btn-info' disabled={isAnonymous ? true : false} style={{ position: 'fixed', bottom: 27, right: '38%', width: 130 }}>
                                            <label htmlFor="fileInput" className='lbButton'>{isUploadCV ? (<p>Thay đổi CV <FontAwesomeIcon icon={faPlus} size='1x' color={COLOR_WHITE} /></p>) : (<p>Thêm CV  <FontAwesomeIcon icon={faPlus} size='1x' color={COLOR_WHITE} /></p>)}</label>
                                        </button>
                                        <input
                                            id="fileInput"
                                            type="file"
                                            accept=".pdf"
                                            onChange={onFileChange}
                                            style={{ display: 'none' }}
                                        />
                                        <button disabled={isAnonymous ? true : false} className='btn btn-info button_nop' style={{ position: 'fixed', bottom: 27, right: '28%', width: 130 }} onClick={onSuccess}><p>Hoàn tất  <FontAwesomeIcon icon={faPaperPlane} size='1x' color={COLOR_WHITE} /></p></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}
