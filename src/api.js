import Cookies from 'universal-cookie'
const location = process.env.REACT_APP_API_KEY

const cookie = new Cookies()

const GetOtp = async (phoneNumber) => {
    try {
        const url = location + `/authenciation/otp/${phoneNumber}`
        const api = await fetch(url)
        return api.status
    } catch (error) {
        return 500
    }
}

const ValidateOtp = async (phoneNumber, formdata) => {
    try {
        const url = location + `/authenciation/otp/${phoneNumber}`
        const body = JSON.stringify(formdata)
        const api = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: body
        })

        return api.status
    } catch (error) {
        return 500
    }
}
const RegisterAsProfessional = async (formdata) => {
    try {
        const { as } = formdata
        const url = location + `/authenciation/register-${as}`
        const body = JSON.stringify(formdata)
        const api = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: body
        })
        if (api.status === 201){
            login({phone: formdata.phone, password: formdata.password})
            return api.status
        }
        return api.status

    } catch (error) {
        return 500
    }
}

const login = async (formdata) => {
    try {
        const url = location + `/authenciation/obtain-pair-token`
        const body = JSON.stringify(formdata)
        const api = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: body
        })
        if (api.status === 200) {
            const apiRes = await api.json()
            const { access, refresh } = apiRes
            cookie.set('Session_AID', access, { path: '/', maxAge: 60 * 60 * 24, sameSite: 'strict' })
            cookie.set('Session_RID', refresh, { path: '/', maxAge: 60 * 60 * 24 * 10, sameSite: 'strict' })
            return api.status
        }
        else
            return api.status

    } catch (error) {
        return 500
    }
}

const signup = async (formdata) => {
    try {
        const url = location + `/authenciation/register-user`
        const body = JSON.stringify(formdata)
        const api = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: body
        })
        if (api.status === 201){
            login({phone: formdata.phone, password: formdata.password})
            return api.status
        }
        return api.status

    } catch (error) {
        return 500
    }
}

const forgetPassword = async (formdata) => {
    try {
        const url = location + `/authenciation/forget-password`
        const body = JSON.stringify(formdata)
        const api = await fetch(url, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: body
        })
        return api.status

    } catch (error) {
        return 500
    }
}

const User = async () => {
    try {
        const url = location + `/authenciation/loginfo`
        const access = cookie.get('Session_AID')
        const api = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access}`
            },
        })
        return api
    } catch (error) {
        return { status: 500 }
    }
}

const SessionStatus = async () => {
    try {
        const Session_AID = cookie.get('Session_AID') ?? false
        const Session_RID = cookie.get('Session_RID') ?? false

        if (Session_AID && Session_RID) {
            const user = User()
            return user
        }
        else if (!Session_AID && Session_RID) {
            const url = location + `/authenciation/obtain-refresh-token`
            const body = JSON.stringify({ 'refresh': Session_RID })
            const api = await fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: body
            })
            if (api.status === 200) {
                const apiRes = await api.json()
                const { access, refresh } = apiRes
                cookie.set('Session_AID', access,
                    { path: '/', maxAge: 60 * 60 * 24, sameSite: 'strict' }
                )
                cookie.set('Session_RID', refresh,
                    { path: '/', maxAge: 60 * 60 * 24 * 10, sameSite: 'strict' }
                )
                const user = User()
                return user
            }
            else
                return { status: 401 }
        }
        else {
            return { status: 401 }
        }

    } catch (error) {
        return { status: 500 }
    }

}

const ServicesList = async () => {
    try {
        const url = location + `/services/list`
        const api = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
        return api
    } catch (error) {
        return { status: 500 }
    }
}

const ProductsList = async () => {
    try {
        const url = location + `/products/list`
        const api = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })

        return api
    } catch (error) {
        return { status: 500 }
    }
}

const ServicesAndCatagories = async () => {
    try {
        const url = location + `/services/service-and-catagories`
        const access = cookie.get('Session_AID')
        const api = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access}`
            },
        })
        return api
    } catch (error) {
        return { status: 500 }
    }
}

