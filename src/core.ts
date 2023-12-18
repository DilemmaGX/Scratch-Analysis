/**
 * 获取Head信息。
 * 
 * @param {any} input - 输入参数，包含目标信息。
 * @returns {any} 返回一个对象，包含以下属性：
 * - type: 操作码类型，对应每种类型的计数；
 * - total: 所有块的数量。
 */
function getHead(input: any): any {
    let output: { [key: string]: number } = {};
    let total: number = 0;
    for (let i = 0; i < input.targets.length; i++) {
        for (let j = 0; j < Object.keys(input.targets[i].blocks).length; j++) {
            let opcode = input.targets[i].blocks[Object.keys(input.targets[i].blocks)[j]].opcode;
            try {
                let type = opcode.split("_")[0];
                if (!output[type]) {
                    output[type] = 1;
                } else {
                    output[type]++;
                }
                total++;
            } catch (err) {
                console.warn("cannot detect" + input.targets[i].blocks[Object.keys(input.targets[i].blocks)[j]] + ", skipped");
                console.warn('"total" counted this block, type cannot define by core')
            }
        }
    }
    output["total"] = total;
    return output;
}

/**
 * 获取统计信息。
 * 
 * @param {any} input - 输入参数，包含目标信息。
 * @returns {any} 返回一个对象，包含以下属性：
 * - variables: 所有变量的数量。
 * - lists: 所有列表的数量。
 * - broadcasts: 所有广播的数量。
 * - blocks: 所有块的数量。
 * - extensions: 所有扩展的数量。
 */
function getStats(input: any): any {
    let stats = {
        variables: 0,
        lists: 0,
        broadcasts: 0,
        blocks: 0,
        extensions: 0,
    };
    input.targets.forEach((target: any) => {
        stats.variables += target.variables ? Object.keys(target.variables).length : 0;
        stats.lists += target.lists ? Object.keys(target.lists).length : 0;
        stats.broadcasts += target.broadcasts ? Object.keys(target.broadcasts).length : 0;
        stats.blocks += target.blocks ? Object.keys(target.blocks).length : 0;
    });
    stats.extensions += input.extensions.length;
    return stats;
}

/**
 * 获取输入对象的扩展属性。
 * @param {any} input - 输入对象。
 * @returns {any} 返回输入对象的扩展属性，如果不存在则返回空数组。
 */
function getExtensions(input: any): any {
    return input.extensions || [];
}

/**
 * 获取输入对象的Meta属性。
 * @param {any} input - 输入对象。
 * @returns {any} 返回输入对象的Meta属性，如果不存在则返回空数组。
 */
function getMeta(input: any): any {
    return input.meta || [];
}

/**
 * 判断输入对象是否包含 "gandi" 属性，从而判定是否为Gandi独占项目。
 * @param input 任意类型的输入对象
 * @returns 如果输入对象包含 "gandi" 属性，则返回 true,否则返回 false
 */
function isGandi(input: any): boolean {
    return input.hasOwnProperty("gandi");
}