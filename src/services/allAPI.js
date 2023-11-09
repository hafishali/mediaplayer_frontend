

// upload video

const { commonAPI } = require("./commonAPI")
const { serverURL } = require("./serverURL")

 export const uploadVideo=async(reqBody)=>{
    return await commonAPI('POST',`${serverURL}/video`,reqBody)
}

// get uploded videos

export const getAllvideos=async()=>{
    return await commonAPI('GET',`${serverURL}/video`,'')
}

// to delete videos

export const deleteVideo =async(id)=>{
    return await commonAPI('DELETE',`${serverURL}/video/${id}`,{})
}


// add history

export const addtoHistory =async(videoHistory)=>{
    return await commonAPI('POST',`${serverURL}/history`,videoHistory)
}

// get history
export const getHistory =async()=>{
    return await commonAPI('GET',`${serverURL}/history`,"")
}

// delete history

export const deleteHistory =async(id)=>{
    return await commonAPI('DELETE',`${serverURL}/history/${id}`,{})
}

// add category
export const addAllcategory =async(body)=>{
    return await commonAPI('POST',`${serverURL}/category`,body)
}

// get category
export const getAllcategory =async()=>{
    return await commonAPI('GET',`${serverURL}/category`,"")
}

// delete category

export const deleteCategory =async(id)=>{
    return await commonAPI('DELETE',`${serverURL}/category/${id}`,{})
}

// to get a particular video from server

export const getAvideo =async(id)=>{
    return await commonAPI('GET',`${serverURL}/video/${id}`,"")
}

// api to update the category with new videos


export const updateCategory =async(id,body)=>{
    return await commonAPI('PUT',`${serverURL}/category/${id}`,body)
}















