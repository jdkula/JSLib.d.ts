type EventListenerType = "click" | "dblclick" | "mousedown" | "mouseup" | "drag" | "mousemove"
type Thunk = () => void


declare class GWindow {
    /**
     * Constructs a new GWindow at the root of the page's body,
     * or "JSConsole" if present, with a width/height of 0, 0.
     */
    constructor()
    /** Constructs a new GWindow at the specified [domId]. */
    constructor(domId: string)
    /** Constructs a new GWindow with the specified [width], [height]. */
    constructor(width: number, height: number)
    /** Constructs a new GWindow at the specified [domId] with a given [width], [height]. */
    constructor(domId: string, width: number, height: number)

    /** Calls the given [listener] when the specified [event] occurs. */
    addEventListener: <K extends keyof HTMLElementEventMap> (event: EventListenerType, listener: (this: HTMLCanvasElement, ev: HTMLElementEventMap[K]) => any) => void;

    /**
     * Adds a given [gObject] to this window. An [x] and [y] coordinate
     * can optionally be provided, which will place [gObject] at that location.
     */
    add: (gObject: GObject, x?: number | undefined, y?: number | undefined) => void;

    /** Removes the specified [gObject] from the window. */
    remove: (gObject: GObject) => void;

    /** Clears all GObjects from the window. */
    clear: () => void;

    /** Clears all GObjects from the window. */
    removeAll: () => void;

    /** Sets the size of the window to the specified [width] and [height]. */
    setSize: (width: number, height: number) => void;

    /**
     * Returns the GObject at the specified point ([x], [y]).
     * Returns null if no object was found.
     */
    getElementAt: (x: number, y: number) => GObject | null;

    /**
     * If [flag] is true, sets the window to automatically
     * repaint itself after each change. If false, calls to
     * the repaint function must be explicitly made.
     *
     * Flag defaults to true.
     */
    setAutoRepaintFlag: (flag: boolean) => void;

    /** Gets the current auto repaint flag. */
    getAutoRepaintFlag: () => boolean;

    /** Forces this window to repaint/redraw itself. */
    repaint: () => void;

    /** Gets the width/height of this GWindow. */
    getSize: () => GDimension;

    /** Gets the width of this GWindow. */
    getWidth: () => number;

    /** Gets the height of this GWindow. */
    getHeight: () => number;

    /**
     * Sets this window to scale all of its GObjects
     * by the given [multiplier]. Defaults to 1.
     */
    setScaleFactor: (multiplier: number) => void;

    /** Gets the current scale factor of the window. */
    getScaleFactor: () => number;
}

declare abstract class GObject {
    protected constructor()

    /**
     * Returns a representation of the smallest box
     * that covers this whole GObject.
     */
    getBounds: () => GRectangle;

    /** Sets the location of this GObject to ([x], [y]). */
    setLocation: (x: number, y: number) => void;

    /** Returns a representation of this object's position. */
    getLocation: () => GPoint;

    /** Gets this object's x coordinate. */
    getX: () => number;

    /** Gets this object's y coordinate. */
    getY: () => number;

    /** Moves this object by the displacements [dx] and [dy]. */
    move: (dx: number, dy: number) => void;

    /**
     * Moves this object [r] units in the
     * direction specified by [theta].
     *
     * [theta] is measured in degrees
     * clockwise from the +x axis.
     */
    movePolar: (r: number, theta: number) => void;

    /** Returns a representation of this object's width and height. */
    getSize: () => GDimension;

    /** Returns this object's width. */
    getWidth: () => number;

    /** Returns this object's height. */
    getHeight: () => number;

    /** Returns if the point ([x], [y]) is contained within this object. */
    contains: (x: number, y: number) => boolean;

    /** Puts this object on top of all others in its container. */
    sendToFront: () => void;

    /** Puts this object behind all others in its container. */
    sendToBack: () => void;

    /** Moves this object one "step" towards the front of its container. */
    sendForward: () => void;

    /** Moves this object one "step" towards the back of its container. */
    sendBackward: () => void;

    /**
     * Sets the color of this object to [color], which may be a
     * predefined JavaScript color ("Red") or a hexadecimal
     * string in the format "#RRGGBB".
     *
     * If this object is filled, and setFillColor has not been
     * called, this method also sets the fill color.
     */
    setColor: (color: string) => void;

    /** Gets this object's color. */
    getColor: () => string;

    /** Sets the fill color of this object specifically. */
    setFillColor: (color: string) => void;

    /** Sets this object to either be filled in, or not, according to [flag]. */
    setFilled: (filled: boolean) => void;

    /** Returns true if this object is filled, false otherwise. */
    isFilled: () => boolean;

