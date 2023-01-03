import { useNavigate } from "react-router-dom"
import styled from "styled-components"

export default function SignIn () {

    const navigate = useNavigate()

    return (
        <Container>
            <Logo>
                <Title>
                    <font face='Passion One'>linkr</font> <br/>
                    save, share and discover
                    the best links on the web  
                </Title>
            </Logo>
            <Login>
                <form>
                    <input placeholder="e-mail"/>
                    <input placeholder="password" type="password" />
                    <input placeholder="username"/>
                    <input placeholder="picture url"/>
                    <button type="submit">Log In</button>
                    <span onClick={() => navigate("/")}><br/>Switch back to log in</span>
                </form>
                
            </Login>
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

const Login = styled.aside`
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
        background-color: #1877F2;
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