import { useState } from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import BASE_URL from "./constants"
import axios from "axios"

export default function SignUp () {

    const navigate = useNavigate()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [userName, setUserName] = useState()
    const [urlPicture, setUrlPicture] = useState()
    const [disable, setDisable] = useState(false)


    function register (event) {
        event.preventDefault()
        setDisable(true)

        axios.post(`${BASE_URL}/signup`, {email:email, password: password, name: userName, urlPicture: urlPicture})
            .then((ans) => {
                navigate("/")
            })
            .catch((ans) => {console.log(ans)
                alert(ans.response.data)
                setDisable(false)
            })
    }

    return (
        <Container>
            <Logo>
                <Title>
                    <font face='Passion One'>linkr</font> <br/>
                    save, share and discover
                    the best links on the web  
                </Title>
            </Logo>
            <Registration disable={disable}>
                <form onSubmit={register}>
                    <input placeholder="e-mail" type="email" onChange={e => {setEmail(e.target.value)}} required/>
                    <input placeholder="password" type="password" onChange={e => {setPassword(e.target.value)}} required/>
                    <input placeholder="username"onChange={e => {setUserName(e.target.value)}} required/>
                    <input placeholder="picture url" onChange={e => {setUrlPicture(e.target.value)}}/>
                    <button type="submit" disabled={disable}>Sign Up</button>
                    <span onClick={() => navigate("/")}><br/>Switch back to log in</span>
                </form>        
            </Registration>
        </Container>
    )
}

const Logo = styled.div`
    width: 65vw;
    height: 98vh;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Oswald';
    font-size: 43px;
    background-color: #151515;
    color: white;
    font-weight: 700;
`

const Title = styled.div`
    width: 400px;
    height: 300px;
    margin-right: 400px;
    margin-bottom: 150px;
    font{
        font-size: 106px;
        letter-spacing: 10px;
    }
`

const Registration = styled.aside`
    width: 34vw;
    height: 98vh;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    background-color: #333333;
    justify-content: center;
    align-items: center;
    span{
        font-family: 'Lato';
        font-size: 20px;
        text-decoration: underline;
        color: white;
        cursor: pointer;
    }
    form{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    input {
        box-sizing: border-box;
        width: 430px;
        height: 65px;
        outline: none;
        border: none;
        border-radius: 6px;
        margin-bottom: 10px;
        font-family: 'Oswald';
        font-size: 27px;
        color: #9F9F9F;
        padding-left: 15px;
    }
    button{
        width: 430px;
        height: 65px;
        background-color: ${props => props.disable ? 'gray' : '#1877F2'};
        color: white;
        border: none;
        border-radius: 6px;
        font-family: 'Oswald';
        font-size: 27px;
        cursor: pointer;
    }
`
const Container = styled.div`
    display: flex;
` 