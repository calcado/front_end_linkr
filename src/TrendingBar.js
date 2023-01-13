import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router";
import styled from "styled-components"
import BASE_URL from "./constants";

export default function TrendingBar () {
    const [trendingList, setTrendingList] = useState();
    const navigate = useNavigate()
    
    useEffect(() => {      
        axios
            .get(`${BASE_URL}/trending`)
            .then((res) => setTrendingList(res.data))
            .catch(() => alert("Erro ao carregar o trending"));
    }, [])
    
    return (
            <Trending>
                <h2>trending</h2>
                <div />
                {trendingList?.map((trend) => (
                    <li onClick={() => navigate(`/hashtag/${trend.name}`)}>
                        # {trend.name}
                    </li>
                ))}
            </Trending>
    )
}

const Trending = styled.ul`
    width: 301px;
    list-style-type: none;
    height: 400px;
    position: fixed;
    display: flex;
    flex-direction: column;
    top: 21vh;
    left: 77vw;
    background: #171717;
    border-radius: 16px;
    h2 {
        margin-top: 10px;
        position: absolute;
        width: 95px;
        font-family: "Oswald";
        font-style: normal;
        font-weight: bold;
        font-size: 27px;
        line-height: 40px;
        color: #ffffff;
    }
    div {
        height: 1px;
        background-color: #484848;
        margin-top: 61px;
    }
    li {
        width: 230px;
        height: 293px;
        font-family: "Lato";
        font-style: normal;
        font-weight: 700;
        font-size: 19px;
        line-height: 23px;
        letter-spacing: 0.05em;
        color: #ffffff;
        overflow: scroll;
    }
`;
