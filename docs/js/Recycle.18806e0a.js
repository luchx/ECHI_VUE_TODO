(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["Recycle"],{"59a9":function(t,e,n){"use strict";n.d(e,"j",(function(){return r})),n.d(e,"g",(function(){return i})),n.d(e,"f",(function(){return a})),n.d(e,"h",(function(){return u})),n.d(e,"e",(function(){return d})),n.d(e,"c",(function(){return c})),n.d(e,"d",(function(){return s})),n.d(e,"a",(function(){return l})),n.d(e,"b",(function(){return f})),n.d(e,"i",(function(){return g}));var o=n("65b5");function r(t){return o["a"].post("/api/todo/saveTodoList",t)}function i(t){return o["a"].get("/api/todo/getTodoList",t)}function a(t){return o["a"].get("/api/todo/getTodoDetail",{id:t})}function u(t){return o["a"].get("/api/todo/getTodoListByDay",{day:t})}function d(){return o["a"].get("/api/todo/getReviewTodoList")}function c(t){return o["a"].get("/api/todo/getFinishedTodoList",t)}function s(t){return o["a"].get("/api/todo/getRecycleTodoList",t)}function l(t){return o["a"].delete("/api/todo/deleteTodo",t)}function f(t){return o["a"].delete("/api/todo/deleteTodoToRecycle",t)}function g(t){return o["a"].put("/api/todo/rebackTodoToRecycle",t)}},"7dba":function(t,e,n){"use strict";n.r(e);n("4de4"),n("96cf");var o=n("1da1"),r=n("59a9");e["default"]={name:"Recycle",data:function(){return{currentPage:1,pageSize:10,total:0,todoList:[],loading:!1}},methods:{getRecycleTodoList:function(){var t=arguments,e=this;return Object(o["a"])(regeneratorRuntime.mark((function n(){var o,i,a,u,d,c,s,l;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(o=t.length>0&&void 0!==t[0]?t[0]:1,i=t.length>1&&void 0!==t[1]?t[1]:10,!e.loading){n.next=4;break}return n.abrupt("return");case 4:return e.loading=!0,e.currentPage=o,e.pageSize=i,a={page:o,pageSize:i},n.next=10,Object(r["d"])(a);case 10:u=n.sent,e.loading=!1,0===u.code&&(d=u.result,c=d.list,s=d.pagination,l=s.total,e.todoList=c,e.total=l);case 13:case"end":return n.stop()}}),n)})))()},handleGoDetail:function(t){this.$router.push({name:"TodoDetailView",params:{id:t.id}})},handleDelete:function(t){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function n(){var o,i;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return o=t.id,n.next=3,Object(r["a"])(o);case 3:i=n.sent,0===i.code&&(e.$toast.success("删除成功"),e.todoList=e.todoList.filter((function(t){return t.id!==o})));case 5:case"end":return n.stop()}}),n)})))()},handleRestore:function(t){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function n(){var o,i;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return o=t.id,n.next=3,Object(r["i"])(o);case 3:i=n.sent,0===i.code&&(e.$toast.success("还原成功"),e.todoList=e.todoList.filter((function(t){return t.id!==o})));case 5:case"end":return n.stop()}}),n)})))()}},mounted:function(){this.getRecycleTodoList()},render:function(){var t=arguments[0],e=this.$data,n=e.todoList,o=e.loading;return t("EContainer",[t("EHeader",{attrs:{title:this.$route.meta.title,type:"menu"}}),t("EAside"),t("EContent",[t("ETodoCard",{attrs:{loading:o,todoList:n,recycle:!0},on:{goDetail:this.handleGoDetail,del:this.handleDelete,restore:this.handleRestore}})]),t("EFooter")])}}}}]);
//# sourceMappingURL=Recycle.18806e0a.js.map