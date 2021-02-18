"use strict";

const Router = require('koa-router')();

const IndexController = require('./IndexController');

const BookController = require('./BookController');

const indexController = new IndexController();
const bookController = new BookController();




module.exports = app => {
  app.use(Router.routes());
  app.use(Router.allowedMethods())
  Router.get('/', indexController.actionIndex());
  Router.get('/book/list', bookController.actionIndex());
  Router.get('/book/create', bookController.actionCreate());
  Router.get('/book', indexController.actionAdd());
  // app.use(router(_ => {
  //   _.get('/', indexController.actionIndex());
  // }));
  // app.use(router(_ => {
  //   _.get('/book/list', bookController.actionIndex());
  // }));
  // app.use(router(_ => {
  //   _.get('/book/create', bookController.actionCreate());
  // }));
  // app.use(router(_ => {
  //   _.get('/book', indexController.actionAdd());
  // }));
};