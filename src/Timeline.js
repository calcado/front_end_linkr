import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import BASE_URL from "./constants.js"
import TopBar from "./TopBar.js"



export default function Timeline1 () {


    const navigate = useNavigate()
    const token = JSON.parse(localStorage.getItem("token"))
    const [picture, setPicture] = useState(null)

    useEffect(() => {
        axios.post(`${BASE_URL}/signin`,{}, {headers: {"authorization":`Bearer: ${token}` }})
            .then((ans) => {
                console.log(ans.data)
                setPicture(ans.data.urlPicture)
            })
            .catch(ans => {
                console.log(ans)
                alert("Token inválido!")
                navigate("/")
            })
    },[token, navigate])

    return (
        <>
            <TopBar picture={picture} token={token}/>
        </>
    )
}