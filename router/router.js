// 这是路由模块
const express = require('express')
const router = express.Router()
const db = require('../db/db');

router.get('/shoplist', (req, res) => {
    const sqlStr = 'select * from shop_list'
    db.query(sqlStr, (err, results) => {
        // 查询数据失败
        if (err) return console.log(err.message)
        // 查询数据成功
        // 注意：如果执行的是 select 查询语句，则执行的结果是数组
        console.log(results)
        res.send(results)
    })
})

router.get('/goodslistAll', (req, res) => {
    const sqlStr = 'select * from goods_list'
    db.query(sqlStr, (err, results) => {
        // 查询数据失败
        if (err) return console.log(err.message)
        // 查询数据成功
        // 注意：如果执行的是 select 查询语句，则执行的结果是数组
        res.send(results)
    })
})

router.get('/goodslist', (req, res) => {
    const sqlStr = 'select * from goods_list where goodsCategory like ?'
    console.log(req.query.name)
    const name = req.query.name
    db.query(sqlStr, name, (err, results) => {
        // 查询数据失败
        if (err) return console.log(err.message)
        // 查询数据成功
        // 注意：如果执行的是 select 查询语句，则执行的结果是数组
        res.send(results)
    })
})

// 登录接口
router.post('/userCheck', (req, res) => {
    console.log(req.body)
    const sqlStr = 'select * from user_list where userName = ? and userPwd = ?'
    db.query(sqlStr, [req.body.username, req.body.password], (err, results) => {
        // 查询数据失败
        if (err) return console.log(err.message)
        if (results.length === 1) {
            res.send({
                code: 0,
                msg: '查询成功'
            })
        } else {
            res.send({
                code: 1,
                msg: '查询失败'
            })
        }
        console.log(results)
    })
})

// 注册接口
router.post('/regUser', (req, res) => {
    console.log(req.body)
    const { username, password, nickname, paypwd } = req.body
    const testStr = 'select * from user_list where userName = ?'
    const sqlStr = 'insert into user_list (userName, userPwd,payPwd,nickName) values (?, ?, ?, ?)'
    db.query(testStr, username, (err, results) => {
        if (err) return console.log(err.message)
        if (results.length === 1) {
            res.send({
                code: 1,
                msg: '用户名已存在'
            })
        } else if (results.length === 0) {
            db.query(sqlStr, [username, password, nickname, paypwd], (err, results) => {
                if (err) return console.log(err.message)
                if (results.affectedRows === 1) {
                    console.log('插入数据成功!')
                    res.send({
                        code: 0,
                        msg: '注册成功！'
                    })
                } else {
                    res.send({
                        code: 1,
                        msg: '注册失败！'
                    })
                }
            })
        }
    })
})
// router.post('/user/add', (req, res) => {
//   res.send('Add new user.')
// })

module.exports = router
