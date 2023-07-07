(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const a of n)if(a.type==="childList")for(const r of a.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&s(r)}).observe(document,{childList:!0,subtree:!0});function o(n){const a={};return n.integrity&&(a.integrity=n.integrity),n.referrerPolicy&&(a.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?a.credentials="include":n.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function s(n){if(n.ep)return;n.ep=!0;const a=o(n);fetch(n.href,a)}})();const k=document.getElementById("name"),S=document.getElementById("todo-form"),u=document.getElementById("todo-input"),c=document.getElementById("task-list"),m=document.getElementById("clear"),i=S.querySelector(".header__add-btn");let d=!1;function L(){const e=localStorage.getItem("username");k.value=e,k.addEventListener("change",t=>{localStorage.setItem("username",t.target.value)})}function E(){g().forEach(t=>v(t.task,t.category)),L(),l()}function T(e){e.preventDefault();const t=u.value;if(t===""){alert("Please add a task.");return}if(d){const n=c.querySelector(".edit-mode"),a=n.querySelector(".icon").classList[1];f(n.querySelector("label").textContent.trim(),a),n.classList.remove("edit-mode"),n.remove(),d=!1}const o=document.querySelector('input[name="category"]:checked'),s=o?o.value:"";if(s===""){alert("Please select a category.");return}v(t,s),h(t,s),l(),u.value=""}function v(e,t){const o=document.createElement("li");o.className="task-list__item";const s=C(),n=I(),a=N("icon"),r=x("control-btns");s.append(n,a,document.createTextNode(" "+e)),a.classList.add(t);const p=b("btn edit-btn");p.appendChild(document.createTextNode("Edit"));const y=b("btn delete-btn");y.appendChild(document.createTextNode("Delete")),r.append(p,y),o.append(s,r),c.appendChild(o)}function h(e,t){const o=g();o.push({task:e,category:t}),localStorage.setItem("tasks",JSON.stringify(o))}function g(){let e;return localStorage.getItem("tasks")===null?e=[]:e=JSON.parse(localStorage.getItem("tasks")),e}function C(){return document.createElement("label")}function I(){const e=document.createElement("input");return e.type="checkbox",e}function N(e){const t=document.createElement("span");return t.classList.add(e),t}function x(e){const t=document.createElement("div");return t.className=e,t}function b(e){const t=document.createElement("button");return t.className=e,t}function f(e,t){let o=g();o=o.filter(s=>s.task!==e||s.category!==t),localStorage.setItem("tasks",JSON.stringify(o))}function O(e){for(e.preventDefault();c.firstChild;)c.removeChild(c.firstChild);localStorage.removeItem("tasks"),l()}function l(){const e=c.querySelectorAll("li"),t=document.querySelector(".task-list-box__subtitle");e.length===0?(m.style.display="none",t.textContent="list is empty"):(m.style.display="inline-block",t.textContent="TODO LIST"),i.style.backgroundColor="#c2185b",i.value="Add task",d=!1}function q(e){const t=e.target.closest(".task-list__item"),o=t.querySelector("label").textContent.trim(),s=t.querySelector(".icon").classList[1];e.target.classList.contains("delete-btn")?(f(o.trim(),s),t.remove(),l()):e.target.classList.contains("edit-btn")?(d=!0,c.querySelectorAll("li").forEach(n=>n.classList.remove("edit-mode")),t.classList.add("edit-mode"),i.style.backgroundColor="#60c689",i.value="Update task",u.value=o):e.target.classList.contains("done")?(e.target.classList.toggle("done"),h(o,s)):(e.target.classList.toggle("done"),f(o,s))}function B(){S.addEventListener("submit",T),c.addEventListener("click",q),m.addEventListener("click",O),document.addEventListener("DOMContentLoaded",E),l()}B();