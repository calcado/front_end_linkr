import styled from "styled-components"
import { useState } from "react"

export default function Timeline() {



    const exemplos = [{ name: "Cledson", comentario: "Olha que site daoraaaa", url: "https://www.globo.com/" }, { name: "Cledson2", comentario: "Olha que site daoraaaa e segundooooooo ", url: "https://www.globoesporte.com/" }]

    const url = "https://photos.google.com/album/AF1QipN4pJZIo4phMmY3bQ6u-E-JawRDUat45tIHlgsF/photo/AF1QipMl75Fjq994juANTK6BQ8KdnZgKZwW-Q1m50KKI";
    return (
        <Container>
            <Trends>
                <Tittle>
                    timeline
                </Tittle>
                <Publish>
                    <img src={url}></img>
                    <div>
                        What are you going to share today?
                        <Link placeholder="http://...">

                        </Link>
                        <Description placeholder="Awesome article about #javascript"></Description>
                        <footer>
                            <Button onClick={() => alert("olaaa")}>
                                Publish
                            </Button>
                        </footer>
                    </div>
                </Publish>
                <Publications>
                    <Publication>
                        <img src={url}></img>
                        <div>
                            <h1>MEU NOME LINDO</h1>
                            <h2>textooooooooooooooooooooooooooooooooooooooooooo</h2>

                        </div>
                    </Publication>
                </Publications>
            </Trends>
        </Container>
    )
}

const Publications = styled.div`
`
const Publication = styled.div`
`
const Button = styled.button`
width: 112px;
height: 31px;
background: #1877F2;
border-radius: 5px;
border-style:none;
font-family: 'Lato';
font-style: normal;
font-weight: 700;
font-size: 14px;
line-height: 17px;
color: #FFFFFF;
`

const Container = styled.div`
display: flex;
align-items: center;
justify-content: center;
width: 100vw;
margin-top: 78px;

`
const Publish = styled.div`
width: 611px;
height: 209px;
display:flex;
background: #FFFFFF;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
border-radius: 16px;
position:relative;
img{
    position:absolute;
    width:50px;
    height:50px;
    border-radius: 50%;
    left: 18px;
    top: 16px;
}
div{
    margin-left: 87px;
    margin-top: 21px;
    font-family: 'Lato';
    font-style: normal;
    font-weight: 300;
    font-size: 20px;
    line-height: 24px;
    color: #707070;
}
footer{
    margin-top:5px;
    width: 503px;
    height: 31px;
    display:flex;
    justify-content:flex-end;
}

`
const Link = styled.input`
background: #EFEFEF;
border-radius: 5px;
width: 503px;
height: 30px;
border-style:none;
margin-top:5px;
padding-left:5px;
::placeholder {
    font-family: 'Lato';
    font-style: normal;
    font-weight: 300;
    font-size: 15px;
    line-height: 18px;
       color: #949494;
     
  }
`
const Description = styled.input`
background: #EFEFEF;
border-radius: 5px;
width: 503px;
height: 66px;
border-style:none;
margin-top:5px;
padding-left:5px;
::placeholder {
    font-family: 'Lato';
    font-style: normal;
    font-weight: 300;
    font-size: 15px;
    line-height: 18px;
       color: #949494;
     
  }

`

const Trends = styled.div`
width:612px;
height:100%;
`

const Tittle = styled.h1`
font-family: 'Oswald';
font-style: normal;
font-weight: 700;
font-size: 43px;
line-height: 64px;
color: white;
`