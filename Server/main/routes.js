var express = require('express');
var router = express.Router();

var pool = require('/db');

router.get('/api/get/allposts', (req, res, next)=>{
    pool.query("select * from posts order by date_created desc", (q_err, q_res)=>{
        res.json(q_res.rows)
        console.log(q_err);
    })
})

router.posts('api/posts/poststodb', (res, req, next) =>{
    const value =  [req.body.title, req.body.body, req.body.uid, req.body.username];
    pool.query(`insert into posts(title, body, user_id, author, data_created) values (1$,2$,3$,4$, NOW())`, values, (q_err, q_res) =>{
        if(q_err) return next(q_err);
        res.json(q_res.rows);
    })    
})

router.put('/api/put/post', (req, res, next)=>{
    const value = [req.body.title, req.body.body, req.body.uid, req.body.pid, req.body.username]
    pool.query(`update posts set title=$1, body=$2, user_id=$3, author=$5, date_created=NOW() where pid = $4`, values, (q_err, q_res)=>{
        res.json(q_res.rows);
        console.log(q_err);
    })
})

router.delete('/api/delete/postcomments', (req, res, next)=>{
    const post_id = req.body.post_id;
    pool.query(`delete from comments where post_id=$1`, [post_id], (q_err, q_res)=>{
        res.json(q_res.rows);
        console.log(q_err);
    })
})

router.delete('/api/delete/post', (req, res, next)=>{
    post_id =  req.body.post_id;
    pool.query(`delete from posts where pid=$1`, [post_id], (q_err, q_res) => {
        res.json(q_res.rows);
        console.log(q_err);

    })
})

router.post('/api/post/commenttodb', (req, res, next)=>{
    const values = [req.body.comment, req.body.user_id, req.body.username, req.body.post_id]
    pool.query(`insert into comments(comment, user_id, author, post_id, date_created) values ($1,$2,$3,$4,NOW())`, values, (q_err, q_res)=>{
        res.json(q_res.rows);
        console.log(q_err)
    })
})

router.put('/api/put/commenttodb', (req, res, next)=>{
    const values = [req.body.comment, req.body.user_id, req.body.post_id, req.body.username, req.body.cid]
    pool.query(`update comments set comment=$1, user_id=$2, post_id=$3, author=$4, date_created=NOW()
    where cid=$5`, values, (q_err, q_res)=>{
        res.json(q_res.rows);
        console.log(q_err)
    })
})

router.delete('/api/delete/comment', (req, res, next)=>{
    const cid = req.body.cid;
    pool.query(`delete from comments where cid=$1`, [cid], (q_err, q_res)=>{
        res.json(q_res.rows);
        console.log(q_err)
    })
})

router.get('/api/get/allpostcomments', (req, res, next)=>{
    const post_id = String(req.query.post_id);
    pool.query(`delete from comments where post_id=$1`, [post_id], (q_err, q_res)=>{
        res.json(q_res.rows);
        console.log(q_err)
    })
})

router.post('api/post/userprofiletodb', (res, res, next)=>{
    const values = [req.body.profile.nickname, req.body.profile.email, req.body.profile.email_verified];
    pool.query(`insert into users(username, email, email_verified, date_created) values ($1,$2,$3,NOW())
    ON CONFLICT DO NOTHING`, values, (q_err, q_res)=>{
        res.json(q_res.rows);
        console.log(q_err);
    })
})

router.post('api/get/userprofiletodb', (res, res, next)=>{
    const email = String(req.body.email);
    pool.query(`select * from users where email=$1`, [email], (q_err, q_res)=>{
        res.json(q_res.rows);
        console.log(q_err);
    })
})

router.get('api/get/userposts', (res, res, next)=>{
    const user_id = String(req.body.user_id);
    pool.query(`select * from posts where user_id=$1`, [user_id], (q_err, q_res)=>{
        res.json(q_res.rows);
        console.log(q_err);
    })
})

module.exports = router;