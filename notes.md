`Defer`
-If you stop and build a little door every time you find one in the instructions, it takes longer to finish the whole house. That’s like a normal script—stopping everything to run right away.
-But if you collect all the doors first and attach them after finishing the house, it's much faster. That’s like using defer—the script waits until the whole page is ready before running.

---

`UTILITY FUNCTION-`
Utility functions are small, reusable functions that perform common or repetitive tasks, making code cleaner and more modular. They don’t depend on the application’s state and usually serve a specific purpose, like formatting data, generating random numbers, or handling arrays.

---

The first major building block is the game state
this object describes many aspects of the game
from the size of the building to the current stae of the ball
game state defines many things whose turn is it now,are we aiming now or is the ball already flying across the sky

---

Once we get the canvas element,we'll first fit it's size to fit the web-page and then get it's drawing context and this context will be used by the draw function.
(
`Drawing Context`-
Imagine you have a blank sheet of paper (the game screen). The drawing context is like a set of crayons and brushes that let you draw on it.
)

---

`NEW GAME`-
this function initializes the state
generates level
draws the scene

---

`CANVAS`
The Draw function paints the whole canvas based on the state.
We draw layer by layer
First we draw the background,we fill the background with a gradient,and we add a circle that will be our sun.
Then we draw the buildings,we have two kinds of buildings.We have the buildings in the background and we have the main buildings.Our gorillas are going to stand on the main buildings.
Gorillas aren't just basic shape they are curves and polylines and they have variations based on the state

The way canvas works is that we have to set up the drawing parameters before we paint,and not after it.It's not like we can paint a rectangle, and then we can change its color.Once something is on the canvas it stays as it is.
it's just like a real canvas where we pick the color with our brush before actually painting it
then once we've painted something on the canvas we can either cover it up by painting something over it or we can try to clear the canvas.but we can't really change the existing parts.that's why we set the colour here upfront and not after drawing the rectangle

we can draw more complicated shapes.we can define a path.
(
`PATH`
a path is a sequence of drawing commands that define shapes like lines, circles, or curves.
When you start drawing a shape, that's a path.

If we lift our pencil and start a new shape, we make a new path.

If we don’t lift the pencil, all the shapes stay connected.

)

-Paths start with the beginPath method and end with either calling the fill or the stroke method or both.
(
`BEGINPATH`
The beginPath() method begins a path or resets the current path.
In coding, beginPath() is like lifting your pencil so the next drawing doesn’t connect to the old one!
)
(
`FILL METHOD`
The fill() method fills specified elements in an array with a value.
The fill() method overwrites the original array.
Start and end position can be specified. If not, all elements will be filled.
)
(
`STROKE METHOD`
The stroke() method draws the current path.
)
The moveTo() method moves a window to the specified coordinates.
//The lineTo() method adds a line from the last point in the path to a new point

---

`DRAW Function`
this function will draw everything that is on screen
when we use canvas,we have the coordinate system origin at the top left corner of the screen and it grows to the right and downwards.This is how websites work in general.Things go from left to right and top to bottom.
but it's more convenient in game from bottom to top
Then we can think of the bottom of the scree as the ground, and we can build on top of it.For instance, when we draw buildings, we can start at the bottom of the screen and go up to the top of the screen
-we can use the translate method to shift the entire coodrinate system to the bottom-left corner of the screen
--then we flip it by using the scale method (
setting a negative number for the verticaal direction will flip the entire coordinate system upside down.
)
we must do this before we paint anything on the screen because the translate and the scale method don't actually move antything on the canvas,if we painted anything on the canvas before,they would stay as they are .
technically they change the transformation matrix of the canvas,so when we paint something new, it will be painted according to the new coordinate system.
the translate method accumulates this means that it will add the new translation to the previous one not reverse it
we will call the draw function multiple times so we need to be sure that every time we draw we start from the same point.we need to reset these transformations once we finish drawing,othewise the coordinate system will move out of the screen to infinity

we often start a painting block by saving the context and end it by restoring it

createLinearGradient-
The createLinearGradient() method creates a linear gradient object.
The gradient object can be used to fill rectangles, circles, lines, text, etc.
The gradient object can be used as value to strokeStyle or fillStyle propertie

---

`BACKGROUND BUILDINGS`
first we calculate the starting position,when we generate metadata for a building we always get the index of the building as an argument,based on this we can look up the previous building and take its position and size.we add these togetheer and add some extra units as a gap,if there is no building we started at -30 which is just a random number

`Drawbackground Buildings`
we iterate over the array we just generated and draw a simple rectangle for each item ,we set the fill style to a simple color value

