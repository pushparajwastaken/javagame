Defer
-If you stop and build a little door every time you find one in the instructions, it takes longer to finish the whole house. That’s like a normal script—stopping everything to run right away.
-But if you collect all the doors first and attach them after finishing the house, it's much faster. That’s like using defer—the script waits until the whole page is ready before running.

---

UTILITY FUNCTION-
Utility functions are small, reusable functions that perform common or repetitive tasks, making code cleaner and more modular. They don’t depend on the application’s state and usually serve a specific purpose, like formatting data, generating random numbers, or handling arrays.

---

The first major building block is the game state
this object describes many aspects of the game
from the size of the building to the current stae of the ball
game state defines many things whose turn is it now,are we aiming now or is the ball already flying across the sky

---

Once we get the canvas element,we'll first fit it's size to fit the web-page and then get it's drawing context and this context will be used by the draw function.
(
Drawing Context-
Imagine you have a blank sheet of paper (the game screen). The drawing context is like a set of crayons and brushes that let you draw on it.
)

---

NEW GAME-
this function initializes the state
generates level
draws the scene

---

CANVAS
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
PATH
a path is a sequence of drawing commands that define shapes like lines, circles, or curves.
When you start drawing a shape, that's a path.

If we lift our pencil and start a new shape, we make a new path.

If we don’t lift the pencil, all the shapes stay connected.

)

-Paths start with the beginPath method and end with either calling the fill or the stroke method or both.
(
BEGINPATH
The beginPath() method begins a path or resets the current path.
In coding, beginPath() is like lifting your pencil so the next drawing doesn’t connect to the old one!
)
(
FILL METHOD
The fill() method fills specified elements in an array with a value.
The fill() method overwrites the original array.
Start and end position can be specified. If not, all elements will be filled.
)
(
STROKE METHOD
The stroke() method draws the current path.
)
The moveTo() method moves a window to the specified coordinates.
//The lineTo() method adds a line from the last point in the path to a new point

---

DRAW Function
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

whenever we s
