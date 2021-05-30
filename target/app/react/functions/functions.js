import {findIndex} from "lodash";

/**
 * Adds unique elements to array
 * @param {Array<>} target
 * @param {Array<>} arr
 */
export function addUniqueElements(target, arr){
    arr.forEach(v=>{
        const index = findIndex(target, v);

        if(index === -1){
            target.push(v);
        }
    });
}

/**
 * Creates smooth scrolling
 * @param target
 */
export function smoothScroll(target){
    const destElem = document.querySelector(target);

    if(!destElem){
        console.warn("The element doesn't exist");
    } else {
        let step = 40;
        let speed = 0.1;

        const animate = () => {
            const destY = destElem.getBoundingClientRect().top;
            speed++;

            if(destY>300){
                window.scrollBy(0, step*speed);
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }
}
