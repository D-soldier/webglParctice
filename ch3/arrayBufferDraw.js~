// 顶点着色器
var VSHADER_SOURCE = 
	'attribute vec4 a_Position;\n' +
	'attribute float a_PointSize;\n' +
	'void main(){\n' + 
	'gl_Position = a_Position;\n' +
	'gl_PointSize = a_PointSize;\n' +
	'}\n';

// 片元着色器
var FSHADER_SOURCE = 
	'precision mediump float;\n' +
	'uniform vec4 u_FragColor;\n' +
	'void main(){\n' +
	'gl_FragColor = u_FragColor;\n' +
	'}\n';

var canvas = document.getElementById('webgl');

function drawPoint(){

    var gl = getWebGLContext(canvas, true);
    
    if ( !gl ) {
	
	console.log('failed to get rendering context fo webgl');
	return;
	
    }
    
    if ( !initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE) ) {
	
	console.log( 'failed to initialize shaders');
	return;
	
    }
    
    var a_Position = gl.getAttribLocation( gl.program, 'a_Position');
    var a_PointSize = gl.getAttribLocation( gl.program, 'a_PointSize');
    
    var u_FragColor = gl.getUniformLocation( gl.program, 'u_FragColor');

    if ( a_Position < 0 || a_PointSize < 0 ) {
	
	console.log('failed to get the storage location of a_Position');
	return;

    }

    gl.vertexAttrib1f( a_PointSize, 10.0);
    gl.clearColor( 1.0, 1.0, 0.0, 1.0 );
    
    var pointArray = [];
    canvas.addEventListener('mousedown', function( event ) {
	
	var x = event.clientX;
	var y = event.clientY;
	var rect = event.target.getBoundingClientRect();
	x = ((x - rect.left) - canvas.width / 2 ) / ( canvas.width / 2 );
	y = ( canvas.height / 2 - ( y - rect.top)) / ( canvas.height / 2 );
	pointArray.push(x);
	pointArray.push(y);

	gl.clear( gl.COLOR_BUFFER_BIT );

	for (let i = 0, len = pointArray.length; i < len; i += 2 ) {
	    
	    let x = pointArray[i];
	    let y = pointArray[i + 1];
	    if ( x > 0 && y > 0 ) {
		gl.uniform4f( u_FragColor, 1.0, 0.0, 0.0, 1.0);
	    } else if ( x > 0 && y < 0 ) {
		gl.uniform4f( u_FragColor, 0.0, 1.0, 0.0, 1.0);
	    } else if ( x < 0 && y > 0 ) {
		gl.uniform4f( u_FragColor, 0.0, 0.0, 1.0, 1.0);
	    } else if ( x < 0 && y < 0 ) {
		gl.uniform4f( u_FragColor, 1.0, 1.0, 1.0, 1.0);
	    }
	    gl.vertexAttrib3f( a_Position, pointArray[i], pointArray[i+1], 0.0);
	
	    gl.drawArrays( gl.POINTS, 0, 1);

	}

    });

    gl.clear( gl.COLOR_BUFFER_BIT );

}

drawPoint();
