import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import BASE_URL from "./constants"



export default function TopBar ({picture, token}) {

    const navigate = useNavigate()
    let [switcher, setSwither] = useState(false)


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
            <Menu onClick={()=>setSwither(!switcher)}>
                {(!switcher)
                ?
                <ion-icon name="chevron-down-outline" ></ion-icon> 
                :
                <ion-icon name="chevron-up-outline" onClick={()=>!switcher}></ion-icon> } 
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
    ion-icon{
        font-size: 30px;  
    }
    
`
const Options = styled.div`
    display: ${props => props.switcher ? 'flex' : 'none'};
    position: fixed;
    top: 72px;
    right: 0px;
`