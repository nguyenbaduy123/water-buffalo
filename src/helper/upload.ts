import LifeApi from 'api/LifeApi'

export const uploadFile = async (file: File) => {
  const resp = await LifeApi.uploadFile(file)

  if (resp.success) {
    return resp.file
  } else {
    return null
  }
}
