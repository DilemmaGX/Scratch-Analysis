type Project = object;

type Meta = {
  semver: string;
  vm: string;
  agent: string;
};

function getExtensions(project: Project): Array<string> {
  return project["extensions"];
}

function getMeta(project: Project): Meta {
  return project["meta"];
}

function getBlock(project: Project): object {
  const targets: Array<object> = project["targets"];
  let result: object = {};
  targets.forEach((target) => {
    let blocks = target["blocks"];
    // @ts-ignore
    let opcodes: string[] = Object.values(blocks)
      .flatMap((block) => (block["opcode"] ? [block["opcode"]] : []))
      .filter((opcode) => opcode !== undefined);
    opcodes.forEach((opcode) => {
      if (result.hasOwnProperty(opcode)) {
        result[opcode] += 1;
      } else {
        result[opcode] = 1;
      }
    });
  });
  return Object.keys(result)
    .sort((a, b) => result[b] - result[a])
    .reduce((obj, key) => ({ ...obj, [key]: result[key] }), {});
}

function getBlockTotal(project: Project): number {
  const targets: Array<object> = project["targets"];
  let result: number = 0;
  targets.forEach((target) => {
    let blocks = target["blocks"];
    // @ts-ignore
    let opcodes: string[] = Object.values(blocks)
      .flatMap((block) => (block["opcode"] ? [block["opcode"]] : []))
      .filter((opcode) => opcode !== undefined);
    opcodes.forEach(() => {
      result++;
    });
  });
  return result;
}

function getVariables(project: Project): object {
  const targets: Array<object> = project["targets"];
  let result: object = {};
  targets.forEach((target) => {
    // @ts-ignore
    result[target["name"]] = Object.entries(target["variables"]).reduce(
      (acc, [, value]) => {
        acc[value[0]] = value[1];
        return acc;
      },
      {}
    );
  });
  return result;
}

function getLists(project: Project): object {
  const targets: Array<object> = project["targets"];
  let result: object = {};
  targets.forEach((target) => {
    // @ts-ignore
    result[target["name"]] = Object.entries(target["lists"]).reduce(
      (acc, [, value]) => {
        acc[value[0]] = value[1];
        return acc;
      },
      {}
    );
  });
  return result;
}

function getCustomBlocks(project: Project): object {
  const targets: Array<object> = project["targets"];
  let result: object = {};
  targets.forEach((target) => {
    let blocks = target["blocks"];
    // @ts-ignore
    let temps: string[] = Object.values(blocks);
    temps.forEach((temp) => {
      if (temp["opcode"] === "procedures_prototype") {
        if (result.hasOwnProperty(target["name"])) {
          let cache = result[target["name"]];
          cache.push(temp["mutation"]["proccode"]);
          result[target["name"]] = cache;
        } else {
          result[target["name"]] = [temp["mutation"]["proccode"]];
        }
      }
    });
  });
  return result;
}