const Register = async (formData) => {
    try {
        const url = location + `/services/register`
        const access = cookie.get('Session_AID')
        const body = formData
        const api = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': '*/*',
                'Authorization': `Bearer ${access}` 
            },
            body: body
        })
        return api

    } catch (error) {
        return {status: 500}
    }
}

const ProductsAndCatagories = async () => {
    try {
        const url = location + `/products/product-and-catagories`
        const access = cookie.get('Session_AID')
        const api = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access}`
            },
        })
        return api
    } catch (error) {
        return { status: 500 }
    }
}

const RegisterProducts = async (formData) => {
    try {
        const url = location + `/products/register`
        const access = cookie.get('Session_AID')
        const body = formData
        const api = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': '*/*',
                'Authorization': `Bearer ${access}` 
            },
            body: body
        })
        const apiREs = await api.json()
        console.log(apiREs);
        return api

    } catch (error) {
        return {status: 500}
    }
}

const ImageUpload = async (formdata) => {
    try {
        const url = location + `/authenciation/update-profile`
        const access = cookie.get('Session_AID')
        const body = formdata
        const api = await fetch(url, {
            method: 'PUT',
            headers: {
                'Accept': '*/*',
                'Authorization': `Bearer ${access}`
            },
            body: body
        })
        return api

    } catch (error) {
        return {status: 500}
    }
}

const DetailUpdate = async (formdata) => {
    try {
        const url = location + `/authenciation/account`
        const access = cookie.get('Session_AID')
        const body = JSON.stringify(formdata)
        const api = await fetch(url, {
            method: 'PUT',
            headers: {
                'Accept':'application/json',
                'Content-Type':'application/json',
                'Authorization': `Bearer ${access}`
            },
            body: body
        })
        return api

    } catch (error) {
        return {status: 500}
    }
}

const Myaccount = async () => {
    try {
        const url = location + `/authenciation/account`
        const access = cookie.get('Session_AID')
        const api = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access}`
            },
        })
        return api

    } catch (error) {
        return {status: 500}
    }
}

const logoutUser = () => {
    try {
        cookie.remove('Session_AID', { path: '/', maxAge: new Date(0), sameSite: 'strict' })
        cookie.remove('Session_RID', { path: '/', maxAge: new Date(0), sameSite: 'strict' })
        return 200
    } catch (error) {
        return 500
    }
}

const PasswordUpdate = async (formdata) => {
    try {
        const url = location + `/authenciation/update-password`
        const access = cookie.get('Session_AID')
        const body = JSON.stringify(formdata)
        const api = await fetch(url, {
            method: 'PUT',
            headers: {
                'Accept':'application/json',
                'Content-Type':'application/json',
                'Authorization': `Bearer ${access}`
            },
            body: body
        })
        if (api.status === 200){
            logoutUser()
            return api
        }
        return api

    } catch (error) {
        return {status: 500}
    }
}


const DeleteAccount = async () => {
    try {
        const url = location + `/authenciation/delete-account`
        const access = cookie.get('Session_AID')
        const api = await fetch(url, {
            method: 'Delete',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access}`
            },
        })
        logoutUser()
        return api

    } catch (error) {
        return {status: 500}
    }
}

const ServicesSlugList = async (slug) => {
    try {
        const url = location + `/services/service-provider-list/${slug}`
        const api = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
        return api
    } catch (error) {
        return { status: 500 }
    }
}

const ProductsSlugList = async (slug) => {
    try {
        const url = location + `/products/product-seller-list/${slug}`
        const api = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
        return api
    } catch (error) {
        return { status: 500 }
    }
}

const Search = async (query) => {
    try {
        const url = location + `/base/search?search=${query}`
        const api = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
        return api
    } catch (error) {
        return { status: 500 }
    }
}

export { GetOtp, ValidateOtp, RegisterAsProfessional, login, signup, forgetPassword, 
SessionStatus, ServicesList, ProductsList, Register, ServicesAndCatagories, ProductsAndCatagories,
RegisterProducts, ImageUpload, DetailUpdate, Myaccount, PasswordUpdate, logoutUser, DeleteAccount,
ServicesSlugList, ProductsSlugList, Search
}