    /** Sets the width of the lines used to draw this object. */
    setLineWidth: (width: number) => void;

    /** Gets the current line width. */
    getLineWidth: () => number;

    /**
     * Rotates this object by [theta] degrees around its origin.
     *
     * Marks the object as transformed.
     */
    rotate: (theta: number) => void;

    /**
     * Scales this object by the given multipliers.
     * If [yMultiplier] is unspecified, it is assumed
     * to be equal to [xMultiplier].
     *
     * Marks the object as transformed.
     */
    scale: (xMultiplier: number, yMultiplier?: number | undefined) => void;

    /**
     * Applies an affine shear transformation to this object,
     * using scale factors [xShear] and [yShear].
     *
     * Marks the object as transformed.
     */
    shear: (xShear: number, yShear: number) => void;

    /**
     * Translates the display of the object by
     * the given [dx, dy], WITHOUT changing the
     * object's origin.
     *
     * Marks the object as transformed.
     */
    translate: (dx: number, dy: number) => void;

    /** Sets the object to be visible or invisible according to [flag]. */
    setVisible: (flag: boolean) => void;

    /** Returns true if the object is visible, false otherwise. */
    isVisible: () => boolean
}

/** Creates a new GLine connecting the points ([x0], [y0]) and ([x1], [y1]) */
declare function GLine(x0: number, y0: number, x1: number, y1: number): GLine

declare interface GLine extends GObject {
    /** Returns the length of this line, squared. */
    distanceSquared: () => number

    /**
     * Sets the initial point and origin of the line,
     * without changing the endpoint.
     */
    setStartPoint: (x: number, y: number) => void

    /** Returns a representation of the start point of the line. */
    getStartPoint: () => GPoint

    /**
     * Sets the end point of the line, without changing
     * the position of the start point or origin.
     */
    setEndPoint: (x: number, y: number) => void

    /** Returns a representation of the start point of the line. */
    getEndPoint: () => boolean
}

type Dimensional = Bounded | GDimension
type Positional = Bounded | GPoint
type Bounded = GObject | GRectangle

interface SetSizeFunction {
    /** Sets the object's width/height to be equal to the given [object]. */
    (object: Dimensional): void

    /** Sets the object's width/height to be equal to the given [width]/[height]. */
    (width: number, height: number): void
}

interface SetBoundsFunction {
    /** Sets this object's bounding box to be equal to the given [object]. */
    (object: Bounded): void

    /**
     * Sets this object's bounding box to match the
     * position of [pObject], and the size of [sObject].
     */
    (pObject: Positional, sObject: Dimensional): void

    /**
     * Sets this object's bounding box to match the
     * given [x], [y], [width], and [height].
     */
    (x: number, y: number, width: number, height: number): void
}

/** Note: The below methods will fail if the object has been transformed. */
declare class GRect extends GObject {
    /** Creates a GRect with a given width/height. */
    constructor(width: number, height: number)
    /**
     * Creates a GRect at a given x/y coordinate with a given width/height.
     * The x/y coordinate specifies the rectangle's upper-left corner.
     */
    constructor(x: number, y: number, width: number, height: number)

    /** See SetSizeFunction. */
    setSize: SetSizeFunction;

    /** See SetBoundsFunction. */
    setBounds: SetBoundsFunction
}


/** Note: The below methods will fail if the object has been transformed. */
declare class GOval extends GObject {
    /** Creates a new GOval that fits into a rectangle of a given width/height. */
    constructor(width: number, height: number)

    /**
     * Creates a new GOval that fits into a rectangle of
     * a given width/height. The rectangle's upper-left
     * corner is specified by x, y.
     */
    constructor(x: number, y: number, width: number, height: number)

    /** See SetSizeFunction. */
    setSize: SetSizeFunction;

    /** See SetBoundsFunction. */
    setBounds: SetBoundsFunction
}

declare class GPolygon extends GObject {
    /** Creates an empty GPolygon */
    constructor()

    /** Creates an empty GPolygon with an origin at [x], [y]. */
    constructor(x: number, y: number)

    /** Adds a vertex at (x, y) relative to the polygon's origin. */
    addVertex: (x: number, y: number) => void;

    /**
     * Adds a vertex at wherever the last vertex was (or 0, 0 if
     * this is the first), shifted by [dx] and [dy].
     */
    addEdge: (dx: number, dy: number) => void;

    /**
     * Adds a vertex at wherever the last point was placed
     * (or 0, 0 if this is the first), shifted by [r] units
     * in the direction [theta].
     *
     * [theta] is measured in degrees counterclockwise
     * from the +x axis.
     */
    addPolarEdge: (r: number, theta: number) => void;

    /** Gets a representation of the last point added to this polygon. */
    getCurrentPoint: () => GPoint
}

