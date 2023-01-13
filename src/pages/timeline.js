
import styled from "styled-components";
import { useState, useEffect } from "react";
import { posttrending, gettrending ,deletepost,editpost} from "../request/request";
import TopBar from "../TopBar";
import { BsHeart, BsHeartFill, BsPencil, BsTrash,BsCheckCircleFill } from "react-icons/bs";
import axios from "axios"
import { Tooltip } from 'react-tooltip'
import BASE_URL from "../constants.js"
import { useInterval } from 'usehooks-ts'
import { ReactTagify } from "react-tagify";
import { useNavigate } from "react-router-dom";
import TrendingBar from "../TrendingBar";



export default function Timeline() {

    const token = JSON.parse(localStorage.getItem("token"))
    const [url, seturl] = useState();
    const [description, setdescription] = useState();
    const [loading, setloading] = useState(true);
    const [trending, settrending] = useState();
    const [error, seterror] = useState();
    const [refresh, setrefresh] = useState(true);
    const [liked, setLike] = useState(false);
    const [likesCount, setNumberLikes] = useState(0);
    const [picture, setPicture] = useState(null)
    const [user, setuser] = useState(null)
    const [checkId, setCheck] = useState('');
    const [value, setvalue] = useState('');
    const [newpost,setnewpost] = useState(false);
    const [qtd,setqtd] = useState(0)
    const [limit,setlimit] = useState(10)
    
    const navigate = useNavigate();
   
            


    useInterval(()=>  {
        let answer = gettrending(token);
    answer.then((res) => {
       
        if(res.data[0].id === trending[0].id){
         
        }else{
            setqtd(res.data.indexOf(res.data.filter((ref)=> ref.id == trending[0].id)[0],0))
            setnewpost(true)
        }
       
    });
    answer.catch(() =>
       console.log(
            "An error ocurred while trying to fetch the posts,please refresh the page"
        )
    )},15000)

 function handleCheck(e, id) {
    e.preventDefault();
    setCheck(id);
  }

  
  const handleChange = (event) => {
    setvalue(event.target.value);
    
  };

    useEffect(() => {
        axios.post(`${BASE_URL}/signin`,{}, {headers: {"authorization":`Bearer: ${token}` }})
            .then((ans) => {
                console.log(ans)
                setPicture(ans.data.urlPicture);
                setuser(ans.data.userId)
            })
            .catch(ans => {
                     console.log(ans)                     
            })
    },[token])

    

    useEffect(() => {
      
        let answer = gettrending(token,limit);
        answer.then((res) => {
            settrending(res.data);

        });
        answer.catch(() =>
            seterror(
                "An error ocurred while trying to fetch the posts,please refresh the page"
            )
        );
    }, [refresh,limit]);

    function senttrack() {
        setloading(false);
        if (!url || url.length < 3) {
            alert("Obrigatório colocar uma url valida!");
            setloading(true);
            return;
        }
        let envio = { url, description, userid: 1 };
        let send = posttrending(envio, token);
        send.then(() => {
            setloading(true);
            seturl();
            setdescription();
            setrefresh(!refresh);
        });
        send.catch(() => {
            alert("Houve um erro ao publicar seu link");
            setloading(true);
        });

    }

    // function Like() {
    //     if (liked === false) {
    //         setLike(true);
    //         const requisition = axios.post(`${BASE_URL}/timeline/post/:id/likes`);
    //         requisition.then((response) => {
    //             setNumberLikes(likesCount + 1);
    //         });
    //         requisition.catch((response) => {
            
    //             console.log(response);
    //         });
    //     } else {
    //         setLike(false);
    //         const requisition = axios.delete(`${BASE_URL}/timeline/postId`);
    //         requisition.then((response) => {
    //             setNumberLikes(likesCount - 1);
    //         });
    //         requisition.catch((response) => {
              
    //             console.log(response);
    //         });
    //     }
    //     function WhoLiked() {
    //         const requisition = axios.get(`${BASE_URL}/timeline/postId/`)
    //     }
    // }


    return (
         <>
            <TopBar />
            <Container>
            <MainContainer>
                <TrendingBar></TrendingBar>
            </MainContainer>
                <Trends>
                    <Tittle>
                        timeline
                    </Tittle>
                    <Publish>
                        <img src={picture}></img>
                        <div>
                            What are you going to share today?
                            <Link value={url ? url : ""} disabled={!loading} onChange={(e) => { seturl(e.target.value) }} placeholder="http://...">

                            </Link>
                            <Description value={description ? description : ""} disabled={!loading} onChange={(e) => { setdescription(e.target.value) }} placeholder="Awesome article about #javascript"></Description>
                            <footer>
                                <Button disabled={!loading} onClick={() => { senttrack() }}>
                                    {loading === true ? "Publish" : "Publishing..."}
                                </Button>
                            </footer>
                        </div>
                    </Publish>
                    {newpost? <Newpost onClick={()=>{setrefresh(!refresh);setnewpost(false)}}>
                        <h1>{qtd} new posts, load more!</h1>
                    </Newpost>:<></>}
                   
                    <Publications>
                        {trending ? trending.map((ref) => {
                            return (
                                <Publication key={ref.id}>


                                    <div><Perfil src={ref.urlpicture} ></Perfil>

                                     
                                    </div>
                               
                                    {ref.userid === user? <Icons>{checkId === ref.id? <div onClick={()=>{let sends = editpost(ref.id,value);sends.then(setCheck(''),setrefresh(!refresh),setvalue(""))}}><BsCheckCircleFill /></div> : <div onClick={(e) => handleCheck(e, ref.id)}><BsPencil /></div>}<div onClick={()=> {if (window.confirm("Tem certeza que deseja excluir este post?") == true) {let del = deletepost(ref.id) ;del.then(setrefresh(!refresh))}}}><BsTrash /></div></Icons> : <></>}

                                    <Like>
                                    <Icon OnClick={() => Like} > {(!liked) ? <BsHeart /> : <BsHeartFill />} </Icon>
                                    <WhoLikes id="postId" data-data-tooltip-content="You liked this">
                                        {likesCount} likes
                                    </WhoLikes>
                                   
                                    </Like>


                                   

                                    {/* <StyledReactToolTip place="bottom" id="usersId">

                                        Você, João e outras {likesCount - 2} pessoas

                                    </StyledReactToolTip> */}

                                    <Arruma>
                                        <h1>{ref.name}</h1>
                                                                                   
                                        {checkId === ref.id? <input name="input" type="text" value={value} onChange={handleChange} placeholder={ref.description}  ></input> : <ReactTagify tagStyle={{fontWeight: 600, color: "white"}} tagClicked={(tag) => navigate(`/hashtag/${tag.slice(1)}`)}><h2>{ref.description? ref.description:""}</h2>  </ReactTagify>}
                                         
                                            <Links>
                                            <div>
                                                <h3>{ref.titulo}</h3>
                                                <h4>{ref.descricao}</h4>

                                                <a target="_blank" href={ref.url}>
                                                    {" "}
                                                    {ref.url}
                                                </a>

                                            </div>
                                            <img src={ref.imgurl}></img>
                                        </Links>

                                    </Arruma>

                                </Publication>
                            );
                        })
                            : error
                                ? error
                                : "There are no post yet"}

                    </Publications>
                  
                </Trends>
            
            </Container>
          
        </>

    );


}
const MainContainer = styled.div`
    display: flex;
    z-index:-1;
 `

