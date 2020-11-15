import st from "./MyPosts.module.css";
import Post from "./Post/Post";

function MyPosts() {
    let posts = [
        {id:1,        message:"Is it your first day on the internet lmao",  name:"Kabluk Jma",      likes:69, img:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSm_fOn75B7WzCl9gIhBqAqjiSmCIqwdQrDEHzf0HTIfCqCq1Vj71iszAMirZc4alSA0ygIgWxOAY5fiSypsQTCvd6r4uNmGqjt70ueivg&usqp=CAU&ec=45725303"},
        {id:2,        message:"Nice dck bro",                               name: "Fikalis Anton",  likes:100,img:"https://i.pinimg.com/564x/f1/23/05/f1230501d33cb2c6055b2d6ea221a22d.jpg"},
        {id:3,        message:"would you simp for me",                      name: "Kakun Barov",    likes:14, img:"https://media.tenor.com/images/c50ba1f5c34496af4f9eb2a805ef29ea/tenor.gif"},
        {id:4,        message:"каво",                                       name:"Big Brother",     likes:26, img:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRB_mt5A7b2-UR_9NKmESs-1OJ9-daZW9xaeg&usqp=CAU"},
        {id:5,        message:"это я, упал намоченный генерал",             name:"Герой Украины",   likes:61, img:"https://pbs.twimg.com/media/C5AmsxoWIAAWlfS.jpg"},
    ]
    let postsElements = posts.map(p => <Post name={p.name} message={p.message} likes={p.likes} img={p.img}/>)

    return (
        <div>
            <div className={st.postingBlock}>
                <h3>My posts</h3>
                <div>
                    <textarea></textarea>
                </div>
                <div>
                    <button>Add post</button>
                </div>
            </div>
            <div className={st.posts}>
                {postsElements}
            </div>
        </div>
    );
}

export default MyPosts;
