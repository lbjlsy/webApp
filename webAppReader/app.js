var koa = require('koa');
var controller = require('koa-route');
var app = koa();//koa 实例

var views = require('co-views');
var render = views('./view', {
    map: {html: 'ejs'}
});
var koa_static = require('koa-static-server');
var service = require('./service/webAppService.js');
app.use(koa_static({
    rootDir: './static/',
    rootPath: '/static/',
    maxage: 0
}));//添加路由

app.use(controller.get('/route_test', function* () {
    this.set('Cache-Control', 'no-cache');
    this.body = 'Hello Node.js!';
}));

app.use(controller.get('/ejs_test', function* () {
    this.set('Cache-Control', 'no-cache');
    this.body = yield render('test', {title: 'title_test'});//ES6异步
}));

app.use(controller.get('/api_test', function* () {
    this.set('Cache-Control', 'no-cache');
    this.body = service.get_test_data();//ES6异步
}));

app.use(controller.get('/', function* () {
    this.set('Cache-Control', 'no-cache');
    this.body = yield render('index', {title: '书城首页'});//ES6异步
}));

app.use(controller.get('/search', function* () {
    this.set('Cache-Control', 'no-cache');
    this.body = yield render('search', {title: '搜索页面'});//ES6异步
}));

var querystring = require('querystring');
app.use(controller.get('/book', function* () {
    this.set('Cache-Control', 'no-cache');
    var params = querystring.parse(this.req._parsedUrl.query);
    var bookId = params.id;
    this.body = yield render('book', {bookId: bookId});//ES6异步
}));

app.use(controller.get('/ajax/index', function* () {
    this.set('Cache-Control', 'no-cache');
    this.body = service.get_index_data();
}));//nodejs调用服务端接口

app.use(controller.get('/ajax/rank', function* () {
    this.set('Cache-Control', 'no-cache');
    this.body = service.get_rank_data();
}));//nodejs调用服务端接口

/*任务代码*/
app.use(controller.get('/ajax/male', function* () {
    this.set('Cache-Control', 'no-cache');
    this.body = service.get_male_data(id);
}));

app.use(controller.get('/ajax/female', function* () {
    this.set('Cache-Control', 'no-cache');
    this.body = service.get_female_data(id);
}));

app.use(controller.get('/ajax/category', function* () {
    this.set('Cache-Control', 'no-cache');
    this.body = service.get_category_data();
}));

var querystring = require('querystring');
app.use(controller.get('/ajax/book', function* () {
    this.set('Cache-Control', 'no-cache');
    var params = querystring.parse(this.req._parsedUrl.query);
    var parmas = querystring.parse(this.req._parsedUrl.query);
    var id = params.id;
    if (!id) {
        id = "";
    }
    this.body = service.get_book_data(id);
}));//nodejs调用服务端接口

app.use(controller.get('/ajax/search', function* () {
    this.set('Cache-Control', 'no-cache');
    var querystring = require('querystring');
    var params = querystring.parse(this.req._parsedUrl.query);
    var start = params.start;
    var end = params.end;
    var keyword = params.keyword;
    this.body = yield service.get_search_data(start, end, keyword);
}));//nodejs调用服务端接口


app.listen(3001);
console.log('Koa server is started');