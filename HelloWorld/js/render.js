var gMesh;
var gMesh1;
var gMesh3;
var gRenderer;
var gScene;
var gCamera;
var gPointlight;
function init() {
    var renderer = new THREE.WebGLRenderer({
        canvas: document.getElementById("view"),
        antialias: true
    });
    renderer.setClearColor(0x000000);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    var camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 3000);
    var scene = new THREE.Scene();
    var geometry = new THREE.BoxGeometry(100, 100, 100);
    var material = new THREE.MeshLambertMaterial({color : 0xf3abff});
    var mesh = new THREE.Mesh(geometry, material);

    var geometry1 = new THREE.SphereGeometry(50, 20, 20);
    var material1 = new THREE.MeshLambertMaterial({ color: 0xf3abff });
    var mesh1 = new THREE.Mesh(geometry1, material1);

    var geometry3 = new THREE.Geometry();
    var material3 = new THREE.MeshLambertMaterial({ color: 0xf3abff });
    geometry3.vertices.push(
        new THREE.Vector3(-50,50,0),
        new THREE.Vector3(-50,-50,0),
        new THREE.Vector3(50,-50,0)
    );
    geometry3.faces.push(new THREE.Face3(0, 1, 2));
    mesh3 = new THREE.Mesh(geometry3, material3);

    var light = new THREE.AmbientLight(0xffffff, 0.5);

    var pointLight = new THREE.PointLight(0xffffff, 0.5);
    pointLight.position.set(0,0,-100);
    mesh.position.set(0, 0, -1000);
    mesh1.position.set(-100, 0, -500);
    mesh3.position.z = -600;
    scene.add(mesh);
    scene.add(mesh1);
    scene.add(mesh3);
    scene.add(light);
    scene.add(pointLight);
    gMesh = mesh;
    gMesh1 = mesh1;
    gMesh3 = mesh3;
    gRenderer = renderer;
    gScene = scene;
    gCamera = camera;
    gPointlight = pointLight;
    requestAnimationFrame(render);
}

function render() {
    //gMesh.rotation.x += 0.01;
    //gMesh.rotation.y += 0.02;

    //gMesh.position.x += 1;

   // gCamera.position.x += 0.001;
    //gCamera.rotation.y += 0.001;
    gPointlight.position.x += 0.1;
    //gMesh1.rotation.x += 0.1;
    //gMesh1.rotation.y += 0.05;

    //gMesh3.rotation.x += 0.1;
    //gMesh3.rotation.z += 0.05;

    //gMesh1.position.x -= 1;

    gRenderer.render(gScene, gCamera);
    requestAnimationFrame(render);
}