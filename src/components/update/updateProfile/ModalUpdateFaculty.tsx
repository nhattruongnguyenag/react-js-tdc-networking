import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Header from '../../common/Header';
import { useAppDispatch } from '../../../redux/Hook';
import { useParams } from 'react-router-dom';
import { getIdFromSlug } from '../../../utils/CommonUtls';
import { Student } from '../../../types/Student';
import { Business } from '../../../types/Business';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import '../../../assets/css/profile.css'
import { SERVER_ADDRESS } from '../../../constants/SystemConstant';
import { toast } from 'react-toastify';
import TextValidate from '../../TextValidate';
import { handleUploadImage } from '../../../utils/UploadUtils';
import { InputTextValidate, isBlank, isContainSpecialCharacter, isLengthInRange, isPhone } from '../../../utils/ValidateUtils';
import axios, { AxiosResponse } from 'axios';
import { Token } from '../../../types/Token';
import { Data } from '../../../types/Data';
import { TOKEN_KEY, USER_LOGIN_KEY } from '../../../constants/KeyValue';
import { setUserLogin } from '../../../redux/Slice';
import { useTranslation } from 'react-multi-lang';
import { Faculty } from '../../../types/Faculty';
import DefaultAvatar from '../../common/DefaultAvatar';


interface ModalTypeUpdate {
    t: ReturnType<typeof useTranslation>
    show: boolean
    onHide: () => void,
    user: any,
    nameHadTranslated: string
}


interface FacultyUpdate {
    name: InputTextValidate
    phone: InputTextValidate
    email: InputTextValidate
}

const isAllFieldsValidFaculty = (validate: FacultyUpdate): boolean => {
    let key: keyof FacultyUpdate
    for (key in validate) {
        if (validate[key].isError) {
            return false
        }
    }
    return true
}


