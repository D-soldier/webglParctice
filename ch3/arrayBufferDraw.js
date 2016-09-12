// 顶点着色器
var VSHADER_SOURCE = 
	'attribute vec4 a_Position;\n' +
	'uniform mat4 u_xformMatrix;\n' +
	'void main(){\n' + 
	'gl_Position = u_xformMatrix * a_Position;\n' +
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
    
    var u_FragColor = gl.getUniformLocation( gl.program, 'u_FragColor');
    
    var u_xformMatrix = gl.getUniformLocation( gl.program, 'u_xformMatrix');

    if ( a_Position < 0 ) {
	
	console.log('failed to get the storage location of a_Position');
	return;

    }

    var ANGLE = -45;
    var radian = Math.PI * ANGLE / 180.0;
    var cosB = Math.cos( radian );
    var sinB = Math.sin( radian );

    var matrix = new Float32Array([
	cosB, sinB, 0.0, 0.0,
	-sinB, cosB, 0.0, 0.0,
	0.0, 0.0, 1.0, 0.0,
	0.0, 0.0, 0.0, 1.0
    ]);

    gl.uniformMatrix4fv( u_xformMatrix, false, matrix);
//    gl.vertexAttrib1f( a_PointSize, 10.0);
//    gl.uniform4f( u_Translation, 0.5, 0.5, 0.0, 1.0);
    gl.uniform4f( u_FragColor, 1.0, 0.0, 1.0, 1.0);
    gl.clearColor( 1.0, 1.0, 0.0, 1.0 );
    var n = initVertexBuffers(gl);
    n = 3;

    gl.clear( gl.COLOR_BUFFER_BIT );
    gl.drawArrays(gl.TRIANGLES, 0, n);

}

function initVertexBuffers( gl ) {
    
    var vertices = new Float32Array([
	-0.5, 0.5, -0.5, -0.5, 0.5, 0.5, 0.5, -0.5]);

    var n = 4;

    var vertexBuffer = gl.createBuffer();
    
    if ( !vertexBuffer ) {
	
	console.log('failed to create the buffer object');
	return;

    }

    gl.bindBuffer( gl.ARRAY_BUFFER, vertexBuffer );
    
    //write data to array Buffer
    gl.bufferData( gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW );
    
    var a_Position = gl.getAttribLocation( gl.program, 'a_Position');
    
    gl.vertexAttribPointer( a_Position, 2, gl.FLOAT, false, 0, 0 );

    gl.enableVertexAttribArray( a_Position );

    return n;

}

drawPoint();
