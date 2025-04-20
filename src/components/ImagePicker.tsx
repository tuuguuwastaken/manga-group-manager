/* eslint-disable @typescript-eslint/no-explicit-any */
import { GetProp, Upload, message } from "antd"
import { PlusOutlined } from "@ant-design/icons"
import { UploadChangeParam, UploadFile, UploadProps } from "antd/es/upload"
import { ImageState, ImageType } from "../types/image"

interface ImagePickerProps {
  data?: ImageState | null
  image?: ImageType | null
  onChange?: (image: ImageState) => void
}

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0]

const ImagePicker: React.FC<ImagePickerProps> = ({ image, onChange, data }) => {
  const handleChange = (info: UploadChangeParam<UploadFile<any>>) => {
    const selectedFile = info.file.originFileObj

    if (selectedFile) {
      const reader = new FileReader()

      reader.onload = (event) => {
        if (event.target?.result) {
          const blob = new Blob([event.target?.result], {
            type: selectedFile.type,
          })
          if (onChange) onChange({ blob, fileType: selectedFile.name })
        }
      }
      reader.readAsArrayBuffer(selectedFile)
    }
  }

  const beforeUpload = (file: FileType) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png"
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!")
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!")
    }
    return isJpgOrPng && isLt2M
  }

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  )

  return (
    <Upload
      name="avatar"
      listType="picture-card"
      className="avatar-uploader"
      showUploadList={false}
      beforeUpload={beforeUpload}
      onChange={handleChange}
      accept="image/*"
      style={{height:"100%",width:"100%"}}
    >
      {data || image?.smallImageUrl ? (
        <img src={data ? URL.createObjectURL(data.blob) : image?.smallImageUrl ?? ""} alt="avatar" style={{ width: "100%",height:"100%"}} />
      ) : (
        uploadButton
      )}
    </Upload>
  )
}

export default ImagePicker
