
(async ()=>{
  let items = [];

  let defeated = canvas.tokens.placeables.filter(t=>
    t.data.disposition === -1 && t.data.overlayEffect === `icons/svg/skull.svg`
  );

  for(let token of defeated)
  {
    let invalid = await token.getFlag(`world`,`lootactor`) ? await token.getFlag(`world`,`lootactor`) : false;

    if(!invalid)
    {
      await token.actor.items.filter(i=>
        (
          i.type === "weapon" ||
          i.type === "equipment" ||
          i.type === "consumeable"
        ) && (
          i.data.data.price !== null ||
          i.data.data.price > 0
        ) 
      ).map(i=> items.push(i));
    }
    await token.setFlag(`world`,`lootactor`,true);
  }
  if(items.length === 0) return ui.notifications.warn(`No valid items on defeated enemies on this map.`);

  await canvas.tokens.deleteMany(defeated.map(i=>i.id));

  //create token from "Loot Actor"
  let new_token = await game.actors.getName("Loot Actor").data.token;
  //if(!new_token) return ui.notifications.error(`There is no token by the "Loot Actor" name.`);

  new_token.img = `Icons/0OzpTIY%5B1%5D.png`;
  new_token.x = defeated[0].data.x;
  new_token.y = defeated[0].data.y;

  canvas.tokens.createMany(new_token, {}).then(async (result) =>{
    console.log("Result | ",result);

    new_token = await canvas.tokens.get(result._id);

    for(let item of items)
    {
      await new_token.actor.createOwnedItem(item, {});
    }

    await new_token.actor.update({[`permission.default`] : 2});
  });
})();
