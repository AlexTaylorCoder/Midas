import axios from "axios"

export async function createAccount(formData) {
    const resp = await axios.post("/users", formData)
    return response(resp)
}

export async function swipe(postData) {
    console.log(postData)
    const resp = await axios.post("/swipes",postData)   
    return response(resp)
}

export async function mapUsers() {
    const resp = await axios("/map")
    return response(resp)
}

export async function fetchAccountWithoutPoints(id) {
    const resp = await axios("/users/"+id)
    return response(resp)
}

export async function matches() {
    const resp = await axios("/batch")
    return response(resp)
}

export async function updateprofile(patchObj) {
    console.log(patchObj)
    const resp = await axios.patch("/users",patchObj)
    return response(resp)
}

export async function logout() {
    console.log("logout")
    const resp = await axios.delete("/logout")
    return response(resp)
}


export async function position(coords) {
    const resp = await axios.patch("/position",coords)
    return response(resp)
}

export async function LoginDefault(details) {
    const resp = await axios.post("/login",details)
    return response(resp)
}

export async function authorize() {
    const resp = await axios("/auth")
    return response(resp)
}

function response(resp) {
    if (resp.status >= 300 || resp.status < 200) {
        throw new Error(resp.error)
    }
    return resp.data
}