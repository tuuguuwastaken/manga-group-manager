export interface ImageType {
  imageUrl?: string | null
  smallImageUrl?: string | null
  imageRef: string
  smallImageRef: string
}

export interface ImageState {
  blob: Blob
  fileType: string
}
