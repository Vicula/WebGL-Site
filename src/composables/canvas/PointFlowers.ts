export function createPointFlowers(gl: WebGLRenderingContext) {
    // get point sizes
    var prm = gl.getParameter(gl.ALIASED_POINT_SIZE_RANGE);
    renderSpec.pointSize = { 'min': prm[0], 'max': prm[1] };

    var vtxsrc = document.getElementById("sakura_point_vsh").textContent;
    var frgsrc = document.getElementById("sakura_point_fsh").textContent;

    pointFlower.program = createShader(
        vtxsrc, frgsrc,
        ['uProjection', 'uModelview', 'uResolution', 'uOffset', 'uDOF', 'uFade'],
        ['aPosition', 'aEuler', 'aMisc']
    );

    useShader(pointFlower.program);
    pointFlower.offset = new Float32Array([0.0, 0.0, 0.0]);
    pointFlower.fader = Vector3.create(0.0, 10.0, 0.0);

    // paramerters: velocity[3], rotate[3]
    pointFlower.numFlowers = 1600;
    pointFlower.particles = new Array(pointFlower.numFlowers);
    // vertex attributes {position[3], euler_xyz[3], size[1]}
    pointFlower.dataArray = new Float32Array(pointFlower.numFlowers * (3 + 3 + 2));
    pointFlower.positionArrayOffset = 0;
    pointFlower.eulerArrayOffset = pointFlower.numFlowers * 3;
    pointFlower.miscArrayOffset = pointFlower.numFlowers * 6;

    pointFlower.buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, pointFlower.buffer);
    gl.bufferData(gl.ARRAY_BUFFER, pointFlower.dataArray, gl.DYNAMIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    unuseShader(pointFlower.program);

    for (var i = 0; i < pointFlower.numFlowers; i++) {
        pointFlower.particles[i] = new BlossomParticle();
    }
}

function initPointFlowers() {
    //area
    pointFlower.area = Vector3.create(20.0, 20.0, 20.0);
    pointFlower.area.x = pointFlower.area.y * renderSpec.aspect;

    pointFlower.fader.x = 10.0; //env fade start
    pointFlower.fader.y = pointFlower.area.z; //env fade half
    pointFlower.fader.z = 0.1;  //near fade start

    //particles
    var PI2 = Math.PI * 2.0;
    var tmpv3 = Vector3.create(0, 0, 0);
    var tmpv = 0;
    var symmetryrand = function () { return (Math.random() * 2.0 - 1.0); };
    for (var i = 0; i < pointFlower.numFlowers; i++) {
        var tmpprtcl = pointFlower.particles[i];

        //velocity
        tmpv3.x = symmetryrand() * 0.3 + 0.8;
        tmpv3.y = symmetryrand() * 0.2 - 1.0;
        tmpv3.z = symmetryrand() * 0.3 + 0.5;
        Vector3.normalize(tmpv3);
        tmpv = 2.0 + Math.random() * 1.0;
        tmpprtcl.setVelocity(tmpv3.x * tmpv, tmpv3.y * tmpv, tmpv3.z * tmpv);

        //rotation
        tmpprtcl.setRotation(
            symmetryrand() * PI2 * 0.5,
            symmetryrand() * PI2 * 0.5,
            symmetryrand() * PI2 * 0.5
        );

        //position
        tmpprtcl.setPosition(
            symmetryrand() * pointFlower.area.x,
            symmetryrand() * pointFlower.area.y,
            symmetryrand() * pointFlower.area.z
        );

        //euler
        tmpprtcl.setEulerAngles(
            Math.random() * Math.PI * 2.0,
            Math.random() * Math.PI * 2.0,
            Math.random() * Math.PI * 2.0
        );

        //size
        tmpprtcl.setSize(0.9 + Math.random() * 0.1);
    }
}

