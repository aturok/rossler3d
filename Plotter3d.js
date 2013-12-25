function Plotter3d(canvasElement) {
	var w = canvasElement.width * 0.1;
	var h = canvasElement.height * 0.1;
	this._camera = new THREE.OrthographicCamera( -w/2, w/2, h/2, -h/2, -100.01, 5000);
	this._camera.rotation.x = 3.14 / 3;

	var scaleFactor = 1.3;
	this._camera.scale.x = scaleFactor;
	this._camera.scale.y = scaleFactor;
	this._camera.scale.z = scaleFactor;
	this._camera.position.z = 20.0;

	this._scene = new THREE.Scene();

    this._renderer = new THREE.CanvasRenderer({ canvas : canvasElement });
    this._renderer.setSize(canvasElement.width, canvasElement.height);

    this._plots = [];
};

Plotter3d.prototype.addPlot = function(points,color) {
	var l = createLine(points,color);

	this._plots.push(l);
	this._scene.add(l);

	this._renderer.render(this._scene,this._camera);
};

function ptsToGeometry(points) {
    var g = new THREE.Geometry();

    for(i = 0; i < points.length; ++i) {
        p = points[i];
        v = new THREE.Vector3( p[0], p[1], p[2] );
        g.vertices.push(v);
    }
    return g;
}

function createLine(points) {
	var g = ptsToGeometry(points);
	var m = new THREE.LineBasicMaterial( { color : 0xff0000 } );
	var line = new THREE.Line(g, m);
    return line;
}

