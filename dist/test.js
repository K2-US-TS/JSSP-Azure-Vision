"use strict";require("core-js/modules/es.promise"),require("core-js/modules/web.queue-microtask");var e=require("ava");function t(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}require("@k2oss/k2-broker-core/test-framework"),require("./index");var s=t(e);function r(e,t){global[e]=t}s.default("describe returns the hardcoded instance",async e=>{let t=null;r("postSchema",(function(e){t=e})),await Promise.resolve(ondescribe()),e.deepEqual(t,{objects:{ModerateText:{displayName:"ModerateText",description:"ModerateText",properties:{id:{displayName:"ID",type:"number"},userId:{displayName:"User ID",type:"number"},title:{displayName:"Title",type:"string"},completed:{displayName:"Completed",type:"boolean"}},methods:{AnalyzeText:{displayName:"AnalyzeText",type:"read",inputs:["id"],outputs:["id","userId","title","completed"]},getParams:{displayName:"Get TODO",type:"read",parameters:{pid:{displayName:"param1",description:"Description Of Param 1",type:"number"}},requiredParameters:["pid"],outputs:["id"]}}}}}),e.pass()}),s.default("execute fails with the wrong parameters",async e=>{let t=await e.throwsAsync(Promise.resolve(onexecute("test1","unused",{},{})));e.deepEqual(t.message,"The object test1 is not supported."),t=await e.throwsAsync(Promise.resolve(onexecute("ModerateText","test2",{},{}))),e.deepEqual(t.message,"The method test2 is not supported."),e.pass()}),s.default.skip("execute passes with method params",async e=>{let t=null;r("postResult",(function(e){t=e})),await Promise.resolve(onexecute("ModerateText","getParams",{pid:456},{},{})),e.deepEqual(t,{id:456}),e.pass()}),s.default.skip("execute passes",async e=>{let t=null;r("XMLHttpRequest",class{constructor(){t=this.recorder={},this.recorder.headers={}}open(e,t){this.recorder.opened={method:e,url:t}}setRequestHeader(e,t){this.recorder.headers[e]=t}send(){queueMicrotask(()=>{this.readyState=4,this.status=200,this.responseText=JSON.stringify({id:123,userId:51,title:"Groceries",completed:!1}),this.onreadystatechange(),delete this.responseText})}});let s=null;r("postResult",(function(e){s=e})),await Promise.resolve(onexecute("todo","get",{},{id:123},{})),e.deepEqual(t,{opened:{method:"GET",url:"https://jsonplaceholder.typicode.com/todos/123"},headers:{test:"test value"}}),e.deepEqual(s,{id:123,userId:51,title:"Groceries",completed:!1}),e.pass()});
//# sourceMappingURL=test.js.map
