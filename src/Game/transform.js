

const typeToMaxTick = {
  animates: 4,
  terrains: 1,
  items: 1,
  npcs: 2,
  enemy: 2,
};

export function transform($loader, value) {
  const mapInfo = $loader.$resource.mapping[value];
  const { type, name } = mapInfo;
  const spritesInfo = $loader.$resource.sprites[type][name];

  const maxTick = typeToMaxTick[type];

  const data = {
    image: type,
    sy: spritesInfo.sy,
    type,
    name,
    maxInterval: 10,
    maxTick,
  };

  return data;
}
