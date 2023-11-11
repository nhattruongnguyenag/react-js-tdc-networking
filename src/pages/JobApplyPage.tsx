import React, { useEffect, useState } from 'react'
import Header from '../components/common/Header'
import { FaFileUpload } from 'react-icons/fa'
import { Document, Page, pdfjs } from 'react-pdf';
import axios from 'axios';
import { SERVER_ADDRESS } from '../constants/SystemConstant';
import { error, log } from 'console';
import { useNavigate } from 'react-router-dom';
import { FileUploadRequest } from '../types/request/FileUploadRequest';
import { useAppSelector } from '../redux/Hook';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;



export default function JobApplyPage() {
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
        axios({
            method: "post",
            url: `${SERVER_ADDRESS}api/job/apply`,
            data: {
                "post_id": 1,
                "user_id": userLogin?.id ?? 12,
                "cv_url": fileName
            },
        }).then(res => {
            setIsAnonymous(true);
            // alert("ok")
            navigate('/doanh-nghiep/bai-viet')
        })
    }

    return (
        <div>
            <Header />
            <div className='main-content bg-lightblue theme-dark-bg' style={{ height: '100vh' }}>
                <div className='middle-sidebar-bottom'>
                    <div className='middle-sidebar-left'>
                        <div className=''>
                            <div className='position-relative scroll-bar theme-dark-bg bg-white pt-0' style={{ height: 845, width: 1000  }}>
                                <div className='main' style={{ width: '100%', textAlign:'center' }}>


                                    {
                                        file == null ? <div style={{fontWeight: 'bold', marginTop: 400}}>Hiện chưa có file nào được tải lên</div> :
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
                                        <button className='btn btn-info button_nop' style={{ position: 'fixed', bottom: 25, right: '48%', width: 130 }} onClick={() => navigate('/doanh-nghiep/bai-viet')}>Hủy</button>
                                        <button className='btn btn-info' disabled={isAnonymous ? true : false} style={{ position: 'fixed', bottom: 25, right: '38%', width: 130 }}>
                                            <label htmlFor="fileInput" className='lbButton'>{isUploadCV ? '+ Thay doi CV' : '+ Them CV'}</label>
                                        </button>
                                        <input
                                            id="fileInput"
                                            type="file"
                                            accept=".pdf"
                                            onChange={onFileChange}
                                            style={{ display: 'none' }}
                                        />
                                        <button disabled={isAnonymous ? true : false} className='btn btn-info button_nop' style={{ position: 'fixed', bottom: 25, right: '28%', width: 130 }} onClick={onSuccess}>Hoàn tất</button>
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
