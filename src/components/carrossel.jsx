import { useEffect, useRef } from "react";
import "../css/carrossel.css";

const Carrossel = () => {
  const isMouseDownRef = useRef(false);
  const autoRotateRef = useRef(true);
  const lastInteractionTimeRef = useRef(0);

  useEffect(() => {
    const container = document.querySelector(".container");
    if (!container) return;

    const containercarrossel = container.querySelector(".container-carrossel");
    const carrossel = container.querySelector(".carrossel");
    const carrosselItems = carrossel.querySelectorAll(".carrossel-item");

    if (!containercarrossel || !carrossel || carrosselItems.length === 0)
      return;

    let currentMousePos = 0;
    let lastMousePos = 0;
    let lastMoveTo = 0;
    let moveTo = 0;

    const createcarrossel = () => {
      const carrosselProps = onResize();
      const length = carrosselItems.length;
      const degrees = 360 / length;
      const gap = 20;
      const tz = distanceZ(carrosselProps.w, length, gap);

      const fov = calculateFov(carrosselProps);
      const height = calculateHeight(tz);

      container.style.width = tz * 2 + gap * length + "px";
      container.style.height = height + "px";

      carrosselItems.forEach((item, i) => {
        const degreesByItem = degrees * i + "deg";
        item.style.setProperty("--rotatey", degreesByItem);
        item.style.setProperty("--tz", tz + "px");
      });
    };

    const lerp = (a, b, n) => {
      return n * (a - b) + b;
    };

    const distanceZ = (widthElement, length, gap) => {
      return widthElement / 2 / Math.tan(Math.PI / length) + gap;
    };

    const calculateHeight = (z) => {
      const t = Math.atan((90 * Math.PI) / 180 / 2);
      const height = t * 2 * z;
      return height;
    };

    const calculateFov = (carrosselProps) => {
      const perspective = window
        .getComputedStyle(containercarrossel)
        .perspective.split("px")[0];
      const length =
        Math.sqrt(carrosselProps.w * carrosselProps.w) +
        Math.sqrt(carrosselProps.h * carrosselProps.h);
      const fov = 2 * Math.atan(length / (2 * perspective)) * (180 / Math.PI);
      return fov;
    };

    const getPosX = (x) => {
      currentMousePos = x;
      moveTo = currentMousePos < lastMousePos ? moveTo - 2 : moveTo + 2;
      lastMousePos = currentMousePos;
      lastInteractionTimeRef.current = Date.now(); // Update last interaction time
    };

    const update = () => {
      if (autoRotateRef.current && !isMouseDownRef.current) {
        moveTo += 0.5; // Adjust this value to control the speed of automatic rotation
      }
      lastMoveTo = lerp(moveTo, lastMoveTo, 0.05);
      carrossel.style.setProperty("--rotatey", lastMoveTo + "deg");

      // Check if we should resume auto-rotation after user interaction
      if (
        !autoRotateRef.current &&
        Date.now() - lastInteractionTimeRef.current > 2000
      ) {
        autoRotateRef.current = true;
      }

      requestAnimationFrame(update);
    };

    const onResize = () => {
      const boundingcarrossel = containercarrossel.getBoundingClientRect();
      const carrosselProps = {
        w: boundingcarrossel.width,
        h: boundingcarrossel.height,
      };
      return carrosselProps;
    };

    const initEvents = () => {
      carrossel.addEventListener("mousedown", () => {
        isMouseDownRef.current = true;
        autoRotateRef.current = false;
        carrossel.style.cursor = "grabbing";
      });

      carrossel.addEventListener("mouseup", () => {
        isMouseDownRef.current = false;
        carrossel.style.cursor = "grab";
      });

      container.addEventListener("mouseleave", () => {
        isMouseDownRef.current = false;
      });

      carrossel.addEventListener("mousemove", (e) => {
        if (isMouseDownRef.current) {
          getPosX(e.clientX);
          autoRotateRef.current = false;
        }
      });

      carrossel.addEventListener("touchstart", () => {
        isMouseDownRef.current = true;
        autoRotateRef.current = false;
        carrossel.style.cursor = "grabbing";
      });

      carrossel.addEventListener("touchend", () => {
        isMouseDownRef.current = false;
        carrossel.style.cursor = "grab";
      });

      container.addEventListener("touchmove", (e) => {
        if (isMouseDownRef.current) {
          getPosX(e.touches[0].clientX);
          autoRotateRef.current = false;
        }
      });

      window.addEventListener("resize", createcarrossel);

      update();
      createcarrossel();
    };

    initEvents();
  }, []);

  return (
    <div className="conteudo__geral">
      <div className="container">
        <div className="container-carrossel">
          <div className="carrossel">
            <div className="carrossel-item">Uploading !!!</div>
            <div className="carrossel-item">Processing !!!</div>
            <div className="carrossel-item">It takes some time !!!</div>
            <div className="carrossel-item">Please Wait !!!</div>
            <div className="carrossel-item">It will be ready !!!</div>
            <div className="carrossel-item">Loading !!!</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carrossel;
