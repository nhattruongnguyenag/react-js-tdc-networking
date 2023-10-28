import axios, { AxiosResponse } from 'axios'
import { SERVER_ADDRESS } from '../constants/SystemConstant'
import { Data } from '../types/Data'

export const handleUploadImage = (imagesRequest: FileList, onResult?: (data: Data<string[]>) => void) => {
  const formData = new FormData()

  for (let i = 0; i < imagesRequest.length; i++) {
    formData.append('files', imagesRequest[length])
  }

  axios
    .post<FormData, AxiosResponse<Data<string[]>>>(SERVER_ADDRESS + 'api/upload/images', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then((res) => {
      console.log('TEST:', res.data)
      onResult && onResult(res.data)
    })
    .catch((error) => {
      console.log(error)
    })
}
