import mision from "./static/img/mision3.jpg";
import uninorte from "./static/img/uninorte.png"
function Proyectlist() {
    return (
        <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <img src={mision} class="d-block w-100" alt="Slide 1"/>
                    <div class ="carousel-caption d-none d-md-block">
                    </div>
                </div>
            </div>
        </div>
    
    );
}
export default Proyectlist;