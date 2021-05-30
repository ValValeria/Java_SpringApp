/**
 * Makes http request
 * @param {string} url
 * @param {Object} config
 * @param {string} responseType
 * @return {Promise<{headers:Object, response: {responseData: Object}}>}
 */
export async function makeHttpRequest(url, config={}, responseType="json"){
    let data = {headers:{},response: {responseData: {}}};

    try{
        const response = await  fetch(url, config);
        const responseTypes = ["json","text","blob"];

        if(response.ok && responseTypes.includes(responseType)){
            const responseData =  await response[responseType].call(response);
            data.response.responseData = responseData;

            for (let [key, value] of response.headers) {
                data.headers[key] = value;
            }
        } else{
           throw new Error();
        }
    } catch(e){
        console.warn("Errors has happened, during http request")
    }

    return data;
}


/**
 * Generate URL-encoded query string
 * @param {string} url
 * @param {object} params
 * @param {boolean} isOtherServer
 * @return {string}
 */
export function formUrlParamsString(url="",params={}, isOtherServer = false){
    let urlObj;

    try{
        if(!isOtherServer){
            urlObj = new URL(new URL(url).pathname, getServerPath())
        } else {
            urlObj = new URL(url);
        }
    }catch (e){
        urlObj = new URL(url, getServerPath());
    }

    let searchParam = urlObj.searchParams;

    Object.entries(params).forEach(([k,v])=>{
        searchParam.append(k,v);
    });

    return urlObj.toString();
}


/**
 * Returns server path
 * @returns {string}
 */
export function getServerPath(){
    const {protocol, host} = window.location;

    return `${protocol}//${host}`;
}
