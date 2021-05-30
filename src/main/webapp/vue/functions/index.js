import Prism from "prismjs";
import {getServerPath} from "../../react/api";

/**
 * Returns random number
 * @param min
 * @param max
 * @return {number}
 */
export function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

/**
 * Slice the string to the specific size
 * @param {string} str
 * @param {number} size
 * @return {string}
 */
export function sliceTextToSize(str= "", size= 30){
    const words = str.split(" ").slice(0,size);
    const result = words.join(" ");
    return result;
}

/**
 * Checks if the object has
 * @param {Object} obj
 * @return {boolean}
 */
export function isObjectEmpty(obj){
    const entriesLength = Object.entries(obj).length;

    return entriesLength>0;
}

/**
 * Returns random int
 * @param min
 * @param max
 * @return {number}
 */
export function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * Applies function to object keys and values
 * @param {object} object
 * @param {Function} func
 */
export function forEachObject(object, func){
    Object.entries(object).forEach(([k,v])=>func(k,v));
}

/**
 * Returns the list of allowed tagnames
 * @return {string[]}
 */
export function getAllowedTags(){
    const arr = ["br","ul","li","a","div","button","a","strong","svg","span","b","h1","h2","p","h3","h4","h5","h6","pre","code"];
    return arr;
}

/**
 * Checks if all children of domElement are allowed
 * @param {Element | null} domElement
 * @param {Array<String>} allowedTags
 * @return {Boolean}
 */
export function isAllowedTags(domElement, allowedTags=[]){
    if(!domElement) return false;

    const iterator = document.createNodeIterator(domElement, NodeFilter.SHOW_ELEMENT);

    let obj = {isValid:false};

    Object.seal(obj);

    let node = iterator.nextNode();

    while(node !== null){
        const tagName = node.nodeName.toLowerCase();

        if(!allowedTags.includes(tagName)){
            obj.isValid = false;
            break;
        } else{
            obj.isValid = true;
        }

        node = iterator.nextNode();
    }

    return obj.isValid;
}


/**
 * Forms blog content
 * @param {string} content
 * @param elements
 * @returns {HTMLElement[]}
 */
export function formBlog(content, elements=[]){
    const parser = new DOMParser();
    const xmlDom = parser.parseFromString(content,"text/xml");
    const children = Array.from(xmlDom.documentElement.firstElementChild.children);

    children.forEach((elem)=>{
        let role = elem.getAttribute("role");
        let innerText = elem.textContent;
        let children = elem.childNodes;
        let resultElem = null;
        const wrap = document.createElement("div");

        wrap.setAttribute("key", Math.random().toString());
        wrap.append(...[...children].map(v=>v.cloneNode(true)));

        switch (role) {
            case "title":
                resultElem = document.createElement("h3");
                resultElem.className = "text-center mb mt";
                resultElem.append(wrap);

                break;
            case "description":
                resultElem = document.createElement("p");
                resultElem.append(wrap);
                resultElem.className = "text-left h5";

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

                const div = document.createElement("div");
                div.className = "code w-100";
                div.append(codeElement);

                resultElem = div;

                break;
            case "iframe":
                if(elem.hasAttributes()){
                    let attrs = elem.attributes;
                    let allowedAttributes = [["allowfullscreen","allowFullScreen"],
                        ["frameborder","frameBorder"]];
                    let attrsList = {};

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

                    resultElem = document.createElement("iframe");
                    resultElem.className = "post__iframe";

                    forEachObject(attrsList, (k, v)=>{
                        resultElem.setAttribute(k,v);
                    });
                } else{
                    console.warn("Invalid attributes of iframe");
                }
                break;
            case "video":
                const src = elem.getAttribute("src");

                resultElem = document.createElement("video");
                resultElem.src = src;
                resultElem.className = "post__video";

                break;
            case "img":
                const link = elem.getAttribute("src");

                resultElem = document.createElement("video");
                resultElem.src = link;
                resultElem.className = "post__img"

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

/**
 * Forms url
 * @param {string} url
 * @param {object} params
 * @return {string}
 */
export function formSearchParams(url1, params){
    let url;

    try{
        url = new URL(url1);
    } catch (e){
        url = new URL(url1, getServerPath());
    }

    Object.entries(params).forEach(([k,v])=>{
        url.searchParams.append(k,v);
    });

    return url.toString();
}

/**
 * Finds out whether the object has all properties
 * @param {object} obj
 * @param {string} properties
 */
export function isObjectHasProperties(obj, ...properties){
    const func = (v, _index, _array) => obj.hasOwnProperty(v);
    return properties.every(func);
}

/**
 * Returns the value of cookie
 * @param name the name of cookie
 * @returns {string|undefined}
 */
export function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}