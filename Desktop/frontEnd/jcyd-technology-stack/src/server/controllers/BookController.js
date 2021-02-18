"use strict";
import { Readable } from 'stream'
import { load } from 'cheerio'

class BookController {
  constructor() { }

  actionIndex() {
    return async (ctx, next) => {
      ctx.body = await ctx.render("book/page/book-list");
      // ctx.body = await ctx.render("index",{
    };
  }

  // actionCreate() {
  //   return async (ctx, next) => {

  //     ctx.body = await ctx.render("book/page/book-create");
  //   };
  // }

  actionCreate() {
    return async (ctx, next) => {
      const html = await ctx.render("book/page/book-create");
      if (ctx.request.header["x-pjax"]) {
        ctx.status = 200
        const $ = load(html)
        console.log('ppp', $('.pjaxcontent'))
        $('.pjaxcontent').each(function () {
          ctx.res.write($(this).html())
        })
        ctx.res.end()
        console.log('站内切')
      } else {
        console.log('落地页')

        function createSSRStreamPromise() {
          return new Promise((resolve, reject) => {
            const htmlStream = new Readable()
            htmlStream.push(html)
            htmlStream.push(null)
            ctx.status = 200
            ctx.type = 'html'
            console.log('pp')
            htmlStream.on("error", (err) => {
              reject(err)
            }).pipe(ctx.res)
            console.log('pp77777')
          })
        }
        await createSSRStreamPromise()
      }
    };


    //SSR 
    // return async (ctx, next) => {

    //   ctx.body = await ctx.render("book/page/book-create");
    // };
  }

}

module.exports = BookController;