---

`Math.Ceil`
The Math.ceil() static method always rounds up and returns the smallest integer greater than or equal to a given number.

`Math.floor`
The Math.floor() static method always rounds down and returns the largest integer less than or equal to a given number.

---

`DRAWING WINDOWS`
first we have to check if the lights are on or off,if the lights are on,we draw the window
but the lightson array is one dimensional and ourbuilding is a two dimensional grid,how do we map the lightson array to the building
we map the floor and room index to the index of the lights with the formula-
we multiply the floor index by the number of rooms per floor and add the room index

POSITONING THESE WINDOWS CAN BE A BIT TRICKY
Our windows align to the top left corner of the building and the origin is at the bottom left corner of the screen
wj=hen we call the translate method we do not change anything that's already on the screen.we only affect the things that we are about to paint.so we translate the origin of the coordiante system to the top-left corner of the building plus the gap horizontally and minus the gap vertically

---

A Quadratic Curve is a simple curve with one control point

---

Initializing Bomb Position
we have to call this function after we generate our building metadata because the bomb's position depends on the position of the gorilla and that depends on the building it stands on

---

Scale
value of this property depends on the size of the generated buildings.so after we generate the city,we'll call another function to calculate the scale
this function will also come before we initialize the bomb position because later that will depend on the scale

Calculate Scale
-we calculate the total width of the city,take the last building's position and add its width,then take the inner width of the browser window and divide it by this number.this will give us a ratio it will tell how the width of our city relates to the width of the window
-whenever we use inner width and innerheight we need to adjust them by our scaling factor
-windows resize eventlistener
this does a few things
1.first we resize the canvas element to fit the new size
2.then we recalculate the position of the bomb
(
readjusting the bomb doesn't make a difference yet but later an update version of the initializeBombPosition function will depend on the scale
)
3.finally we redraw the whole canvas according to our new scaling

---

The user-select CSS property controls whether the user can select text. This doesn't have any effect on content loaded as part of a browser's user interface (its chrome), except in textboxes.
this is kept as none to avoid a glitch later
normally when we drag the bomb we could accidentally end up selecting the text on the screen

---

`Event Handlers for Grabbing the Bomb`
we are using the grab are element only for the mousedown event
for mousemove and mouseup our event target is window.this is because we want to start the draggingg movement with the mouse being over the bomb but as we are dragging we can move the mouse outside of the grab area and we still want the event handlers to work

`mousemove event handler`
the event target is not the grab area of the bomb but the window object
this event handler checks if we are currently dragging.if not then it doesn't do anything,if we are dragging then it calculates the delta of the mouse position since the mousedown event and sets it as the velcoity of the bomb
as we are aiming we drag the mouse backwards
BUT THE BOMB WILL MOVE FORWARD AFTER WE RELEASE IT
so we asssign the horizontal and vertical mouse movement with a negative sign as the velocity
but with a double twist we switch back the vertical velocity(the Y coordinate) to have a positive sign because we flipped the coordinate system.
event handlers still assume that the coordinate system grows downwards and within the canvas,it's actually the opposite.
then we update the info panels we added earlier in html
we call a utility function to show the angle and the velocity
from the event handlers we'll get only the horizontal and vertical components of the velocity we need to transform these values

---

`RequestAnimationFrame`
The window.requestAnimationFrame() method tells the browser you wish to perform an animation. It requests the browser to call a user-supplied callback function before the next repaint.

The frequency of calls to the callback function will generally match the display refresh rate. The most common refresh rate is 60hz, (60 cycles/frames per second), though 75hz, 120hz, and 144hz are also widely used. requestAnimationFrame() calls are paused in most browsers when running in background tabs or hidden <iframe>s, in order to improve performance and battery life

---

`Animate Function`
The animate function will handle one frame of the animation loop,in each frame,we move the bomb by a little,then at the very end of the function it keeps on requesting another animation frame,this way we end up running the animate function around 60 times every second.
the constant repainting of the screen will appear as a continuous animation
the only way to stop this animation loop is by returning early from this function,returning before we reach the last statement that requests annother animation frame will eventually stop this loop

we use the timestamp attribute to calculate how much time passed between the two cycles,before moving the bomb,we calculate the elapsed time,by subtracting the previous timestamp from the current one

but how did we know the previous timestamp?
we assign the current timestamp at the end of the function to the previousAnimationtimestamp variable which will eventually become the previous timestamp in the next cycle

However the first cycle is an exception because,at that point,we don't have a previous cycle yet
