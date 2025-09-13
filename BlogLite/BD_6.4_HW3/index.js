const express = require('express');
let {getAllArticles,getArticleById,getAllComments,getCommentById,getUserById} = require("./articles.js")
const app = express();
app.use(express.json());
app.use(express.static('static'));

app.get('/articles', async (req, res) => {
 try{
   let articles = await getAllArticles();
   if(articles.length===0) return res.status(404).send({error: "No articles found"});
   return res.json(articles);
  }catch(error){
    return res.status(500).send({error:"Internal server error"});
  }
});
app.get("/articles/:id", async (req,res)=>{
try{
  let article = await getArticleById(parseInt(req.params.id));
  if(!article) return res.status(404).send({error:"Article not found"});
  return res.json(article);
}catch(error){
  return res.status(500).send({error:"Internal server error"});
}
});
app.get("/comments",async (req,res)=>{
  try{
    let comments = await getAllComments();
    if(comments.length===0) return res.status(404).send({error:"No comments found"});
    return res.json(comments)
  }catch(error){
    return res.status(500).send({error:"Internal server error"});
  }
});
app.get("/comments/:id",async (req,res)=>{
  try{
    let comment = await getCommentById(parseInt(req.params.id));
    if(!comment) return res.status(404).send({error:"Comment not found"})
    return res.json(comment);
  }catch(error){
    return res.status(500).send({error:"Internal server error"});
  }
});
app.get("/users/:id", async (req,res)=>{
  try{
    let user = await getUserById(parseInt(req.params.id));
    if(!user) return res.status(404).send({error:"user not found"})
    return res.json(user);
  }catch(error){
    return res.status(500).send({error:"Internal server error"});
  }
});


module.exports = {app};