const Newpost = styled.div`
background: #1877F2;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
border-radius: 16px;
width: 100%;
display:flex;
margin-top:40px;
align-items: center;
justify-content: center;
height: 61px;
h1{
font-family: 'Lato';
font-style: normal;
font-weight: 400;
font-size: 16px;
line-height: 19px;
color: #FFFFFF;

}
`
const Perfil = styled.img`
    position:absolute;
    width:50px;
    height:50px;
    border-radius: 50%;
    left: 18px;
    top: 16px;

`

const Arruma = styled.div`

    display:flex;
    margin-left: 87px;
    margin-top: 10px;
    font-family: 'Lato', sans-serif;
    font-style: normal;
    font-weight: 300;
    font-size: 20px;
    line-height: 24px;
    color: #707070;
    max-width:520px;
    flex-direction: column;
   
 

`

const Links = styled.footer`
display:flex;
width: 503px;
min-height: 155px;
border: 1px solid #4D4D4D;
border-radius: 11px;
padding-left:19px;
justify-content: space-between;
img{
border-top-right-radius: 11px;
border-bottom-right-radius: 11px;
height: 100%;
width: 154px;

}
h3{
    margin-top:24px;
    font-family: 'Lato', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: #CECECE;
}
h4{
    margin-top:5px;
 font-family: 'Lato', sans-serif;
font-style: normal;
font-weight: 400;
font-size: 11px;
line-height: 13px;
color: #9B9595;
}
a{
    margin-top:13px;
    font-family: 'Lato', sans-serif;
font-style: normal;
font-weight: 400;
font-size: 11px;
line-height: 13px;
text-decoration:none;
color: #CECECE;
}
`
const Publications = styled.div`
margin-top:28px;
`
const Publication = styled.div`
margin-bottom:16px;
background: #171717;
width: 611px;
min-height: 276px;
border-radius: 16px;
position:relative;
display:flex;
padding-right:21px;
word-break: break-word;

h1{
font-family: 'Lato', sans-serif;
font-style: normal;
font-weight: 400;
font-size: 19px;
line-height: 23px;
color: #FFFFFF;
word-wrap: break-word;
}
h2{
 font-family: 'Lato', sans-serif;
font-style: normal;
font-weight: 400;
font-size: 17px;
line-height: 20px;
color: #B7B7B7;
word-wrap: break-word;
margin-right:22px;
}
input{
    font-family: 'Lato', sans-serif;
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 20px;
color: #4C4C4C;
word-wrap: break-word;
margin-right:22px;
background: #FFFFFF;
border-radius: 7px;
min-height: 30px;
width:100%;
margin-top:10px;
margin-bottom:10px;
}
`
const Button = styled.button`
width: 112px;
height: 31px;
background: #1877F2;
border-radius: 5px;
border-style:none;
font-family: 'Lato', sans-serif;
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
width: 98vw;
margin-top: 78px;
z-index: -1;
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
    font-family: 'Lato',sans-serif;
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
    font-family: 'Lato',sans-serif;
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
font-family: 'Oswald',sans-serif;
font-style: normal;
font-weight: 700;
font-size: 43px;
line-height: 64px;
color: white;
`

const Icon = styled.button`
height: 20px;
margin-bottom:5px;
width: 20px;
color: ${props => props.liked === false ? "#FFFFFF" : "#AC0000"};
cursor: pointer;
top: 86px;
left: 33px;
`
const WhoLikes = styled.div`
width: 50px;
height: 13px;
font-size: 11px;
color: #FFFFFF;
font-family: 'Lato',sans-serif;

top: 45px;

left: 16px;
`

const StyledReactToolTip = styled(Tooltip)`
background-color: #FFFFFF !important;
color: #505050 !important;
box-shadow: 0px 2px 20px lightgray;
width: 169px;
height: 24px;
border-radius: 4px;
`

const Icons = styled.div`
display:flex;
width:40px;
justify-content: space-between;
position:absolute;
color: #FFFFFF;
right:22px;
top:23px;
`
const Like = styled.div`

left:30px;
display:flex;
flex-direction: column;
position:absolute;
display:flex;
top:86px;
`
