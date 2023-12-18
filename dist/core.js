"use strict";
function getHead(input) {
    let output = {};
    let total = 0;
    for (let i = 0; i < input.targets.length; i++) {
        for (let j = 0; j < Object.keys(input.targets[i].blocks).length; j++) {
            let opcode = input.targets[i].blocks[Object.keys(input.targets[i].blocks)[j]].opcode;
            try {
                let type = opcode.split("_")[0];
                if (!output[type]) {
                    output[type] = 1;
                }
                else {
                    output[type]++;
                }
                total++;
            }
            catch (err) {
                console.warn("cannot detect" + input.targets[i].blocks[Object.keys(input.targets[i].blocks)[j]] + ", skipped");
                console.warn('"total" counted this block, type cannot define by core');
            }
        }
    }
    output["total"] = total;
    return output;
}
function getStats(input) {
    let stats = {
        variables: 0,
        lists: 0,
        broadcasts: 0,
        blocks: 0,
        extensions: 0,
    };
    input.targets.forEach((target) => {
        stats.variables += target.variables ? Object.keys(target.variables).length : 0;
        stats.lists += target.lists ? Object.keys(target.lists).length : 0;
        stats.broadcasts += target.broadcasts ? Object.keys(target.broadcasts).length : 0;
        stats.blocks += target.blocks ? Object.keys(target.blocks).length : 0;
    });
    stats.extensions += input.extensions.length;
    return stats;
}
//# sourceMappingURL=core.js.map