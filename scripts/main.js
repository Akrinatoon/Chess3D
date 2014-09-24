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
        
        camera.position.x = 200;
        camera.position.y = 50;
        camera.position.z = 40;

        // add the output of the renderer to the html element
        document.body.appendChild(renderer.domElement);

        var caseString = 'case ';
        var middleCase;
        var chessCaseColor;
        for(var i = 0; i < 8; i++)
        {
            for(var j=0; j < 8; j++)
            {
                if(i == 0 || i == 2 || i == 4 || i == 6) {
                    if(j == 0 || j == 2 || j == 4 || j == 6) {
                        chessCaseColor = 'white';
                    }
                    else
                        chessCaseColor = 'black';
                }
                else {
                    if(j == 0 || j == 2 || j == 4 || j == 6) {
                        chessCaseColor = 'black';
                    }
                    else
                        chessCaseColor = 'white';
                }

                 var chessCaseGeometry  = new THREE.BoxGeometry(10,2,10);
                 var chessCaseMaterial = new THREE.MeshLambertMaterial({color: chessCaseColor, ambient : chessCaseColor});
                 var chessCase = new THREE.Mesh(chessCaseGeometry, chessCaseMaterial);
                 chessCase.position.x = 10*j;
                 chessCase.position.y = 0;
                 chessCase.position.z = 10*i;
                 chessCase.castShadow = false;
                 if(i == 4 & j == 4)
                 {
                    middleCase = chessCase;
                 }
                 chessCase.name = 'case ' + i + ' et ' + j;
                 scene.add(chessCase);
            }
        }
        camera.lookAt(middleCase.position);
/*
        var spotLight = new THREE.SpotLight(0xffffff);
        spotLight.position.set(300, 20, 20);
        spotLight.shadowCameraNear = 200;
        spotLight.shadowCameraFar = 500;
        spotLight.castShadow = true;

        scene.add(spotLight);

        var spotLightTop = new THREE.SpotLight(0xffffff);
        spotLightTop.position.set(150, 50, 48);
        spotLightTop.shadowCameraNear = 200;
        spotLightTop.shadowCameraFar = 500;
        spotLightTop.castShadow = true;

        scene.add(spotLightTop);
*/


        var ambientLight = new THREE.AmbientLight(0xffffff);
        ambientLight.position.set(10, 20, 20);
        ambientLight.shadowCameraNear = 20;
        ambientLight.shadowCameraFar = 50;
        //ambientLight.castShadow = true;

        scene.add(ambientLight);

        

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