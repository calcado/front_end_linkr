import axios from "axios"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import BASE_URL from "./constants"



export default function TopBar () {

    const [switcher, setSwither] = useState(false)
    const navigate = useNavigate()
    const token = JSON.parse(localStorage.getItem("token"))
    const [picture, setPicture] = useState(null)

    useEffect(() => {
        axios.post(`${BASE_URL}/signin`,{}, {headers: {"authorization":`Bearer: ${token}` }})
            .then((ans) => {
                setPicture(ans.data.urlPicture)
            })
            .catch(ans => {
                console.log(ans)
                alert("Token inválido!")
                localStorage.removeItem("token")
                navigate("/")
            })
    },[token, navigate])


    function logout () {
        axios.delete(`${BASE_URL}/logout/${token}`)
            .then((ans) => {
                localStorage.removeItem("token")
                navigate("/")})
            .catch((ans) => alert("Não foi possível fazer logout!"))
    }

    return (
        <Bar>
            <span>linkr</span>
            <SearchBar>
                <input />
            </SearchBar>
            <Menu onClick={()=>setSwither(!switcher)}>
                {(!switcher)
                ?
                <ion-icon name="chevron-down-outline" ></ion-icon> 
                :
                <ion-icon name="chevron-up-outline" ></ion-icon> } 
                <img src={picture} alt="profile"/>
                <Options switcher={switcher}>
                    <button onClick={()=>logout()}>Logout</button>
                </Options>
            </Menu>
        </Bar>
    )
}

const Bar = styled.div`
    box-sizing: border-box;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100vw;
    height: 72px;
    background-color: black;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;
    padding: 15px;
    span{
        font-family: 'Passion One';
        font-size: 49px;
        letter-spacing: 3px;
    }
    img{
        width: 53px;
        height: 53px;
        border-radius: 50%;
    }
`

const Menu = styled.div`
    width: 90px;
    cursor: pointer;
    align-items: center;
    display: flex;
    justify-content: space-between;
    margin-right: 15px;
    ion-icon{
        font-size: 30px;  
    }
    
`

const SearchBar = styled.div`

`

const Options = styled.div`
    display: ${props => props.switcher ? 'flex' : 'none'};
    position: fixed;
    top: 72px;
    right: 0px;
`