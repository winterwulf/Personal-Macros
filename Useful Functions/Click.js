/*
  Get Mouse Position relative to Canvas
*/

function getMousePosition() {
  const mouse = canvas.app.renderer.plugins.interaction.mouse;
  return mouse.getLocalPosition(canvas.app.stage);
}
/*
  Grid Center
*/
function getCenterGrid({x,y}= {})
{
  const arr = canvas.grid.getCenter(point.x, point.y);
  return { x: arr[0], y : arr[1] };
}

function getEntity(type, point)
{
  return canvas[type].placeables.filter(z=>
    {
      let {x,y,w,h} = z;
      if(point.x >= x && point.x <= x+w && point.y >= y && point.y <= y+h) return true;
    }
  );
}

function getAll({x,y}={})
{
  const types = [`drawings`,`lighting`,`notes`,`sounds`,`templates`, `tiles`, `tokens`, `walls`];

  return types.map(t => ({ type : t, arr : getEntity(t, point)})).filter(t=> t.arr.length !== 0);
}

/*
  Shifts center in 1 direction per a Odd Hex??
*/
function getShift(centerPoint, shiftDirection)
{
  const shift = { 
    M :   { x : 0, y : 0  }, 
    N :   { x : 0, y : -1 }, 
    NE :  { x :-1, y :-.5 }, 
    SE :  { x :-1, y : .5 }, 
    S :   { x : 0, y :  1 }, 
    SW :  { x :  1, y : .5}, 
    NW :  { x :  1, y :-.5}
   };
  const {w,h} = canvas.grid;
  let {x,y} = shift[shiftDirection];

  x = (x*w) + centerPoint.x;
  y = (y*h) + centerPoint.y;

  return getCenterGrid({x,y});
}