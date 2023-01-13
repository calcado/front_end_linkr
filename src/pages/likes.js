import { useState } from "react"



export function Likes(){
const [allLikes, setAllLikes] = useState();
const [like,setLike] = useState();



return(
                                    <Like>
                                    <HeartIcon OnClick={() => Like} > {(!liked) ? <BsHeart /> : <BsHeartFill />} </HeartIcon>
                                    <WhoLikes id="postId" data-data-tooltip-content="You liked this">
                                        {likesCount} likes
                                    </WhoLikes>
                                   
                                    </Like>
                                   

)

}