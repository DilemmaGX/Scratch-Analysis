"use strict";
function getExtensions(project) {
    return project["extensions"];
}
function getMeta(project) {
    return project["meta"];
}
function getBlock(project) {
    const targets = project["targets"];
    let result = {};
    targets.forEach((target) => {
        let blocks = target["blocks"];
        // @ts-ignore
        let opcodes = Object.values(blocks)
            .flatMap((block) => (block["opcode"] ? [block["opcode"]] : []))
            .filter((opcode) => opcode !== undefined);
        opcodes.forEach((opcode) => {
            if (result.hasOwnProperty(opcode)) {
                result[opcode] += 1;
            }
            else {
                result[opcode] = 1;
            }
        });
    });
    return Object.keys(result)
        .sort((a, b) => result[b] - result[a])
        .reduce((obj, key) => (Object.assign(Object.assign({}, obj), { [key]: result[key] })), {});
}
function getBlockTotal(project) {
    const targets = project["targets"];
    let result = 0;
    targets.forEach((target) => {
        let blocks = target["blocks"];
        // @ts-ignore
        let opcodes = Object.values(blocks)
            .flatMap((block) => (block["opcode"] ? [block["opcode"]] : []))
            .filter((opcode) => opcode !== undefined);
        opcodes.forEach(() => {
            result++;
        });
    });
    return result;
}
function getVariables(project) {
    const targets = project["targets"];
    let result = {};
    targets.forEach((target) => {
        // @ts-ignore
        result[target["name"]] = Object.entries(target["variables"]).reduce((acc, [, value]) => {
            acc[value[0]] = value[1];
            return acc;
        }, {});
    });
    return result;
}
function getLists(project) {
    const targets = project["targets"];
    let result = {};
    targets.forEach((target) => {
        // @ts-ignore
        result[target["name"]] = Object.entries(target["lists"]).reduce((acc, [, value]) => {
            acc[value[0]] = value[1];
            return acc;
        }, {});
    });
    return result;
}
function getCustomBlocks(project) {
    const targets = project["targets"];
    let result = {};
    targets.forEach((target) => {
        let blocks = target["blocks"];
        // @ts-ignore
        let temps = Object.values(blocks);
        temps.forEach((temp) => {
            if (temp["opcode"] === "procedures_prototype") {
                if (result.hasOwnProperty(target["name"])) {
                    let cache = result[target["name"]];
                    cache.push(temp["mutation"]["proccode"]);
                    result[target["name"]] = cache;
                }
                else {
                    result[target["name"]] = [temp["mutation"]["proccode"]];
                }
            }
        });
    });
    return result;
}
function isGandi(project) {
    if (project.hasOwnProperty("gandi")) {
        return true;
    }
    return false;
}
//# sourceMappingURL=core.js.map