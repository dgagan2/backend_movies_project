const {ref, getDownloadURL, uploadBytesResumable}=require("firebase/storage")
const storage =require("../config/firebase")
const sharp =require("sharp")

async function uploadFile(file, folder){
    let fileBuffer
    if(folder=='background'){
        fileBuffer= await sharp(file.buffer).resize({width:880, height:560, fit: 'fill'}).toBuffer()
    }else{
        fileBuffer= await sharp(file.buffer).resize({width:220, height:330, fit: 'contain'}).toBuffer()
    }

    const fileRef=ref(storage, `${folder}/${file.originalname} ${Date.now()}`)
    const fileMetaData={
        contentType:file.mimetype
    }

    const fileUploadPromise=uploadBytesResumable(
        fileRef,
        fileBuffer,
        fileMetaData
    )

    await fileUploadPromise

    const fileDownloadURL=await getDownloadURL(fileRef)

    return {ref: fileRef, downloadURL: fileDownloadURL}
}

module.exports=uploadFile