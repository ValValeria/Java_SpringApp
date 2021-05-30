import Prism from "prismjs";
import {getAllowedTags} from "../../vue/functions";
import React from "react";

/**
 * Create react element
 * @param type
 * @param props
 * @param children
 * @returns {null|React.DetailedReactHTMLElement<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>}
 */
const createElem = ({type,props={},children=[]})=>{
    if(!children.length && type!="iframe") return null;
    return React.createElement(type,{...props,key:Math.random()}, children);
}


/**
 * Returns react elements
 * @param post
 * @param updateElements
 */
export const formBlog = function(post, elements){
    const parser = new DOMParser();
    const xmlDom = parser.parseFromString(post.content,"text/xml");
    const children = Array.from(xmlDom.documentElement.firstElementChild.children);

    children.forEach((elem)=>{
        const role = elem.getAttribute("role");
        const innerText = elem.textContent;
        const children = elem.childNodes;

        const wrap = document.createElement("div");
        wrap.setAttribute("key", Math.random().toString());
        wrap.append(...[...children].map(v=>v.cloneNode(true)));

        let resultElem = null;
        var xmlSerializer = new XMLSerializer();
        var childrenXml = {__html: xmlSerializer.serializeToString(wrap)};


        switch (role) {
            case "title":
                resultElem = (
                    <h3 className={"text-center"} dangerouslySetInnerHTML={childrenXml}>
                    </h3>);
                break;
            case "description":
                resultElem = (
                    <p className={"text-left h5"} dangerouslySetInnerHTML={childrenXml}>
                    </p>);
                break;
            case "code":
                const html = innerText.split(/\n/).map(v=>{
                    const html = Prism.highlight(v, Prism.languages.javascript, 'javascript');
                    return `<div class="code__line">${html}</div>`;
                }).join("");
                const domParser = new DOMParser();
                const validHtml = `<div id="code">${html}</div>`;
                const domElem = domParser.parseFromString(validHtml,"text/html");
                const codeElement = domElem.querySelector("#code");
                const iterator = document.createTreeWalker(codeElement, NodeFilter.SHOW_ELEMENT, null);
                const allowedTags = getAllowedTags();

                let element = iterator.nextNode();
                let isValid = false;

                while(element){
                    let tagName = element.tagName.toLowerCase();

                    if(!allowedTags.includes(tagName)){
                        isValid = false;
                        break;
                    } else{
                        isValid = true;
                    }

                    element = iterator.nextNode();
                }

                if(!isValid) return console.warn("Forbidden tags was detected");

                const data = xmlSerializer.serializeToString(codeElement);

                resultElem = (
                    <div className={"code w-100"} key={Math.random()} dangerouslySetInnerHTML={{__html:data}}></div>
                );

                break;
            case "iframe":
                if(elem.hasAttributes()){
                    const attrs = elem.attributes;
                    const allowedAttributes = [["allowfullscreen","allowFullScreen"],
                        ["frameborder","frameBorder"]];
                    const attrsList = {};

                    for(let i = attrs.length - 1; i >= 0; i--) {
                        let value = attrs[i].value;
                        let name = attrs[i].name;
                        let allowedAttribute = allowedAttributes.find(v=>v.includes(name));

                        if(allowedAttribute){
                            name = allowedAttribute[1];
                        }

                        if(value==="true" || value==="false"){
                            value = Boolean(value);
                        }

                        attrsList[name]=value;
                    }

                    resultElem = createElem({type:"iframe",props:{className:"post__iframe",...attrsList}})
                } else{
                    console.warn("Invalid attributes of iframe");
                }
                break;
            case "video":
                const src = elem.getAttribute("src");
                resultElem = createElem({type:"video", props:{className:"post__video",src:src}})
                break;
            case "img":
                const link = elem.getAttribute("src");
                const alt = elem.getAttribute("alt");
                resultElem = createElem({type:"img", props:{className:"post__image",src:link,alt:alt}})
                break;
            default:
                break;
        }

        if(resultElem) {
            elements.push(resultElem);
        }
    });

    return elements;
}

