import vertex from './../glsl/shader-core.vert'
import fragment from './../glsl/shader-core.frag'

class Blob {

  constructor(scene) {
    this.counter = 0;
    this.geometry = new THREE.SphereGeometry( 3, 32, 32 );

    var uniforms = { u_time: { type: "f", value: 0 }, u_rat: { type: "f", value: 5.}, u_radius: {type:"f", value: 0 } }
    this.material = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: vertex,
        fragmentShader: fragment,
        transparent: true
    });

    var uniforms2 = { u_time: { type: "f", value: 0 }, u_rat: { type: "f", value: 10.}, u_radius: {type:"f", value: 0 } }
    this.material2 = new THREE.ShaderMaterial({
        uniforms: uniforms2,
        vertexShader: vertex,
        fragmentShader: fragment,
        transparent: true
    });

    this.mesh = new THREE.Mesh( this.geometry, this.material );
    this.mesh2 = new THREE.Mesh( this.geometry, this.material2 );

    scene.add( this.mesh );
    scene.add( this.mesh2 );
  }

  toScale(target, duration){
    this.animation = {
      start: this.counter,
      end: this.counter + duration,
      duration: duration,
      from: this.material.uniforms.u_radius.value,
      to: target
    }
  }

  animate() {
    if(this.animation != null) {
      var advance = (this.counter - this.animation.start) / this.animation.duration;
      var value = this.animation.from + (this.animation.to - this.animation.from) * advance
      if( advance > 1 ) 
        this.animation = null;
       this.material.uniforms.u_radius.value = value;
       this.material2.uniforms.u_radius.value = value;
    }
  }

  update(counter) {
    this.counter = counter;

    this.material.uniforms.needsUpdate = true;
    this.material.uniforms.u_time.value = counter;

    this.material2.uniforms.needsUpdate = true;
    this.material2.uniforms.u_time.value = counter;

    this.animate();
  }

}

export default Blob