import { Engine } from "../engine";
import { Mouse } from "../mouse";
import { Renderer } from "../renderer";
import { Vector2D } from "../Vector2D";
import { Plugin } from "../pluginHandler";
import { Rectangle } from "../Rectangle";

export class MousePan implements Plugin {
    mouse: Mouse;
    engine: Engine;
    renderer: Renderer;
    mouseRect: Rectangle = new Rectangle(new Vector2D(0, 0), 10, 10, "green");

    constructor(engine: Engine, renderer: Renderer) {
        this.mouse = renderer.mouse;
        this.engine = engine;
        this.renderer = renderer;

        this.mouse.onMouse2Down.on(() => this.onMouseDown());
        this.mouse.onMouse2Up.on(() => this.onMouseUp());
        this.mouse.onMouseMove.on(() => this.onMouseMove());
        this.mouse.onMouseWheel.on((e) => this.zoom(e));
    }

    run(): void {
    }

    onMouseDown() {
        if (this.mouse.isButton2Down) {
            this.renderer.camera.isPanning = true;
        }
    }

    onMouseUp() {
        if (this.mouse.isButton2Down)
            return;

        this.renderer.camera.isPanning = false;
    }

    onMouseMove() {
        if (this.renderer.camera.isPanning) {
            this.renderer.pan(this.mouse.deltaX, this.mouse.deltaY)
        }
    }

    zoom(deltaY?: number): void {
        if (!deltaY)
            return;

        const worldPos = this.renderer.screenToWorld(new Vector2D(this.mouse.x, this.mouse.y));
        this.renderer.zoomAroundPoint(deltaY, worldPos);
    }
}