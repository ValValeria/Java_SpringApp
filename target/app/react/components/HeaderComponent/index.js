import {interval} from "rxjs";

/**
 * Watch for navigation
 * @param {Function?} func
 * @param {object?} context
 * @param args
 */
export function checkNavigationEvent(func, context, ...args){
    const links = [];
    const waitTime = 50;
    links.push(location.pathname);

    func = _.debounce(func, waitTime)

    interval(waitTime)
        .subscribe(v=>{
           const pathname = location.pathname;

           if(pathname !== links[0]){
              func.apply(context, args);
              links[0] = pathname;
           }
        });
}