function renderPointFlowers() {
    //update
    var PI2 = Math.PI * 2.0;
    var limit = [pointFlower.area.x, pointFlower.area.y, pointFlower.area.z];
    var repeatPos = function (prt, cmp, limit) {
        if (Math.abs(prt.position[cmp]) - prt.size * 0.5 > limit) {
            //out of area
            if (prt.position[cmp] > 0) {
                prt.position[cmp] -= limit * 2.0;
            }
            else {
                prt.position[cmp] += limit * 2.0;
            }
        }
    };
    var repeatEuler = function (prt, cmp) {
        prt.euler[cmp] = prt.euler[cmp] % PI2;
        if (prt.euler[cmp] < 0.0) {
            prt.euler[cmp] += PI2;
        }
    };

    for (var i = 0; i < pointFlower.numFlowers; i++) {
        var prtcl = pointFlower.particles[i];
        prtcl.update(timeInfo.delta, timeInfo.elapsed);
        repeatPos(prtcl, 0, pointFlower.area.x);
        repeatPos(prtcl, 1, pointFlower.area.y);
        repeatPos(prtcl, 2, pointFlower.area.z);
        repeatEuler(prtcl, 0);
        repeatEuler(prtcl, 1);
        repeatEuler(prtcl, 2);

        prtcl.alpha = 1.0;//(pointFlower.area.z - prtcl.position[2]) * 0.5;

        prtcl.zkey = (camera.matrix[2] * prtcl.position[0]
            + camera.matrix[6] * prtcl.position[1]
            + camera.matrix[10] * prtcl.position[2]
            + camera.matrix[14]);
    }

    // sort
    pointFlower.particles.sort(function (p0, p1) { return p0.zkey - p1.zkey; });

    // update data
    var ipos = pointFlower.positionArrayOffset;
    var ieuler = pointFlower.eulerArrayOffset;
    var imisc = pointFlower.miscArrayOffset;
    for (var i = 0; i < pointFlower.numFlowers; i++) {
        var prtcl = pointFlower.particles[i];
        pointFlower.dataArray[ipos] = prtcl.position[0];
        pointFlower.dataArray[ipos + 1] = prtcl.position[1];
        pointFlower.dataArray[ipos + 2] = prtcl.position[2];
        ipos += 3;
        pointFlower.dataArray[ieuler] = prtcl.euler[0];
        pointFlower.dataArray[ieuler + 1] = prtcl.euler[1];
        pointFlower.dataArray[ieuler + 2] = prtcl.euler[2];
        ieuler += 3;
        pointFlower.dataArray[imisc] = prtcl.size;
        pointFlower.dataArray[imisc + 1] = prtcl.alpha;
        imisc += 2;
    }

    //draw
    gl.enable(gl.BLEND);
    //gl.disable(gl.DEPTH_TEST);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    var prog = pointFlower.program;
    useShader(prog);

    gl.uniformMatrix4fv(prog.uniforms.uProjection, false, projection.matrix);
    gl.uniformMatrix4fv(prog.uniforms.uModelview, false, camera.matrix);
    gl.uniform3fv(prog.uniforms.uResolution, renderSpec.array);
    gl.uniform3fv(prog.uniforms.uDOF, Vector3.arrayForm(camera.dof));
    gl.uniform3fv(prog.uniforms.uFade, Vector3.arrayForm(pointFlower.fader));

    gl.bindBuffer(gl.ARRAY_BUFFER, pointFlower.buffer);
    gl.bufferData(gl.ARRAY_BUFFER, pointFlower.dataArray, gl.DYNAMIC_DRAW);

    gl.vertexAttribPointer(prog.attributes.aPosition, 3, gl.FLOAT, false, 0, pointFlower.positionArrayOffset * Float32Array.BYTES_PER_ELEMENT);
    gl.vertexAttribPointer(prog.attributes.aEuler, 3, gl.FLOAT, false, 0, pointFlower.eulerArrayOffset * Float32Array.BYTES_PER_ELEMENT);
    gl.vertexAttribPointer(prog.attributes.aMisc, 2, gl.FLOAT, false, 0, pointFlower.miscArrayOffset * Float32Array.BYTES_PER_ELEMENT);

    // doubler
    for (var i = 1; i < 2; i++) {
        var zpos = i * -2.0;
        pointFlower.offset[0] = pointFlower.area.x * -1.0;
        pointFlower.offset[1] = pointFlower.area.y * -1.0;
        pointFlower.offset[2] = pointFlower.area.z * zpos;
        gl.uniform3fv(prog.uniforms.uOffset, pointFlower.offset);
        gl.drawArrays(gl.POINT, 0, pointFlower.numFlowers);

        pointFlower.offset[0] = pointFlower.area.x * -1.0;
        pointFlower.offset[1] = pointFlower.area.y * 1.0;
        pointFlower.offset[2] = pointFlower.area.z * zpos;
        gl.uniform3fv(prog.uniforms.uOffset, pointFlower.offset);
        gl.drawArrays(gl.POINT, 0, pointFlower.numFlowers);

        pointFlower.offset[0] = pointFlower.area.x * 1.0;
        pointFlower.offset[1] = pointFlower.area.y * -1.0;
        pointFlower.offset[2] = pointFlower.area.z * zpos;
        gl.uniform3fv(prog.uniforms.uOffset, pointFlower.offset);
        gl.drawArrays(gl.POINT, 0, pointFlower.numFlowers);

        pointFlower.offset[0] = pointFlower.area.x * 1.0;
        pointFlower.offset[1] = pointFlower.area.y * 1.0;
        pointFlower.offset[2] = pointFlower.area.z * zpos;
        gl.uniform3fv(prog.uniforms.uOffset, pointFlower.offset);
        gl.drawArrays(gl.POINT, 0, pointFlower.numFlowers);
    }

    //main
    pointFlower.offset[0] = 0.0;
    pointFlower.offset[1] = 0.0;
    pointFlower.offset[2] = 0.0;
    gl.uniform3fv(prog.uniforms.uOffset, pointFlower.offset);
    gl.drawArrays(gl.POINT, 0, pointFlower.numFlowers);

    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    unuseShader(prog);

    gl.enable(gl.DEPTH_TEST);
    gl.disable(gl.BLEND);
}