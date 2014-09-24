    // global variables
    var renderer;
    var scene;
    var camera;

    /**
     * Initializes the scene, camera and objects. Called when the window is
     * loaded by using window.onload (see below)
     */
    function init() {

        // create a scene, that will hold all our elements such as objects, cameras and lights.
        scene = new THREE.Scene();

        // create a camera, which defines where we're looking at.
        camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

        // create a render, sets the background color and the size
        renderer = new THREE.WebGLRenderer();
        renderer.setClearColor(0xdddddd, 1.0);
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.shadowMapEnabled = true;

        // position and point the camera to the center of the scene
        camera.position.x = 25;
        camera.position.y = 16;
        camera.position.z = 0;
        camera.lookAt(scene.position);

        // add the output of the renderer to the html element
        document.body.appendChild(renderer.domElement);

        // create the chess board

        var boardGeometry = new THREE.PlaneGeometry(20, 20);
        var boardMaterial = new THREE.MeshLambertMaterial({color: 0xcccccc});
        var chessboard = new THREE.Mesh(boardGeometry, boardMaterial);
        chessboard.receiveShadow = true;

        // rotate and position the plane
        chessboard.rotation.x = -0.5 * Math.PI;
        chessboard.position.x = 0;
        chessboard.position.y = -2;
        chessboard.position.z = 0;

        // add the plane to the scene
        scene.add(chessboard);



        var spotLight = new THREE.SpotLight(0xffffff);
        spotLight.position.set(10, 20, 20);
        spotLight.shadowCameraNear = 20;
        spotLight.shadowCameraFar = 50;
        spotLight.castShadow = true;

        scene.add(spotLight);

        // call the render function, after the first render, interval is determined
        // by requestAnimationFrame
        render();
    }

    /**
     * Called when the scene needs to be rendered. Delegates to requestAnimationFrame
     * for future renders
     */
    function render() {
        // render using requestAnimationFrame
        requestAnimationFrame(render);
        renderer.render(scene, camera);
    }


    /**
     * Function handles the resize event. This make sure the camera and the renderer
     * are updated at the correct moment.
     */
    function handleResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    // calls the init function when the window is done loading.
    window.onload = init;
    // calls the handleResize function when the window is resized
    window.addEventListener('resize', handleResize, false);