const obj = {
    marginSm:{
        get value(){
            return "1.25";
        },
        unit:"rem"
    }
};

Object.freeze(obj);

function calculate(multiply){
    return obj.marginSm.value*multiply + obj.marginSm.unit;
}

export default obj;
export {calculate as calculateSpace}