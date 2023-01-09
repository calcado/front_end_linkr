import axios from "axios"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import BASE_URL from "./constants"
import {DebounceInput} from 'react-debounce-input'



export default function TopBar () {

    const [switcher, setSwither] = useState(false)
    const navigate = useNavigate()
    const token = JSON.parse(localStorage.getItem("token"))
    const [picture, setPicture] = useState(null)
    const [search, setSearch] = useState()
    const [user, setUser] = useState()

    useEffect(() => {
        axios.post(`${BASE_URL}/signin`,{}, {headers: {"authorization":`Bearer: ${token}` }})
            .then((ans) => {
                setPicture(ans.data.urlPicture)
            })
            .catch(ans => {
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

    function searchUser () {

        axios.get(`${BASE_URL}/username/${search}`)
            .then((ans) => {
                setUser(ans.data)
            })
            .catch((ans) => console.log(ans.data))
    }

    return (
        <Bar>
            <span onClick={()=>navigate("/timeline")}>linkr</span>
            <SearchBar>
                <DebounceInput minLength={2} debounceTimeout={300} onChange={e => {
                    setSearch(e.target.value)
                    searchUser()
                    }} />
                {(user && search?.length > 2) &&
                    <Results user={user}>
                        {user?.map((user)=>
                            {return <User key={user.id} onClick={()=> {
                                setSearch('')
                                navigate(`/user/${user.id}`)}}>
                                <img src={user.urlpicture} alt="urlPicture"/>
                                <span>{user.name}</span>
                            </User>}
                        )}
                    </Results>
                }
            </SearchBar>
            <Menu onClick={()=>setSwither(!switcher)}>
                {(!switcher)
                ?
                <ion-icon name="chevron-down-outline" ></ion-icon> 
                :
                <ion-icon name="chevron-up-outline" ></ion-icon> } 
                <img src={picture} alt="profilePic"/>
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
        letter-spacing: 1px;
        cursor: pointer;
    }
    img{
        width: 53px;
        height: 53px;
        border-radius: 50%;
    }
    input{
        box-sizing: border-box;
        border: none;
        width: inherit;
        height: 45px;
        outline: none;
        border-radius: 8px;
        position: fixed;
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
    img{
        object-fit: cover;
    }
    
`

const SearchBar = styled.div`
    background-color: white;
    position: fixed;
    width: 33vw;
    top: 15px;
    left: 33%;
    color: grey;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    border-radius: 8px;
`

const Results = styled.div`
    display: flex;
    width: inherit;
    flex-direction: column;
    font-family: 'Lato';
    font-size: 19px;
    margin-top: 50px;
    border-radius: 8px;
    img{
        width: 39px;
        height: 39px;
        font-size: 12px;
    }
    span{
        margin-left: 15px;
        font-size: 30px;
    }
`

const User = styled.div`
    box-sizing: border-box;
    width: inherit;
    padding: 10px;
    display: flex;
    justify-content: left;
    align-items: left;
    cursor: pointer;
    background-color: #E7E7E7;
    border-radius: 8px;
`

const Options = styled.div`
    display: ${props => props.switcher ? 'flex' : 'none'};
    position: fixed;
    top: 72px;
    right: 0px;
`