interface SetFrameRectangleFunction {
    /** Sets this object's bounding box to be equal to the given [object]. */
    (object: Bounded): void

    /**
     * Sets this object's bounding box to match the
     * given [x], [y], [width], and [height].
     */
    (x: number, y: number, width: number, height: number): void
}

/**
 * Creates a GArc object consisting of an elliptical arc that fits
 * inside the bounding box specified by x, y, width, and height.
 * If x and y are missing, they default to 0. The start parameter
 * indicates the angle at which the arc begins and is measured in
 * degrees counterclockwise from the +x axis. Thus, a start angle of
 * 0 indicates an arc that begins along the line running eastward from
 * the center, a start angle of 135 begins along the line running
 * northwest, and a start angle of -90 begins along the line running south.
 * The sweep parameter indicates the extent of the arc and is also
 * measured in degrees counterclockwise. A sweep angle of 90 defines a
 * quarter circle extending counterclockwise from the start angle, and
 * a sweep angle of -180 defines a semicircle extending clockwise.
 */
declare class GArc extends GObject {
    constructor(width: number, height: number, start: number, sweep: number)
    constructor(x: number, y: number, width: number, height: number, start: number, sweep: number)

    /** Sets the starting [angle] for this arc. */
    setStartAngle: (angle: number) => void;

    /** Gets the starting angle. */
    getStartAngle: () => number;

    /** Sets the [sweep] angle for this arc. */
    setSweepAngle: (angle: number) => void;

    /** Gets the sweep angle. */
    getSweepAngle: () => number;

    /** Gets the start point of the arc. */
    getStartPoint: () => GPoint;

    /** Gets the end point of the arc. */
    getEndPoint: () => GPoint;

    /** See SetFrameRectangleFunction */
    setFrameRectangle: SetFrameRectangleFunction;

    /** Gets the bounding box of this arc. */
    getFrameRectangle: () => GRectangle
}

declare class GLabel extends GObject {
    /**
     * Creates a new GLabel displaying the given [text], optionally
     * placed at a given [x], [y] coordinate.
     */
    constructor(text: string)
    constructor(text: string, x: number, y: number)

    /**
     * Sets this GLabel's font to the font specified by fontStr.
     *
     * fontStr should be using the CSS form of font specification;
     * for example: 24px 'Helvetica Neue'
     */
    setFont: (fontStr: string) => void;

    /** Gets the currently set font. */
    getFont: () => string;

    /** Sets the displayed [text]. */
    setLabel: (text: string) => void;

    /** Gets the displayed text. */
    getLabel: () => string;

    /** Returns the height of the label, including the font's descent. */
    getAscent: () => number;

    /** Returns just the descent below the baseline of the label. */
    getDescent: () => number;

    static readonly DEFAULT_FAMILY: string;
    static readonly DEFAULT_SIZE: number;
}

declare class GCompound extends GObject {
    /**
     * Creates a new GCompound, optionally moving the
     * compound's origin to (x, y).
     */
    constructor()
    constructor(x: number, y: number)

    /** Adds the given [gObject] to the compound, optionally moving it to x, y. */
    add: (gObject: GObject, x?: number | undefined, y?: number | undefined) => void;

    /** Removes the given [gObject] from the compound. */
    remove: (gObject: GObject) => void;

    /** Removes all objects from the compound. */
    removeAll: () => void;

    /** Gets the number of elements in the compound. */
    getElementCount: () => number;

    /**
     * Gets the object at the specified [index], where index 0
     * was the first GObject added to the GCompound/the GObject
     * farthest back, and the last index is the most recently
     * added/most on top GObject.
     *
     * Returns undefined if the index was not found.
     */
    getElement: (index: number) => GObject | undefined;

    /** Get the element at the given x, y coordinates. */
    getElementAt: (x: number, y: number) => GObject | null;
}

declare class GImage extends GObject {

    /**
     * Constructs a GImage object from the given [source].
     * An x, y coordinate can optionally be provided.
     */
    constructor(source: string)
    constructor(source: string, x: number, y: number)

    /** Adds the given [listener] to this image. */
    addEventListener: (event: "load", listener: Thunk) => void;

    /** Returns a 2D array of RGBA pixels. */
    getPixelArray: () => Array<Array<number>>;

    /** See SetSizeFunction */
    setSize: SetSizeFunction;

    /** See SetBoundsFunction */
    setBounds: SetBoundsFunction;

    /** Gets the alpha value from the given [pixel]. */
    static getAlpha(pixel: number): void;

    /** Gets the red value from the given [pixel]. */
    static getRed(pixel: number): void;

    /** Gets the green value from the given [pixel]. */
    static getGreen(pixel: number): void;

