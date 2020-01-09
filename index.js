const Koa = require('koa');
const app = new Koa();
const userSerializer = require('./seriallizer/use.seriallizer').userSeriallizer

app.use(async ctx => {
	var userList = require('./db/db').user;
	ctx.body = userSerializer( userList );
});

app.listen(3000);
