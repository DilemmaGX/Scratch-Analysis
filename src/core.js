function getKeyByNum(input,n){
    return Object.keys(input)[n];
}

/**
 * Gives an overview of the file
 * @param {Object} input 
 * @returns 
 */
function basic(input) {
    let stats = {
        variables: 0,
        lists: 0,
        broadcasts: 0,
        blocks: 0
    };

    input.targets.forEach(target => {
        stats.variables += target.variables ? Object.keys(target.variables).length : 0;
        stats.lists += target.lists ? Object.keys(target.lists).length : 0;
        stats.broadcasts += target.broadcasts ? Object.keys(target.broadcasts).length : 0;
        stats.blocks += target.blocks ? Object.keys(target.blocks).length : 0;
    });
    return stats;
}

/**
 * Gives a detailed view of the file
 * @param {Object} input 
 * @returns 
 */
function complex(input){
    let output={}
    let total=0;
    for(let i=0;i<input.targets.length;i++){
        for(let j=0;j<Object.keys(input.targets[i].blocks).length;j++){
                let opcode=input.targets[i].blocks[getKeyByNum(input.targets[i].blocks,j)].opcode;
                let type=opcode.split("_")[0];
                if(!output[type]){
                    output[type]=1;
                } else {
                    output[type]++;
                }
                total++;
        }
    }
    output["total"]=total;
    return output;
}