export default function ModalUpdateFaculty(props: Readonly<ModalTypeUpdate>) {
    const dispatch = useAppDispatch()
    const { slug } = useParams();
    const [isPassesValidate, setPassedValidate] = useState(true);
    const userId = getIdFromSlug(slug ?? '');
    const [faculty, setFaculty] = useState({
        id: userId,
        name: '',
        email: '',
        image: '',
        background: '',
        phone: '',
    });

    const [imageAvatar, setImageAvatar] = useState('');
    const [imageAvatarTemporary, setImageAvatarTemporary] = useState('');
    const [imageBackground, setImageBackground] = useState('');
    const [imageBackgroundTemporary, setImageBackgroundTemporary] = useState('');
    const [avatarHadSave, setAvatarHadSave] = useState(false);
    const [backgroundHadSave, setBackgroundHadSave] = useState(false);
    // Faculty
    const [phone, setPhone] = useState('');
    const [name, setName] = useState('');

    const fileInputRefAvatar = useRef<HTMLInputElement | null>(null);
    const fileInputRefBackground = useRef<HTMLInputElement | null>(null);
    const buttonCallPickerImgRef = useRef<HTMLButtonElement | null>(null);

    const [validate, setValidate] = useState<FacultyUpdate>({
        name: {
            textError: props.t("Validate.validateNameNull"),
            isVisible: false,
            isError: true,
        },
        phone: {
            textError: props.t("Validate.validatePhoneNull"),
            isVisible: false,
            isError: true,
        },
        email: {
            textError: props.t("Validate.validatePhoneNull"),
            isVisible: false,
            isError: false,
        },
    });

    useEffect(() => {
        setFaculty({
            id: userId,
            name: props.user?.name ?? '',
            email: props.user?.email ?? '',
            image: props.user?.image ?? '',
            background: props.user?.background ?? '',
            phone: props.user?.phone ?? '',
        });
        // Faculty
        setPhone(props.user?.phone ?? "");
        setName(props.user?.name ?? "");
        props.user?.image ? setImageAvatarTemporary(SERVER_ADDRESS + 'api/images/' + props.user?.image) : setImageAvatarTemporary("");
        props.user?.background ? setImageBackgroundTemporary(SERVER_ADDRESS + "api/images/" + props.user?.background) : setImageBackgroundTemporary("");
    }, [props.user]);

    const handleGetFilesAvatar = () => {
        if (fileInputRefAvatar.current) {
            fileInputRefAvatar.current.showPicker();
            fileInputRefAvatar.current.value = '';
        }
    };

    const handleGetFilesBackground = () => {
        if (fileInputRefBackground.current) {
            fileInputRefBackground.current.showPicker();
            fileInputRefBackground.current.value = '';
        }
    };

    const onSelectUploadImageAvatar = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target && event.target.files) {
            setAvatarHadSave(true)
            setImageAvatar(URL.createObjectURL(event.target.files[0]));
            handleUploadImage(event.target.files, (response) => {
                setFaculty({ ...faculty, image: response.data[0] });
                setAvatarHadSave(false)
            });
        }
    };

    const onSelectUploadImageBackground = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target && event.target.files) {
            setBackgroundHadSave(true);
            setImageBackground(URL.createObjectURL(event.target.files[0]));
            handleUploadImage(event.target.files, (response) => {
                setFaculty({ ...faculty, background: response.data[0] });
                setBackgroundHadSave(false);
            });
        }
    };

    const handlePhoneChange = useCallback(
        (event: string) => {
            return new Promise<void>((resolve) => {
                setPhone(event);
                if (isBlank(event)) {
                    setValidate((prevValidate) => ({
                        ...prevValidate,
                        phone: {
                            ...prevValidate.phone,
                            isError: true,
                            textError: props.t("Validate.validatePhoneNull"),
                            isVisible: true
                        }
                    }));
                    resolve();
                } else if (!isPhone(event)) {
                    setValidate((prevValidate) => ({
                        ...prevValidate,
                        phone: {
                            ...prevValidate.phone,
                            isError: true,
                            textError: props.t("Validate.validatePhoneUnCorrectFormat"),
                            isVisible: true
                        }
                    }));
                    resolve();
                } else {
                    setFaculty((prevFaculty) => ({
                        ...prevFaculty,
                        phone: event
                    }));
                    setValidate((prevValidate) => ({
                        ...prevValidate,
                        phone: {
                            ...prevValidate.phone,
                            isError: false,
                            isVisible: false
                        }
                    }));
                    resolve();
                }
            });
        },
        [validate]
    );


    const handleNameChange = useCallback(
        (event: string) => {
            return new Promise<void>((resolve) => {
                setName(event);
                if (isBlank(event)) {
                    setValidate((prevValidate) => ({
                        ...prevValidate,
                        name: {
                            ...prevValidate.name,
                            isError: true,
                            textError: props.t("Validate.validateNameNull"),
                            isVisible: true,
                        },
                    }));
                    resolve();
                } else if (isContainSpecialCharacter(event)) {
                    setValidate((prevValidate) => ({
                        ...prevValidate,
                        name: {
                            ...prevValidate.name,
                            isError: true,
                            textError: props.t("Validate.validateNameSpecialCharacter"),
                            isVisible: true,
                        },
                    }));
                    resolve();
                } else if (!isLengthInRange(event, 1, 255)) {
                    setValidate((prevValidate) => ({
                        ...prevValidate,
                        name: {
                            ...prevValidate.name,
                            isError: true,
                            textError: props.t("Validate.validateNameMaxLength"),
                            isVisible: true,
                        },
                    }));
                    resolve();
                } else {
                    setFaculty((prevFaculty) => ({
                        ...prevFaculty,
                        name: event,
                    }));
                    setValidate((prevValidate) => ({
                        ...prevValidate,
                        name: {
                            ...prevValidate.name,
                            isError: false,
                            isVisible: false,
                        },
                    }));
                    resolve();
                }
            });
        },
        [validate]
    );


    const asyncForValidate = async () => {
        const validationPromises = [
            handlePhoneChange(phone),
            handleNameChange(name),
        ];
        await Promise.all(validationPromises);
    }

    useEffect(() => {
        if (isAllFieldsValidFaculty(validate)) {
            axios
                .post<Faculty, AxiosResponse<Data<Token>>>(SERVER_ADDRESS + 'api/faculty', faculty)
                .then((responseUpdate: any) => {
                    const token = responseUpdate.data.data.token;
                    axios
                        .get<void, AxiosResponse<Data<Student | Faculty | Business>>>(SERVER_ADDRESS + `api/users/token/${token}`)
                        .then((response) => {
                            if (response.status === 200 || response.status === 201) {
                                sessionStorage.setItem(TOKEN_KEY, JSON.stringify(token));
                                sessionStorage.setItem(USER_LOGIN_KEY, JSON.stringify(response.data.data));
                                dispatch(setUserLogin(response.data.data))
                                toast.success(props.t("Toast.toastUpdateProfileUnSuccess"));
                                props.onHide();
                            } else {
                                toast.error(props.t("Toast.toastUpdateProfileUnSuccess"));
                            }
                        })
                        .catch((error) => {
                            toast.error(props.t("Toast.toastUpdateProfileUnSuccess"));
                        });
                })
                .catch((error) => {
                    toast.error(props.t("Toast.toastUpdateProfileUnSuccess"));
                });
        } else {
            let key: keyof FacultyUpdate;
            for (key in validate) {
                if (validate[key].isError) {
                    setValidate((prevValidate) => ({
                        ...prevValidate,
                        [key]: {
                            ...prevValidate[key],
                            isVisible: true,
                        },
                    }));
                }
            }
        }
    }, [isPassesValidate])

    const handleSubmitEvent = async () => {
        asyncForValidate();
        setPassedValidate(!isPassesValidate);
    };

    const printBackground = useMemo(() => {
        let image;
        if (imageBackground.trim().length !== 0) {
            image = (
                <div className='img'>
                    <img className={backgroundHadSave ? 'imageUpdating' : 'imageUpdate'} src={imageBackground} style={{ width: '100%', height: 300 }} />
                </div>
            );
        } else if (imageBackgroundTemporary.trim().length !== 0) {
            image = (
                <div className='img'>
                    <img className={backgroundHadSave ? 'imageUpdating' : 'imageUpdate'} src={imageBackgroundTemporary} style={{ width: '100%', height: 300, borderRadius: 10 }} />
                </div>
            );
        } else {
            image = (
                <div className='img'>
                    <img className={backgroundHadSave ? 'imageUpdating' : 'imageUpdate'} src={'/assets/images/background-default.jpg'} style={{ width: '100%', height: 300, borderRadius: 10 }} />
                </div>
            );
        }
        return image;
    }, [imageBackground, imageBackgroundTemporary, backgroundHadSave]);

    const printAvatar = useMemo(() => {
        let image;
        if (imageAvatar.trim().length !== 0) {
            image = (
                <div className='img'>
                    <img className={avatarHadSave ? 'imageUpdating' : 'imageUpdate'} src={imageAvatar} style={{ width: 200, height: 200, borderRadius: 100 }} />
                </div>
            );
        } else if (imageAvatarTemporary.trim().length !== 0) {
            image = (
                <div className='img'>
                    <img className={avatarHadSave ? 'imageUpdating' : 'imageUpdate'} src={imageAvatarTemporary} style={{ width: 200, height: 200, borderRadius: 100 }} />
                </div>
            );
        } else {
            image = (
                <div className='img'>
                    <DefaultAvatar name={props.nameHadTranslated} size={300} styleBootstrap={undefined} />
                </div>
            );
        }
        return image;
    }, [imageAvatar, imageAvatarTemporary, avatarHadSave]);

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {props.t("ModalUpdate.modalUpdateTitle")}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='form-group icon-input mb-3'>
                    <i className='font-sm ti-mobile text-grey-500 pe-0'> </i>
                    <input
                        id='phoneNumber'
                        value={phone}
                        type='text'
                        onChange={(e) => handlePhoneChange(e.target.value)}
                        className='style2-input form-control text-grey-900 font-xsss fw-600 ps-5'
                        placeholder={props.t("ModalUpdate.modalUpdatePlaceholderPhoneNumber")}
                        style={{ borderColor: !validate.phone?.isError ? '#228b22' : '#eee' }}
                    />
                    <TextValidate
                        textError={validate.phone?.textError}
                        isError={validate.phone?.isError}
                        isVisible={validate.phone?.isVisible}
                    />
                </div>
                <div className='form-group icon-input mb-3'>
                    <i className='font-sm ti-user text-grey-500 pe-0'></i>
                    <input
                        id='name'
                        value={name}
                        type='text'
                        onChange={(e) => handleNameChange(e.target.value)}
                        className='style2-input form-control text-grey-900 font-xsss fw-600 ps-5'
                        placeholder={props.t("Validate.validateNameNull")}
                        style={{ borderColor: !validate.name?.isError ? '#228b22' : '#eee' }}
                    />
                    <TextValidate
                        textError={validate.name?.textError}
                        isError={validate.name?.isError}
                        isVisible={validate.name?.isVisible}
                    />
                </div>
                <div className='form-group icon-input' style={{ marginTop: 10, marginBottom: 40 }}>
                    <div className='d-flex mt-3 p-0'>
                        <input
                            type={'file'}
                            multiple
                            ref={fileInputRefAvatar}
                            className='hidden'
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => onSelectUploadImageAvatar(event)}
                        />
                        <button
                            type='button'
                            className='d-flex align-items-center font-xssss fw-600 ls-1 text-grey-700 text-dark pe-4'
                            onClick={handleGetFilesAvatar}
                            ref={buttonCallPickerImgRef}
                        >
                            <i className='font-md text-success feather-image me-2'></i>
                            <span className='d-none-xs'>{props.t("ModalUpdate.modalUpdateAvatar")}</span>
                        </button>
                    </div>
                    {
                        avatarHadSave ?
                            (<span style={{ background: 'red', position: 'absolute', right: 0, color: '#fff', padding: 5, borderRadius: 3 }}>
                                {props.t("ModalUpdate.modalUpdateImageNotifyNotUpload")}</span>) : (<span style={{ background: 'green', position: 'absolute', right: 0, color: '#fff', padding: 5, borderRadius: 3 }}>{props.t("ModalUpdate.modalUpdateImageNotifyUploadSuccess")}</span>)
                    }
                    {printAvatar}
                </div>
                <div className='form-group icon-input mb-3 mt-3'>
                    <div className='d-flex mt-3 p-0'>
                        <input
                            type={'file'}
                            multiple
                            ref={fileInputRefBackground}
                            className='hidden'
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => onSelectUploadImageBackground(event)}
                        />
                        <button
                            type='button'
                            className='d-flex align-items-center font-xssss fw-600 ls-1 text-grey-700 text-dark pe-4'
                            onClick={handleGetFilesBackground}
                            ref={buttonCallPickerImgRef}
                        >
                            <i className='font-md text-success feather-image me-2'></i>
                            <span className='d-none-xs'>{props.t("ModalUpdate.modalUpdateBackground")}</span>
                        </button>
                    </div>
                    {
                        backgroundHadSave ?
                            (<span style={{ background: 'red', position: 'absolute', right: 0, color: '#fff', padding: 5, borderRadius: 3 }}>
                                {props.t("ModalUpdate.modalUpdateImageNotifyNotUpload")}</span>) : (<span style={{ background: 'green', position: 'absolute', right: 0, color: '#fff', padding: 5, borderRadius: 3 }}>{props.t("ModalUpdate.modalUpdateImageNotifyUploadSuccess")}</span>)
                    }
                    {printBackground}
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    onClick={props.onHide} className='btn bg-grey text-dark outline-none border-0'>
                    {props.t("Modal.modalShowImageCloseButton")}
                </Button>
                <Button
                    disabled={!(backgroundHadSave === false && avatarHadSave === false)}
                    onClick={() => handleSubmitEvent()} className='btn bg-primary outline-none border-0'>{props.t("ModalUpdate.modalUpdateButtonText")}</Button>
            </Modal.Footer>
        </Modal>
    );
}