    /** Gets the blue value from the given [pixel]. */
    static getBlue(pixel: number): void;

    /**
     * Returns a pixel created from the given components.
     * Alpha defaults to 255 (fully opaque).
     */
    static createRGBPixel(red: number, green: number, blue: number, alpha?: number | undefined): number
}

declare class GRectangle implements IDimension, IPoint {
    /**
     * Creates a GRectangle with the given
     * x, y, width, and height
     * (0, 0, 0, 0 if unspecified)
     */
    constructor()
    constructor(x: number, y: number, width: number, height: number)

    /** Creates a copy of this GDimension. */
    constructor(other: GPoint)

    getHeight: () => number;
    getLocation: GPoint;
    getSize: GDimension;
    getWidth: () => number;
    getX: () => number;
    getY: () => number;
    height: number;
    setLocation: SetLocationFunction;
    setSize: SetSizeFunction;
    translate: (dx: number, dy: number) => void;
    width: number;
    x: number;
    y: number;

}

interface IDimension {
    /** The width component of this GDimension. */
    width: number;
    /** The height component of this GDimension. */
    height: number;

    /** Gets the width component of this GDimension. */
    getWidth: () => number;

    /** Gets the height component of this GDimension. */
    getHeight: () => number;

    /** See SetSizeFunction */
    setSize: SetSizeFunction;

    /** Returns a copy of this dimension. */
    getSize: GDimension;
}

declare class GDimension implements IDimension {
    /**
     * Creates a GDimension with the given width and height
     * (0, 0 if unspecified)
     */
    constructor()
    constructor(width: number, height: number)

    /** Creates a copy of this GDimension. */
    constructor(other: GPoint)

    getHeight: () => number;
    getSize: GDimension;
    getWidth: () => number;
    height: number;
    setSize: SetSizeFunction;
    width: number;
}

interface SetLocationFunction {
    /** Sets this object's location equal to [other]. */
    (other: Positional): void

    /** Sets object's location to x, y. */
    (x: number, y: number): void
}

interface IPoint {
    /** The x component of this GPoint. */
    x: number;
    /** The y component of this GPoint. */
    y: number;

    /** Gets the x component of this GPoint. */
    getX: () => number;

    /** Gets the y component of this GPoint. */
    getY: () => number;

    /** See SetLocationFunction */
    setLocation: SetLocationFunction;

    /** Returns a copy of this point. */
    getLocation: GPoint;

    /** Moves this GPoint by [dx] and [dy]. */
    translate: (dx: number, dy: number) => void;
}

declare class GPoint implements IPoint {
    /** Creates a GPoint at x, y (0, 0 if unspecified) */
    constructor()
    constructor(x: number, y: number)

    /** Creates a copy of this GPoint. */
    constructor(other: GPoint)

    getLocation: GPoint;
    getX: () => number;
    getY: () => number;
    setLocation: SetLocationFunction;
    translate: (dx: number, dy: number) => void;
    x: number;
    y: number;
}

/**
 * This class represents an affine transformation.
 * Essentially, it's a 2 by 2 matrix, plus
 * two fields for an x and y transformation.
 */
declare class GTransform {
    /**
     * Creates a new GTransform.
     *
     * Creates a matrix that looks like this,
     *    | a  b |
     *    | c  d |
     * with an optional additional x and y transform.
     * Default values:
     *    | 1  0 |
     *    | 0  1 |
     *  tx =0, ty = 0
     */
    constructor()
    constructor(a: number, b: number, c: number, d: number)
    constructor(a: number, b: number, c: number, d: number, tx: number, ty: number)

    a: number;
    b: number;
    c: number;
    d: number;
    tx: number;
    ty: number;
}

declare class GMath {
    /** Rounds [x] to the nearest integer */
    static round(x: number): number

    /** Calculates sin([angle]), where [angle] is expressed in degrees. */
    static sinDegrees(angle: number): number

    /** Calculates cos([angle]), where [angle] is expressed in degrees. */
    static cosDegrees(angle: number): number

    /** Calculates tan([angle]), where [angle] is expressed in degrees. */
    static tanDegrees(angle: number): number

    /** Converts an [angle] expressed in radians to an angle expressed in degrees. */
    static toDegrees(angle: number): number

    /** Calculates the distance from the origin to ([x], [y]). */
    static distance(x: number, y: number): number

    /** Calculates the distance from the ([x0], [y0]) to ([x1], [y1]). */
    static distance(x0: number, y0: number, x1: number, y1: number): number

    /** Calculates the angle between the origin and ([x], [y]). */
    static angle(x: number, y: number): number

    /** Calculates the angle between ([x0], [y0]) and ([x1], [y1]) */
    static angle(x0: number, y0: number, x1: number, y1: number): number
}

